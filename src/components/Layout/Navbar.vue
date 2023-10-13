<template>
    <nav class="navbar" :class="taskStore.colorClass" :style="{ 'background-color': taskStore.navStyle }">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold">{{ taskStore.navTitle }}</a>
            <div v-if="route.path !== '/'">
                <button class="btn btn-outline-light me-2" @click="$router.back()">Go back</button>
                <RouterLink class="btn btn-outline-light" to="/">Home</RouterLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useTaskStore } from "../../stores/tasksStore";
import { useRoute } from "vue-router";
const taskStore = useTaskStore()
const route = useRoute()
</script>

<style>
.navbar-item {
    flex-grow: 0 !important;
    margin-right: 20px;
}

.navbar-brand {
    font-size: 25px;
}
</style>