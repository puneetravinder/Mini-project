<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../../stores/tasksStore";
import { useDateFormat } from '@vueuse/core'
import { useGitStore } from "../../stores/gitStore";
import Loader from "../../components/Layout/Loader.vue";

const tasksStore = useTaskStore()
const route = useRoute()
tasksStore.navTitle = 'Git User Details'
const userData = ref(null)
const userRepos = ref(null)
const gitStore = useGitStore()

onMounted(() => {
    const username = route.params.id
    getGitUsersProfile(username)
})

const getGitUsersProfile = (username) => {
    gitStore.getUserDetails(username).then(res => {
        userData.value = gitStore.userDetails
        getUserRepos(username)
    })
}

const getUserRepos = (username) => {
    gitStore.getUserRepos(username).then(res => {
        userRepos.value = gitStore.userRepos
    })
}

</script>

<template>
    <Loader v-if="gitStore.showSpinner" :loader="gitStore.showSpinner" />
    <div v-if="!gitStore.showSpinner" class="container emp-profile">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                    <img :src="userData?.avatar_url" alt="" style="border-radius: 30px" />
                </div>
            </div>
            <div class="col-md-5">
                <div class="profile-head">
                    <h5>{{ userData?.name }}</h5>
                    <h6>@{{ userData?.login }}</h6>
                    <div class="row proile-rating my-3">
                        <div class="col-md-4 emphasis">
                            <h2><strong> {{ userData?.followers }} </strong></h2>
                            <p><small>Followers</small></p>
                        </div>
                        <div class="col-md-4 emphasis">
                            <h2><strong>{{ userData?.following }}</strong></h2>
                            <p><small>Following</small></p>
                        </div>
                        <div class="col-md-4 emphasis">
                            <h2><strong>{{ userData?.public_repos }}</strong></h2>
                            <p><small>Repos</small></p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <span class="badge text-bg-secondary">Created at :
                            {{ useDateFormat(userData?.created_at, 'DD MMM, YYYY') }}
                        </span><br>
                        <span class="badge text-bg-secondary">Last update on :
                            {{ useDateFormat(userData?.updated_at, 'DD MMM,YYYY') }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>WORK LINK</p>
                    <a :href="userData?.repos_url">Repo URL</a><br />
                    <a :href="userData?.branches_url">Branches URL</a><br />
                </div>
            </div>
            <div v-if="userRepos?.length" class="col-md-8">
                <div class="row">
                    <div class="fw-bold text-muted fs-4 my-2 mx-2">Repos</div>
                    <div v-for="repo in userRepos" class="col-md-6">
                        <div class="card mb-3" style="height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title text-capitalize text-muted">{{ repo.name }}</h5>
                                <p><a :href="repo.html_url">{{ repo.html_url }}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}

.profile-img {
    text-align: center;
}

.profile-img img {
    width: 70%;
    height: 100%;
}

.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}

.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}

.profile-edit-btn {
    font-weight: 600;
    color: #6c757d;
}

.profile-head h5 {
    color: #333;
}

.profile-head h6 {
    color: #0062cc;
}

.proile-rating {
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}

.proile-rating span {
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}

.profile-head .nav-tabs {
    margin-bottom: 5%;
}

.profile-head .nav-tabs .nav-link {
    font-weight: 600;
    border: none;
}

.profile-head .nav-tabs .nav-link.active {
    border: none;
    border-bottom: 2px solid #0062cc;
}

.profile-work {
    padding: 14%;
    margin-top: -15%;
}

.profile-work p {
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}

.profile-work a {
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}

.profile-work ul {
    list-style: none;
}

.profile-tab label {
    font-weight: 600;
}

.profile-tab p {
    font-weight: 600;
    color: #0062cc;
}

.menu_title {
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
    margin: 0 5px;
}
</style>