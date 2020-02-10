import React from "react";
import { Input } from "antd";
import axios from "axios";
import Suggestions from "../components/suggestions";

const { Search } = Input;

export default class SearchPage extends React.Component {
  state = {
    fetchedData: [],
    displaySugesstions: false
  };

  componentDidMount() {
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
        sugg: true,
        results: this.state.history.slice(start, this.state.history.length)
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
          this.setState({
            fetchedData: data.data,
            displaySugesstions: sugesstions
          });
        } else {
          console.log("No report found");
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
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
            // this.props.handleSearchResults(this.state.fetchedData, false);
          }}
        />
        {this.state.fetchedData.length > 0 && this.state.displaySugesstions ? (
          <div className="search-suggestions">
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
