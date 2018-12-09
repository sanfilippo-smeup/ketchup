# KetchUP - Showcase

## Project setup
Vedi README.md generale del repository 

Essendo stato creato con la Vue-CLI, se ne ha a disposizione tutti gli strumenti.

Per aggiungere dei pacchetti, utilizzare Yarn come se fosse un normale progetto che non utilizza lerna.

Per essere sicuri che i cambiamenti apportati nei componenti di KetchUP vengano riflessi dentro allo show case,
trattandosi di un symlink effettuato da Lerna, lanciare dalla root del progetto il comando:
```
lerna bootstrap
```

## Scripts
Lista dei comandi scripts disponibili nel package.json.

Tali comandi sono lanciabili anche dalla root del progetto tramite il proprio package manager.
Il prefisso per questi comandi è 'kup:'. Esempio:
```
yarn run kup:serve
```

### Comandi

Compiles and hot-reloads for development
```
yarn run serve
```

Compiles and minifies for production
```
yarn run build
```

Run your tests
```
yarn run test
```

Lints and fixes files
```
yarn run lint
```

Run your end-to-end tests
```
yarn run test:e2e
```

Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
