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
      let domNode = document.querySelector(".contentFlex");
      return ReactDOM.createPortal(
        <Slider max={this.props.movieCount} />,
        domNode
      );
    } else return;
  };

  render() {
    let movies;

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

    return [movies, this.renderSlider()];
  }
}

export default DisplayCards;

//slider won't add at 4 movies
