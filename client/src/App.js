import React from "react";
import "./pages/css/NavBarBox.css";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Row, Col, Slider, Form, Menu, Icon, Dropdown } from "antd";
import { DatePicker } from "antd";
import SearchPage from "./pages/searchpage";
import LoginPage from "./pages/loginpage";
import ListPage from "./pages/listpage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./components/registeruser";
import ReportSubmit from "./components/reportsubmit";
const { RangePicker } = DatePicker;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_home: true,
      nav_search: true,
      nav_filters: false,
      nav_login: true,
      visible: false,
      searchResult: [],
      issearchResult: false,
      logged_in: false
    };
  }
  handleSearchResults = result => {
    console.log("Search Handler");
    this.setState({
      issearchResult: true,
      searchResult: result
    });
  };

  disp_filter() {
    return (
      <Form>
        <Dropdown
          overlay={
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1">
                {" "}
                <RangePicker />
              </Menu.Item>
              <Menu.Item key="2">
                <Slider range={(0, 1000)} defaultValue={[20, 50]} />
              </Menu.Item>
              <Menu.Item key="3">
                <Button htmlType="submit">Apply</Button>
              </Menu.Item>
            </Menu>
          }
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <a className="ant-dropdown-link" href="#">
            <Button>Filters</Button> <Icon type="down" />
          </a>
        </Dropdown>
      </Form>
    );
  }

  handleMenuClick = e => {
    if (e.key === "3") {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  linkbuttons() {
    return (
      <div id="filter">
        <Row id="navigation_bar">
          <Col span={1}></Col>
          <Col span={2}>
            <Link to="/">
              <Button type="primary">Home</Button>
            </Link>
          </Col>
          <Col span={1}></Col>
          <Col span={6}></Col>
          <Col span={1}></Col>
          <Col span={4}></Col>
          <Col span={3}>
            <Route path="/search"> {this.disp_filter()}</Route>
          </Col>
          <Col span={2}></Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }

  frontpagecontent() {
    return (
      <Router>
        {this.linkbuttons()}
        <Switch>
          <Route exact path="/">
            <SearchPage handleSearchResults={this.handleSearchResults} />
          </Route>
          <Route path="/search">
            <ListPage details={this.state.searchResult} />
          </Route>
          <Route path="/login">
            <LoginPage logged_in={this.state.logged_in} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/upload">
            <ReportSubmit />
          </Route>
        </Switch>
      </Router>
    );
  }

  render() {
    return <div className="App">{this.frontpagecontent()}</div>;
  }
}
