import React from "react";
import unfilledStar from "../images/unfilledStar.png";
import filledStar from "../images/filledStar.png";
import { truncateText, writeNames } from "./utilityFunctions";

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
            <h1 className="card__title--details">{this.props.info.title}</h1>
            <p className="card__text--details">
              {truncateText(this.props.info.desc, 197, 150)}
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
