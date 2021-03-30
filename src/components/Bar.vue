<template>
  <v-system-bar
    height="50px"
    app
    color="blue"
  >
    <div class="d-flex justify-lg-space-between">
      <div class="title">
        Чат
      </div>
    </div>
  </v-system-bar>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Bar extends Vue {
}
</script>
