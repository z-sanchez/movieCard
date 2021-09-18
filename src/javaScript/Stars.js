import React from "react";
import unfilledStar from "../images/unfilledStar.png";
import filledStar from "../images/filledStar.png";

class Stars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stars: this.props.stars,
      rated: false,
    };
  }

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

    this.props.setRating(clicked);

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
    return (
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
    );
  }
}

export default Stars;
