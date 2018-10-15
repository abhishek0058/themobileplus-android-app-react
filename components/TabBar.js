import React, { Component } from "react";
import { View, Text } from "react-native";
import { Tab, Tabs, TabHeading, Icon, Button } from "native-base";
import Home from "./Home";
import UpdateStock from "./UpdateStock";
import Sold from "./sold/Sold";
import Returns from "./return/Return";

class TabBar extends Component {
  static navigationOptions = ({ navigation }) => {
    const screenProps = navigation.getScreenProps();
    return {
      title: "Home",
      headerStyle: {
        backgroundColor: "red"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <Button
          rounded
          style={{
            alignSelf: "center",
            marginRight: 10,
            width: 100,
            backgroundColor: "white",
            borderColor: "red",
            borderWidth: 1
          }}
          onPress={() => screenProps.logout(navigation)}
        >
          <Text style={{ fontWeight: "bold", padding: 20, color: "red" }}>
            LOGOUT
          </Text>
        </Button>
      )
    };
  };

  render() {
    // console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        <Tabs tabBarPosition="bottom">
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "red",
                  borderWidth: 0.5,
                  borderColor: "white"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Search
                </Text>
              </TabHeading>
            }
          >
            <Home />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "red",
                  borderWidth: 0.5,
                  borderColor: "white"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Update
                </Text>
              </TabHeading>
            }
          >
            <UpdateStock store={this.props.navigation.state.params.store} />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "red",
                  borderWidth: 0.5,
                  borderColor: "white"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>Sell</Text>
              </TabHeading>
            }
          >
            <Sold store={this.props.navigation.state.params.store} />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "red",
                  borderWidth: 0.5,
                  borderColor: "white"
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>Return</Text>
              </TabHeading>
            }
          >
            <Returns store={this.props.navigation.state.params.store} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}
export default TabBar;
