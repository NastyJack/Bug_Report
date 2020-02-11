import React from "react";
import "antd/dist/antd.css";
import { List } from "antd";
import Model from "../components/model";

export default class ListPage extends React.Component {
  state = {
    model: false,
    item: {},
    loading: false
  };
  handleModal = (istrue, item) => {
    this.setState({
      model: istrue,
      item: item
    });
  };

  componentDidMount() {
    if (this.props.search !== "") {
      setInterval(this.getData, 10000);
      this.getData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("PREV PROPS", prevProps);
    // console.log("prev STATE", prevState);
    // console.log("THIS STATE", this.state);
    // console.log("PROPS", this.props);
    // if (
    //   prevProps &&
    //   prevProps.details.length !== this.props &&
    //   this.props.details.length
    // ) {
    if (prevProps.details.length !== this.props.details.length) {
      console.log("NEW FILE FOUND IN DB");
    } else {
      console.log("NO NEW DATA");
    }
  }
  getData = () => {
    const ser = this.props.search;
    if (ser) {
      this.props.fetchSearchData(ser, true);
    }
  };

  render() {
    console.log("ITEMS", this.props);
    const listData = this.props.details;
    if (listData && listData.length < 0) {
      this.setState({
        loading: true
      });
    }
    if (this.state.model) {
      return (
        <Model
          visibile={true}
          item={this.state.item}
          handleModal={this.handleModal}
        />
      );
    }
    return (
      <div>
        <List
          loading={this.state.loading}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={listData}
          footer={
            <div>
              <b>MORDOR INTELLIGENCE</b>
            </div>
          }
          renderItem={item => (
            <div className="list-align">
              <List.Item
                key={item.title}
                extra={<img width={200} alt="logo" src={item.image} />}
              >
                <List.Item.Meta
                  title={
                    <div
                      onClick={() => this.handleModal(true, item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </div>
                  }
                  description={item.shortDescription}
                />
                <div className="items-space">
                  <span>
                    Published On :{new Date(item.publishedDate).toDateString()}
                  </span>
                  <span>Cost :{item.cost}</span>
                </div>
              </List.Item>
            </div>
          )}
        />
      </div>
    );
  }
}
