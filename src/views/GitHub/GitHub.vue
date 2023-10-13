<script setup>
import { reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../../stores/tasksStore";
import { useGitStore } from "../../stores/gitStore";
import Search from "../../components/Layout/Search.vue";
import Loader from "../../components/Layout/Loader.vue";

const tasksStore = useTaskStore()
const gitStore = useGitStore()
tasksStore.navTitle = 'Github Profile Viewer'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = '#212529'
const router = useRouter()
const usersData = reactive({
    users: []
})

const getGitUsersProfile = (userStr) => {
    gitStore.getUsers(userStr).then(res => {
        usersData.users = gitStore.usersData
    })
}

watchEffect(() => {
    getGitUsersProfile()
})

const onCardClick = (user) => {
    router.push({ name: 'git-user-details', params: { id: user.login } })
}

const onSubmit = (searchData) => {
    getGitUsersProfile(searchData)
}

</script>

<template>
    <Loader v-if="gitStore.showSpinner" :loader="gitStore.showSpinner" />
    <div v-if="!gitStore.showSpinner" class="container mb-5">
        <Search @handleSubmit="onSubmit" placeholder="Looking for github user? Find here..." />
        <article class="col-md-12">
            <div class="cards-7 section-gray">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3" v-for="user in usersData.users" role="button">
                            <div class="movie-card card-profile" @click="onCardClick(user)">
                                <div class="card-image">
                                    <img class="img" :src="user?.avatar_url">
                                </div>
                                <div class="table">
                                    <h4 class="card-caption">@{{ user?.login }}</h4>
                                    <!-- <h6 class="category text-gray">CEO / Co-Founder</h6> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <p v-if="!usersData?.users?.length">No user found!!</p>
</template>

<style>
/*---------------------------------------------------------------------- /
SECTIONS
----------------------------------------------------------------------- */
.section-gray {
    background: #E5E5E5;
    padding: 60px 0 30px 0;
}

/*---------------------------------------------------------------------- /
CARDS
----------------------------------------------------------------------- */
.movie-card {
    display: inline-block;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.87);
    background: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.movie-card .card-image {
    height: 60%;
    position: relative;
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    border-radius: 6px;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.movie-card .card-image img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    pointer-events: none;
}

.movie-card .card-image .card-caption {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
    font-size: 1.3em;
    text-shadow: 0 2px 5px rgba(33, 33, 33, 0.5);
}

/* ============ Card Table ============ */
.movie-card .table {
    padding: 15px 30px;
}

/* ============ Card Blog ============ */
.card-raised {
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

/* ============ Card Profile ============ */
.card-profile {
    margin-top: 30px;
    text-align: center;
}

/* ============ Text Color ============ */
.text-gray {
    color: #888;
}
</style>