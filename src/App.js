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

    this.setState({
      movies: array,
      adding: false,
      cardCount: this.state.cardCount + 1,
    });

    document.querySelector(".fade").remove();

    if (this.state.cardCount === 3) {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = 1;
      slider.max = this.state.cardCount + 1;
      slider.value = 1;
      slider.classList.add("slider");
      document.querySelector(".contentFlex").appendChild(slider);
    }
  };

  render() {
    let movieCard = null,
      window = null;

    if (this.state.cardCount !== 0) {
      const movies = this.state.movies;
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
          <p id="message">No Movies Entered Yet</p>
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
