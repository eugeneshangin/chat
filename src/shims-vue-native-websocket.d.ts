declare module 'vue-native-websocket' {
  import VueNativeSock from 'vue-native-websocket';

  import { PluginFunction } from 'vue';

  const install: PluginFunction<any>;
  module 'vue/types/vue' {
    interface Vue {
      $socket: VueNativeSock;
    }
  }

  export default install;
}
