<template>
  <q-page>
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
