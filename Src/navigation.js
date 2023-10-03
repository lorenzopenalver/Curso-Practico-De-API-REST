
//Window listeners
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)
window.addEventListener("hashchange", ()=> {
    location.reload()
})

//Declaración de objetos que voy a traer del DOM (Pueden cambiarse luego llevandolos a una función o sacando los que ya están en una función, a analizar luego)


const errorTxt = document.createElement("p")

//Añadir Eventlisteners para poder cambiar de Hash entre vista de log-in y main page
logOutBtn.addEventListener("click", logOut)
enterNowBtn.addEventListener("click", home)
closeArrow.addEventListener('click', validatorHash);
sendBtn.addEventListener('click', ()=>{
    location.hash = `#search=${searchInput.value}`
})
//Location Hash y agregar clases inactive

function logOut() {
    location.hash = "#log-in"
}
function validatorHash() {
    const body = document.querySelector("body")
    location.hash = window.history.back()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function home() {
    
    location.hash = "#home"
    
}



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

    } else if (location.hash.startsWith("#tv=")) {
        tvPage();
    } else if (location.hash.startsWith("#category=")) {
        category();
    } else if (location.hash.startsWith("#home")) {
        homePage();
    } else {
        logIn();
        

    };
  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function homePage() {
    closeArrow.classList.add("inactive")
    catTitle.classList.remove("inactive")
    categoryView.classList.add("inactive")
    console.log("Home");
    mainPageRecommendations.classList.remove("inactive")
    createMovies(API_series, tvRecommendations);
    createMovies(API_movies, recommendationsContainer);
    getCategegoriesPreview();
    mainPageCategoriesContainer.classList.remove("inactive")
    searchResults.classList.add("inactive")
    mainPage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    selectedMoviePage.classList.add("inactive")
    
};
function search() {
    searchPage();

   
}

const recommendationAllCard = document.createElement("div")

async function searchPage() {
    header.classList.add("inactive")
    closeArrow.classList.remove("inactive")
    logOutBtn.classList.add("inactive")
    catTitle.classList.add("inactive")
    searchResults.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    selectedMoviePage.classList.add("inactive")
    mainPage.classList.remove("inactive")
    mainPageCategoriesContainer.classList.add("inactive")
    mainPageRecommendations.classList.add("inactive")
    console.log("search");
    const query = decodeURI(location.hash.split("=")[1]);
    createMovies("search/movie" ,searchResults,{ params: {
      
        query: query
      }})
    
};


function category() {
    closeArrow.classList.remove("inactive")
    logOutBtn.classList.add("inactive")
    categoryView.classList.remove("inactive")
    searchResults.classList.add("inactive")
    firstTimePage.classList.add("inactive")
    selectedMoviePage.classList.add("inactive")
    mainPage.classList.remove("inactive")
    mainPageCategoriesContainer.classList.add("inactive")
    mainPageRecommendations.classList.add("inactive")
    upperSection.classList.add("inactive")
    const [_, categoryData] =location.hash.split("=");
    const [categoryId, categoryName] = categoryData.split("-")
    catTitle.innerText = categoryName.split("%20").join(" ")
    createMovies('discover/movie', categoryViewContainer,{ params: {
        with_genres: categoryId
      }});
    
};
function logIn() {
    header.classList.add("inactive")
    console.log("logIn");
    closeArrow.classList.add("inactive")
    logOutBtn.classList.add("inactive")
    mainPage.classList.add("inactive")
    firstTimePage.classList.remove("inactive")
    selectedMoviePage.classList.add("inactive")
};

function moviePage() {
    header.classList.add("inactive")
    selectedMoviePage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    mainPage.classList.add("inactive")
    const [_, movieId] = location.hash.split("=")
    getMovieById(movieId);
    
};
function tvPage() {
    selectedMoviePage.classList.remove("inactive")
    firstTimePage.classList.add("inactive")
    mainPage.classList.add("inactive")
    const [_, serieID] = location.hash.split("=")
    serieById(serieID);
};



//Crear vista de SelectedMovie y Series
/* 
async function createShowMovie() {
    const movieImg = document.createElement("img")

    try {
        const { data } = await api(API_movies || API_series);
        data.results.find(item => {
            if (location.hash == `#movie=${item.id}`) {
                movieImg.src = `${imagesLoad}${item.poster_path}`;
                showTitle.textContent = `${item.name || item.title || item.original_title || item.original_name}`;
                showDate.textContent = `${item.release_date || item.first_air_date}`;
                showPopularity.textContent = `Popularity: ${item.popularity}`;
                showRating.innerHTML = `Rating ⭐: <br> ${item.vote_average}`;
                showVoteCount.textContent = `From ${item.vote_count} users`;
                if (!item.overview) {
                    console.log("Entra");
                    textDescription.textContent = " No se encontró descripción válida"
                } else {

                    textDescription.textContent = `${item.overview}`
                }


            }

        })
        movieImgContainer.appendChild(movieImg)
    } catch (e) {
        console.error(e)
    }
}
async function createShowSeries() {
    const movieImgContainer = document.querySelector(".selected-movie-img");
    const showTitle = document.querySelector(".serie-details h1");
    const showDate = document.querySelector(".serie-details-date");
    const showPopularity = document.querySelector(".serie-details-popularity");
    const showRating = document.querySelector(".rating-text h3");
    const showVoteCount = document.querySelector(".rating-text p");
    const textDescription = document.querySelector(".selectec-movie-description-main-text");
    const movieImg = document.createElement("img");
    try {
        const { data } = await api(API_series);
        data.results.find(item => {
            if (location.hash == `#tv=${item.id}`) {
                movieImg.src = `${imagesLoad}${item.poster_path}`;
                showTitle.textContent = `${item.name || item.title || item.original_title || item.original_name}`;
                showDate.textContent = `${item.release_date || item.first_air_date}`;
                showPopularity.textContent = `Popularity: ${item.popularity}`;
                showRating.innerHTML = `Rating ⭐: <br> ${item.vote_average}`;
                showVoteCount.textContent = `From ${item.vote_count} users`;
                textDescription.textContent = `${item.overview}`;
            }
        })
        movieImgContainer.appendChild(movieImg)
    } catch (e) {
        console.error(e)
    };

};
 */