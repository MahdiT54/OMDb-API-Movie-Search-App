// Titles: http://www.omdbapi.com/?s=thor&page=1&apikey=1c44ead
// details: http://www.omdbapi.com/?i=tt3896198&apikey=1c44ead

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1c44ead`; // dynamic
  const res = await fetch(`${URL}`);
  const data = await res.json();
  //   console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster !== "N/A") {
      moviePoster = movies[idx].Poster;
    } else {
      moviePoster = "image_not_found.png";
    }
    movieListItem.innerHTML = `
    <div class="search-item-thumbnail">
        <img src="${moviePoster}" alt="" />
    </div>
    <div class="search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>
    `;
    searchList.appendChild(movieListItem);
  }
}
