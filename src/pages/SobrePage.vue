<template>
  <q-page class="row items-center tw-justify-center tw-flex-col tw-gap-[10px]">
    <q-img
      src="~assets/me.png"
      spinner-color="white"
      style="height: 200px; max-width: 200px"
      class="tw-rounded-full"
    />

    <p class="tw-w-[350px] tw-text-center">Meu nome é Lucas Alexandre, eu tenho 22 anos de idade e trabalho como programador desde os 18. Comecei a programar com aproximadamente 16 anos e entrei no mercado de trabalho por meio dos freelances, já passei por algumas poucas empresas e todas me trouxeram aprendizados e lições de como me tornar um profissional mais dedicado, preciso e consistente.</p>
    <p class="tw-w-[350px] tw-text-center">O propósito pelo qual realizei o teste foi pela sinergia que possuo com as stacks (principalmente Typescript e Vue) e também pela sinergia que acredito que terei com a empresa SGBR.</p>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "FavoritosPage",
});
</script>
