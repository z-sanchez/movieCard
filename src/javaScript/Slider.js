import React from "react";

class Slider extends React.Component {
  render() {
    return (
      <form>
        <input
          className="slider"
          defaultValue={0}
          type="range"
          min="1"
          max={this.props.max}
        />
      </form>
    );
  }
}

export default Slider;
