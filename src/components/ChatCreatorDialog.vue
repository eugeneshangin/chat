<template>
  <v-card class="fill-height overflow-y-auto">
    <v-card-title>
      Создание чата
    </v-card-title>
    <v-form
      ref="form"
      lazy-validation
    >
      <div class="mx-3">
        <v-text-field
          v-model="chatName"
          :rules="nameRules"
          label="Название комннаты"
          outlined
        />
        <v-text-field
          v-model="firstMessage"
          :rules="messageRules"
          label="Первое сообщение"
          outlined
        />
      </div>
      <v-card-actions>
        <v-btn
          text
          outlined
          @click="closeDialog"
        >
          Отменить
        </v-btn>
        <v-spacer />
        <v-btn
          text
          outlined
          @click="saveChat"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Ref } from 'vue-property-decorator';
import { limitHandler } from '@/utils/helpers';

/**
 * Компонент диалога создания комнаты
 */
@Component
export default class ChatCreatorDialog extends Vue {
  // имя комнаты
  private chatName = '';

  // текст первого сообщения
  private firstMessage = '';

  @Ref('form')
  readonly form!: { validate: () => boolean };

  // валидатор на обязательность поля
  private requiredFieldValidator =
    (v: StaticRange | number): boolean | string => !!v || v === 0 || 'Обязательное поле';

  // валидатор для обязательных полей
  private nameRules = [
    this.requiredFieldValidator,
    limitHandler(this.$store.state.settings.max_room_title_length || 0),
  ];

  // валидаторы для сообщения
  private messageRules = [
    this.requiredFieldValidator,
    limitHandler(this.$store.state.settings.max_message_length || 0),
  ];

  /**
   * Обработчик сохранения сущности новой комнаты
   * @private
   */
  private saveChat(): void {
    // провалидируем форму
    const isValid = this.form.validate();
    // если все поля заполнены как надо продолжаем сохранения
    if (isValid) {
      const data = {
        room: this.chatName,
        text: this.firstMessage,
      };
      // отправляем сообщение чтобы комната создалась
      this.$socket.send(JSON.stringify(data));
      this.closeDialog();
    }
  }

  /**
   * Обработчик закрытия диалога
   * @private
   */
  private closeDialog(): void {
    this.$emit('close');
  }
}
</script>
