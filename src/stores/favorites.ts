import { defineStore } from 'pinia';

import { LocalStorage } from 'quasar';

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as any[],
  }),
  actions: {
    loadFavorites() {
      const storedFavorites: any = LocalStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites = storedFavorites;
        console.log(this.favorites);
        return this.favorites;
      }
    },
    add(newFavorite: any) {
      let previousFavorites: any = LocalStorage.getItem('favorites');
      if (!previousFavorites) {
        LocalStorage.set('favorites', [newFavorite]);
      } else {
        let parsedFavorites = previousFavorites;
        // Se o id não existir, adiciona newFavorite à lista
        if (!parsedFavorites.some((favorite: any) => favorite.id === newFavorite.id)) {
          parsedFavorites.push(newFavorite);
        }
        LocalStorage.set('favorites', parsedFavorites);
      }

      this.favorites.push(newFavorite);
    },
    remove(id?: string) {
      let favorites: any = LocalStorage.getItem('favorites');
      if (favorites) {
        let parsedFavorites = favorites;
        let filteredFavorites = parsedFavorites.filter((favorite: any) => favorite.id!= id);
        LocalStorage.set('favorites', filteredFavorites);

        this.favorites = filteredFavorites;
      }
    }
  },
});
