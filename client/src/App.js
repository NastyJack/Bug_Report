import React from "react";
// import "./App.css";
import SearchPage from "./pages/searchpage";
import LoginPage from "./pages/loginpage";
import ListPage from "./pages/listpage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
function App() {
  // state = {};
  return (
    <div className="App">
      <Router>
        <Link to="/">Search</Link>
        <Link to="/search">Items</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Route exact path="/">
            <SearchPage />
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

export default App;
