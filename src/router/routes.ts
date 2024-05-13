import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'favoritos', component: () => import('pages/FavoritosPage.vue') },
      { path: 'categorias', component: () => import('pages/CategoriasPage.vue')},
      {
        path: '/categorias/:nome',
        component: () => import('pages/CategoriaDetalhes.vue'),
        props: true
      },
      { path: 'sobre', component: () => import('pages/SobrePage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
