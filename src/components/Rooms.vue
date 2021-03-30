<template>
  <v-navigation-drawer
    app
  >
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.name"
        color="primary"
        @click="changeRoom(item.name)"
      >

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  protected items = [];

  mounted(): void {
    fetch('https://nane.tada.team/api/rooms')
      .then((stream) => stream.json())
      .then((res: { result: any }) => {
        this.items = res.result;
      });
  }

  private changeRoom(value: string): void {
    this.$store.commit('setSelectedRoom', value);
    this.$store.dispatch('changeMessages');
  }
}
</script>
