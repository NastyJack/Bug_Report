import { Slider, InputNumber, Row, Col } from "antd";
import React from "react";

export default class CostSlider extends React.Component {
  state = {
    inputValue: 1000
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
    this.props.handleCost(this.state.inputValue);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Slider
        range
        min={1000}
        max={10000}
        onChange={this.onChange}
        // defaultValue={1000}
        value={typeof inputValue === "number" ? inputValue : 0}
      />
    );
  }
}
