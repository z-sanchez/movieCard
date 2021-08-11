import React from "react";
import logo from "./logo.png";
import movie from "./greenKnight.jpeg";

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
      movieOne: {
        poster: null,
        desc: null,
      },
      cardCount: 0,
    };
  }

  handleAdd = () => {
    this.setState({
      movieOne: {
        poster: movie,
        desc: "A fantasy re-telling of the medieval story of Sir Gawain and the Green Knight.",
      },
      cardCount: this.state.cardCount + 1,
    });
  };

  render() {
    let movieCard = null;

    if (this.state.cardCount !== 0) {
      movieCard = (
        <li key={this.state.cardCount}>
          <div className="card">
            <img
              className="card__image"
              src={this.state.movieOne.poster}
              alt="movie"
            ></img>
            <p className="card__text">{this.state.movieOne.desc}</p>
            <div className="card__button--background">
              <button className="card__button">...</button>
            </div>
          </div>
        </li>
      );
    } else {
      movieCard = (
        <li id="message" key="abcdef">
          <p id="message">No Movies Entered Yet</p>
        </li>
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

//div for card
/* <div className="card">
<img className="card__image" src={movie} alt="movie"></img>
<p className="card__text">
  A fantasy re-telling of the medieval story of Sir Gawain and the
  Green Knight.
</p>
<div className="card__button--background">
  <button className="card__button">...</button>
</div>
</div> */

//<p id="message">No Movies Entered Yet</p>

/* <div className="contentFlex">
          <div className="buttonFlex">
            <button className="buttons__add">Add</button>
          </div>
          <ul className="cardFlex">
            <li>
              <p id="message">No Movies Entered Yet</p>
            </li>
          </ul> </div> */
