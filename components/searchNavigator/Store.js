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
      this.setState({ data: this._processData(data), ready: true });
    } catch (e) {
      console.log("Brand: " + e);
    }
  }

  _processData = data => {
    const processedData = [];

    data.forEach((item, index) => {
      let notFound = true;
      for (let i = 0; i < processedData.length; i++) {
        if (processedData[i].storeid == item.storeid) {
          notFound = false;
          processedData[i].count++;
        }
      }
      if (notFound) {
        processedData.push({
          storeid: item.storeid,
          storename: item.storename,
          modelid: item.modelid,
          color: item.color,
          count: 1
        });
      }
    });
    return processedData;
  };

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
            <Text>{item.storename} - {item.count}</Text>
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
              <ListItem onPress={() => this.props.navigation.pop()}>
                <Left>
                  <Icon name="arrow-back" />
                </Left>
                <Right>
                  <Text>Back</Text>
                </Right>
              </ListItem>
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
