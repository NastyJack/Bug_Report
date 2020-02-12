// import { Slider, InputNumber, Row, Col } from "antd";
import React from "react";

import { Slider } from "antd";
export default class RangeSlider extends React.Component {
  onChange = value => {
    // console.log("onChange: ", value);
    // this.props.handleCosts(value);
    this.props.handleCosts(value);
  };

  onAfterChange = value => {
    // console.log("onAfterChange: ", value);
    this.props.handleCosts(value);
  };

  render() {
    // console.log("PORS", this.props);
    return (
      <div>
        <Slider
          range
          min={1000}
          max={10000}
          step={1}
          defaultValue={[2000, 5000]}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        />
      </div>
    );
  }
}
