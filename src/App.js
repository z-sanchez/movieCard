import React from "react";
import logo from "./logo.png";

class App extends React.Component {
  render() {
    return (
      <div className="grid">
        <nav className="navFlex">
          <ul>
            <li>
              <h2>Your List</h2>
            </li>
            <li>
              <h2>New Releases</h2>
            </li>
            <li>
              <h2>Watchlist</h2>
            </li>
          </ul>
          <img className="logo" src={logo} alt="logo"></img>
        </nav>
        <AddCards />
        <footer className="footer">
          <h1>Footer goes here</h1>
        </footer>
      </div>
    );
  }
}

class AddCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cardCount: 0,
      adding: false,
      center: 2,
    };
  }

  handleAdd = () => {
    this.setState({
      adding: true,
    });
    const fade = document.createElement("div");
    fade.classList.add("fade");

    fade.addEventListener("click", this.exitWindow);

    document.querySelector("body").appendChild(fade);
  };

  exitWindow = () => {
    this.setState({
      adding: false,
    });

    document.querySelector(".fade").remove();
  };

  handleSubmit = () => {
    const newMovie = {
      poster: null,
      desc: null,
    };
    let array = this.state.movies;

    newMovie.poster = document.querySelector("#posterFile").files[0].name;
    newMovie.desc = document.querySelector("#fDesc").value;

    array[this.state.cardCount] = newMovie;

    this.sliderAdd();

    document.querySelector(".fade").remove();

    this.setState({
      movies: array,
      adding: false,
      cardCount: this.state.cardCount + 1,
    });
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
      console.log(document.querySelector(".slider").value);
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
  render() {
    let movieCard = null,
      window = null;

    if (this.state.cardCount !== 0) {
      let movies = this.state.movies;
      movies = this.renderCards(movies);
      movieCard = movies.map((e, index) => {
        return (
          <li key={index}>
            <div className="card">
              <img className="card__image" src={e.poster} alt="movie"></img>
              <p className="card__text">{e.desc}</p>
              <div className="card__button--background">
                <button className="card__button">...</button>
              </div>
            </div>
          </li>
        );
      });
    } else {
      movieCard = (
        <li id="message" key="abcdef">
          <p id="message">No Movies Entered</p>
        </li>
      );
    }
    if (this.state.adding === true) {
      window = (
        <div className="addingWindow">
          <h1 className="addingWindow__title">New Movie</h1>
          <h2 className="addingWindow__poster">Upload Poster:</h2>
          <input type="file" id="posterFile"></input>
          <h2 className="addingWindow__description">Description:</h2>
          <input type="text" id="fDesc"></input>
          <input
            type="submit"
            className="submit"
            onClick={this.handleSubmit}
          ></input>
        </div>
      );

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

    return (
      <div className="contentFlex">
        <div className="buttonFlex">
          <button className="buttons__add" onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <ul className="cardFlex">{movieCard}</ul>
      </div>
    );
  }
}

export default App;
