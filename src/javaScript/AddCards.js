import React from "react";
import Card from "./Card";
import { APIkey, baseURL, configData, baseImageURL } from "./tmdbFunctions";
import { findDirector } from "./utilityFunctions";

class AddCards extends React.Component {
  constructor(props) {
    super(props);
    this.fade = document.createElement("div");
    this.state = {
      movies: [],
      cardCount: 0,
      adding: false,
    };
  }

  addFade = () => {
    this.fade.classList.add("fade");
    this.fade.addEventListener("click", this.exitWindow);
    document.querySelector("body").appendChild(this.fade);
  };

  handleAdd = () => {
    this.setState({
      adding: true,
    });

    this.addFade();
  };

  exitWindow = () => {
    this.setState({
      adding: false,
    });

    document.querySelector(".fade").remove();
  };

  handleSubmit = () => {
    var newMovie = {
      search: null,
      poster: null,
      title: null,
      desc: null,
      actors: null,
      directors: null,
      ratings: null,
      release: null,
      imdb: null,
      runtime: null,
    };
    var array = this.state.movies;
    let search = document.querySelector("#movieInput").value;
    let movieID = null;
    let url = "".concat(
      baseURL,
      "search/movie?api_key=",
      APIkey,
      "&query=",
      search
    );
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        movieID = data.results[0].id;
        url = "".concat(baseURL, "movie/", movieID, "?api_key=", APIkey);
        return fetch(url);
      })
      .then((result) => result.json())
      .then((data) => {
        newMovie.poster = "".concat(
          baseImageURL,
          configData.poster_sizes[6],
          data.poster_path
        );
        newMovie.title = data.original_title;
        newMovie.desc = data.overview;
        newMovie.ratings = data.vote_average;
        newMovie.release = data.release_date;
        newMovie.imdb = data.imdb_id;
        newMovie.runtime = data.runtime;
        newMovie.genre = data.genres;
        url = "".concat(
          baseURL,
          "movie/",
          movieID,
          "/credits?api_key=",
          APIkey
        );
        return fetch(url);
      })
      .then((result) => result.json())
      .then((data) => {
        let cast = data.cast.slice(0, 4).map((item) => item.name);
        newMovie.actors = cast;
        let director = data.crew.filter(findDirector).map((item) => item.name);
        newMovie.directors = director;
        array[this.state.cardCount] = newMovie;
        this.setState({
          movies: array,
          cardCount: this.state.cardCount + 1,
          adding: false,
        });
      })
      .catch((err) => {
        console.log("FAILED getMovie");
      });

    this.sliderAdd();

    document.querySelector(".fade").remove();
  };

  sliderAdd = () => {
    if (this.state.cardCount + 1 === 4) {
      this.sliderOn();
    } else if (this.state.cardCount + 1 >= 5)
      document.querySelector(".slider").max = this.state.cardCount + 1;
    else return;
  };

  sliderOn = () => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 1;
    slider.max = this.state.cardCount + 1;
    slider.value = 1;
    slider.classList.add("slider");
    slider.addEventListener("change", () => {
      this.setState({
        center: document.querySelector(".slider").value,
      });
    });
    document.querySelector(".contentFlex").appendChild(slider);
  };

  renderCards = (movies) => {
    let newMovies = [null];

    if (movies.length < 4) return movies;

    if (this.state.center - 1 === 0) {
      newMovies[0] = movies[movies.length - 1];
      newMovies[1] = movies[0];
      newMovies[2] = movies[1];
    } else if (this.state.center == movies.length) {
      newMovies[0] = movies[movies.length - 2];
      newMovies[1] = movies[movies.length - 1];
      newMovies[2] = movies[0];
    } else {
      newMovies[0] = movies[this.state.center - 2];
      newMovies[1] = movies[this.state.center - 1];
      newMovies[2] = movies[this.state.center];
    }

    return newMovies;
  };

  renderWindow = () => {
    if (this.state.adding === true) {
      return (
        <div className="addingWindow">
          <h1 className="addingWindow__title">New Movie</h1>
          <h2 className="addingWindow__findMovie">Search:</h2>
          <input type="text" id="movieInput"></input>
          <input
            type="submit"
            className="submit"
            onClick={this.handleSubmit}
          ></input>
        </div>
      );
    } else return;
  };
  render() {
    let movieCard = null,
      window = null;

    if (this.state.cardCount !== 0) {
      let movies = this.state.movies;
      movies = this.renderCards(movies);
      movieCard = movies.map((e, index) => {
        return <Card info={e} key={index} />;
      });
    } else {
      movieCard = (
        <li id="message" key="abcdef">
          <p id="message">No Movies Entered</p>
        </li>
      );
    }
    window = this.renderWindow();

    return (
      <div className="contentFlex">
        <div className="buttonFlex">
          <button className="buttons__add" onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <ul className="cardFlex">{movieCard}</ul>
        {window}
      </div>
    );
  }
}

export default AddCards;
