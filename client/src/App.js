import React from "react";
// import "./App.css";
import "antd/dist/antd.css";
import SearchPage from "./pages/searchpage";
import LoginPage from "./pages/loginpage";
import ListPage from "./pages/listpage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  state = {
    searchResult: false
  };

  handleSearchResults = () => {
    console.log("Search Handler");
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Link to="/">Search</Link>
          <Link to="/search">Items</Link>
          <Link to="/login">Login</Link>
          <Switch>
            <Route exact path="/">
              <SearchPage handleSearchResults={this.handleSearchResults} />
            </Route>
            <Route path="search">
              <ListPage />
            </Route>
            <Route path="login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
