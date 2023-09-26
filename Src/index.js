

const API_Key = "eb61c5c519a55c105e0e93fe49b04c93";
const imagesLoad = "https://image.tmdb.org/t/p/w300"
const API_movies = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const API_series = `tv/top_rated?language=en-US&page=1`

const tvRecommendations = document.querySelector(".tv-recommendations")
const api = axios.create({
baseURL: "https://api.themoviedb.org/3/",
headers: {
    "Content-Type": "application/json;charset=utf-8"
},
params: {
    "api_key": API_Key,

}
});



export async function recommendationMovieGenerator() {
    console.log('entre');
    try {
        const {data} = await api(API_movies);
        console.log(data);
        
            const recommendationsContainer = document.querySelector(".recommendations-container")

          
            data.results.forEach(item => {
                //const anus = item.known_for[0]
                const recommendationCard = document.createElement("div")
               /*  console.log(recommendationCard); */
                recommendationCard.classList.add("cardMovieOrSerie")
                recommendationCard.id = item.id
                recommendationCard.addEventListener("click",() => {
                    location.hash = `movie=${recommendationCard.id}`
                    scrollTo(top);
                    return location.reload()
                })
              /*   recommendationCard.addEventListener('click', selectMoviePage(item.id)) */
                recommendationCard.innerHTML = `
                    <img src="${imagesLoad}${item.poster_path}">
                                    <h3>${item.title ||item.original_title ||  item.original_name}</h3>
                                    <p>${item.release_date || item.first_air_date}</p>
                    `
                recommendationsContainer.append(recommendationCard/* ,recommendationCard2,recommendationCard3 */)
            })



  

    }
    catch (e) {
        console.error(e);
        console.log("Error en el Fetch");
    }
};
    export async function recommendationTvGenerator() {
    try {
        const {data} = await api(API_series);
        console.log("-------");
        console.log(data);
        console.log("-------");
        /* console.log(data); */
       

            data.results.forEach(item => {
                //const anus = item.known_for[0]
                const recommendationTVCard = document.createElement("div")
                recommendationTVCard.id = item.id
                recommendationTVCard.addEventListener("click",() => {
                    location.hash = `tv=${recommendationTVCard.id}`
                    scrollTo(top);
                    return location.reload()
                })
                recommendationTVCard.innerHTML = `
                    <img src="${imagesLoad}${item.poster_path || item.backdrop_path}">
                                    <h3>${item.name || item.title ||item.original_title ||  item.original_name}</h3>
                                    <p>${item.release_date || item.first_air_date}</p>
                    `
                    tvRecommendations.append(recommendationTVCard/* ,recommendationCard2,recommendationCard3 */)
            })

        


  

    }
    catch (e) {
        console.error(e);
        console.log("Error en el Fetch");
    }
};

export async function movieCategories() {
    try {
        const {data} = await api(`genre/movie/list?language=en`);
        const categoriesContainer = document.querySelector(".category-container-list")
        const categories = data.genres
        categories.forEach(item=> {
            const categoryContainer = document.createElement("div")
            categoryContainer.classList.add("category-container")
            const categoryTitle = document.createElement("h3")
            categoryTitle.classList.add("category-title")
            categoryTitle.setAttribute("id", "id" + item.id)
            const categoryTextNode = document.createTextNode(item.name)
            categoryTitle.appendChild(categoryTextNode)
            categoryContainer.appendChild(categoryTitle)
            categoriesContainer.appendChild(categoryContainer)
        })
    }
    catch (e) {
        console.error(e);
        console.log("Error en el Fetch");
    }
};








/*     const recommendationCard2 = document.createElement("div")
                const recommendationCard3 = document.createElement("div") */

        /*  recommendationCard2.innerHTML = `
         <img src="${imagesLoad}${data.results[1].known_for[2].poster_path}">
                         <h3>${data.results[1].known_for[2].original_title}</h3>
                         <p>${data.results[1].known_for[2].release_date}</p>
         `
         recommendationCard3.innerHTML = `
         <img src="${imagesLoad}${data.results[2].known_for[2].poster_path}">
                         <h3>${data.results[2].known_for[2].original_title}</h3>
                         <p>${data.results[2].known_for[2].release_date}</p>
         ` */
/* async function entretainmentAmount() {
    try {
        const res = await fetch(popular_API);
        const data = await res.json();
        console.log("Entretainment");
        console.log(data);
        let animeNum = 0
        data.results.forEach(item =>{ item.known_for[0].media_type == "movie", animeNum++;


        })
        const animeAmount = document.createElement("p")
        animeAmount.textContent = `Movie Amount:
        ${animeNum}`
        animeAmount.style = ` position: Absolute; color: White; transform: rotate(90deg); left: 50px; font-size: 2.1rem; top:15px`
        animeCatAmount.append(animeAmount)

        
    }
    catch (e) {
        console.error(e);
        console.log("Error en el Fetch");
    };
}; */


  
/*  setHash() */
/* function setHash() {
    
if (location.hash == "#main-page") {
    mainPage.classList.remove("inactive")
    selectedMoviePage.classList.add("inactive")
    firstTimePage.classList.add("inactive")
}else{
    console.log("PUTAMADRE ABUELA");
}
} */



//entretainmentAmount();
