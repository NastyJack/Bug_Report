import { Slider, Form, DatePicker, TimePicker, Button } from "antd";
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
const { MonthPicker, RangePicker } = DatePicker;

class TimeRelatedForm extends React.Component {
  formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  handleSubmit = e => {
    e.preventDefault();
    let fdates = [];

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.daterange.map(item => {
        fdates.push(this.formatDate(new Date(item._d).toDateString()));
      });
      console.log("FDARE", fdates);
      this.props.handleResult(fdates);
    });
  };

  render() {
    console.log("PROPS", this.props.searchKeyword);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "Please select time!" }]
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="RangePicker">
          {getFieldDecorator("daterange", rangeConfig)(<RangePicker />)}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create({ name: "time_related_controls" })(
  TimeRelatedForm
);

export default withRouter(WrappedTimeRelatedForm);
