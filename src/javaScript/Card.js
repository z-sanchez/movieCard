import React from "react";
import Stars from "./Stars";
import { truncateText, writeNames } from "./utilityFunctions";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.setRating = this.setRating.bind(this);
    this.state = {
      detailsOn: false,
      stars: this.props.rating,
      updated: true,
    };
    this.props.saveCard(this.props.index, this.props.info, this.state.stars);
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

  setRating = (count) => {
    this.setState({ stars: count, updated: false });
    this.props.saveCard(this.props.index, this.props.info, count);
  };

  render() {
    if (this.state.detailsOn === true) {
      return (
        <li className="card__listItem--details">
          <div className="card--details">
            <h1 className="card__title--details">{this.props.info.title}</h1>
            <p className="card__text--details">
              {truncateText(this.props.info.desc, 197, 150)}
            </p>
            <Stars setRating={this.setRating} stars={this.state.stars} />
            <p className="card__info--details">
              Director: {writeNames(this.props.info.directors)} <br></br> Cast:{" "}
              {writeNames(this.props.info.actors)} <br></br>
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
              src={this.props.info.poster}
              alt="movie"
            ></img>
            <p className="card__text">{this.props.info.title}</p>
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

export default Card;

//Many warnings need to be resolved. Most are rooting from the several passings of states.
