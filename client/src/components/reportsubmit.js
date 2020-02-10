import React from "react";
import { Form, Input, DatePicker, Button, notification } from "antd";
import moment from "moment";
import UploadImage from "./uploadImage";
import axios from "axios";
import ReportCost from "./slider";

class ReportSubmitForm extends React.Component {
  state = {
    costValue: 1000,
    url: "empty"
  };

  notification() {
    return notification.open({
      message: "Report Submitted",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      axios
        .post("http://localhost:5000/reports/", {
          title: values.title,
          shortDescription: values.shortDescription,
          description: values.description,
          publishedDate: new Date(values.publishedDate._d).toDateString(),
          cost: this.state.costValue,
          image: this.state.url
        })
        .then(data => {
          if (data && data.status === 200) {
            this.notification();
            console.log("Report Submitted");
          }
        });
    });
  };
  handleCost = value => {
    this.setState({
      costValue: value
    });
  };

  handleImage = link => {
    this.setState({
      url: link
    });
  };

  render() {
    const { TextArea } = Input;
    const dateFormat = "DD/MM/YYYY";
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        {this.Notification}
        <Form className="reportform" onSubmit={this.handleSubmit}>
          <h1>Upload Report</h1>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Enter Report Title" }]
            })(<Input placeholder="Report Title" type="text" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("shortDescription", {
              rules: [{ required: true, message: "Enter Short Description" }]
            })(
              <TextArea
                row={2}
                placeholder="Short description of report"
                type="text"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Enter Report Description" }]
            })(
              <TextArea row={4} placeholder="Report Description" type="text" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("publishedDate", {
              rules: [{ required: true, message: "Enter Published Date" }]
            })(
              <DatePicker
                defaultValue={moment("01/01/2018", dateFormat)}
                format={dateFormat}
              />
            )}
          </Form.Item>
          <Form.Item>
            <ReportCost handleCost={this.handleCost} />
          </Form.Item>
          <Form.Item>
            <UploadImage handleImage={this.handleImage} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Upload Report
          </Button>
        </Form>
      </div>
    );
  }
}

const ReportSubmit = Form.create("reportform")(ReportSubmitForm);
export default ReportSubmit;
