<template>
  <div class="d-flex align-baseline justify-space-between">
    <div class="flex-column">
      <div class="subtitle-1 green--text">
        {{ sender.username }}
      </div>
      <div> {{ text }}</div>
    </div>
    <div class="grey--text v-size--small">
      {{ dateFormatted }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ISender } from '@/types/InterfaceMessage';
import { getFormattedDate } from '@/utils/helpers';

/**
 * Компонент одного сообщения
 */
@Component
export default class Message extends Vue {
  @Prop({ default: { username: '' } })
  public readonly sender!: ISender;

  @Prop({ default: '' })
  public readonly text!: string;

  @Prop({ default: '' })
  public readonly createdText!: string;

  /**
   * Форматирует дату сообщения
   * @private
   */
  private get dateFormatted(): string {
    const date = new Date(this.createdText);
    return getFormattedDate(date);
  }
}
</script>
