import React from "react";
import { Button, Row, Col, Slider, Form, Menu, Icon, Dropdown } from "antd";
import { DatePicker } from "antd";

import moment from "moment";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = e => {
    console.log("Insidehandlesubmitform");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of FILTER: ", values);
      }
    });
  };

  handleMenuClick = e => {
    console.log("inside handlemenuclick");
    if (e.key === "3") {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  pop = () => {
    console.log(this.props.form.g);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Dropdown
          overlay={
            <Menu onClick={e => this.handleSubmit}>
              <Menu.Item key="1">
                <Form.Item>
                  {getFieldDecorator("Datepicker", {
                    // initialValue: moment([
                    //   "2015",
                    //   "06",
                    //   "06",
                    //   "2015",
                    //   "06",
                    //   "07"
                    // ])
                  })(<RangePicker />)}
                </Form.Item>
              </Menu.Item>

              <Menu.Item key="2" id="slider">
                <Form.Item>
                  {getFieldDecorator("slider", {
                    initialValue: 1
                  })(<Slider min={100} max={1000} />)}
                </Form.Item>
              </Menu.Item>
              <Menu.Item key="3" id="applyfilter">
                {/* <Button onClick={e => this.handleSubmit()}>Apply</Button> */}
                <Button onClick={() => this.handleSubmit}>Apply</Button>
              </Menu.Item>
            </Menu>
          }
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <a className="ant-dropdown-link" href="#">
            <Button>
              <Icon type="filter" />
              Filters
            </Button>
            <Icon type="down" />
          </a>
        </Dropdown>
      </Form>
    );
  }
}

// const Filterbox = Form.create({ name: "filter" })(Filterform);
const WrappedFilterForm = Form.create({ name: "Apply" })(FilterForm);

export default WrappedFilterForm;
