import React, { Component } from "react";
import { View, Text } from "react-native";
import { getData } from "../FetchService";
import { Spinner, Container, Content, Button, Icon } from "native-base";

class Stock extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      stock: 0,
      data: {},
      store: {}
    };
  }

  async componentDidMount() {
    try {
      const { storeid, modelid, color } = this.props.navigation.state.params;
      const data = await getData(`user/stock/${storeid}/${modelid}/${color}`);
      this.setState({ data: data[1][0], stock: data[0][0].stock, ready: true });
      if (data[2][0]) this.setState({ store: data[2][0] });
      else this.setState({ store: { email: "", mobile: "" } });
    } catch (e) {
      console.log("Stock: " + e);
    }
  }

  render() {
    const { storename } = this.props.navigation.state.params;

    if (this.state.ready) {
      return (
        <Container>
          <Content>
            <View>
              <Text
                style={{
                  padding: 15,
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontSize: 17
                }}
              >
                {storename}
              </Text>
              <Text style={{ fontSize: 20, alignSelf: "center", padding: 10 }}>
                Left: {this.state.stock}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "grey",
                padding: 10,
                margin: 15
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontSize: 17
                }}
              >
                Contact Details
              </Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 18,
                  alignSelf: "center"
                }}
              >
                +91 {this.state.store.mobile}
              </Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 18,
                  alignSelf: "center"
                }}
              >
                {this.state.store.email}
              </Text>
              <Button
                iconLeft
                light
                onPress={() => this.props.navigation.pop()}
                style={{
                  width: 100,
                  margin: 30,
                  padding: 10,
                  alignSelf: "center"
                }}
              >
                <Icon name="arrow-back" />
                <Text style={{ padding: 10 }}>Back</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
          <Text>fetching stocks ...</Text>
        </View>
      );
    }
  }
}
export default Stock;
