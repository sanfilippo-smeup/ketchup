# KetchUP Monorepo

Show case realizzato con Vue CLI.

Componenti realizzati con Stencil.js.

## Setup progetto

#### 1. Scaricare il progetto

Scaricare il progetto da GitHub in locale ed aprire un terminale nella sua root.
Nota: il terminale deve avere accesso ai comandi di Git per funzionare.

#### 2. Yarn
Il primo passaggio è quello di essere sicuri di avere Yarn come package manager per Node installato sulla propria macchina.

Seguire la [guida per l'installazione](https://yarnpkg.com/lang/en/docs/install/) e poi lanciare:
```
yarn -v
``` 

#### 3. Lerna

Installare Lerna nel progetto. Sempre dalla root di progetto lanciare:
```
yarn install
```

In questo modo Lerna viene installato come dipendenza del progetto
e si può evitare di installarlo globalmente.

A questo punto lanciare:
```
lerna bootstrap
```
Questo comando potrebbe impiegarci un po' di tempo.
Installerà le dipendenze di tutti i progetti dentro la cartella 'packages'
e provvederà a fare il SymLink dei pacchetti del monorepo che sono uno dipendenza dell'altro.

In questo progetto, Lerna è configurato in modalità independente, permettendo di aggiornare
o cambiare a piacimento le dipendenze dei vari pacchetti. 

#### 4. Sviluppare

I comandi contenuti nei package.json dei progetti dentro alla cartella packages sono
eseguibili da Lerna.

Per vedere quali comandi sono disponibili, aprire il package.json nella root all voce 'scripts'.
Sono lanciabili tramite Yarn.

Maggiori dettagli sui comandi si trovano nei readme dei progetti.