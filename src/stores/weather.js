import axios from 'axios';
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    loading: false,
    error: null,
    location: null,
    weatherApiKey: '4b4247040abb7a515be194671a6e72f4',
    currentWeather: null
  }),
  actions: {
    getLocation() {
      this.error = null
      navigator.geolocation.getCurrentPosition(
        position => {
          this.location = position.coords;
          console.log(position.coords);
          this.getCurrentWeather()
        },
        error => {
          console.log(error);
          this.error = error.message;
        });
    },
    getCurrentWeather() {
      this.loading = true
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

      axios.get(`${baseUrl}?lat=${this.location.latitude}&lon=${this.location.longitude}&appid=${this.weatherApiKey}&units=metric`)
        .then(resp => {
          this.currentWeather = resp.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = error.message;
        })
    }
  }
})
