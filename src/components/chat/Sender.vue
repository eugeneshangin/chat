<template>
  <v-text-field
    v-if="$store.state.selectedRoom"
    v-model="message"
    hide-details
    autofocus
    outlined
    :rules="rules"
    placeholder="Сообщение..."
    dense
    @keydown="sendMessage"
  />
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { limitHandler } from '@/utils/helpers';

@Component
export default class Sender extends Vue {
  // текущее сообщение
  private message = '';

  // валидатор для отправки сообщения
  private rules = [
    limitHandler(this.$store.state.settings.max_message_length || 2000),
  ];

  /**
   * Обработчик отправки сообщения
   * @param event события клавиатуры
   * @private
   */
  private sendMessage(event: KeyboardEvent): void {
    // отправляем только если нажали ентер и если соответствует разрешенной длинне
    if (event.code === 'Enter'
      && this.message.length < this.$store.state.settings.max_message_length) {
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
