<template>
  <v-app>
    <v-system-bar
      height="50px"
      app
      color="blue"
    >
      <bar />
    </v-system-bar>
    <v-navigation-drawer
      app
      permanent
    >
      <rooms />
    </v-navigation-drawer>
    <v-main>
      <chat-page />
    </v-main>
    <v-footer
      app
      inset
      height="50px"
      color="white"
    >
      <sender />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatPage from './components/chat/ChatPage.vue';
import Bar from './components/Bar.vue';
import Rooms from './components/Rooms.vue';
import Sender from './components/chat/Sender.vue';

@Component({
  components: {
    ChatPage,
    Bar,
    Rooms,
    Sender,
  },
})
export default class App extends Vue {
  beforeDestroy(): void {
    // закрываем соккет
    this.$socket.close();
  }
}
</script>
