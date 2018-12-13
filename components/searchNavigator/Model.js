import React, { Component } from "react";
import { View, Text } from "react-native";
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

class Model extends Component {
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
      console.log("componentDidMount");
      const id = this.props.navigation.state.params.brandid;
      const data = await getData(`user/model/${id}`);
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Model " + e);
    }
  }

  makeList = () => {
    if(!this.state.data) {
      return null;
    }
    return this.state.data.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() =>
            this.props.navigation.navigate("color", { model: item })
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
              <ListItem onPress={() => this.props.navigation.pop()}>
                <Left>
                  <Icon name="arrow-back" />
                </Left>
                <Right>
                  <Text>Back</Text>
                </Right>
              </ListItem>
              <ListItem itemDivider>
                <Text>Choose Model</Text>
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
          <Text>Loading ..</Text>
        </View>
      );
    }
  }
}
export default Model;
