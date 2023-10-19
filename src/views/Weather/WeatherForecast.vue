<script setup>
import { ref, reactive, onMounted } from "vue"
import { useTaskStore } from "../../stores/tasksStore";
import Search from "../../components/Layout/Search.vue";
import axios from "axios"
import { useNow, useDateFormat } from '@vueuse/core'
import Icon from "../../components/Layout/Icon.vue";
import Loader from "../../components/Layout/Loader.vue";
import Error from "../../components/Layout/Error.vue";

const tasksStore = useTaskStore()
const showSpinner = ref(false)
const isError = ref(false)
const errMsg = ref('')

tasksStore.navTitle = 'Weather App'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = '#0dcaf0'
const formattedDate = reactive({
    date: String,
    time: String
})
const weatherData = ref([])
const searchText = ref('Mumbai')

onMounted(() => {
    const defaultlocation = 'mumbai'
    getWeather(defaultlocation)
    formattedDate.date = useDateFormat(useNow(), 'dddd, DD MMMM, YYYY')
    formattedDate.time = useDateFormat(useNow(), 'h:mm a')
})

const onSubmit = (searchData) => {
    searchText.value = searchData
    getWeather(searchText.value)
}

const getWeather = (nameStr) => {
    showSpinner.value = true
    const apiKey = '6Q7YKYCXX35SLVXW8NZGLYN4Q'
    const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    axios.get(`${baseUrl}${nameStr}/next4days?unitGroup=metric&key=${apiKey}`).then(res => {
        weatherData.value = res.data
        showSpinner.value = false
        isError.value = false
    }).catch(err => {
        showSpinner.value = false
        isError.value = true
        errMsg.value = `${err.response.data.split(':')[1]} :  ${searchText.value}`
    })
}

const onRefresh = () => {
    getWeather(searchText.value)
}

</script>

