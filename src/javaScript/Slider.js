import React from "react";

class Slider extends React.Component {
  updateDisplay = () => {
    this.props.changeCenter(parseInt(document.querySelector(".slider").value));
  };

  render() {
    return (
      <form>
        <input
          className="slider"
          defaultValue={this.props.value}
          type="range"
          min="1"
          max={this.props.max}
          onClick={this.updateDisplay}
        />
      </form>
    );
  }
}

export default Slider;
