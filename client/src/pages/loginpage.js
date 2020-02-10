import React from "react";
import { Form, Icon, Input, Button } from "antd";
import axios from "axios";
import Register from "../components/registeruser";
import ReportSubmit from "../components/reportsubmit";
import { message } from "antd";

class Login extends React.Component {
  state = {
    admin: false,
    success: false,
    rememberMe: false,
    user: ""
  };

  // componentDidMount() {
  //   console.log(this.props);
  // }
  handleSubmit = event => {
    console.log("LOGIN PROPS", this.props);
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
          // console.log(data);
          if (data && data.status === 200) {
            this.setState({
              admin: data.data.admin,
              success: data.data.success
            });
            this.props.handleLogin(this.state.admin, this.state.success);
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
    console.log("LOGIN PAGE");
    const { getFieldDecorator } = this.props.form;
    if (this.props.isLoggedIn && this.props.admin) {
      return <Register />;
    } else if (this.props.isLoggedIn) {
      return <ReportSubmit />;
    } else {
      return (
        <div className="container">
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
      );
    }
  }
}
const LoginPage = Form.create({ name: "login-form" })(Login);
export default LoginPage;
