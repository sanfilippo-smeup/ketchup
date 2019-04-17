import Vue from 'vue';
import App from './App.vue';

import { defineCustomElements } from 'ketchup/dist/loader';
defineCustomElements(window);

//import Matrix from '../../ketchup-vue/src/components/smeup/MAT.vue'
//Vue.component('MAT', Matrix)
//import KetchupVue from "ketchup-vue";
//Vue.use(KetchupVue);

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/[ketchup|app]-\w*/];

new Vue({
  render: h => h(App),
}).$mount('#app');
