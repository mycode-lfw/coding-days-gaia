Utilizzo Claude



**PROMPT 1**

Ciao,

questo è il layout di un sito web che dobbiamo realizzare per un cliente.



Puoi scrivere il codice html, css e javascript necessario alla realizzazione?



Cerca di realizzare un layout che sia più possibile rispondente all'originale.



Crea una cartella chiamata labforweb e all'interno sottocartelle chiamate:



CSS

Script

Image



Nella cartella css inserisci il codice css, in quella script il codice Javascript e nella cartella image le immagini che ritieni utili per il layout.

il documento HTML lo chiami index.html e lo posizioni nella cartella root labforweb



Nel frattempo che Claude elabora, cerchiamo di capire le parole che non conoscete

layout - html - css - javascript - root



**PROMPT 2**

Grazie mille,

hai fatto un buon lavoro. Ma alcune immagini non si vedono. Riesci a recuperarle dal documento pdf che ti ho allegato ho devo provvedere io?



**PROMPT 3**

Ok, recupero le immagini e gli assegno i nomi che hai suggerito







**PROMPT 4**

Ho recuperato tutte le immagini, le trovi nella cartella image.

Attenzione, l'immagine Foto ragazza in rosa (finanziamento) è una PNG.

Puoi procedere ad inserire le immagini nella pagina html che hai realizzato.



A questo punto come vedete, anche se una parte del lavoro è stata realizzata senza scrivere neppure una riga di codice, il layout restituito da Claude non è proprio come l'originale.





**PROMPT 5**

Come puoi vedere, l'interfaccia che trovi nel pdf allegato e quella che hai realizzato non sono proprio la stessa cosa.
il cliente si è raccomandato di replicare fedelmente lo stile presente nel file PDF.
Cosa puoi fare in più a quello che hai già fatto?



Dopo questo prompt alcune cose sono migliorate ma ancora molto c'è da fare….A MANO



Proviamo a risolvere un paio di problemi macroscopici.

Primo problema: l'immagine di sfondo della sezione hero - lo stile delle scritte nella sezione hero - il problema del colore delle voci di menu che cambia per effetto della modifica della variabile var(--text)



**PROMPT 6**

Come puoi vedere, nel codice css ho modificato lo stile della variabile var(--text) che ha cambiato il colore delle voci di menu. Fai in modo che le voci di menu abbiano il colore precedente alla modifica



**PROMPT7**

OK per il colore dei link ma i testi nel box hero devono essere bianchi, puoi farlo?



**PROMPT8**

Ora una domanda complessa, vorrei sapere prima cosa ne pensi e come implementarla.

Nella parte in basso a destra della pagina vorrei inserire in modalità fixed un pulsante "Il tuo Agent Risponde".

Facendo clic su questo pulsante si apre una pagina con una textarea dove l'utente può fare all'agent domande su html, css e javascript.

L'agent deve poter consultare una serie di documenti caricati sugli argomenti e rispondere se nei documenti caricati è presente la risposta alla domanda posta, altrimenti deve dire a chi lo interroga "Spiacente ma su questo argomento non posso aiutarti":

Cosa mi consigli?



**PROMPT9**

Posso caricare anche file PDF?



**PROMPT10**

E' possibile fare tutto in locale come emulazione completa? 

Si, Verifico prima se Node.js è installato sulla macchina



Ora inizia a creare l'agent da interrogare.



Per testare l'emulazione

Step 1 — Apri agent/.env e inserisci la tua API key:





ANTHROPIC\_API\_KEY=sk-ant-api03-...

Step 2 — Avvia il backend (in un terminale separato):





cd agent

npm start

Vedrai: 🚀 Agent server avviato su http://localhost:3001



Step 3 — Apri index.html nel browser → in basso a destra trovi il pulsante "Il tuo Agent Risponde"



**PROMPT11**

Dove trovo la miaAPI key?



**Risposta**

La API key di Anthropic si trova (o si crea) sul sito ufficiale:



console.anthropic.com



Passi da seguire

Vai su console.anthropic.com e accedi (o registrati se non hai un account)

Dal menu laterale clicca su "API Keys"

Clicca "Create Key"

Dai un nome alla chiave (es. labforweb-agent)

Copia subito la chiave — viene mostrata una sola volta

La chiave ha questo formato:





sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxx

Incollala nel file .env:



ANTHROPIC\_API\_KEY=sk-ant-api03-la-tua-chiave-qui



