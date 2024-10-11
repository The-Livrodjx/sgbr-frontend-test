<template>
  <router-link :to="'/categorias/'" class="tw-absolute tw-top-[6%] tw-left-[15%] tw-zindex-[999]">
    <q-icon
      name="arrow_back"
      class="tw-ml-8 tw-cursor-pointer tw-text-lg"
    />
  </router-link>
  <q-page class="row items-center justify-evenly tw-mt-4">
    <div
      class="tw-w-[75%] tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative"
    >
      <div
        v-for="post in results"
        :key="post.id"
        class="tw-m-4 tw-max-w-sm tw-bg-white tw-rounded-lg tw-shadow-md tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-transform hover:tw-scale-105"
      >
        <div class="tw-m-4">
          <img :src="post.images.fixed_height.url" alt="Gif" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "CategoriaDetalhes",
});
const route = useRoute();

const results = ref([]);
const error = ref("");
const isLoading = ref(false);
const nomeCategoria = computed(() => route.params.nome);
const fetchCategoryGifs = async () => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=qlOtgIpI7nwVlSzeqxLb2YI0O3zsUjih&q=${route.params.nome}&category=${route.params.nome}&limit=10`
    );
    results.value = response.data.data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

fetchCategoryGifs();
</script>
