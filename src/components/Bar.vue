<template>
  <v-system-bar
    height="50px"
    app
    color="blue"
  >
    <div
      class="d-flex justify-lg-space-between"
      style="width: 100%"
    >
      <div class="title">
        TeleEugen
      </div>
      <v-btn
        text
        @click="showDialog"
      >
        Создать комнату
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <chat-creator-dialog @close="closeDialog" />
      </v-dialog>
    </div>
  </v-system-bar>
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
  private dialog = false;

  private showDialog(): void {
    this.dialog = true;
  }

  private closeDialog(): void {
    this.dialog = false;
  }
}
</script>