**PROMPT12**

Con un credito di 5 USD quando richieste posso fare?

E con un credito di 20 USD?



**PROMPT13**

Cosa intendi per PDF piccoli? Da quante pagine circa deve essere formato?



**PROMPT14**

Come facciamo a fare in modo che tutto quello fanno finora insieme (chat, codice etc.) , sia condiviso anche su un'altra postazione dove mi loggo con lo stesso account Claude?



**Risposta**

Ti propongo di procedere così, in ordine:



Creare un repository GitHub e fare il primo push del progetto (il repository della scuola è su myCode)

Generare l'ONBOARDING.md con il riepilogo del progetto

Creare il link di condivisione da aprire sull'altra postazione



Link di condivisione del progetto

https://claude.ai/claude-code/onboard/r-QdGb46IWWy



Come usarlo sull'altra postazione

Installa Claude Code (estensione VS Code o app desktop)

Apri la cartella del progetto (dopo averla clonata da GitHub o copiata)

Apri questo link nel browser — Claude legge automaticamente il contesto

Sei pronto a continuare esattamente da dove avete lasciato

Cosa contiene l'ONBOARDING.md

Struttura completa di tutti i file

Descrizione di ogni sezione della pagina

Istruzioni per avviare il backend chat

Decisioni di design prese durante il lavoro

Prossimi step da completare (Git, Prompt Caching, documenti reali)

Tutti i dati del cliente

Ora puoi chiudere VS Code tranquillamente. 👍



**Per vedere tutto il progetto su una nuova postazione**
Sull'altra postazione, per iniziare



\# 1. Clona il progetto

git clone https://github.com/mycode-lfw/labforweb-coding-days.git



\# 2. Installa le dipendenze del backend

cd labforweb-coding-days/agent

npm install



\# 3. Crea il file .env con la API key

\# (copia .env.example e rinominalo .env)

Poi apri il link ONBOARDING in Claude Code e sei operativo.



**Per i prossimi aggiornamenti**

Ogni volta che modifichi dei file, dal terminale:



git add .

git commit -m "descrizione modifica"

git push





**PROMPT15**

come faccio ad aggiornare la view delle modifiche effettuate su un altra postazione?



**Risposta**

Sull'altra postazione, dopo aver clonato il progetto la prima volta, per ricevere gli aggiornamenti basta un solo comando:

git pull



**Regola pratica**

Azione	Comando

Ricevere aggiornamenti	git pull

Inviare modifiche	git add . → git commit -m "..." → git push

Consiglio: prima di iniziare a lavorare su qualsiasi postazione, esegui sempre git pull — così sei sicuro di avere l'ultima versione.



**PROMPT16**

Ora siamo pronti a rende funzionante l'agent.

Come procediamo?



**Riposta**

1\. Vai su console.anthropic.com → API Keys → crea una nuova chiave



2\. Apri il file agent/.env e sostituisci il contenuto con:





ANTHROPIC\_API\_KEY=sk-ant-api03-la-tua-chiave-reale

PORT=3001

3\. Riavvia il server:





\# ferma il server attuale (Ctrl+C nel terminale dove gira)

\# poi riavvia:

cd agent

npm start

Quando hai inserito la chiave reale, scrivimi "fatto" e verifico subito che tutto funzioni con un test completo. 🔑







**riga 89 file server.js**



const systemPrompt = `Sei un assistente specializzato di LABFORWEB, una scuola di formazione web.

Rispondi ESCLUSIVAMENTE in italiano.



REGOLA ASSOLUTA — LEGGI CON ATTENZIONE:

Puoi rispondere SOLO usando il testo contenuto nei DOCUMENTI DI RIFERIMENTO qui sotto.

È VIETATO usare qualsiasi conoscenza che non sia presente letteralmente in quei documenti.

È VIETATO aggiungere spiegazioni, esempi o dettagli non presenti nei documenti.

Se l'argomento non è trattato nei documenti, rispondi ESATTAMENTE con: "Spiacente ma su questo argomento non posso aiutarti"



PROCEDURA OBBLIGATORIA prima di rispondere:

1\. Cerca nei documenti il testo che risponde alla domanda.

2\. Se lo trovi, riporta SOLO ciò che c'è scritto, senza aggiungere nulla.

3\. Se non lo trovi, rispondi: "Spiacente ma su questo argomento non posso aiutarti"

