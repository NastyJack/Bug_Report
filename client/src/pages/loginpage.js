import React from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import axios from "axios";
import Register from "../components/registeruser";
import ReportSubmit from "../components/reportsubmit";
import { message } from "antd";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      success: false
    };
  }

  notification = () => {
    return notification.open({
      message: "Log in Successfull",
      description: "",
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Form Values:", values);
      }

      axios
        .post("http://localhost:5000/user/login", {
          email: values.email,
          password: values.password
        })
        .then(data => {
          if (data && data.status === 200) {
            this.notification();
            this.setState({
              admin: data.data.admin,
              success: data.data.success
            });
          }
        })
        .catch(error => {
          this.info();
        });
    });
  };

  info = () => {
    message.info("Invalid Credentials");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.success && this.state.admin) {
      this.props.history.push("/register");
      return <Register />;
    } else if (this.state.success) {
      this.props.history.push("/upload");
      return <ReportSubmit />;
    } else {
      return (
        <div className="container">
          <div className="login-wrapper">
            <Form className="login-form" onSubmit={this.handleSubmit}>
              <h1>Login</h1>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Please enter email id" }]
                })(
                  <Input
                    type="email"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter your mail id"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Enter your password" }]
                })(
                  <Input
                    type="password"
                    placeholder="Enter password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
  }
}
const LoginPage = Form.create({ name: "login-form" })(Login);
export default withRouter(LoginPage);
