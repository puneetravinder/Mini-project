import { defineStore } from 'pinia'
import axios from "axios";

export const useTriviaStore = defineStore('triviaStore', {
    state: () => {
        return {
            srNo: 1,
            questions: [],
            quesIndex: -1
        }
    },
    actions: {
        async getNotesInit() {
            await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple`).then(res => {
                this.questions = res.data.results
                this.getModifiedQuestionsOptions()
            })
        },
        setInitiaIndex() {
            this.srNo = 1
            this.quesIndex = -1
        },
        getQuestionByIndex(type) {
            this.srNo = (this.srNo == 1 && this.quesIndex == -1 && type == 'next') ? this.srNo : type == 'next' ? this.srNo += 1 : this.srNo -= 1
            this.quesIndex = type == 'next' ? this.quesIndex += 1 : this.quesIndex -= 1
            return {
                question: this.questions[this.quesIndex].question,
                options: this.questions[this.quesIndex].options
            }
        }
    },
    getters: {
        getModifiedQuestionsOptions: (state) => {
            return () => {
                for (let index = 0; index < state.questions.length; index++) {
                    const question = state.questions[index];
                    let quesData = [...question.incorrect_answers, question.correct_answer]
                    for (let i = quesData.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [quesData[i], quesData[j]] = [quesData[j], quesData[i]];
                    }
                    state.questions[index].options = quesData
                }
                return state.questions;
            }
        },
        getResult: (state) => {
            return () => {
                let result = 0;
                for (let index = 0; index < state.questions.length; index++) {
                    const question = state.questions[index];
                    if (question.userAnswer === question.correct_answer) {
                        result += 10
                    }
                }
                return result
            }
        },
        getAllQuestions: (state) => {
            return () => {
                return state.questions;
            }
        }
    }
})