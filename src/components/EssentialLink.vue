<template>
  <!-- @todo fazer active link -->
  <router-link :to="link" class="tw-flex tw-gap-[2px] tw-py-4 tw-px-8"
    ><q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    {{ title }}</router-link
  >
</template>

<script setup lang="ts">
defineOptions({
  name: "EssentialLink",
});

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: "",
  link: "",
  icon: "",
});
</script>
