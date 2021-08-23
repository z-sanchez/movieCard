import React from "react";
import logo from "./logo.png";
import unfilledStar from "./unfilledStar.png";
import filledStar from "./filledStar.png";
import { getConfig } from "./tmdbFunctions";

import { APIkey, baseURL, configData, baseImageURL } from "./tmdbFunctions";

class App extends React.Component {
  render() {
    getConfig();
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
      title: null,
      desc: null,
    };
    let array = this.state.movies;
    let movie = document.querySelector("#movieInput").value;
    let url = "".concat(
      baseURL,
      "search/movie?api_key=",
      APIkey,
      "&query=",
      movie
    );
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        let posterPath = data.results[0].poster_path;
        newMovie.poster = "".concat(
          baseImageURL,
          configData.poster_sizes[6],
          posterPath
        );
        newMovie.title = data.results[0].title;
        newMovie.desc = data.results[0].overview;
        array[this.state.cardCount] = newMovie;
        this.setState({
          movies: array,
          adding: false,
          cardCount: this.state.cardCount + 1,
        });
      })
      .catch((err) => {
        console.log("FAILED TO FIND MOVIE");
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
        return (
          <Card poster={e.poster} title={e.title} desc={e.desc} key={index} />
        );
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

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsOn: false,
      stars: null,
      rated: false,
    };
  }
  handleClick = () => {
    if (this.state.detailsOn === false) {
      this.setState({ detailsOn: true });
      const fade = document.createElement("div");
      fade.classList.add("fade");
      fade.addEventListener("click", this.exitWindow);
      document.querySelector(".cardFlex").appendChild(fade);
    } else this.exitWindow();
  };

  exitWindow = () => {
    document.querySelector(".fade").remove();
    this.setState({ detailsOn: false });
  };

  hoverStar = (e) => {
    let hovered = e.target.id;
    let stars = document.querySelector(".starFlex");

    for (let i = 0; i < hovered; i++) {
      stars.childNodes[i].src = filledStar;
    }
  };

  leaveStar = () => {
    let stars = document.querySelector(".starFlex");

    if (this.state.rated === true) {
      for (let i = 1; i < 6; i++) {
        stars.childNodes[i - 1].src = this.renderStars(i);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        stars.childNodes[i].src = unfilledStar;
      }
    }
  };

  fillStar = (e) => {
    let clicked = e.target.id;
    let stars = document.querySelector(".starFlex");

    for (let i = 0; i < clicked; i++) {
      stars.childNodes[i].src = filledStar;
    }

    this.setState({
      stars: clicked,
      rated: true,
    });
  };

  renderStars = (starNumber) => {
    if (this.state.stars != null) {
      if (this.state.stars >= starNumber) return filledStar;
      else return unfilledStar;
    } else return unfilledStar;
  };
  render() {
    if (this.state.detailsOn === true) {
      return (
        <li className="card__listItem--details">
          <div className="card--details">
            <h1 className="card__title--details">{this.props.title}</h1>
            <p className="card__text--details">
              {truncateText(this.props.desc)}
            </p>
            <div className="starFlex">
              <img
                id="1"
                src={this.renderStars(1)}
                alt="star"
                onMouseOver={this.hoverStar}
                onMouseLeave={this.leaveStar}
                onClick={this.fillStar}
              ></img>
              <img
                id="2"
                src={this.renderStars(2)}
                alt="star"
                onMouseOver={this.hoverStar}
                onMouseLeave={this.leaveStar}
                onClick={this.fillStar}
              ></img>
              <img
                id="3"
                src={this.renderStars(3)}
                alt="star"
                onMouseOver={this.hoverStar}
                onMouseLeave={this.leaveStar}
                onClick={this.fillStar}
              ></img>
              <img
                id="4"
                src={this.renderStars(4)}
                alt="star"
                onMouseOver={this.hoverStar}
                onMouseLeave={this.leaveStar}
                onClick={this.fillStar}
              ></img>
              <img
                id="5"
                src={this.renderStars(5)}
                alt="star"
                onMouseOver={this.hoverStar}
                onMouseLeave={this.leaveStar}
                onClick={this.fillStar}
              ></img>
            </div>
            <p className="card__info--details">
              Director: Fuck <br></br> Cast: Fuck, Fuck, Fuck <br></br>
            </p>
            <div className="card__button--background">
              <button className="card__button" onClick={this.handleClick}>
                ...
              </button>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="card__listItem">
          <div className="card">
            <img
              className="card__image"
              src={this.props.poster}
              alt="movie"
            ></img>
            <p className="card__text">{this.props.title}</p>
            <div className="card__button--background">
              <button className="card__button" onClick={this.handleClick}>
                ...
              </button>
            </div>
          </div>
        </li>
      );
    }
  }
}
export default App;

function truncateText(text) {
  if (text.length > 197) {
    text = text.slice(0, 150);
    text += "...";
  }
  return text;
}
