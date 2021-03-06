import React from "react";
import DisplayCards from "./DisplayCards";
import { APIkey, baseURL, configData, baseImageURL } from "./tmdbFunctions";
import { findDirector } from "./utilityFunctions";

class AddCards extends React.Component {
  constructor(props) {
    super(props);
    this.fade = this.createFade();
    this.state = {
      movies: [],
      cardCount: 0,
      adding: false,
    };
  }

  createFade = () => {
    let fade = document.createElement("div");
    fade.classList.add("fade");
    fade.addEventListener("click", this.exitWindow);
    return fade;
  };

  addFade = () => {
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

    document.querySelector(".fade").remove();
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
    let window = null;

    window = this.renderWindow();

    return (
      <div className="contentFlex">
        <div className="buttonFlex">
          <button className="buttons__add" onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <ul className="cardFlex">
          <DisplayCards
            movieCount={this.state.cardCount}
            movies={this.state.movies}
          />
        </ul>
        {window}
      </div>
    );
  }
}

export default AddCards;
