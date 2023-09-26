//Imports
import {recommendationMovieGenerator,recommendationTvGenerator,movieCategories} from "./index.js"
//Window listeners
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)
//API, Axios e ImagesLoad
const API_Key = "eb61c5c519a55c105e0e93fe49b04c93";
const imagesLoad = "https://image.tmdb.org/t/p/w500"
const API_movies = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const API_series = `tv/top_rated?language=en-US&page=1`
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_Key,
    
    }
    });

//Declaración de objetos que voy a traer del DOM (Pueden cambiarse luego llevandolos a una función o sacando los que ya están en una función, a analizar luego)
const hashEnterNow = document.querySelector(".enterNow-link")
const logOutBtn = document.querySelector(".log-out")
//Añadir Eventlisteners para poder cambiar de Hash entre vista de log-in y main page
logOutBtn.addEventListener("click", logOut)
hashEnterNow.addEventListener('click', validatorHash);
//Comienzo de código
function logOut() {
    scrollTo(top);
    location.hash = "#log-in"
}
function validatorHash() {

    location.hash = "#home"
}

const firstTimePage = document.querySelector(".first-time-container")
const selectedMoviePage = document.querySelector(".selected-movie")
const mainPage = document.querySelector(".main-page")

function navigator() {
/*     const hash = {
        "#search=": () => search(),
        "#movie=": () => moviePage(),
        "#category": () => category(),
        "#home": () => homePage(),
        "#log-in": () => logIn(),

    }
     hash[location.hash] */
    if (location.hash.startsWith("#search=")) {
        search();
    }
    else if (location.hash.startsWith("#movie=")) {
        moviePage();
        
    }else if (location.hash.startsWith("#tv=")) {
        tvPage();
    } else if (location.hash.startsWith("#Category=")) {
        category();
    } else if (location.hash.startsWith("#home")) {
        homePage();
    } else {
        logIn();    
        
    };
};

function homePage() {
    console.log("Home");
    recommendationMovieGenerator();
recommendationTvGenerator();
movieCategories()
    mainPage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    selectedMoviePage.classList.add("inactive")
};

function search() {
    console.log("search");
};


function category() {
    console.log("Category");
};
function logIn() {
    console.log("logIn");
    mainPage.classList.add("inactive")
    firstTimePage.classList.remove("inactive")
    selectedMoviePage.classList.add("inactive")
};

function moviePage() {
    createShowMovie();
    selectedMoviePage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    mainPage.classList.add("inactive")
};
function tvPage() {
    createShowSeries();
    selectedMoviePage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    mainPage.classList.add("inactive")
};

async function createShowMovie(){
    
    const movieImgContainer = document.querySelector(".selected-movie-img")
    const showTitle = document.querySelector(".serie-details h1")
    const showDate = document.querySelector(".serie-details-date")
    const showPopularity = document.querySelector(".serie-details-popularity")
    const showRating = document.querySelector(".rating-text h3")
    const showVoteCount = document.querySelector(".rating-text p")
    const textDescription = document.querySelector(".selectec-movie-description-main-text")
    const movieImg = document.createElement("img")
    
    try {
        const {data} = await api(API_movies || API_series);
        data.results.find(item => {
            if (location.hash == `#movie=${item.id}`){
                movieImg.src = `${imagesLoad}${item.poster_path}`;
                showTitle.textContent = `${item.name || item.title ||item.original_title ||  item.original_name}`;
                showDate.textContent = `${item.release_date || item.first_air_date}`;
                showPopularity.textContent = `Popularity: ${item.popularity}`;
                showRating.innerHTML = `Rating ⭐: <br> ${item.vote_average}`;
                showVoteCount.textContent = `From ${item.vote_count} users`;
                if (!item.overview){
                    console.log("Entra");
                    textDescription.textContent = " No se encontró descripción válida"
                }else{
                
                    textDescription.textContent = `${item.overview}` 
                }
               

            }
     
    })
        movieImgContainer.appendChild(movieImg)
    }catch(e){
        console.error(e)
    }
}
async function createShowSeries(){
    const movieImgContainer = document.querySelector(".selected-movie-img");
    const showTitle = document.querySelector(".serie-details h1");
    const showDate = document.querySelector(".serie-details-date");
    const showPopularity = document.querySelector(".serie-details-popularity");
    const showRating = document.querySelector(".rating-text h3");
    const showVoteCount = document.querySelector(".rating-text p");
    const textDescription = document.querySelector(".selectec-movie-description-main-text");
    const movieImg = document.createElement("img");
    try {
        const {data} = await api(API_series);
        data.results.find(item => {
            if (location.hash == `#tv=${item.id}`){
                movieImg.src = `${imagesLoad}${item.poster_path}`;
                showTitle.textContent = `${item.name || item.title ||item.original_title ||  item.original_name}`;
                showDate.textContent = `${item.release_date || item.first_air_date}`;
                showPopularity.textContent = `Popularity: ${item.popularity}`;
                showRating.innerHTML = `Rating ⭐: <br> ${item.vote_average}`;
                showVoteCount.textContent = `From ${item.vote_count} users`;
                textDescription.textContent = `${item.overview}`;
            }
    })
        movieImgContainer.appendChild(movieImg)
    }catch(e){
        console.error(e)
    };
    
};
