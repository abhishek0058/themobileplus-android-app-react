import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker, Spinner } from "native-base";

class PickerHelper extends Component {
  makeOptions = () => {
    return this.props.options.map((item, index) => {
      return <Picker.Item label={item.name} value={item.id} key={index} />;
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
    const obj = JSON.parse(`{"${this.props.name}": "${value}"}`);
    this.props.valueChange(obj);
  }

  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "grey",
          paddingHorizontal: 10,
          borderRadius: 10,
          margin: 5
        }}
      >
        <Picker
          note
          mode="dropdown"
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
          style={{ margin: 5 }}
          textStyle={{ color: "#5cb85c" }}
          itemStyle={{
            backgroundColor: "#d3d3d3",
            marginLeft: 0,
            paddingLeft: 10
          }}
          itemTextStyle={{ color: "#788ad2" }}
        >
          <Picker.Item label={this.props.label} value="0" />
          {this.makeOptions()}
        </Picker>
      </View>
    );
  }
}
export default PickerHelper;
