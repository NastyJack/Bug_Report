import { Modal, Button } from "antd";
import React from "react";

export default class Model extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  componentWillMount() {
    this.setState({
      visible: true
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.handleModal(false, this.props.item);
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div className="model_display">
        <Modal
          visible={visible}
          title="Report Details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Buy
            </Button>
          ]}
        >
          <div>
            <img
              src={this.props.item.image}
              alt="Report image"
              style={{ float: "left" }}
            />
            <h3>{this.props.item.title}</h3>
            <p>{this.props.item.description}</p>
            <p>
              Published on:
              {new Date(this.props.item.publishedDate).toDateString()}
            </p>
            <p>Price:{this.props.item.cost}</p>
          </div>
        </Modal>
      </div>
    );
  }
}
