<template>
  <div class="d-flex flex-column align-content-space-between fill-height">
    <list />
    <v-text-field
      outlined
      label="Сообщение..."
      dense
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import List from './List.vue';

@Component({
  components: {
    List,
  },
})
export default class MainPage extends Vue {
}
</script>
