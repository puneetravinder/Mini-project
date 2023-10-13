<template>
    <div class="d-md-flex justify-content-md-end mb-2">
        <RouterLink class="btn btn-primary" to="/taskManager/completedTask">Completed Task<font-awesome-icon
                icon="arrow-up-right-from-square" class="ms-2" /></RouterLink>
    </div>
    <div class="card">
        <h4 class="card-header">{{ header }}</h4>
        <div class="card-body">
            <div class="mb-3">
                <textarea class="form-control" rows="3" :value="modelValue" :placeholder="placeholder" ref="textareaRef"
                    @input="$emit('update:modelValue', $event.target.value)" v-auto-focus></textarea>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <slot name="button" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutoFocus } from "../../directives/vAutoFocus";

const textareaRef = ref(null)
const focusTextare = () => {
    textareaRef.value.focus()
}

defineExpose({
    focusTextare
})

const emit = defineEmits(['update: modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    header: {
        type: String,
        default: 'Add task'
    },
    placeholder: {
        type: String,
        default: 'Type something...'
    }
})
</script>