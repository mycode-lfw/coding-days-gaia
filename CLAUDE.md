# LABFORWEB – Nerd Academy · Progetto Sito Web

## Panoramica
Sito web istituzionale per **LABFORWEB srl** (www.labforweb.it), scuola di formazione web con sede a Roma.
Il progetto replica fedelmente il layout del sito originale (fornito come PDF `www_labforweb.pdf`) ed include un **widget chat AI** integrato basato sull'API Anthropic/Claude.

Il cliente è la scuola stessa — il proprietario lavora con email `hello@labforweb.it`.

---

## Struttura file

```
CODING-DAYS-AI/
├── index.html                  ← pagina principale (unica pagina)
├── CSS/
│   └── style.css               ← tutti gli stili, incluso widget chat
├── Script/
│   ├── main.js                 ← comportamenti UI (cookie, menu mobile, scroll reveal)
│   └── agent-widget.js         ← widget chat AI (frontend)
├── Image/
│   ├── logo.png                ← logo reale LABFORWEB
│   ├── regione-lazio.png       ← stemma ufficiale Regione Lazio
│   ├── hero-team.jpg           ← foto team hero section (bg image via CSS)
│   ├── corso-ai.jpg            ← thumbnail card AI Web Developer
│   ├── corso-cyber.jpg         ← thumbnail card Cyber Security
│   ├── financing-person.png    ← foto sezione finanziamento (PNG con trasparenza)
│   ├── intesa-sanpaolo.png     ← logo Intesa Sanpaolo
│   ├── testimonial-damiano.jpg
│   ├── testimonial-valentina.jpg
│   └── testimonial-stefano.jpg
├── agent/                      ← backend Node.js per il widget chat
│   ├── server.js               ← Express server + integrazione Claude API
│   ├── package.json
│   ├── .env                    ← API key Anthropic (NON committare su Git)
│   ├── .env.example            ← template per la .env
│   └── docs/                   ← documenti caricati nell'agente
│       └── html-css-js-base.txt ← guida base HTML/CSS/JS (documento di esempio)
├── ONBOARDING.md               ← documentazione progetto (condivisibile con colleghi)
├── CLAUDE.md                   ← questo file (caricato automaticamente da Claude Code)
└── www_labforweb.pdf           ← PDF originale del layout (riferimento design)
```

---

## Sezioni della pagina (dall'alto in basso)

1. **Cookie banner** — fixed bottom, appare al primo accesso, gestito via localStorage
2. **Notification bar** — barra gialla sticky "Workshop gratuito sull'AI - 15 maggio"
3. **Header sticky** — logo PNG reale, navigazione desktop, hamburger mobile
4. **Hero** — `hero-team.jpg` come background-image CSS, testi in bianco con text-shadow
5. **Features card** — card bianca con ombra che galleggia sopra la sezione successiva, 3 colonne con divisori verticali
6. **Corsi** — 2 card (AI Web Developer + Cyber Security) con immagini reali, badge arancione "Costo in offerta", bottone outline verde
7. **Finanziamento** — sfondo verde scuro, foto `financing-person.png` allineata in basso a destra, logo Intesa Sanpaolo invertito in bianco
8. **Regione Lazio** — logo ufficiale `regione-lazio.png`, layout 2 colonne
9. **Testimonianze** — 3 card con foto circolari (64px), stelle dorate, testi reali
10. **Footer** — sfondo `#1a1a2e`, 4 colonne, logo filtrato in bianco, social links
11. **Widget chat AI** — pulsante fixed bottom-right "Il tuo Agent Risponde" (verde, pill), pannello chat animato

---

## Widget Chat AI — come funziona

### Architettura
```
index.html (frontend)
    └── Script/agent-widget.js
            └── fetch POST → http://localhost:3001/api/chat
                    └── agent/server.js (Express)
                            └── Legge docs/ → Claude API (claude-haiku-4-5-20251001)
                                    └── Risponde solo se risposta nei documenti
                                        altrimenti: "Spiacente ma su questo argomento non posso aiutarti"
```

### Avviare il backend
```bash
cd agent
npm install        # solo la prima volta
npm start          # avvia su http://localhost:3001
```

### Aggiungere documenti
Copia PDF, TXT o MD nella cartella `agent/docs/` e riavvia il server.
Formati supportati: `.pdf`, `.txt`, `.md`

### API key
Creare `agent/.env` con:
```
ANTHROPIC_API_KEY=sk-ant-api03-...
PORT=3001
```
Ottieni la chiave su: https://console.anthropic.com

### Modello usato
`claude-haiku-4-5-20251001` — il più economico e veloce.
Stimato ~$0.004 per richiesta con documento esempio (~3.500 token).

---

## Stack tecnologico

| Layer | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3 (custom, no framework), JavaScript vanilla |
| Font | Google Fonts — Poppins (300/400/500/600/700/800) |
| Icone | Font Awesome 6.5.0 (CDN) |
| Backend chat | Node.js 20 + Express 4 |
| AI | Anthropic Claude (claude-haiku-4-5-20251001) |
| PDF parsing | pdf-parse |

---

## Decisioni di design prese

- **Colore testo principale** (`--text`): `#212529` — era stato temporaneamente cambiato in `#ffffff` dall'utente, ripristinato. I testi dell'hero sono bianchi via classi specifiche (`.hero-title`, `.hero-subtitle`) con `text-shadow`.
- **Hero background**: impostato via CSS `background: url(../Image/hero-team.jpg)` dall'utente (override rispetto al gradiente verde originale).
- **Bottoni**: pill shape (`border-radius: 50px`) per i bottoni principali, rettangolare (`border-radius: 8px`) solo per il CTA hero arancione.
- **Features card**: galleggia con `margin-top: -28px` e `z-index: 2` per sovrapporsi alla sezione successiva.
- **Financing photo**: PNG con trasparenza, `object-fit: contain`, allineata `flex-end` senza border-radius.

---

## Prossimi step da completare

- [ ] Installare Git (git-scm.com/download/win)
- [ ] Creare repository privato su GitHub (`labforweb-coding-days`)
- [ ] Fare il primo push del progetto
- [ ] Configurare `.gitignore` (escludere `agent/.env` e `agent/node_modules/`)
- [ ] Attivare **Prompt Caching** nel `agent/server.js` per ridurre i costi API del ~90%
- [ ] Aggiungere i PDF reali delle dispense del corso nella cartella `agent/docs/`
- [ ] Testare il widget chat con i documenti reali

---

## Contesto cliente

- **Cliente**: LABFORWEB srl — Nerd Academy, Roma
- **Indirizzo**: Via Francesco Saverio Solari, 16 — 00149 Roma
- **Email**: hello@labforweb.it
- **Tel**: 06.58205135 / 351.9392372
- **Accreditamento**: Regione Lazio, Determina N. G10020 del 25/07/2024
- **P.IVA**: 11712501003
- **Prossime edizioni corsi**:
  - AI Web Developer: 15 giugno 2026
  - Cyber Security Specialist: 18 maggio 2026
