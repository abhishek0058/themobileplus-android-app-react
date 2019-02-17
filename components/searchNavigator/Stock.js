import React, { Component } from "react";
import { View, Text } from "react-native";
import { getData } from "../FetchService";
import { Spinner, Container, Content, Button, Icon } from "native-base";
import Demand from "./Demand";
class Stock extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      demand: false,
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
    const { storename, storeid, modelid, color } = this.props.navigation.state.params;

    if (this.state.ready && !this.state.demand) {
      return (
        <Container>
          <Content>
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 17 }}>{storename}</Text>
              <Text style={{ fontSize: 20, alignSelf: "center", padding: 5 }}>
                Left: {this.state.stock}
              </Text>
            </View>
            <View style={{  borderRadius: 10,  borderWidth: 0.5,  borderColor: "grey",  margin: 10 }}>
              <Text style={{ padding: 10, fontWeight: "bold", alignSelf: "center", fontSize: 17 }}>
                Contact Details
              </Text>
              <Text style={{ fontStyle: "italic", fontSize: 18, alignSelf: "center", padding: 5 }}>
                +91 {this.state.store.mobile}
              </Text>
              <Text style={{ fontStyle: "italic", fontSize: 18, alignSelf: "center" }} >
                {this.state.store.email}
              </Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button iconLeft light onPress={() => this.props.navigation.pop()}
                  style={{ width: 150, margin: 10, padding: 10, alignSelf: "center" }}
                >
                  <Icon name="arrow-back" />
                  <Text style={{ paddingHorizontal: 10 }}>Back</Text>
                </Button>
                <Button iconRight light onPress={() => this.setState({ demand: true })}
                  style={{ width: 150, margin: 10, padding: 10, alignSelf: "center" }}
                >
                  <Text style={{ paddingHorizontal: 10 }}>Demand</Text>
                  <Icon name="arrow-forward" />
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      );
    } 
    else if(this.state.ready && this.state.demand) {
      return (
        <Container>
          <Content>
            <Demand
              modelid={modelid}
              color={color}
              stockAvailable={this.state.stock}
              receiver_store_id={storeid}
              closeDemandPanel={() => this.setState({ demand: false })}
            />
          </Content>
        </Container>
      )
    }    
    else {
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
