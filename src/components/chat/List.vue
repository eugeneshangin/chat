<template>
  <div ref="listContainer">
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

@Component({
  components: {
    Message,
  },
})
export default class List extends Vue {
  @Prop({ default: '' })
  public readonly selectedRoom!: string;

  @Ref('listContainer')
  readonly container!: HTMLElement;

  @Watch('selectedRoom')
  watchSelectedRoom(): void {
    if (this.selectedRoom) {
      this.$store.dispatch(ACTION_SET_MESSAGES, this.selectedRoom);
    }
  }

  mounted(): void {
    if (this.selectedRoom) {
      this.$store.dispatch(ACTION_SET_MESSAGES, this.selectedRoom);
    }
  }

  updated(): void {
    this.$nextTick(() => {
      // this.container.scrollTop = this.container.scrollHeight;
      goTo(this.container.scrollHeight, { duration: 0 });
    });
  }
}
</script>
