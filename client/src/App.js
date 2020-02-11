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
import WrappedTimeRelatedForm from "./components/veryverybadfilter";
import axios from "axios";
// import WrappedFilterForm from "./pages/FilterForm";

const { RangePicker } = DatePicker;
// const { getFieldDecorator } = this.props.form;
const dateFormat = "YYYY-MM-DD";

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
      logged_in: false,
      searchKeyWord: ""
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchResults = (result, keyword) => {
    console.log("Search Handler");
    this.setState({
      issearchResult: true,
      searchResult: result,
      searchKeyWord: keyword
    });
  };

  handleResult = results => {
    console.log("MAIN DATE", results);
    axios
      .post("http://localhost:5000/filter/", {
        title: this.state.searchKeyword,
        start: results[0],
        end: results[1]
      })
      .then(data => {
        console.log("FILTER DATA", data);
        // this.props.history.push("/search");
      });
  };

  disp_filter = () => {
    // console.log(this.state.searchKeyWord);
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">
              <WrappedTimeRelatedForm
                searchKeyword={this.state.searchKeyWord}
                handleResult={this.handleResult}
              />
            </Menu.Item>
          </Menu>
        }
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>
      </Dropdown>
    );
  };
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
    if (e.key === "3") {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  linkbuttons() {
    return (
      <div className="navigation_container" id="filter">
        <Row id="navigation_bar">
          <Col span={1}></Col>
          <Col span={2}>
            <Link to="/">
              <Button size="large">
                <Icon type="home" />
                Home
              </Button>
            </Link>
          </Col>
          <Col span={1}></Col>
          <Col span={6}></Col>
          <Col span={1}></Col>
          <Col span={4}></Col>
          <Col span={3}>
            <Route path="/searched">{this.disp_filter}</Route>
          </Col>
          <Col span={2}></Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Link to="/login">
              <Button size="large" type="default">
                <Icon type="login" />
                Login
              </Button>
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
