import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getData } from "../FetchService";
import { List, ListItem, Left, Right, Icon, Spinner, Container, Content } from "native-base";
import { getFromAsync } from "../AsyncService";

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
      const store = await getFromAsync("store");
      if(!store) {
        alert("Restart app again");
        return null;
      }
      const id = this.props.navigation.state.params.model.id;
      const data = await getData(`user/color/${id}/${store.id}`);
      if(!data) {
        alert("Can't connect to server");
        this.setState({ ready: true });
        return null;
      }
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Model " + e);
      alert('Something went wrong on the server', e);
    }
  }

  makeList = () => {
    return this.state.data.map((item, index) => {
      const isAvailable = item.count ? true : false;
      let color = 'grey', fontWeight = "normal";
      if(isAvailable) {
        color = 'green';
        fontWeight = "bold";
      }
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
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ marginRight: 10, fontWeight: fontWeight, color: color }}>{item.count}</Text>
              <Icon name="arrow-forward" />
            </View>
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
