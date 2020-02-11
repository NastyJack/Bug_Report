import React from "react";
import { Input } from "antd";
import { withRouter } from "react-router-dom";
import "./css/autotype.css";

const { Search } = Input;

class SearchPage extends React.Component {
  state = {
    autotype: true
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

  render() {
    return (
      <div className="searchbox_center">
        {this.AutoType()}
        <Search
          onFocus={this.props.handleFocus}
          className="searchbar"
          onClick={e => {
            this.setState({ autotype: false });
          }}
          placeholder=""
          enterButton="Search"
          size="large"
          onChange={event => {
            this.props.handleOnChange(event);
          }}
          onSearch={value => {
            this.props.hideSuggestion(false);
            this.props.history.push("/search");
          }}
        />
      </div>
    );
  }
}

export default withRouter(SearchPage);
