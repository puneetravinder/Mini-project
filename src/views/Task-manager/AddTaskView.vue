
<template>  
  <AddEditTask v-model="newTask" ref="addTaskRef" header="Add task" placeholder="Enter new task...">
    <template #button>
      <button class="btn btn-primary" @click="addNewTask" :disabled="!newTask">Add Task</button>
    </template>
  </AddEditTask>

  <div class="container-fluid mt-5">
    <ul class="list-group list-group-numbered">
      <li class="list-group-item" v-for="task in taskList" :key="task.id">{{ task.content }}
        <div class="d-flex justify-content-end">
          <div class="btn-group" aria-label="Basic outlined" v-tooltip>
            <button data-bs-toggle="tooltip" data-bs-title="Edit task" type="button" class="btn btn-outline-primary"
              @click="$router.push(`/taskManager/editTask/${task.id}`)">
              <font-awesome-icon icon="pen" />
            </button>
            <button data-bs-toggle="tooltip" data-bs-title="Mark as completed" type="button"
              class="btn btn-outline-primary" @click="markAsComplete(task.id)">
              <font-awesome-icon icon="circle-check" />
            </button>
            <button data-bs-toggle="tooltip" data-bs-title="Delete task" type="button" class="btn btn-outline-primary"
              @click="deleteTask(task.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../../stores/tasksStore";
import { useToastStore } from "@/stores/toastStore";
import AddEditTask from "@/components/Tasks/AddEditTask.vue";

const newTask = ref('')
const addTaskRef = ref(null)
const taskStore = useTaskStore()
const toastStore = useToastStore()

taskStore.navTitle = 'Task Manager'
taskStore.colorClass = 'navbar-dark'
taskStore.navStyle = '#c01b1b'

const taskList = computed(() => {
  return taskStore.tasks.filter(task => !task.completeStatus)
})

const addNewTask = () => {
  taskStore.addTask(newTask.value)
  newTask.value = ''
  addTaskRef.value.focusTextare()
  toastStore.showToast('Task added successfully')
}

const markAsComplete = (id) => {
  taskStore.markAsComplete(id)
}

const deleteTask = (id) => {
  taskStore.deleteTask(id)
  toastStore.showToast('Task deleted')
}

</script>

