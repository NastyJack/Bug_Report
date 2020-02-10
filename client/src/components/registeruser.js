import React from "react";
import { Form, Icon, Input, Button } from "antd";
import axios from "axios";
import { withRouter } from "react-router";

class RegisterUser extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Form Values:", values);
        if (values.password === values.confirmpassword) {
          axios
            .post("http://localhost:5000/user/register", {
              email: values.email,
              password: values.password
            })
            .then(data => {
              if (data && data.status === 200) {
                this.props.history.push("/login");
              }
            })
            .catch(error => {
              window.alert(error.response.data.message);
            });
        } else {
          window.alert("Passwords dont match");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Form className="register-form" onSubmit={this.handleSubmit}>
          <h1>Register User</h1>
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
            {getFieldDecorator("confirmpassword", {
              rules: [{ required: true, message: "Enter your password" }]
            })(
              <Input
                type="password"
                placeholder="Re-type password"
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
              Register User
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const Register = Form.create({ name: "register-form" })(
  withRouter(RegisterUser)
);
export default Register;
