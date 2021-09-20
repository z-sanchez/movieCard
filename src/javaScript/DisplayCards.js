import React from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";
import Card from "./Card";

class DisplayCards extends React.Component {
  constructor(props) {
    super(props);
    this.setCenter = this.setCenter.bind(this);
    this.state = {
      movies: this.props.movies,
      center: 2,
      cardsArray: [],
      cardCount: 0,
    };
  }

  setCenter = (newCenter) => {
    this.setState({ center: newCenter });
  };

  renderSlider = () => {
    if (this.props.movieCount >= 4) {
      let domNode = document.querySelector(".contentFlex");
      return ReactDOM.createPortal(
        <Slider
          max={this.props.movieCount}
          changeCenter={this.setCenter}
          value={this.state.center}
        />,
        domNode
      );
    } else return;
  };

  prepareMovies = (movies) => {
    var newSet = movies.map((item) => {
      return item;
    });

    if (this.props.movieCount < 4) {
      newSet = movies;
    } else {
      if (this.state.center === 1) {
        newSet[0] = movies[movies.length - 1];
        newSet[1] = movies[0];
        newSet[2] = movies[1];
      } else if (this.state.center === movies.length) {
        newSet[0] = movies[movies.length - 2];
        newSet[1] = movies[movies.length - 1];
        newSet[2] = movies[0];
      } else {
        newSet[0] = movies[this.state.center - 2];
        newSet[1] = movies[this.state.center - 1];
        newSet[2] = movies[this.state.center];
      }
    }

    return newSet.slice(0, 3);
  };

  render() {
    let movies = null;
    let info = null;

    if (this.props.movieCount !== 0) {
      if (this.state.cardCount !== this.props.movieCount) {
        info = this.state.movies[this.props.movieCount - 1];
        let newArray = this.state.cardsArray.map((item) => {
          return item;
        });
        newArray.push(<Card info={info} key={this.props.movieCount - 1} />);
        this.setState({
          cardsArray: newArray,
          cardCount: this.state.cardCount + 1,
        });
      }
      movies = this.state.cardsArray; //we are no longer dealing with the original components, therefore anything we do will no affect their states
      movies = this.prepareMovies(movies);
    } else {
      movies = (
        <li id="message" key="abcdef">
          <p id="message">No Movies Entered</p>
        </li>
      );
    }

    return [movies, this.renderSlider()];
  }
}

export default DisplayCards;
