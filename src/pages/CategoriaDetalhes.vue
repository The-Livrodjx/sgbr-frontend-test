<template>
  <router-link :to="'/categorias/'">
    <q-icon
      name="arrow_back"
      class="tw-ml-8 tw-cursor-pointer tw-p-4 tw-text-lg"
    />
  </router-link>
  <q-page class="row items-center justify-evenly tw-mt-4">
    <div
      v-for="post in results"
      :key="post.id"
      class="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-relative tw-gap-[10px]"
    >
      <div class="tw-m-4">
        <img :src="post.images.fixed_height.url" alt="Gif" />
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
      `https://api.giphy.com/v1/gifs/search?api_key=A7gVVIXdmh60aBjs6V6V5C104kbb19JU&q=${route.params.nome}&category=${route.params.nome}&limit=10`
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
