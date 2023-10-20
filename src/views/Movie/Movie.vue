<script setup>
import { ref, watchEffect } from "vue";
import { useTaskStore } from "../../stores/tasksStore";
import Search from "../../components/Layout/Search.vue";
import axios from "axios";
import Error from "../../components/Layout/Error.vue";

const tasksStore = useTaskStore()
tasksStore.navTitle = 'Movie Search App'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = '#0b5a6a'
const movies = [
    { "Title": "Jawan", "Year": "2023", "Rated": "Not Rated", "Released": "07 Sep 2023", "Runtime": "169 min", "Genre": "Action, Thriller", "Director": "Atlee", "Writer": "Sumit Arora, Atlee, Ramanagirivasan", "Actors": "Shah Rukh Khan, Nayanthara, Vijay Sethupathi", "Plot": "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.", "Language": "Hindi, English", "Country": "India", "Awards": "N/A", "Poster": "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "7.5/10" }], "Metascore": "N/A", "imdbRating": "7.5", "imdbVotes": "60,891", "imdbID": "tt15354916", "Type": "movie", "DVD": "N/A", "BoxOffice": "$14,735,611", "Production": "N/A", "Website": "N/A", "Response": "True" },
    { "Title": "Avatar: The Way of Water", "Year": "2022", "Rated": "PG-13", "Released": "16 Dec 2022", "Runtime": "192 min", "Genre": "Action, Adventure, Fantasy", "Director": "James Cameron", "Writer": "James Cameron, Rick Jaffa, Amanda Silver", "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver", "Plot": "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.", "Language": "English", "Country": "United States", "Awards": "Won 1 Oscar. 64 wins & 133 nominations total", "Poster": "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "7.6/10" }, { "Source": "Rotten Tomatoes", "Value": "76%" }, { "Source": "Metacritic", "Value": "67/100" }], "Metascore": "67", "imdbRating": "7.6", "imdbVotes": "462,327", "imdbID": "tt1630029", "Type": "movie", "DVD": "28 Mar 2023", "BoxOffice": "$684,075,767", "Production": "N/A", "Website": "N/A", "Response": "True" },
    { "Title": "Money Heist", "Year": "2017–2021", "Rated": "TV-MA", "Released": "02 May 2017", "Runtime": "70 min", "Genre": "Action, Crime, Drama", "Director": "N/A", "Writer": "Álex Pina", "Actors": "Úrsula Corberó, Álvaro Morte, Itziar Ituño", "Plot": "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.", "Language": "Spanish, Russian, Serbian, English", "Country": "Spain", "Awards": "38 wins & 45 nominations", "Poster": "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.2/10" }], "Metascore": "N/A", "imdbRating": "8.2", "imdbVotes": "509,497", "imdbID": "tt6468322", "Type": "series", "totalSeasons": "5", "Response": "True" },
    { "Title": "Gadar 2", "Year": "2023", "Rated": "Not Rated", "Released": "11 Aug 2023", "Runtime": "170 min", "Genre": "Action, Adventure, Drama", "Director": "Anil Sharma", "Writer": "Shaktimaan Talwar", "Actors": "Sunny Deol, Amrish Puri, Nana Patekar", "Plot": "When Tara Singh goes missing during a skirmish and is believed to be captured in Pakistan, his son Jeete sets out to rescue him and enters a labyrinth from which they both must escape at all costs.", "Language": "Hindi, Punjabi, Kannada, Tamil, Telugu, Malayalam", "Country": "India", "Awards": "N/A", "Poster": "https://m.media-amazon.com/images/M/MV5BZGEzMDJjNGUtYTFhZi00MDgyLWIzMzYtMzcwMDQyZjcyNGY1XkEyXkFqcGdeQXVyNTcwNTM5ODI@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "5.7/10" }], "Metascore": "N/A", "imdbRating": "5.7", "imdbVotes": "18,728", "imdbID": "tt15441054", "Type": "movie", "DVD": "N/A", "BoxOffice": "N/A", "Production": "N/A", "Website": "N/A", "Response": "True" }
]

const movieData = ref([])
const isError = ref(false)
const errMsg = ref('')

const getMovie = (movieName) => {
    const baseUrl = 'https://omdbapi.com/?t='
    const apiKey = 'dbee93e2'
    const url = `${baseUrl}${movieName}&apikey=${apiKey}`
    axios.get(url).then(res => {
        if (res.data.Error) {
            errMsg.value = `${res.data.Error} with name '${movieName}'`
            isError.value = true
        } else {
            movieData.value = [res.data]
            isError.value = false
        }
    })
}

watchEffect(() => {
    movieData.value = movies
})

const onSubmit = (searchData) => {
    if (searchData == '') movieData.value = movies
    else getMovie(searchData)
}

</script>

<template>
    <div class="container mb-5">
        <Search @handleSubmit="onSubmit" placeholder="Search a movie..." />
        <Error v-if="isError" :error-msg="errMsg" />
        <article class="col-md-12" v-if="movieData.length && !isError">
            <!-- BLOG CARDS -->
            <div class="cards-1 section-gray">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3" v-for="movie in movieData">
                            <div class="movieapp-card card-blog">
                                <div class="card-image" style="height: 320px !important;">
                                    <img class="img" :src="movie?.Poster">
                                    <!-- <div class="card-caption">{{ movie?.Title }}</div> -->
                                    <div class="ripple-cont"></div>
                                </div>
                                <div class="table mt-2">
                                    <h6 class="category text-primary">Genre : {{ movie?.Genre }}</h6>
                                    <h6 class="category text-info">Cast : {{ movie?.Actors }} </h6>
                                    <h6 class="category text-danger">Director : {{ movie?.Director }}</h6>
                                    <h6 class="category text-success">Ratings : {{ movie?.Ratings[0]?.Value }}</h6>
                                    <h6 class="category text-warning">Released : {{ movie?.Released }}</h6>
                                    <p class="card-description" style="height: 220px;"><strong>Plot </strong> - {{
                                        movie?.Plot }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<style>
.section-gray {
    background: #E5E5E5;
    padding: 60px 0 30px 0;
}

/*---------------------------------------------------------------------- /
CARDS
----------------------------------------------------------------------- */
.movieapp-card {
    display: inline-block;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.87);
    background: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.movieapp-card .card-image {
    height: 60%;
    position: relative;
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    border-radius: 6px;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.movieapp-card .card-image img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    pointer-events: none;
}

.movieapp-card .card-image .card-caption {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
    font-size: 1.3em;
    text-shadow: 0 2px 5px rgba(33, 33, 33, 0.5);
}

/* ============ Card Table ============ */
.movieapp-card .table {
    padding: 15px 30px;
}

/* ============ Card Blog ============ */
.movieappcard-raised {
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>