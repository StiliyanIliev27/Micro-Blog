<script setup>
import { ref, onMounted } from "vue";

const weather = ref(null);
const city = ref("Loading...");
const apiKey = "47df35477172a2b88503a5a116c5b07b"; // Replace with your OpenWeatherMap API key

const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    weather.value = data;
    city.value = data.name;
  } catch (error) {
    console.error("Error fetching weather:", error);
    city.value = "Weather Unavailable";
  }
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        city.value = "Location Disabled";
      }
    );
  } else {
    city.value = "Geolocation Unavailable";
  }
});
</script>

<template>
  <div v-if="weather" class="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md text-white w-full">
    <img 
      :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" 
      alt="Weather Icon"
      class="w-12 h-12"
    />
    <div>
      <h3 class="text-lg font-bold">{{ city }}</h3>
      <p class="text-gray-300">{{ weather.main.temp }}°C, {{ weather.weather[0].description }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
