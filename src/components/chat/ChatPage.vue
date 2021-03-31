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

/**
 * Основной компонент чата в комнате
 */
@Component({
  components: {
    List,
  },
})
export default class ChatPage extends Vue {
  // текущее сообщение
  private message = '';

  mounted(): void {
    // получаем список настроек и сохраняем в store
    this.$store.dispatch(ACTION_SET_SETTINGS);
  }

  /**
   * Обработчик отправки сообщения
   * @param event события клавиатуры
   * @private
   */
  private sendMessage(event: KeyboardEvent): void {
    // отправляем только если нажали ентер
    if (event.code === 'Enter') {
      // формируем дату для сообщения
      const data = {
        room: this.$store.state.selectedRoom,
        text: this.message,
      };
      // отправляем сообщение
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
