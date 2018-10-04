import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";

class StoreList extends Component {
  makeCards = () => {
    return this.props.stores.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "grey",
            marginVertical: 5
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {item.storename} - {item.stock}
          </Text>
          <Text style={{ fontSize: 16 }}>+91 {item.mobilenumber}</Text>
        </View>
      );
    });
  };

  render() {
    if (this.props.stores.length == 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 50
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 16 }}>
            Nothing Found.
          </Text>
        </View>
      );
    } else {
      return <View style={{ flex: 1 }}>{this.makeCards()}</View>;
    }
  }
}
export default StoreList;
