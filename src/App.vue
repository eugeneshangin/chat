<template>
  <v-app>
    <bar />
    <rooms />
    <v-main>
      <main-page />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainPage from './components/chat/MainPage.vue';
import Bar from './components/Bar.vue';
import Rooms from './components/Rooms.vue';

@Component({
  components: {
    MainPage,
    Bar,
    Rooms,
  },
})
export default class App extends Vue {}
</script>
