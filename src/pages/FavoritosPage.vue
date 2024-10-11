<template>
  <q-page class="row items-center">
    <div class="tw-w-full text-center" v-if="!favorites || favorites.length === 0">Nenhum gif favoritado</div>
    <div
      class="tw-w-full tw-flex tw-min-h-[100vh] tw-flex-wrap tw-items-start tw-justify-center tw-relative"
    >
      <div
        class="tw-w-[75%] tw-flex tw-flex-wrap tw-items-center tw-relative"
      >
        <div v-for="(favorite, index) in favorites" :key="index">
          <div class="tw-relative tw-m-4 tw-max-w-sm tw-bg-white tw-rounded-lg tw-shadow-md tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-transform hover:tw-scale-105">
            <p
              @click="removeFromFavorites(favorite.id)"
              class="favorite tw-cursor-pointer tw-absolute tw-top-2 tw-right-2 tw-text-red-500 tw-text-xl"
            >
              ❌
            </p>
            <img :src="favorite.image" class="tw-max-w-[250px] tw-w-full tw-h-auto tw-object-cover tw-rounded-lg" />
          </div>
        </div>
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
