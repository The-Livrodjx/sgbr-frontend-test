<template>
  <q-layout view="lHh Lpr lFf">
    <div class="layout-container">
      <q-header elevated class="tw-bg-custom-blue">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            <q-img
              src="~assets/logo.png"
              spinner-color="white"
              style="height: 50px; max-width: 150px"
            />
          </q-toolbar-title>

          <div class="tw-flex tw-justify-center tw-items-center">
            <p>LUCAS ALEXANDRE</p>
            <q-img
              src="~assets/user.jpg"
              spinner-color="white"
              style="height: 30px; max-width: 30px"
              class="tw-rounded-full"
            />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        side="left"
        width="250px"
        class="tw-bg-second-custom-blue text-white"
      >
        <q-list class="tw-mt-14">
          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
            class="custom-qlist tw-rounded-full"
          />
        </q-list>
      </q-drawer>
    </div>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>



<script setup lang="ts">
import { ref } from "vue";
import EssentialLink, {
  EssentialLinkProps,
} from "components/EssentialLink.vue";

import { watch } from "vue";

const leftDrawerOpen = ref(false);

defineOptions({
  name: "MainLayout",
});

const linksList: EssentialLinkProps[] = [
  {
    title: "Home",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Favoritos",
    icon: "favorite",
    link: "/favoritos",
  },
  {
    title: "Categorias",
    icon: "category",
    link: "/categorias",
  },
  {
    title: "Sobre",
    icon: "record_voice_over",
    link: "/sobre",
  },
];

const url = ref("logo.png");

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.layout-container {
  position: relative;
}

.q-drawer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10; /* Garante que o drawer fique atrás do header */
}
</style>
