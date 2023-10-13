<script setup>
import { ref, watch } from "vue";

const searchText = ref('')
const emit = defineEmits(['handleSubmit'])
const props = defineProps({
    placeholder: {
        default: 'Search...'
    },
    inputClass: {
        type: String,
        default: 'justify-content-start'
    }
})

watch(searchText, () => {
    if (searchText.value === '') emit('handleSubmit', searchText.value)
})

</script>

<template>
    <div class="row d-flex align-items-center mb-4" :class="props.inputClass">
        <div class="col-md-7">
            <div class="search">
                <form @submit.prevent="$emit('handleSubmit', searchText)">
                    <font-awesome-icon icon="magnifying-glass" class="fa fa-search" />
                    <input v-model="searchText" type="text" class="form-control"
                        :placeholder="props.placeholder">
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
            </div>
        </div>
    </div>
</template>