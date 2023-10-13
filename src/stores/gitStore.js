import { defineStore } from 'pinia'
import axios from "axios";

export const useGitStore = defineStore('gitStore', {
    state: () => {
        return {
            usersData: [],
            userDetails: [],
            userRepos: [],
            showSpinner: false,
            baseUrl: 'https://api.github.com/users'
        }
    },
    actions: {
        async getUsers(username) {
            this.showSpinner = true
            const baseUrl = username ? `${this.baseUrl}/${username}` : `${this.baseUrl}`
            await axios.get(`${baseUrl}`).then(res => {
                this.showSpinner = false
                if (res.data && Array.isArray(res.data))
                    this.usersData = res.data
                else this.usersData = [res.data]
            }).catch((err) => {
                this.showSpinner = false
                this.usersData = []
            })
        },
        async getUserDetails(username) {
            this.showSpinner = true
            await axios.get(`${this.baseUrl}/${username}`).then(res => {
                this.userDetails = res.data
                this.showSpinner = false
            })
        },
        async getUserRepos(username) {
            this.showSpinner = true
            await axios.get(`${this.baseUrl}/${username}/repos`).then(res => {
                this.userRepos = res.data
                this.showSpinner = false
            })
        }
    }
})
