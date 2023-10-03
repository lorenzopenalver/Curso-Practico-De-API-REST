

const api = axios.create({
baseURL: "https://api.themoviedb.org/3/",
headers: {
    "Content-Type": "application/json;charset=utf-8"
},
params: {
    "api_key": API_Key,

}
});


function createCategories(categories, container) {
    container.innerHTML= ""
    categories.forEach(category => {  
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      const categoryTitleText = document.createTextNode(category.name);
      categoryTitle.addEventListener("click", ()=>{
        location.hash = `#category=${category.id}-${category.name}`
      })
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    })
  }
    


  async function createMovies( endPoint, container, id = {}) {
    const { data } = await api(endPoint, id);
    
    console.log(data);
    const movies = data.results;
  
    container.innerHTML = "";
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      const movieTitle = document.createElement("h3")
      const movieRelease = document.createElement("p")
      movieTitle.textContent = movie.name || movie.title
      movieRelease.textContent = movie.release_date
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener("click", ()=>{
        if (endPoint == API_series) {
            location.hash = `#tv=${movie.id}`
        }else if (endPoint == API_movies){
            location.hash = `#movie=${movie.id}`
        }
        else if (location.hash.startsWith("#movie=")){
            location.hash = `#movie=${movie.id}`
        }
        else if (location.hash.startsWith("#tv=")){
            location.hash = `#tv=${movie.id}`
        }
        else if (location.hash.startsWith("#search=")){
            location.hash = `#movie=${movie.id}`
            getMovieById(movie.id)
        }else if (location.hash.startsWith("#category=")){
            location.hash = `#movie=${movie.id}`;
            getMovieById(movie.id);
        }
       
       
      })
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w300/${movie.poster_path || movie.backdrop_path}`,
      );
  
      movieContainer.appendChild(movieImg);
      movieContainer.appendChild(movieTitle);
      movieContainer.appendChild(movieRelease);
      container.appendChild(movieContainer);
    });
  }
  async function getCategegoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesContainer);
  }
  async function createBiggerMovies( endPoint, container, id = {}) {
    const { data } = await api(endPoint, id);
    
    console.log(data);
    const movies = data.results;
  
    container.innerHTML = "";
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener("click", ()=>{
        location.hash = `#movie=${movie.id}`
      })
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`,
      );
  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  }


  async function getMovieById(id) {
    try{
    const { data: movie } = await api(`movie/${id}`);
    showTitle.textContent = movie.title;
    textDescription.textContent = movie.overview;
    showPopularity.textContent = `Popularity: ${movie.popularity}`
    showVoteCount.textContent = `From: ${movie.vote_count} users`
   showRating.textContent = `Vote average ⭐: ${movie.vote_average}`
    const movieImg = document.createElement('img');
    movieImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`,
      );
      movieImgContainer.appendChild(movieImg)
    createCategories(movie.genres, movieCategories);
  
    getRelatedMoviesById(id)
  }
    catch(e){
      console.log("error");
      console.error(e)
    }
  }
  async function serieById(id) {
    try{
       
    const { data: movie } = await api(`tv/${id}`);
    console.log(movie);
    showTitle.textContent = movie.name;
    showDate.textContent = movie.first_air_date;
    textDescription.textContent = movie.overview;
    showPopularity.textContent = `Popularity: ${movie.popularity}`
    showVoteCount.textContent = `From: ${movie.vote_count} users`
   showRating.textContent = `Vote average ⭐: ${movie.vote_average}`
    const movieImg = document.createElement('img');
    movieImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`,
      );
      movieImgContainer.appendChild(movieImg)
    createCategories(movie.genres, movieCategories);
  
    getRelatedSeriesById(id)
  }
    catch(e){
      console.log("error");
      console.error(e)
    }
  }

  
  async function getRelatedMoviesById(id) {
    console.log(id);
    try{
    createMovies(`/movie/${id}/recommendations`, movieCategories)
  }
  catch(e){
    console.log("Error de GetRelatedMoviesById");
    console.error(e)
  }
}
async function getRelatedSeriesById(id) {
    console.log(id);
    try{
    createMovies(`/tv/${id}/recommendations`, movieCategories)
  }
  catch(e){
    console.log("Error de GetRelatedMoviesById");
    console.error(e)
  }
}


/*   export async function createMovies( endPoint, container, id = {}) {
    const { data } = await api(endPoint, id);
    const movies = data.results;
  
    container.innerHTML = "";
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  } */