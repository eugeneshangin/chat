<template>
  <div
    :class="!$store.state.selectedRoom ? 'd-flex align-center justify-center' : ''"
    class="main-page__fullHeight"
  >
    <div
      v-if="$store.state.selectedRoom"
      class="d-flex flex-column main-page__fullHeight"
    >
      <list
        :selected-room="$store.state.selectedRoom"
        class="main-page__fullHeight"
      />
      <v-text-field
        v-model="message"
        outlined
        placeholder="Сообщение..."
        dense
        hide-details
        @keydown="sendMessage"
      />
    </div>
    <div
      v-else
      class="grey--text"
    >
      Выберите, кому хотели бы написать
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ACTION_SET_SETTINGS } from '@/types/actions';
import List from './List.vue';

@Component({
  components: {
    List,
  },
})
export default class MainPage extends Vue {
  private message = '';

  mounted(): void {
    this.$store.dispatch(ACTION_SET_SETTINGS);
  }

  private sendMessage(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      const data = {
        room: this.$store.state.selectedRoom,
        text: this.message,
      };
      this.$socket.send(JSON.stringify(data));
      this.message = '';
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  &__fullHeight {
    height: 100%;
  }
}
</style>
