import React from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";
import Card from "./Card";

class DisplayCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.movies,
    };
  }

  renderSlider = () => {
    if (this.props.movieCount >= 4) {
      ReactDOM.render(
        <Slider max={this.props.movieCount} />,
        document.querySelector(".contentFlex")
      );
    } else return;
  };

  render() {
    let movies;

    this.renderSlider();

    if (this.props.movieCount !== 0) {
      movies = this.props.movies;
      movies = movies.map((e, index) => {
        return <Card info={e} key={index} />;
      });
    } else {
      movies = (
        <li id="message" key="abcdef">
          <p id="message">No Movies Entered</p>
        </li>
      );
    }

    return movies;
  }
}

export default DisplayCards;

//slider won't add at 4 movies
