<script setup>
const props = defineProps({
    loader: {
        default: false
    }
})

</script>

<template>
    <div v-if="props.loader" class="d-flex justify-content-center my-4">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>