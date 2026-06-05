/* ===========================================
   LABFORWEB – Agent Chat Widget
   =========================================== */

(function () {

    const AGENT_URL = 'http://localhost:3001/api/chat';

    /* ---- Crea il markup del widget ---- */
    const widgetHTML = `
    <div class="agent-widget" id="agentWidget">

        <!-- Pulsante fisso -->
        <button class="agent-toggle" id="agentToggle" aria-label="Apri assistente">
            <span class="agent-toggle-icon"><i class="fas fa-robot"></i></span>
            <span class="agent-toggle-label">Il tuo Agent Risponde</span>
        </button>

        <!-- Pannello chat -->
        <div class="agent-panel" id="agentPanel" aria-hidden="true">
            <div class="agent-header">
                <div class="agent-header-info">
                    <div class="agent-avatar"><i class="fas fa-robot"></i></div>
                    <div>
                        <strong>LABFORWEB Agent</strong>
                        <span class="agent-status" id="agentStatus">
                            <span class="status-dot"></span> Online
                        </span>
                    </div>
                </div>
                <button class="agent-close" id="agentClose" aria-label="Chiudi">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="agent-messages" id="agentMessages">
                <div class="agent-msg agent-msg--bot">
                    <div class="msg-bubble">
                        Ciao! 👋 Sono Anthony, l'assistente di <strong>LABFORWEB</strong>.<br>
                        Posso rispondere a domande su <strong>HTML</strong>, <strong>CSS</strong> e <strong>JavaScript</strong> in base ai materiali del corso.
                    </div>
                </div>
            </div>

            <div class="agent-input-area">
                <textarea
                    id="agentInput"
                    class="agent-textarea"
                    placeholder="Scrivi la tua domanda su HTML, CSS o JavaScript..."
                    rows="2"
                    maxlength="800"
                ></textarea>
                <button class="agent-send" id="agentSend" aria-label="Invia">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>

    </div>`;

    /* ---- Inietta nel DOM ---- */
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    /* ---- Riferimenti ---- */
    const toggle   = document.getElementById('agentToggle');
    const panel    = document.getElementById('agentPanel');
    const closeBtn = document.getElementById('agentClose');
    const input    = document.getElementById('agentInput');
    const sendBtn  = document.getElementById('agentSend');
    const messages = document.getElementById('agentMessages');

    let isOpen = false;

    /* ---- Apri/chiudi ---- */
    function openPanel() {
        isOpen = true;
        panel.classList.add('agent-panel--open');
        panel.setAttribute('aria-hidden', 'false');
        toggle.classList.add('agent-toggle--active');
        input.focus();
    }

    function closePanel() {
        isOpen = false;
        panel.classList.remove('agent-panel--open');
        panel.setAttribute('aria-hidden', 'true');
        toggle.classList.remove('agent-toggle--active');
    }

    toggle.addEventListener('click', () => isOpen ? closePanel() : openPanel());
    closeBtn.addEventListener('click', closePanel);

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
        // Separa i blocchi di codice dal testo normale
        const parts = text.split(/(```[\w]*\n?[\s\S]*?```)/g);
        return parts.map(part => {
            if (part.startsWith('```')) {
                return part.replace(/```(\w*)\n?([\s\S]*?)```/, (_, lang, code) =>
                    `<pre><code>${escapeHtml(code.trim())}</code></pre>`);
            }
            // Nel testo normale: escape HTML prima, poi applica markdown
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

    /* Chiudi cliccando fuori dal pannello */
    document.addEventListener('click', (e) => {
        if (isOpen && !panel.contains(e.target) && !toggle.contains(e.target)) {
            closePanel();
        }
    });

    /* ESC per chiudere */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closePanel();
    });

})();
