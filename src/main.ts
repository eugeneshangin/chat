import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import { SOCKET_ONOPEN, SOCKET_ONMESSAGE } from './types/mutations';

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONMESSAGE,
};

Vue.use(VueNativeSock, 'wss://nane.tada.team/ws?username=eugene', {
  store,
  mutations,
});

Vue.config.productionTip = false;
Vue.prototype.$socket = VueNativeSock;
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
