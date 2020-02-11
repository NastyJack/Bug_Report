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
import moment from "moment";
import axios from "axios";
import Suggestions from "./components/suggestions";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_home: true,
      nav_search: true,
      nav_filters: false,
      nav_login: true,
      visible: false,
      searchResult: [],
      // issearchResult: false,
      logged_in: false,
      displaySugesstions: false,
      history: [],
      searchKeyWord: ""
      // isSearch: false
    };
  }

  hideSuggestion = value => {
    this.setState({
      displaySugesstions: value
    });
  };
  fetchSearchData = (value, sugesstions) => {
    if (!value) return;
    this.setState({
      searchKeyWord: value
    });
    axios
      .post("http://localhost:5000/search/", {
        title: value
      })
      .then(data => {
        if (data.status === 400) {
          console.log(data);
        }
        if (data && data.status === 200 && Object.keys(data.data).length > 0) {
          this.setState({
            searchResult: data.data,
            displaySugesstions: sugesstions
            // searchKeyWord: value
          });
        } else {
          console.log("No report found");
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  // handleSearchResults = (result, keyword) => {
  //   console.log("Search Handler");
  //   this.setState({
  //     // issearchResult: true,
  //     searchResult: result,
  //     searchKeyWord: keyword
  //   });
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of FILTER: ", values);
      }
    });
  };

  handleOnChange = event => {
    if (event.target.value.length > 0) {
      this.fetchSearchData(event.target.value, true);
    } else {
      this.setState({
        searchResult: []
      });
    }
  };

  disp_filter() {
    return (
      <Form>
        <Dropdown
          overlay={
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1">
                <Form.Item>
                  <RangePicker
                    defaultValue={[
                      moment("2015-06-06", dateFormat),
                      moment("2015-06-07", dateFormat)
                    ]}
                  />
                </Form.Item>
              </Menu.Item>

              <Menu.Item key="2" id="slider">
                <Form.Item>
                  <Slider
                    min={100}
                    max={1000}
                    range
                    defaultValue={[200, 500]}
                  />
                </Form.Item>
              </Menu.Item>
              <Menu.Item key="3" id="applyfilter">
                <Button onClick={e => this.handleSubmit}>Apply</Button>
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
      <div className="navigation_container" id="filter">
        <Row id="navigation_bar">
          <Col span={1}></Col>
          <Col span={2}>
            <Link to="/" onClick={this.ClearState}>
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

  handleFocus = () => {
    let start = 0;
    if (this.state.history.length > 0 && this.state.history.length < 5) {
      start = 0;
    } else {
      start = this.state.history.length - 5;
    }
    if (this.state.history.length > 0) {
      this.setState({
        displaySugesstions: true,
        searchResult: this.state.history.slice(start, this.state.history.length)
      });
    }
  };
  ClearState = () => {
    this.setState({
      searchResult: [],
      searchKeyWord: "",
      displaySugesstions: false
    });
  };
  handleSearchHistory = value => {
    let history = JSON.parse(localStorage.getItem("search") || "[]");
    history.push(value);
    localStorage.setItem("search", JSON.stringify(history));
  };
  componentDidMount() {
    console.log("COOKIES");
    const searchHistory = JSON.parse(localStorage.getItem("search") || "[]");
    if (searchHistory !== null) {
      this.setState({
        history: searchHistory
      });
    }
  }

  // handleSearchKeyword = value => {
  //   this.setState({
  //     searchKeyWord: value
  //   });
  // };
  frontpagecontent() {
    return (
      <Router>
        {this.linkbuttons()}
        <Switch>
          <Route exact path="/">
            <SearchPage
              fetchSearchData={this.fetchSearchData}
              handleOnChange={this.handleOnChange}
              handleFocus={this.handleFocus}
              handleSearchHistory={this.handleSearchHistory}
              handleClearState={this.ClearState}
              hideSuggestion={this.hideSuggestion}
            />
            {/* <div className="searchbox_center"> */}
            {this.state.searchResult.length > 0 &&
            this.state.displaySugesstions ? (
              <Suggestions
                results={this.state.searchResult}
                handleSuggestions={this.fetchSearchData}
              />
            ) : null}
            {/* </div> */}
          </Route>
          <Route path="/search">
            <ListPage
              search={this.state.searchKeyWord}
              details={this.state.searchResult}
              fetchSearchData={this.fetchSearchData}
              ClearState={this.ClearState}
            />
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
    console.log(this.state, "DATA ");
    return <div className="App">{this.frontpagecontent()}</div>;
  }
}

export default App;
