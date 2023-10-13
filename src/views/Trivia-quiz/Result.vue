<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useTriviaStore } from "@/stores/triviaStore";
import { RouterLink } from "vue-router";

const triviaStore = useTriviaStore()
const showResult = ref(false)
const result = ref(0)
let questions = ref(null)
let isAnsCorrect = ref('')

watchEffect(() => {
    result.value = triviaStore.getResult()
})

onMounted(() => {
    questions.value = triviaStore.getAllQuestions()
})

const reviewAns = () => {
    showResult.value = true
}

const getClass = (quesData) => {
    isAnsCorrect.value = ''
    if (quesData['userAnswer']) {
        if (quesData.correct_answer === quesData.userAnswer) {
            isAnsCorrect.value = 'correct'
            return 'list-group-item-success'
        } else if (quesData.correct_answer !== quesData.userAnswer) {
            isAnsCorrect.value = 'incorrect'
            return 'list-group-item-danger'
        }
    }
    return ''
}
</script>

<template>
    <div v-if="!showResult" class="row d-flex justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <img src="../../assets/image/congrats.jpg" class="card-img-top" alt="Wild Landscape" />
                <div class="card-body">
                    <p class="card-text">
                        You have successfully completed the test.
                    </p>
                    <div v-if="result == 0">
                        <h5 class="card-title">Oh no, You failed in test. You Scored {{ result }}%</h5>

                    </div>
                    <h5 v-if="result" class="card-title">You Scored {{ result }}%</h5>
                    <div class="d-flex justify-content-end">
                        <div v-if="result == 0" class="me-4">
                            <RouterLink class="btn btn-primary" to="/triviaQuiz">Re-test again?</RouterLink>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="reviewAns">Review Answers</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showResult" class="container">
        <div class="card mb-3 p-3" v-for="(quesData, index) in questions">
            <h4 class="card-header">{{ index + 1 }}. {{ (quesData?.question).replace(/[^a-zA-Z0-9 ]/g, ' ') }}
            </h4>
            <div class="card-body">
                <ul class="list-group">
                    <li v-for="options in quesData?.options" class="list-group-item" :class="getClass(quesData)">
                        <span v-if="isAnsCorrect == 'correct' && options == quesData.correct_answer"><font-awesome-icon
                                icon="check" style="color: #278f19" />&nbsp;</span>
                        <span v-if="isAnsCorrect == 'incorrect' && options == quesData.correct_answer"><font-awesome-icon
                                icon="check" style="color: #278f19" />&nbsp;</span>
                        <span v-if="isAnsCorrect == 'incorrect' && options == quesData.userAnswer"><font-awesome-icon
                                icon="xmark" style="color: #e50b0b;" />&nbsp;</span> {{ options }}
                    </li>
                </ul>
            </div>
            <div>
                <span class="badge bg-success" v-if="isAnsCorrect == 'correct'">Correct Answer</span>
                <span class="badge bg-danger" v-if="isAnsCorrect == 'incorrect'">Wrong Answer</span>
            </div>
        </div>
    </div>
</template>

<style></style>