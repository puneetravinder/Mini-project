import { createRouter, createWebHashHistory } from 'vue-router'
import AddTaskView from '../views/Task-manager/AddTaskView.vue'
import EditTaskView from '../views/Task-manager/EditTaskView.vue'
import CompletedTask from "../views/Task-manager/CompleteTaskView.vue";
import HomeView from "../views/HomeView.vue";
// import WeatherView from '../views/Weather/WeatherView.vue'
import WeatherForecast from '../views/Weather/WeatherForecast.vue'
import Notes from '../views/Notes/Notes.vue'
import TriviaQuiz from '../views/Trivia-quiz/TriviaQuiz.vue'
import GitHub from '../views/GitHub/GitHub.vue'
import GitUserDetails from '../views/GitHub/UserDetails.vue'
import Movie from '../views/Movie/Movie.vue'
import Ecom from '../views/Ecom/Ecom.vue'
import ProductCart from '../views/Ecom/ProductCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/taskManager/addTask',
    name: 'add-task',
    component: AddTaskView
  },
  {
    path: '/taskManager/editTask/:id',
    name: 'edit-task',
    component: EditTaskView
  },
  {
    path: '/taskManager/completedTask',
    name: 'completed-task',
    component: CompletedTask
  },
  {
    path: '/weather',
    name: 'weather',
    // component: WeatherView
    component: WeatherForecast
  },
  {
    path: '/notes',
    name: 'notes',
    // component: WeatherView
    component: Notes
  },
  {
    path: '/triviaQuiz',
    name: 'trivia-quiz',
    component: TriviaQuiz
  },
  {
    path: '/gitProfile',
    name: 'github-profile',
    component: GitHub
  },
  {
    path: '/gitProfile/:id',
    name: 'git-user-details',
    component: GitUserDetails
  },
  {
    path: '/movie',
    name: 'movie-info',
    component: Movie
  },
  {
    path: '/eCom',
    name: 'e-com',
    component: Ecom
  },
  {
    path: '/eCom/cart',
    name: 'cart',
    component: ProductCart
  },
]

const router = createRouter({
  history: createWebHashHistory('/mini-project/'),
  // Scroll to last position
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, left: 0 }
  },
  routes
})

export default router
