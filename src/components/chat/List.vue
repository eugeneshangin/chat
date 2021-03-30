<template>
  <v-list
    dense
    nav
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
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Message from './Message.vue';

@Component({
  components: {
    Message,
  },
})
export default class List extends Vue {
}
</script>
