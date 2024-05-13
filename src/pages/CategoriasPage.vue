<template>
  <q-page class="row items-center justify-center">
    <component :is="ShowCategoriesComponent"></component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ShowCategoriesComponent from "components/ShowCategoriesComponent.vue";

defineOptions({
  name: 'FavoritosPage'
});

</script>
