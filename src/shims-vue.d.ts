import VueNativeSock from 'vue-native-websocket';

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;

  interface Vue {
    $socket: VueNativeSock
  }
}
