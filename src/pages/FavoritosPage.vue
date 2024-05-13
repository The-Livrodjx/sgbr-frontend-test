<template>
  <q-page class="row items-center">
    <div v-if="!favorites || favorites.length === 0">Nenhum gif favoritado</div>
    <div
      v-for="(favorite, index) in favorites"
      :key="index"
      class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative"
    >
      <div class="tw-m-4">
        <p @click="removeFromFavorites(favorite.id)" class="favorite tw-cursor-pointer">Remover dos Favoritos</p>
        <img :src="favorite.image" class="tw-max-w-[250px]" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useFavoriteStore } from "stores/favorites";

defineOptions({
  name: "FavoritosPage",
});

const store = useFavoriteStore();
const { remove, loadFavorites } = store;

const favorites = ref(loadFavorites());

const removeFromFavorites = (id: string) => {
  remove(id);
  favorites.value = loadFavorites();
};

onMounted(() => {
  favorites.value = loadFavorites();
});
</script>
