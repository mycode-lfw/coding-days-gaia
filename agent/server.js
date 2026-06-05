require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const fs         = require('fs');
const path       = require('path');
const Anthropic  = require('@anthropic-ai/sdk');
const pdfParse   = require('pdf-parse');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* --------------------------------------------------
   Caricamento documenti dalla cartella /docs
   Supporta: .txt  .md  .pdf
-------------------------------------------------- */
let documentsContext = '';

async function loadDocuments() {
    const docsDir = path.join(__dirname, 'docs');

    if (!fs.existsSync(docsDir)) {
        console.warn('⚠️  Cartella docs/ non trovata.');
        return;
    }

    const files = fs.readdirSync(docsDir);
    if (files.length === 0) {
        console.warn('⚠️  Nessun documento nella cartella docs/.');
        return;
    }

    const parts = [];

    for (const file of files) {
        const filePath = path.join(docsDir, file);
        const ext      = path.extname(file).toLowerCase();

        try {
            if (ext === '.pdf') {
                const buffer  = fs.readFileSync(filePath);
                const data    = await pdfParse(buffer);
                parts.push(`\n\n=== DOCUMENTO: ${file} ===\n${data.text}`);
                console.log(`✅ PDF caricato: ${file} (${data.numpages} pagine)`);

            } else if (ext === '.txt' || ext === '.md') {
                const text = fs.readFileSync(filePath, 'utf-8');
                parts.push(`\n\n=== DOCUMENTO: ${file} ===\n${text}`);
                console.log(`✅ Testo caricato: ${file}`);

            } else {
                console.log(`⏭️  File ignorato (formato non supportato): ${file}`);
            }
        } catch (err) {
            console.error(`❌ Errore caricando ${file}:`, err.message);
        }
    }

    documentsContext = parts.join('\n');
    const chars = documentsContext.length;
    console.log(`\n📚 Documenti caricati: ${parts.length} file — ${chars.toLocaleString()} caratteri totali\n`);
}

/* --------------------------------------------------
   Endpoint POST /api/chat
   Body: { question: "..." }
-------------------------------------------------- */
app.post('/api/chat', async (req, res) => {
    const { question } = req.body;

    if (!question || question.trim() === '') {
        return res.status(400).json({ error: 'Domanda mancante.' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'API key Anthropic non configurata. Controlla il file .env' });
    }

    if (!documentsContext) {
        return res.status(503).json({
            answer: 'Spiacente ma su questo argomento non posso proprio aiutarti: nessun documento è stato caricato.'
        });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const systemPrompt = `Sei un assistente specializzato di LABFORWEB, una scuola di formazione web.
Rispondi ESCLUSIVAMENTE in italiano.
Il tuo compito è rispondere a domande su HTML, CSS, JavaScript, React e Python.

REGOLE FONDAMENTALI:
1. Rispondi SOLO se la risposta è contenuta nei documenti qui sotto.
2. Se la risposta NON è presente nei documenti, rispondi esattamente con questa frase: "Spiacente ma su questo argomento non posso proprio aiutarti"
3. Non inventare, non integrare con conoscenze esterne ai documenti.
4. Sii preciso, chiaro e usa esempi di codice se presenti nei documenti.
5. Se la domanda non riguarda HTML, CSS, JavaScript, React o Python, rispondi: "Spiacente ma su questo argomento non posso aiutarti"

DOCUMENTI DI RIFERIMENTO:
${documentsContext}`;

    try {
        const message = await client.messages.create({
            model:      'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system:     systemPrompt,
            messages:   [{ role: 'user', content: question.trim() }]
        });

        const answer = message.content[0].text;
        res.json({ answer });

    } catch (err) {
        console.error('Errore API Anthropic:', err.message);
        res.status(500).json({ error: 'Errore nella comunicazione con il servizio AI.' });
    }
});

/* --------------------------------------------------
   Endpoint GET /api/status  — health check
-------------------------------------------------- */
app.get('/api/status', (req, res) => {
    res.json({
        status:    'online',
        documents: documentsContext.length > 0 ? 'caricati' : 'nessuno',
        chars:     documentsContext.length
    });
});

/* --------------------------------------------------
   Avvio server
-------------------------------------------------- */
loadDocuments().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Agent server avviato su http://localhost:${PORT}`);
        console.log(`   Health check: http://localhost:${PORT}/api/status`);
    });
});
