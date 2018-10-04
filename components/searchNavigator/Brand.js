import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getData } from "../FetchService";
import {
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Spinner,
  Container,
  Content
} from "native-base";

class Brand extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: []
    };
  }

  async componentDidMount() {
    try {
      const data = await getData("user/brands");
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Brand: " + e);
    }
  }

  makeList = () => {
    return this.state.data.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() =>
            this.props.navigation.navigate("model", { brandid: item.id })
          }
        >
          <Left>
            <Text>{item.name}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  render() {
    if (this.state.ready) {
      return (
        <Container>
          <Content>
            <List>
              <ListItem itemDivider>
                <Text>Choose Brand</Text>
              </ListItem>
              {this.makeList()}
            </List>
          </Content>
        </Container>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
          <Text>Loading ...</Text>
        </View>
      );
    }
  }
}
export default Brand;
