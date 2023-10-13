<template>
    <div class="row mb-4 mx-2">
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/taskManager/addTask')">
                <img src="../assets/image/task_management.jpg" class="card-img-top" alt="task manager">
                <!-- <div class="card-header">
                    Task Manager
                </div> -->
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Task Manager</h5>
                    <p class="card-text text-body-secondary">Task Manager where user can add, edit and mark tasks as
                        completed.</p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <div class="d-grid gap-2 col-12 mx-auto">
                            <RouterLink role="button" class="btn btn-primary" to="/taskManager/addTask">Checkout
                            </RouterLink>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/weather')">
                <img src="../assets/image/weather.jpg" class="card-img-top img-height" alt="weather app">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Weather App</h5>
                    <p class="card-text text-body-secondary">Weather app show the current weather conditions for search
                        city.</p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/notes')">
                <img src="../assets/image/note.jpg" class="card-img-top img-height" alt="note app">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Note-taking App</h5>
                    <p class="card-text text-body-secondary">You can create, edit and delete notes.</p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/triviaQuiz')">
                <img src="../assets/image/quiz1.jpg" class="card-img-top img-height" alt="task manager">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Trivia Quiz Game</h5>
                    <p class="card-text text-body-secondary">Trivia quiz game with multiple choice questions.</p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-4 mx-2">
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/gitProfile')">
                <img src="../assets/image/github.jpg" class="card-img-top img-height" alt="task manager">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Github Profile Viewer</h5>
                    <p class="card-text text-body-secondary">Github profile and user details along with their repositories.
                    </p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/movie')">
                <img src="../assets/image/movie.jpg" class="card-img-top img-height" alt="task manager">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">Movie Search App</h5>
                    <p class="card-text text-body-secondary">Search for movies and view details like plot, cast and ratings.
                    </p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" role="button" @click="cardClick('/eCom')">
                <img src="../assets/image/ecom.jpg" class="card-img-top img-height" alt="task manager">
                <div class="card-body shadow-sm">
                    <h5 class="card-title">E-commerce Product List</h5>
                    <p class="card-text text-body-secondary">You can search for products, add to the cart and view the cart.
                    </p>
                    <!-- <div class="d-grid gap-2 col-12 mx-auto">
                        <RouterLink role="button" class="btn btn-primary" to="/">Checkout</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/tasksStore";

const tasksStore = useTaskStore()
tasksStore.navTitle = 'Vue Mini Projects'
tasksStore.colorClass = 'navbar-dark bg-primary'
tasksStore.navStyle = 'rgb(176 218 248)'

const router = useRouter()

const cardClick = (path) => {
    router.push(path)
}
</script>

<style>
.img-height {
    height: 144px;
}
</style>