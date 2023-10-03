//Header
const closeArrow = document.querySelector("#close-arrow")
const logOutBtn = document.querySelector(".log-out")
const header = document.querySelector("header")

const enterNowBtn = document.querySelector(".enterNow-link")
const firstTimePage = document.querySelector(".first-time-container")
const selectedMoviePage = document.querySelector(".selected-movie")
const mainPage = document.querySelector(".main-page")
const mainPageCategoriesContainer = document.querySelector(".main-page-categories")
const mainPageRecommendations = document.querySelector(".main-page-recoommendations")
const searchResults = document.querySelector(".search-results")
const searchInput = document.querySelector(".input")
const sendBtn = document.querySelector('.send-btn')
const upperSection = document.querySelector(".upperSection-content")
const movieImgContainer = document.querySelector(".selected-movie-img")


//Details de Movie Selected (Popularidad, titulo, etc)
const showTitle = document.querySelector(".serie-details h1")
const showDate = document.querySelector(".serie-details-date")
const showPopularity = document.querySelector(".serie-details-popularity")
const showRating = document.querySelector(".rating-text h3")
const showVoteCount = document.querySelector(".rating-text p")
const textDescription = document.querySelector(".selectec-movie-description-main-text")
const movieCategories = document.querySelector(".selected-movie-categories")
const catTitle = document.querySelector(".cat-title")

const tvRecommendations = document.querySelector(".tv-recommendations")
const recommendationsContainer = document.querySelector(".recommendations-container")
const categoriesContainer = document.querySelector(".category-container-list")
const categoryViewContainer = document.querySelector(".category-view-container")
const categoryView = document.querySelector(".category-view")


const API_Key = "eb61c5c519a55c105e0e93fe49b04c93";
const imagesLoad = "https://image.tmdb.org/t/p/w500/"
const imagesLoad2 = "https://image.tmdb.org/t/p/w300/"
const API_movies = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const API_series = `tv/top_rated?language=en-US&page=1`