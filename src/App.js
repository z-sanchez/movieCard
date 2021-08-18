import React from "react";
import logo from "./logo.png";
import star from "./star.png";

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
    } else return;
  };
  render() {
    let movieCard = null,
      window = null;

    if (this.state.cardCount !== 0) {
      let movies = this.state.movies;
      movies = this.renderCards(movies);
      movieCard = movies.map((e, index) => {
        return <Card poster={e.poster} desc={e.desc} key={index} />;
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

  render() {
    if (this.state.detailsOn === true) {
      return (
        <li className="card_listItem--details">
          <div className="card--details">
            <h1 className="card__title--details">THE GREEN KNIGHT</h1>
            <p className="card__text--details">{this.props.desc}</p>
            <div className="starFlex">
              <img src={star} alt="star"></img>
              <img src={star} alt="star"></img>
              <img src={star} alt="star"></img>
              <img src={star} alt="star"></img>
              <img src={star} alt="star"></img>
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
        <li>
          <div className="card">
            <img
              className="card__image"
              src={this.props.poster}
              alt="movie"
            ></img>
            <p className="card__text">{this.props.desc}</p>
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
