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

class Color extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ready: false
    };
  }

  async componentDidMount() {
    try {
      const id = this.props.navigation.state.params.model.id;
      const data = await getData(`user/color/${id}`);
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Model " + e);
    }
  }

  makeList = () => {
    return this.state.data.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() =>
            this.props.navigation.navigate("store", {
              model: this.props.navigation.state.params.model,
              color: item.color
            })
          }
        >
          <Left>
            <Text>{item.color}</Text>
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
                <Text>Choose Color</Text>
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
          <Text>Fetching Colors..</Text>
        </View>
      );
    }
  }
}
export default Color;
