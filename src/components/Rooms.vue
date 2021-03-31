<template>
  <v-navigation-drawer
    app
  >
    <v-list
      dense
    >
      <v-list-item-group>
        <template v-for="(item, index) in $store.state.rooms">
          <v-list-item
            :key="item.name"
            flat
            color="primary"
            @click="changeRoom(item.name)"
          >
            <v-list-item-content class="d-flex">
              <div class="d-flex">
                <v-list-item-title
                  class="black--text"
                >
                  {{ item.name }}
                </v-list-item-title>
                <div
                  v-if="item.countNewMessage"
                  class="grey--text"
                >
                  {{ item.countNewMessage }}
                </div>
              </div>
              <v-list-item-subtitle>
                {{ item.last_message.text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index < countRooms - 1"
            :key="index"
          />
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ACTION_SET_ROOMS } from '@/types/actions';
import { SET_SELECTED_ROOM } from '@/types/mutations';

@Component
export default class Navigation extends Vue {
  mounted(): void {
    this.$store.dispatch(ACTION_SET_ROOMS);
  }

  private get countRooms(): number {
    return this.$store.state.rooms.length;
  }

  private changeRoom(value: string): void {
    this.$store.commit(SET_SELECTED_ROOM, value);
  }
}
</script>
