<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <h1 class="heading">Completed Task</h1>
            </div>
            <div class="col-md-6">
                <div class="d-md-flex justify-content-md-end mb-2">
                    <RouterLink class="btn btn-primary" to="/taskManager/addTask">Add Task<font-awesome-icon
                            icon="arrow-up-right-from-square" class="ms-2" /></RouterLink>
                </div>
            </div>
        </div>
        <div v-if="taskList.length > 0">
            <div class="row justify-content-end">
                <div class="col-md-1">
                    <label>Task Filter : </label>
                </div>
                <div class="col-md-3">
                    <select class="form-select mb-4" role="button" aria-label="Filter"
                        @change="onChange($event.target.value)" :selected="selectedValue == value">
                        <option selected disabled>Select filter</option>
                        <option value="1">All</option>
                        <option value="2">Active</option>
                        <option value="3">Completed</option>
                    </select>
                </div>
            </div>
            <table class="table table-success table-striped-columns">
                <thead>
                    <tr class="table-dark">
                        <th>Id</th>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in taskList" :key="task.id">
                        <td>{{ task.id }}</td>
                        <td>{{ task.content }}</td>
                        <td :style="{ 'color': task.completeStatus ? 'green' : 'red' }">
                            <strong>{{ task.completeStatus ? 'Completed' : 'Active' }}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5 v-if="taskList.length == 0">No record found</h5>
    </div>
</template>

<script setup>
import { useTaskStore } from "../../stores/tasksStore";
import { ref, computed } from "vue";

const selectedValue = ref(null)
const taskStore = useTaskStore()

taskStore.navTitle = 'Completed Task'
taskStore.colorClass = 'navbar-dark'
taskStore.navStyle = '#c01b1b'

const onChange = (id) => {
    let filteredData = ref()
    selectedValue.value = +id
    if (selectedValue.value === 1)
        filteredData = taskStore.tasks
    else if (selectedValue.value === 2)
        filteredData = taskStore.tasks.filter(task => !task.completeStatus)
    else
        filteredData = taskStore.tasks.filter(task => task.completeStatus)
    taskList = filteredData
}

var taskList = computed(() => {
    return taskStore.tasks.filter(task => task.completeStatus)
})

</script>