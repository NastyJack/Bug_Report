import React from "react";
import { Input } from "antd";
import axios from "axios";
import Suggestions from "../components/suggestions";
import { withRouter } from "react-router-dom";

import "./css/autotype.css";

const { Search } = Input;

class SearchPage extends React.Component {
  state = {
    autotype: true,
    fetchedData: [],
    displaySugesstions: false,
    history: []
  };

  AutoType() {
    if (this.state.autotype)
      return (
        <span className="typing-words">
          <span>
            Hydroponics Value Markets - Growth Trends across Forecasts (2019 -
            2024)
          </span>
          <span>
            Dental Type Sterilization Market - Growth Trend and Forecast (2019 -
            2024)
          </span>
          <span>
            Agricultural Fumigants Market - Growth Trends and Forecast (2019 -
            2024)
          </span>
          <span>
            Liquid Fertilizers Market Type - Growth Trends and Forecasts (2019 -
            2024)
          </span>
          <span>Explore our wide collection of reports! </span>
        </span>
      );
  }

  componentDidMount() {
    console.log("COOKIES");
    const searchHistory = JSON.parse(localStorage.getItem("search") || "[]");
    if (searchHistory !== null) {
      this.setState({
        history: searchHistory
      });
    }
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
        fetchedData: this.state.history.slice(start, this.state.history.length)
      });
    }
  };
  handleSearch = value => {
    let history = JSON.parse(localStorage.getItem("search") || "[]");
    history.push(value);
    localStorage.setItem("search", JSON.stringify(history));
  };

  fetchSearchData = (value, sugesstions) => {
    axios
      .post("http://localhost:5000/search/", {
        title: value
      })
      .then(data => {
        if (data.status === 400) {
          console.log(data);
        }
        if (data && data.status === 200 && Object.keys(data.data).length > 0) {
          this.setState(
            {
              fetchedData: data.data,
              displaySugesstions: sugesstions
            },
            () => {
              this.props.handleSearchResults(this.state.fetchedData, value);
              if (this.state.displaySugesstions === false) {
                this.props.history.push("/search");
              }
            }
          );
        } else {
          console.log("No report found");
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  handleFocus = () => {
    console.log("FOCUS");
    let start = 0;
    if (this.state.history.length > 0 && this.state.history.length < 5) {
      start = 0;
    } else {
      start = this.state.history.length - 5;
    }
    if (this.state.history.length > 0) {
      this.setState({
        displaySugesstions: true,
        fetchedData: this.state.history.slice(start, this.state.history.length)
      });
    }
  };

  render() {
    return (
      <div id="searchbox_center">
        {this.AutoType()}
        <Search
          onFocus={this.handleFocus}
          className="searchbar"
          onClick={e => {
            this.setState({ autotype: false });
            this.handleFocus();
          }}
          placeholder=""
          enterButton="Search"
          size="large"
          onChange={event => {
            if (event.target.value.length > 0) {
              this.fetchSearchData(event.target.value, true);
            } else {
              this.setState({
                fetchedData: [],
                displaySugesstions: false
              });
            }
          }}
          onSearch={value => {
            this.fetchSearchData(value, false);
            this.handleSearch(value);
          }}
        />
        {this.state.fetchedData.length > 0 && this.state.displaySugesstions ? (
          <div className="abcd">
            <Suggestions
              results={this.state.fetchedData}
              handleSuggestions={this.fetchSearchData}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(SearchPage);
