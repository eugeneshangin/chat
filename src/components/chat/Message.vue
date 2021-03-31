<template>
  <div class="d-flex align-baseline justify-space-between">
    <div class="flex-column">
      <div class="subtitle-1 green--text">{{ sender.username }}</div>
      <div> {{ text }}</div>
    </div>
    <div class="grey--text v-size--small">{{ dateFormatted }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ISender } from '@/types/InterfaceMessage';

@Component
export default class Message extends Vue {
  @Prop({ default: { username: '' } })
  public readonly sender!: ISender;

  @Prop({ default: '' })
  public readonly text!: string;

  @Prop({ default: '' })
  public readonly createdText!: string;

  private get dateFormatted(): string {
    const date = new Date(this.createdText);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const hoursText = hours < 10 ? `0${hours}` : hours;
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    return date ? `${hoursText}:${minutesText}` : '';
  }
}
</script>
