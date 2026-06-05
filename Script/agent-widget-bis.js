/* ===========================================
   LABFORWEB – Agent Page (full screen)
   =========================================== */

(function () {

    const AGENT_URL = 'http://localhost:3001/api/chat';

    const input    = document.getElementById('agentInput');
    const sendBtn  = document.getElementById('agentSend');
    const messages = document.getElementById('agentMessages');

    /* ---- Aggiungi messaggio alla chat ---- */
    function addMessage(text, role) {
        const div = document.createElement('div');
        div.className = `agent-msg agent-msg--${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';

        if (role === 'bot') {
            bubble.innerHTML = formatResponse(text);
        } else {
            bubble.textContent = text;
        }

        div.appendChild(bubble);
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    /* ---- Formatta la risposta (codice inline + blocchi) ---- */
    function formatResponse(text) {
        const parts = text.split(/(```[\w]*\n?[\s\S]*?```)/g);
        return parts.map(part => {
            if (part.startsWith('```')) {
                return part.replace(/```(\w*)\n?([\s\S]*?)```/, (_, lang, code) =>
                    `<pre><code>${escapeHtml(code.trim())}</code></pre>`);
            }
            return escapeHtml(part)
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
        }).join('');
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /* ---- Indicatore di caricamento ---- */
    function addTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'agent-msg agent-msg--bot agent-typing';
        div.id = 'typingIndicator';
        div.innerHTML = '<div class="msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    /* ---- Invia domanda ---- */
    async function sendQuestion() {
        const question = input.value.trim();
        if (!question) return;

        addMessage(question, 'user');
        input.value = '';
        input.style.height = 'auto';
        sendBtn.disabled = true;
        addTypingIndicator();

        try {
            const res = await fetch(AGENT_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ question })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            removeTypingIndicator();
            addMessage(data.answer || 'Risposta non disponibile.', 'bot');

        } catch (err) {
            removeTypingIndicator();
            addMessage('⚠️ Impossibile contattare il server. Assicurati che il backend sia avviato su localhost:3001.', 'bot');
            console.error('Agent error:', err);
        } finally {
            sendBtn.disabled = false;
            input.focus();
        }
    }

    sendBtn.addEventListener('click', sendQuestion);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    });

    /* Auto-resize textarea */
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

})();
