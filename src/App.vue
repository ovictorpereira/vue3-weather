<template>
  <div class="app-container">
    <Loading v-if="loading" />
    <RouterView />
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import Loading from "@/components/Loading.vue";

import { useWeatherStore } from "@/stores/weather.js";
const weatherStore = useWeatherStore();

import { useRouter } from "vue-router";
const router = useRouter();

const loading = computed(() => weatherStore.loading);
const error = computed(() => weatherStore.error);

watch(error, (v) => {
  if (v) router.push("/");
});
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  padding: 1rem;
  display: flex;
  justify-content: center;
}
</style>