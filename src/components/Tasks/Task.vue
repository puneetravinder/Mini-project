<template>
    <div class="container-fluid mt-5">
        <ul class="list-group list-group-numbered">
            <li class="list-group-item" v-for="task in taskList" :key="task.id">{{ task.content }}
                <div class="d-flex justify-content-end">
                    <div class="btn-group" aria-label="Basic outlined">
                        <button v-tooltip title="Edit" type="button" class="btn btn-outline-primary">
                            <font-awesome-icon icon="pen" />
                        </button>
                        <button v-tooltip title="Mark as completed" type="button" class="btn btn-outline-primary">
                            <font-awesome-icon icon="circle-check" />
                        </button>
                        <button v-tooltip title="Delete" type="button" class="btn btn-outline-primary">
                            <font-awesome-icon icon="trash" />
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})
</script>