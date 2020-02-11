import { Slider, InputNumber, Row, Col } from "antd";
import React from "react";

export default class ReportCost extends React.Component {
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
      <Row>
        <Col span={12}>
          <Slider
            min={1000}
            max={10000}
            onChange={this.onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1000}
            max={10000}
            style={{ marginLeft: 16 }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}
