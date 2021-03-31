<template>
  <v-list
    dense
  >
    <v-list-item-group>
      <template v-for="(item, index) in $store.state.rooms">
        <v-list-item
          :key="index+item.name"
          flat
          color="primary"
          @click="changeRoom(item.name)"
        >
          <v-list-item-content class="d-flex">
            <div class="d-flex flex-nowrap overflow-hidden room-info">
              <v-list-item-title
                class="black--text"
              >
                {{ item.name }}
              </v-list-item-title>
              <div
                v-if="item.countNewMessage"
                class="room-unread-message d-flex align-center justify-center"
              >
                {{ item.countNewMessage }}
              </div>
            </div>
            <div class="d-flex flex-nowrap overflow-hidden align-baseline">
              <v-list-item-subtitle>
                {{ item.last_message.text }}
              </v-list-item-subtitle>
              <div class="grey--text room-message-date">
                {{ getMessageDate(item.last_message.created) }}
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index < countRooms - 1"
          :key="index"
        />
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ACTION_SET_ROOMS } from '@/types/actions';
import { SET_SELECTED_ROOM } from '@/types/mutations';
import { getFormattedDate } from '@/utils/helpers';

/**
 *  Компонент список комнат
 */
@Component
export default class Navigation extends Vue {
  mounted(): void {
    this.$store.dispatch(ACTION_SET_ROOMS);
  }

  /**
   * Свойство определяющее текущее кол-во комнат
   * @private
   */
  private get countRooms(): number {
    return this.$store.state.rooms.length;
  }

  /**
   * Обработчик форматирования даты
   * @param dateStr дата последнего сообщения
   * @private
   */
  private getMessageDate(dateStr: string): string {
    return getFormattedDate(new Date(dateStr));
  }

  /**
   * Обработчик перевыбора комнаты
   * @param value имя новой комнаты
   * @private
   */
  private changeRoom(value: string): void {
    this.$store.commit(SET_SELECTED_ROOM, value);
  }
}
</script>
<style lang="less" scoped>
.room-unread-message {
  color: white;
  font-size: 12px;
  font-weight: bold;
  background-color: lightgray;
  border-radius: 13px;
  height: 20px;
  width: 20px;
}

.room-info {
  height: 24px;
}

.room-message-date {
  font-size: 12px;
  white-space: nowrap;
}
</style>
