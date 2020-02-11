import React from "react";
// import { Button, Slider, Form, Menu, Icon, Dropdown } from "antd";
// import { DatePicker } from "antd";
// import moment from "moment";
import CostSlider from "./costslider";

// const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";
import { Menu, Dropdown, Button, Icon, message, Form } from "antd";

class Apply extends React.Component {
  // state = {
  //   visible: false
  // };
  // handleVisibleChange = flag => {
  //   this.setState({ visible: flag });
  // };
  // handleFilter = event => {
  //   console.log("FILRE PAGE ");
  //   event.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Form Values:", values);
  //     }
  //   });
  // };
  // render() {
  //   const { getFieldDecorator } = this.props.form;
  //   return (
  //       <Dropdown
  //         overlay={
  //           <Menu onClick={this.handleMenuClick}>
  //             <Menu.Item key="1">
  //               <Form.Item label="datepicker">
  //                 {getFieldDecorator("datepicker", {
  //                   rules: [
  //                     {
  //                       type: "array",
  //                       message: "Please select time!"
  //                     }
  //                   ]
  //                 })(
  //                   <RangePicker
  //                     defaultValue={[
  //                       moment("2019/01/01", dateFormat),
  //                       moment("2020/01/01", dateFormat)
  //                     ]}
  //                     format={dateFormat}
  //                   />
  //                 )}
  //               </Form.Item>
  //             </Menu.Item>
  //             <Menu.Item key="2" id="slider">
  //               <Form.Item label="cost">
  //                 {getFieldDecorator("cost", { rules: [{ type: "list" }] })(
  //                   // <CostSlider />
  //                   <Slider
  //                     min={1000}
  //                     max={10000}
  //                     range
  //                     defaultValue={[1000, 5000]}
  //                   />
  //                 )}
  //               </Form.Item>
  //             </Menu.Item>
  //             <Menu.Item key="3" id="applyfilter">
  //               <Button onSubmit={this.handleFilter}>Apply</Button>
  //             </Menu.Item>
  //           </Menu>
  //         }
  //         onVisibleChange={this.handleVisibleChange}
  //         visible={this.state.visible}
  //       >
  //         <a className="ant-dropdown-link" href="#">
  //           <Button>
  //             <Icon type="filter" />
  //             Filters
  //           </Button>
  //           <Icon type="down" />
  //         </a></Form>
  //       </Dropdown>
  //   );
  // }
  handleMenuClick = e => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          <CostSlider />
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          3rd item
        </Menu.Item>
      </Menu>
    );
    return (
      <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={menu}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

const Filter = Form.create({ name: "filter" })(Apply);
export default Filter;
