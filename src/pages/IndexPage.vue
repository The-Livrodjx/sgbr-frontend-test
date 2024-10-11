<template>
  <q-page class="row items-center justify-evenly">
    <div
      class="tw-flex tw-flex-col tw-w-full tw-items-center tw-justify-center"
    >
      <div
        class="tw-inline-flex tw-items-center tw-w-full tw-rounded-lg tw-h-[40px] tw-mt-[10px] tw-mx-auto tw-max-w-[1270px] search tw-my-4"
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
        class="tw-w-full tw-flex tw-flex-wrap tw-justify-around tw-items-center tw-relative"
      >
        <div
          class="tw-w-[75%] tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative"
        >
          <div
            v-for="result in results"
            :key="result.id"
            class="tw-m-4 tw-max-w-sm tw-bg-white tw-rounded-lg tw-shadow-md tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-transform hover:tw-scale-105"
          >
            <div class="tw-relative tw-h-full">
              <p
                @click="toggleFavorite(result)"
                :class="{
                  'tw-cursor-pointer': !isFavorite(result),
                  'favorite': true,
                  'tw-absolute tw-top-2 tw-right-2 tw-text-red-500 tw-text-xl': true,
                }"
              >
                {{ isFavorite(result) ? "❤️" : "🖤" }}
              </p>
              <img
                :src="result.images.fixed_height.url"
                alt="Gif"
                class="tw-w-full tw-h-auto tw-object-cover tw-rounded-lg"
              />
            </div>
          </div>
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
      `https://api.giphy.com/v1/gifs/search?api_key=qlOtgIpI7nwVlSzeqxLb2YI0O3zsUjih&q=${encodeURIComponent(
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

.heart-icon::after {
  content: "🖤";
  color: black;
}
</style>
