<template>
  <div ref="listContainer">
    <!-- TODO: нужно использовать virtual scroll -->
    <v-list
      dense
      nav
      class="scroll-y-reverse-transition-move"
    >
      <v-list-item
        v-for="(item, index) in $store.state.messages"
        :key="index"
        color="primary"
      >
        <v-list-item-content>
          <message
            :sender="item.sender"
            :text="item.text"
            :created-text="item.created"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import goTo from 'vuetify/es5/services/goto';
import {
  Component, Prop, Ref, Watch,
} from 'vue-property-decorator';
import { ACTION_SET_MESSAGES } from '@/types/actions';
import Message from './Message.vue';

/**
 * Компонент со списком сообщений
 */
@Component({
  components: {
    Message,
  },
})
export default class List extends Vue {
  // текущая выбранная комната
  @Prop({ default: '' })
  public readonly selectedRoom!: string;

  @Ref('listContainer')
  readonly container!: HTMLElement;

  /**
   * Вотчер отслеживающий изменения выбранной комнаты
   * загружает список сообщений
   */
  @Watch('selectedRoom')
  private watchSelectedRoom(): void {
    this.getMessages();
  }

  private mounted(): void {
    this.getMessages();
  }

  private updated(): void {
    // подскроливаем к коцнцу после того как контейнер расчитает свою высоту
    this.$nextTick(() => {
      goTo(this.container.scrollHeight, { duration: 0 });
    });
  }

  private getMessages(): void {
    // грузим сообщения только если выбранная какая то комната
    if (this.selectedRoom) {
      this.$store.dispatch(ACTION_SET_MESSAGES, this.selectedRoom);
    }
  }
}
</script>
