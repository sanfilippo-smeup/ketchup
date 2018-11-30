# test-scaffhold-vue
Libreria Vue.js  con supporto Typescript scaffhold test.

# Per modificare

Scaricare il progetto da Git e lanciare
```
yarn install
```
Controllare di avere installata globalmente la Vue CLI
```
vue --version
```
Altrimenti installarla con
 ```
yarn global add @vue/cli
```
e lanciare il server di development con
 ```
 yarn serve
 ```

# Usare la libreria
### 1 - Installare la libreria
Spostarsi in un terminale con accesso a Git e lanciare
 ```
 // yarn o npm vanno bene
 yarn add https://github.com/smeup/ketchup#test-scaffhold-vuecli
 ```

### 2 - Consumare la libreria
Nel file main ts (o js) dove Vue viene configurato

```
// Libreria intera - Va bene sia per ts che per js
import TestScaffholdVue from 'ketchup-test-scaffhold-vuecli';
// Registra la libreria
Vue.use(TestScaffholdVue);

// Singolo componente in formato js
import 'test-scaffhold-vue/dist/KetchUP.css';
import CustomKInput from 'ketchup-test-scaffhold-vuecli/lib/KInput/k-input.common.js';

/* 
 * Singolo componente in ts
 * import KInput from 'ketchup-test-scaffhold-vuecli/src/components/KInput';
 * Vue.component('custom-k-input', KInput);
 */

// Registra il singolo componente
Vue.component('custom-k-input', CustomKInput);
```

N.B. Attualmente, per prova, ho inserito solamente un file index.ts nella cartella del componente KInput.
Per questo motivo, facendo l'import standard di TS, il componente viene correttametne importato.
Per importare k-label à la carte è necessario fare riferimento al file .vue:
```
import KInput from 'ketchup-test-scaffhold-vuecli/src/components/KLabel/KLabel.vue';
```

### 3 - Utilizzare i componenti

Ci sono due piccoli componenti di prova:
```
// Nomi di default
<k-input kname="nomino" v-model="theValue"/>
<k-label :message="theValue"/>

// Nome custom associato durante la registrazione
<custom-k-input kname="normale" v-model="theOtherValue"/>
```

# Progetto originale

Se quanto detto sopra dovesse dare errori, provare con il progetto originale, adattando i passaggi di volta in volta.

https://github.com/SirAuron/test-scaffhold-vue