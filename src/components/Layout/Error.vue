<script setup>

const props = defineProps({
    errorMsg: {
        type: String,
        default: 'Something went wrong!!'
    }
})
</script>

<template>
    <h1>{{ props.errorMsg }}</h1>
</template>