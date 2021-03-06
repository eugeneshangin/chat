import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import { SOCKET_ONOPEN, SOCKET_ONMESSAGE, SOCKET_ONCLOSE } from './types/mutations';

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONMESSAGE,
  SOCKET_ONCLOSE,
};

Vue.use(VueNativeSock, process.env.VUE_APP_WS_DEFAULT, {
  store,
  mutations,
});

Vue.config.productionTip = false;
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
