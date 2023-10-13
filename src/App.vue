<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Layout/Navbar.vue';
import Toast from "./components/Layout/Toast.vue";
import { onMounted } from "vue";
import { useTriviaStore } from "./stores/triviaStore";
// import Github from "./views/GitHub/GitHub.vue";
// import Movie from "./views/Movie/Movie.vue";

const triviaStore = useTriviaStore()
// const activeComp = ref('gitHub')

onMounted(() => {
  triviaStore.getNotesInit()
})

</script>

<template>
  <Navbar />
  <div class="container-fluid py-4 p-3 mb-2 bg-light text-emphasis-secondary">
    <RouterView />
    <Toast />
  </div>

  <!-- Dynamic Component Rendering -->
  <!-- <div class="cls">
    <button class="bth" @click="activeComp = 'github'">GitHub</button>
    <button class="bth" @click="activeComp = 'movie'">Movie</button>
  </div>
  <div>
    <keep-alive>
      <component :is="activeComp =='github' ? Github : Movie" />
    </keep-alive>
  </div> -->
</template>
