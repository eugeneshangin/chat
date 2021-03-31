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
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatPage from './components/chat/ChatPage.vue';
import Bar from './components/Bar.vue';
import Rooms from './components/Rooms.vue';

@Component({
  components: {
    ChatPage,
    Bar,
    Rooms,
  },
})
export default class App extends Vue {}
</script>
