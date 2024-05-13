<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div
      class="tw-flex tw-flex-col tw-justify-around tw-items-center tw-relative"
      v-else
    >
      <div v-for="post in categories" :key="post.id">
        <router-link :to="'/categorias/' + post.name_encoded" class="favorite">{{ post.name }}</router-link>
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
          "https://api.giphy.com/v1/gifs/categories?api_key=A7gVVIXdmh60aBjs6V6V5C104kbb19JU"
        );
        this.categories = response.data.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
