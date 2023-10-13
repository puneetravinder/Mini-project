<template>
    <i class="bi" :class="`bi-${iconVal}`" :style="{ 'font-size': fontSize }"></i>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    icon: {
        type: String
    },
    fontSize: {
        type: String,
        default: '25px'
    }
})

const iconVal = computed(() => {
    let iconProps = props.icon
    switch (iconProps) {
        case 'clear-day':
            iconProps = 'sun'
            break;
        case 'clear-night':
            iconProps = 'moon'
            break;
        case 'cloudy':
            iconProps = 'clouds'
            break;
        case 'fog':
            iconProps = 'cloud-fog2'
            break;
        case 'hail':
            iconProps = 'cloud-hail'
            break;
        case 'partly-cloudy-day':
            iconProps = 'cloud-sun'
            break;
        case 'partly-cloudy-night':
            iconProps = 'cloud-moon-fill'
            break;
        case 'rain-snow-showers-day':
            iconProps = 'cloud-snow'
            break;
        case 'rain-snow-showers-night':
            iconProps = 'cloud-snow-fill'
            break;
        case 'rain-snow':
            iconProps = 'cloud-snow'
            break;
        case 'rain':
            iconProps = 'cloud-rain'
            break;
        case 'showers-day':
            iconProps = 'cloud-rain'
            break;
        case 'showers-night':
            iconProps = 'cloud-rain-fill'
            break;
        case 'sleet':
            iconProps = 'cloud-sleet'
            break;
        case 'snow-showers-day':
            iconProps = 'cloud-snow'
            break;
        case 'snow-showers-night':
            iconProps = 'cloud-snow-fill'
            break;
        case 'snow':
            iconProps = 'cloud-snow'
            break;
        case 'thunder-rain':
            iconProps = 'cloud-lightning-rain'
            break;
        case 'thunder-showers-day':
            iconProps = 'cloud-lightning-rain'
            break;
        case 'thunder-showers-night':
            iconProps = 'cloud-lightning-rain-fill'
            break;
        case 'thunder':
            iconProps = 'cloud-lightning'
            break;
        case 'wind':
            iconProps = 'cloud-fog2'
            break;
        default:
            iconProps = 'cloud'
            break;
    }
    return iconProps
});
</script>