const APIkey = "7073e3669d6605fe5e80538c0c2c0429",
  baseURL = "https://api.themoviedb.org/3/";

let configData = null,
  baseImageURL = null;

let getConfig = function () {
  let url = "".concat(baseURL, "configuration?api_key=", APIkey);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      baseImageURL = data.images.secure_base_url;
      configData = data.images;
    })
    .catch((err) => {
      console.log("FAILED TO FETCH CONFIG DATA");
    });
};

let getMovieID = function (keyword) {
  let url = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIkey,
    "&query=",
    keyword
  );
  let movieID = null;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      movieID = data.results[0].id;
      getMore(movieID);
    })
    .catch((err) => {
      console.log("FAILED getMovie");
    });
};

let getMore = function (id, movie, array) {
  let url = "".concat(baseURL, "movie/", id, "?api_key=", APIkey);
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      movie.poster = data.poster_path;
      movie.title = data.original_title;
      movie.desc = data.overview;
      movie.ratings = data.vote_average;
      movie.release = data.release_date;
      movie.imdb = data.imdb_id;
      movie.runtime = data.runtime;
      movie.genre = data.genres;
    })
    .catch((err) => {
      console.log("FAILED getMore");
    });
};

export { getConfig, getMore };
export { APIkey, baseURL, configData, baseImageURL };
