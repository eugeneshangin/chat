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
import { MUTATION_ADD_ROOM } from '@/types/mutations';

@Component
export default class ChatCreatorDialog extends Vue {
  private chatName = '';

  private firstMessage = '';

  @Ref('form')
  readonly form!: { validate: () => boolean };

  // валидатор на обязательность поля
  private requiredFieldValidator =
    (v: StaticRange | number): boolean | string => !!v || v === 0 || 'Обязательное поле';

  // валидатор на заданный лимит символов
  private limitHandler = (limit: number): (v: string) => string | boolean => (v: string) => (
    v.length <= limit || `Превышает лимит в ${limit} символов`)

  // валидатор для обязательных полей
  private nameRules = [
    this.requiredFieldValidator,
    this.limitHandler(this.$store.state.settings.max_room_title_length || 0),
  ];

  private messageRules = [
    this.requiredFieldValidator,
    this.limitHandler(this.$store.state.settings.max_message_length || 0),
  ];

  private saveChat(): void {
    const isValid = this.form.validate();
    if (isValid) {
      const data = {
        room: this.chatName,
        text: this.firstMessage,
      };
      this.$socket.send(JSON.stringify(data));
      this.$store.commit(MUTATION_ADD_ROOM, {
        last_message: {
          text: this.firstMessage,
        },
        name: this.chatName,
        countNewMessage: 0,
      });
      this.closeDialog();
    }
  }

  private closeDialog(): void {
    this.$emit('close');
  }
}
</script>
