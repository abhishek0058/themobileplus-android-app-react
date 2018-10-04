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
  Content,
  Card,
  CardItem,
  Item,
  Body
} from "native-base";

class Store extends Component {
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
      const id = this.props.navigation.state.params.model.id;
      const color = this.props.navigation.state.params.color;
      const data = await getData(`user/store/${id}/${color}`);
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Brand: " + e);
    }
  }

  modelDetails = () => {
    const model = this.props.navigation.state.params.model;
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{model.name}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>{model.modelno}</Text>
        </CardItem>
      </Card>
    );
  };

  makeList = () => {
    return this.state.data.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() =>
            this.props.navigation.navigate("stock", {
              storeid: item.storeid,
              storename: item.storename,
              modelid: this.props.navigation.state.params.model.id,
              color: this.props.navigation.state.params.color
            })
          }
        >
          <Left>
            <Text>{item.storename}</Text>
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
            {this.modelDetails()}
            <List>
              <ListItem itemDivider>
                <Text>Choose Store</Text>
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
          <Text>fetching stores ...</Text>
        </View>
      );
    }
  }
}
export default Store;
