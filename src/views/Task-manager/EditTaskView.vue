<template>
  <AddEditTask v-model="taskContent" ref="editTaskRef" header="Edit task" placeholder="Edit task">
    <template #button>
      <button class="btn btn-outline-primary" @click="router.back()">Cancel</button>
      <button class="btn btn-primary" @click="updateTask" :disabled="!taskContent">Update Task</button>
    </template>
  </AddEditTask>
</template>

<script setup>
import { ref } from "vue";
import AddEditTask from "../../components/Tasks/AddEditTask.vue";
import { useTaskStore } from "../../stores/tasksStore";
import { useToastStore } from "../../stores/toastStore";
import { useRoute, useRouter } from "vue-router";

const taskContent = ref('')
const editTaskRef = ref(null)
const taskStore = useTaskStore()
taskStore.navTitle = 'Edit Task'
taskStore.colorClass = 'navbar-dark'
taskStore.navStyle = '#c01b1b'

const toastStore = useToastStore()
const route = useRoute()
const router = useRouter()

taskContent.value = taskStore.getTaskContent(route.params.id)

const updateTask = () => {
  taskStore.updateTask(route.params.id, taskContent.value)
  toastStore.showToast('Task updated successfully')
  router.push('/taskManager/addTask')
}
</script>
