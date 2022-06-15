<template>
  <div class="home">
    <p>{{ error }}</p>
    <p>Enable location to see yours! :)</p>
    <button v-if="error" class="btn" @click="weatherStore.getLocation()">
      Try it again!
    </button>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useWeatherStore } from "@/stores/weather.js";
const router = useRouter();
const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.getLocation();
});

const currentWeather = computed(() => weatherStore.currentWeather);
watch(currentWeather, () => {
  router.push("/weather");
});

const error = computed(() => weatherStore.error);
</script>

<style lang="scss" scoped>
.home {
  background: rgb(99, 184, 209);
  background: linear-gradient(
    180deg,
    rgba(99, 184, 209, 1) 0%,
    rgba(63, 150, 176, 1) 100%
  );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: $fs-medium;
    margin-bottom: 20px;
    color: white;
  }
}
</style>