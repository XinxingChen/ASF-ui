import Vue from 'vue';

import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWrench, faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWrench, faHome, faTachometerAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
});