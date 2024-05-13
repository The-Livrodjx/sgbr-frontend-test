<template>
  <q-page class="row items-center justify-evenly">
    <div
      class="tw-flex tw-flex-col tw-w-full tw-items-center tw-justify-center"
    >
      <div
        class="tw-inline-flex tw-items-center tw-w-full tw-h-[40px] tw-mt-[10px] tw-mx-auto tw-max-w-[1270px] search tw-my-4"
      >
        <q-icon name="search" class="tw-mx-2" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar gifs..."
          class="tw-p-1 tw-b-1 tw-m-4 tw-outline-none tw-w-full"
          style="background: #ebebf0"
        />
      </div>

      <div
        v-if="results.length > 0"
        class="tw-flex tw-flex-wrap tw-justify-around tw-items-center tw-relative"
      >
        <div v-for="result in results" :key="result.id">
          <p
            @click="toggleFavorite(result)"
            :class="{
              'favorite tw-cursor-pointer': !isFavorite(result),
              'heart-icon': isFavorite(result),
            }"
          >
            {{ isFavorite(result) ? "" : "Adicionar aos Favoritos" }}
          </p>
          <img :src="result.images.fixed_height.url" alt="Gif" />
        </div>
      </div>
    </div>
    <component :is="GraphyComponent"></component>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "axios";
import GraphyComponent from "components/GraphyComponent.vue";
import { useFavoriteStore } from "stores/favorites";

defineOptions({
  name: "IndexPage",
});

const searchQuery = ref("");
const results: any = ref([]);
const store = useFavoriteStore();
const { add } = store;

const favorites: any = ref([]);

const fetchGifs = async () => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=A7gVVIXdmh60aBjs6V6V5C104kbb19JU&q=${encodeURIComponent(
        searchQuery.value
      )}&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    results.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

watchEffect(fetchGifs);

fetchGifs();

const toggleFavorite = (result: any) => {
  const index = favorites.value.findIndex((f: any) => f.id === result.id);
  if (index == -1) {
    add({
      id: result.id,
      title: result.title,
      image: result.images.fixed_height.url,
    });
    favorites.value.push({ ...result });
  }
};

const isFavorite = (result: any) =>
  favorites.value.some((f: any) => f.id === result.id);
</script>

<style scoped>
/* Estilo para o ícone de coraçãozinho */
.heart-icon::after {
  content: "❤️";
  color: red;
}
</style>
