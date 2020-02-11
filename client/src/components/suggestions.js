import { List, message, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import { withRouter } from "react-router-dom";

class Suggestions extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.setState({
      data: this.props.results
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.data !== this.state.data ||
      prevProps.results !== this.props.results
    ) {
      this.setState({
        data: this.props.results
      });
    }
  }

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
  };
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item._id}>
                <div style={{ cursor: "pointer" }}>
                  <List.Item.Meta
                    title={item.title || item}
                    onClick={() => {
                      console.log("Clicked");
                      this.props.handleSuggestions(item.title || item, false);
                      this.props.history.push("/search");
                    }}
                  />
                </div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
export default withRouter(Suggestions);
