<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div
      class="tw-w-full tw-flex tw-flex-col tw-justify-around tw-items-start tw-relative"
      v-else
    >
      <div class="tw-ml-56">
        <h1 class="tw-font-bold tw-text-2xl tw-mb-4">
          Lista de Categorias de GIF´s
        </h1>
        <ul>
          <li v-for="(post, index) in categories" :key="post.id">
            <span>{{ index + 1 }} . </span>
            <router-link
              :to="'/categorias/' + post.name_encoded"
              class="favorite tw-transition-all tw-text-xl tw-duration-300 tw-ease-in-out hover:tw-transform hover:tw-text-2xl"
              >{{ post.name }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavoriteStore } from "stores/favorites";

export default {
  setup() {
    const store = useFavoriteStore();
    const { add } = store;

    return {
      add,
    };
  },
  data() {
    return {
      loading: false,
      error: null,
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          "https://api.giphy.com/v1/gifs/categories?api_key=qlOtgIpI7nwVlSzeqxLb2YI0O3zsUjih"
        );
        this.categories = response.data.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