<template>
    <div class="row d-flex justify-content-center align-items-center">
        <Search @handleSubmit="onSubmit" placeholder="Search for any city weather..." inputClass="justify-content-center" />
        <Error v-if="isError" :error-msg="errMsg" />
    </div>
    <Loader v-if="showSpinner" :loader="showSpinner" />
    <div v-if="!showSpinner && !isError" class="container" id="wrapper">
        <div class="container-fluid" id="current-weather">
            <div class="row">
                <!-- Left panel -->
                <div class="col-md-4 col-sm-5">
                    <h5>
                        <span id="cityName">{{ weatherData.resolvedAddress }}</span>
                        <span id="cityCode"></span>
                    </h5>
                    <h6 id="localDate">{{ formattedDate.date }}</h6>
                    <h5 id="localTime">{{ formattedDate.time }}</h5>
                    <span type="button" @click="onRefresh">
                        <font-awesome-icon icon="arrows-rotate" /> Refresh</span>
                </div>

                <!-- Center panel -->
                <div class="col-md-5 col-sm-7">
                    <div class="row">
                        <div>
                            <Icon :icon="weatherData.currentConditions?.icon" fontSize="75px"></Icon>
                            <span id="mainTemperature">{{ ~~(weatherData.currentConditions?.temp) }}
                                <span class="temp-unit" id="celcius">°C</span>
                            </span>
                            <p id="tempDescription">{{ weatherData.currentConditions?.conditions }}</p>
                        </div>
                    </div>
                </div>

                <!-- Right panel -->
                <div class="col-xs-12 col-sm-12 col-md-3 row" style="text-align: right;">
                    <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                        <h6>Humidity: <span id="humidity"></span>{{ weatherData.currentConditions?.humidity }}%</h6>
                    </div>
                    <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                        <h6>Wind: <span id="wind"></span>{{ weatherData.currentConditions?.windspeed }} m/s</h6>
                    </div>
                    <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                        <h6>High: <span id="mainTempHot"></span>{{ weatherData.days?.[0].tempmax }}°</h6>
                    </div>
                    <div class="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                        <h6>Low: <span id="mainTempLow"></span>{{ weatherData.days?.[0].tempmin }}°</h6>
                    </div>
                </div>

            </div>
        </div>
        <!-- 4 days forecast -->
        <div class="container-fluid">
            <div class="row" style="padding: 2px;">
                <!-- Day 1 -->
                <div class="col-md-3 col-sm-6 day-weather-box">
                    <div class="col-sm-12 day-weather-inner-box">
                        <div class="col-sm-8 forecast-main">
                            <p id="forecast-day-1-name">{{ useDateFormat(weatherData.days?.[1].datetime, 'ddd') }}</p>
                            <div class="row">
                                <h5 id="forecast-day-1-main">{{ ~~(weatherData.days?.[1]?.temp) }}°
                                    <Icon :icon="weatherData.days?.[1]?.icon"></Icon>
                                </h5>
                            </div>
                        </div>
                        <div class="col-sm-4 forecast-min-low">
                            <p>
                                <span class="high-temperature" id="forecast-day-1-ht">
                                    {{ weatherData.days?.[1]?.tempmax }}°
                                </span>
                            </p>
                            <p>
                                <span class="low-temperature" id="forecast-day-1-lt">
                                    {{ weatherData.days?.[1]?.tempmin }}°
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Day 2 -->
                <div class="col-md-3 col-sm-6 day-weather-box">
                    <div class="col-sm-12 day-weather-inner-box">
                        <div class="col-sm-8 forecast-main">
                            <p id="forecast-day-1-name">{{ useDateFormat(weatherData.days?.[2].datetime, "ddd") }}</p>
                            <div class="row">
                                <h5 id="forecast-day-1-main">{{ ~~(weatherData.days?.[2]?.temp) }}°
                                    <Icon :icon="weatherData.days?.[2]?.icon"></Icon>
                                </h5>
                            </div>
                        </div>
                        <div class="col-sm-4 forecast-min-low">
                            <p>
                                <span class="high-temperature" id="forecast-day-1-ht">
                                    {{ weatherData.days?.[2]?.tempmax }}°</span>
                            </p>
                            <p>
                                <span class="low-temperature" id="forecast-day-1-lt">
                                    {{ weatherData.days?.[2]?.tempmin }}°</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Day 3 -->
                <div class="col-md-3 col-sm-6 day-weather-box">
                    <div class="col-sm-12 day-weather-inner-box">
                        <div class="col-sm-8 forecast-main">
                            <p id="forecast-day-1-name">{{ useDateFormat(weatherData.days?.[3].datetime, "ddd") }}</p>
                            <div class="row">
                                <h5 id="forecast-day-1-main">{{ ~~(weatherData.days?.[3]?.temp) }}°
                                    <Icon :icon="weatherData.days?.[3]?.icon"></Icon>
                                </h5>
                            </div>
                        </div>
                        <div class="col-sm-4 forecast-min-low">
                            <p>
                                <span class="high-temperature" id="forecast-day-1-ht">
                                    {{ weatherData.days?.[3]?.tempmax }}°</span>
                            </p>
                            <p>
                                <span class="low-temperature" id="forecast-day-1-lt">
                                    {{ weatherData.days?.[3]?.tempmin }}°</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Day 4 -->
                <div class="col-md-3 col-sm-6 day-weather-box">
                    <div class="col-sm-12 day-weather-inner-box">
                        <div class="col-sm-8 forecast-main">
                            <p id="forecast-day-1-name">{{ useDateFormat(weatherData.days?.[4].datetime, "ddd") }}</p>
                            <div class="row">
                                <h5 id="forecast-day-1-main">{{ ~~(weatherData.days?.[4]?.temp) }}°
                                    <Icon :icon="weatherData.days?.[4]?.icon"></Icon>
                                </h5>
                            </div>
                        </div>
                        <div class="col-sm-4 forecast-min-low">
                            <p>
                                <span class="high-temperature" id="forecast-day-1-ht">
                                    {{ weatherData.days?.[4]?.tempmax }}°</span>
                            </p>
                            <p>
                                <span class="low-temperature" id="forecast-day-1-lt">
                                    {{ weatherData.days?.[3]?.tempmin }}°</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
a {
    color: white;
    /* opacity: 0.6; */
    text-decoration: none;
}

a:hover,
a:active,
a:focus {
    color: white;
    text-decoration: none;
    opacity: 1;
}

.active {
    color: rgb(237, 233, 233);
    text-decoration: none;
    opacity: 1;
}

#wrapper {
    background-color: #28688C;
    box-shadow: 1px 5px 25px 3px #444;
    border-radius: 10px;
    margin: 30px auto;
    max-width: 720px;
    padding: 0px;
    color: white;
}

#current-weather {
    padding: 15px;
}

#mainTemperature {
    font-size: 4.5em;
    line-height: 0.7;
    margin-left: 5px;
}

.temp-unit {
    font-size: 25px;
    float: right;
    margin-right: 85px;
    margin-top: 35px;
}

#tempDescription {
    /* margin-top: 10px; */
    text-align: center;
    /* margin-left: 75px; */
}

.day-weather-box {
    border: 1px solid #28688C;
    background-color: #2E7FA1;
    border-radius: 5px;
    height: 5em;
}

#refreshButton {
    text-decoration: none !important;
    opacity: 0.6;
}

.day-weather-box p {
    margin-bottom: 0;
}

.side-weather-info {
    padding: 0px 10px;
}

.day-weather-inner-box {
    display: inline-flex;
    margin: 14px auto;
    padding: 0px 5px;
}

.forecast-main {
    padding: 0px 0px 0px 30px;
}

.forecast-icon {
    font-size: 25px;
    margin-left: 5px;
}

.modal-body p {
    color: #333;
}
</style>