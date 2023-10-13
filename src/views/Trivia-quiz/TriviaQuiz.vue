<script setup>
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/tasksStore";
import { useTriviaStore } from "@/stores/triviaStore";
import Loader from "../../components/Layout/Loader.vue";
import Result from "./Result.vue";

const tasksStore = useTaskStore()
const triviaStore = useTriviaStore()
tasksStore.navTitle = 'Trivia Quiz Game'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = 'rgb(158 71 209)'
const progressVal = ref(0)
const questionOptions = ref(null)
const userAnswer = ref()
const showResult = ref(false)
const showLoader = ref(false)

onMounted(() => {
    showResult.value = false;
    showLoader.value = true;
    triviaStore.setInitiaIndex()
    triviaStore.getNotesInit().then(res => {
        showLoader.value = false;
        questionOptions.value = triviaStore.getQuestionByIndex('next')
    })
})

const btnClick = (type) => {
    console.log("btn click");
    setUserResponse(type)
    questionOptions.value = triviaStore.getQuestionByIndex(type)
}

watch(userAnswer, () => {
    console.log("watch");
    let quesIndex = triviaStore.quesIndex;
    const question = triviaStore.questions[quesIndex];
    question['userAnswer'] = userAnswer.value;
})

const setUserResponse = (type) => {
    console.log("set User Resp");
    if (type === 'next') {
        let val = triviaStore.srNo
        progressVal.value = val *= 10
        const quesIndex = triviaStore.quesIndex + 1;
        const question = triviaStore.questions[quesIndex];
        if (question['userAnswer']) {
            userAnswer.value = question['userAnswer'];
        } else userAnswer.value = null;

    } else {
        let val = triviaStore.srNo - 1
        progressVal.value = val *= 10
        const quesIndex = triviaStore.quesIndex - 1
        const question = triviaStore.questions[quesIndex];
        userAnswer.value = question['userAnswer'];
    }
}

</script>

<template>
    <Loader v-if="showLoader" :loader="showLoader"/>
    <div v-if="!showResult">
        <div v-if="progressVal" class="row">
            <div class="col-md-11 mb-2" style="margin-left: 55px;">
                <div class="progress" role="progressbar" aria-label="Success example" :aria-valuenow="progressVal"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" :style="{ 'width': `${progressVal}%` }">{{ progressVal }}%</div>
                </div>
            </div>
        </div>
        <div v-if="questionOptions?.question" class="container quiz-container mb-2 p-5">
            <div class="d-flex justify-content-end mb-2">{{ triviaStore.srNo }}/10</div>
            <div class="row">
                <div class="question ml-sm-5 pl-sm-5">
                    <div class="py-2 mb-2 h5"><b>{{ triviaStore.srNo }}.
                            {{ (questionOptions?.question).replace(/[^a-zA-Z0-9 ]/g, ' ') }}
                        </b></div>
                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                        <label v-for="(option, index) in questionOptions?.options" :key="index" class="options">{{ option }}
                            <input v-model="userAnswer" type="radio" name="radio" :value="option.replace(/[^\w ]/g, ' ')">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-6">
                        <div class="d-flex justify-content-start">
                            <button v-if="triviaStore.srNo > 1" class="btn btn-primary" @click="btnClick('prev')">Previous</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-end">
                            <button v-if="triviaStore.srNo !== 10" class="btn btn-primary" @click="btnClick('next')"
                                :disabled="!userAnswer">Next</button>
                            <button v-if="triviaStore.srNo === 10" :disabled="!userAnswer" class="btn btn-primary"
                                @click="showResult = true">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Result v-if="showResult" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #333;
}

.quiz-container {
    background-color: #555;
    color: #ddd;
    border-radius: 10px;
    padding: 20px;
    font-family: 'Montserrat', sans-serif;
    max-width: 700px;
}

.container>p {
    font-size: 32px;
}

.question {
    width: 75%;
}

.options {
    position: relative;
    padding-left: 40px;
}

#options label {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
}

.options input {
    opacity: 0;
}

.checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #555;
    border: 1px solid #ddd;
    border-radius: 50%;
}

.options input:checked~.checkmark:after {
    display: block;
}

.options .checkmark:after {
    content: "";
    width: 10px;
    height: 10px;
    display: block;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 300ms ease-in-out 0s;
}

.options input[type="radio"]:checked~.checkmark {
    background: #0d6efd;
    transition: 300ms ease-in-out 0s;
}

.options input[type="radio"]:checked~.checkmark:after {
    transform: translate(-50%, -50%) scale(1);
}

.btn-primary {
    background-color: #555;
    color: #ddd;
    border: 1px solid #ddd;
}

@media(max-width:576px) {
    .question {
        width: 100%;
        word-spacing: 2px;
    }
}
</style>