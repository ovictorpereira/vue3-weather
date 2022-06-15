<template>
  <div class="weather-card" :class="isDayTime ? 'day' : 'night'">
    <i
      class="refresh bi bi-arrow-repeat"
      @click="weatherStore.getLocation()"
    ></i>

    <h2 id="city-name" class="fw-bold">
      {{ currentWeather.name.toUpperCase() }}
    </h2>

    <DateInfo :datetime="datetime" />

    <img
      :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`"
      alt="weather icon"
    />

    <div id="temperature">
      <h2 class="fw-bold">{{ parseInt(currentWeather.main.temp) }}</h2>
      <span class="fw-bold">°C</span>
    </div>

    <p class="description fw-bold">
      {{ currentWeather.weather[0].description.toUpperCase() }}
    </p>

    <p class="info">
      MAX: {{ parseInt(currentWeather.main.temp_max) }}°C | MIN:
      {{ parseInt(currentWeather.main.temp_min) }}°C
    </p>

    <p class="info">
      FEELS LIKE: {{ parseInt(currentWeather.main.feels_like) }}°C
    </p>
    <p class="info">HUMIDITY: {{ parseInt(currentWeather.main.humidity) }}%</p>

    <div id="credits">source: openweathermap.org</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWeatherStore } from "@/stores/weather.js";
import DateInfo from "@/components/DateInfo.vue";
const weatherStore = useWeatherStore();

const currentWeather = computed(() => weatherStore.currentWeather);
const datetime = computed(() => unixToDate(weatherStore.currentWeather.dt));

const isDayTime = computed(() =>
  datetime.value.getHours() > 6 && datetime.value.getHours() < 18 ? true : false
);

const unixToDate = (timestamp) => {
  return new Date(parseInt(timestamp) * 1000);
};
</script>

<style lang="scss" scoped>
.day {
  background: rgb(99, 184, 209);
  background: linear-gradient(
    180deg,
    rgba(99, 184, 209, 1) 0%,
    rgba(63, 150, 176, 1) 100%
  );
}

.night {
  background: rgb(8, 45, 56);
  background: linear-gradient(
    180deg,
    rgba(8, 45, 56, 1) 0%,
    rgba(30, 92, 111, 1) 100%
  );
}

.weather-card {
  width: 100%;
  height: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #fff;

  .refresh {
    align-self: flex-start;
    font-size: $fs-medium;
    cursor: pointer;
  }

  .refresh:hover {
    opacity: 0.7;
  }

  #city-name {
    font-size: $fs-large;
    margin-top: 40px;
  }

  #temperature {
    display: flex;
    flex-direction: row;
    height: 150px;

    h2 {
      font-size: $fs-xxlarge;
    }

    span {
      padding-top: 6px;
      font-size: $fs-medium;
    }
  }

  .description {
    font-size: $fs-medium;
    margin-bottom: 34px;
  }

  .info {
    font-size: $fs-regular;
    margin-bottom: 10px;
  }

  #credits {
    margin-top: auto;
  }
}
</style>