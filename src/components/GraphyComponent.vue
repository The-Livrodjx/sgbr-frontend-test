<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div
      class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative"
      v-else
    >
      <div v-for="post in posts" :key="post.id" class="tw-m-4">
        <p
          @click="toggleFavorite(post)"
          :class="{
            'tw-cursor-pointer': !isFavorite(post),
            'heart-icon': isFavorite(post),
            'favorite': true
          }"
        >
          {{ isFavorite(post) ? "" : "Adicionar aos Favoritos" }}
        </p>
        <img :src="post.images.fixed_height.url" class="tw-max-w-[250px]" />
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
      posts: [],
      favorites: [],
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          "https://api.giphy.com/v1/gifs/trending?api_key=A7gVVIXdmh60aBjs6V6V5C104kbb19JU&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
        );
        console.log(response.data.data);
        this.posts = response.data.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    // @todo: persistir os favoritos e manter o coraçãozinho
    toggleFavorite(post) {
      const index = this.favorites.indexOf(post.id);
      if (index == -1) {
        this.add({
          id: post.id,
          title: post.title,
          image: post.images.fixed_height.url,
        });
        this.favorites.push(post.id);
      }
    },
    isFavorite(post) {
      return this.favorites.includes(post.id);
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
<style scoped>
/* Estilo para o ícone de coraçãozinho */
.heart-icon::after {
  content: "❤️";
  color: red;
}
</style>
