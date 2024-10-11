<template>
  <div class="tw-w-full tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative">
  <div v-if="loading">Carregando...</div>
  <div v-else-if="error">{{ error }}</div>
  <div
    class="tw-w-[75%] tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-relative"
    v-else
  >
    <div
      v-for="post in posts" :key="post.id"
      class="tw-m-4 tw-max-w-sm tw-bg-white tw-rounded-lg tw-shadow-md tw-transition-all tw-duration-300 tw-ease-in-out hover:tw-transform hover:tw-scale-105"
    >
      <div class="tw-relative tw-h-full">
        <img
          :src="post.images.fixed_height.url"
          class="tw-w-full tw-h-auto tw-object-cover tw-rounded-lg"
        />

        <p
          @click="toggleFavorite(post)"
          :class="{
            'tw-cursor-pointer': !isFavorite(post),
            'favorite': true,
            'tw-absolute tw-top-2 tw-right-2 tw-text-red-500 tw-text-xl': true
          }"
        >
          {{ isFavorite(post) ? "❤️" : "🖤" }}
        </p>
      </div>
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
          "https://api.giphy.com/v1/gifs/trending?api_key=qlOtgIpI7nwVlSzeqxLb2YI0O3zsUjih&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
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

.heart-icon::after {
  content: "🖤";
  color: black;
}
</style>
