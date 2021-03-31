<template>
  <div
    class="d-flex justify-lg-space-between bar"
  >
    <div class="title">
      EugeneChat
    </div>
    <div class="title white--text bar__room">
      {{ $store.state.selectedRoom }}
    </div>
    <v-btn
      text
      @click="showDialog"
    >
      Создать комнату
    </v-btn>
    <v-dialog
      v-if="dialog"
      v-model="dialog"
      max-width="290"
    >
      <chat-creator-dialog @close="closeDialog" />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ChatCreatorDialog from './ChatCreatorDialog.vue';

@Component({
  components: {
    ChatCreatorDialog,
  },
})
export default class Bar extends Vue {
  // определяет видимость диалога создания
  private dialog = false;

  /**
   * Обработчик октрытия диалога создания комнаты
   * @private
   */
  private showDialog(): void {
    this.dialog = true;
  }

  /**
   * Обработчик закрытия диалога создания комнаты
   * @private
   */
  private closeDialog(): void {
    this.dialog = false;
  }
}
</script>
<style lang="less" scoped>
.bar {
  width: 100%;

  &__room {
    white-space: nowrap;
    overflow: hidden;
    max-width: 300px;
    text-overflow: ellipsis;
  }
}
</style>
