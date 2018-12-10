import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { defineCustomElements } from 'ketchup/dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/[kup|app]-\w*/];

defineCustomElements(window);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
