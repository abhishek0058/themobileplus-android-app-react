import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { getData, postData } from "../FetchService";
import {
  Container,
  Content,
  Spinner,
  Form,
  Item,
  Label,
  Input,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Icon
} from "native-base";

class Sold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imeino: "",
      loading: false,
      data: [],
      ready: false
    };
  }

  Sold = async () => {
    this.setState({ successMsg: "", loading: true, msg: "" });
    if (this.state.imeino == "") {
      this.setState({ msg: "Please Enter an IMEI Number" });
      return;
    } else {
      try {
        const body = {
          senderid: this.props.store.id,
          imeino: this.state.imeino
        };
        const result = await postData("user/sold", body);
        if (result == "sold") {
          this.setState({
            loading: false,
            successMsg: "Transaction Successful.",
            msg: "",
            imeino: ""
          });
        } else if (result == "not found") {
          this.setState({
            loading: false,
            successMsg: "",
            msg:
              "IMEI Number Not Found in your Store. Please check it and try again."
          });
        } else {
          this.setState({
            loading: false,
            successMsg: "",
            msg: "Server Error."
          });
        }
      } catch (e) {
        console.log("Sold Stock: " + e);
      }
    }
  };

  loading = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
  };

  fetchReport = async () => {
    try {
      const { id } = this.props.store;
      const data = await getData(`user/dailyReportSold/${id}`);
      this.setState({ data, ready: true });
    } catch (e) {
      console.log("Daily Report " + e);
    }
  };

  async componentDidMount() {
    try {
      this.fetchReport();
    } catch (e) {
      console.log("Daily Report Component did mount: " + e);
    }
  }

  makeList = () => {
    return this.state.data.map((item, index) => {
      return (
        <ListItem key={index}>
          <Left>
            <Text>{item.modelno}</Text>
          </Left>
          <Right>
            <Text>{item.imeino}</Text>
          </Right>
        </ListItem>
      );
    });
  };

  refresh = async () => {
    this.setState({ ready: false });
    this.fetchReport();
  };

  makeLoader = () => {
    if(!this.state.ready) {
      return (
        <Spinner color="red" />
      );
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label style={{ fontWeight: "bold" }}>IMEI Number</Label>
              <Input
                onChangeText={imeino => this.setState({ imeino })}
                value={this.state.imeino}
              />
            </Item>
          </Form>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: 5,
              justifyContent: "space-evenly",
              margin: 5
            }}
          >
            <Button
              danger
              style={{
                width: 100,
                alignSelf: "center",
                backgroundColor: "red",
                marginTop: 5
              }}
              onPress={() => this.Sold()}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  padding: 20
                }}
              >
                Update
              </Text>
            </Button>
          </View>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              color: "green",
              marginTop: 10
            }}
          >
            {this.state.successMsg}
          </Text>
          <Text style={{ alignSelf: "center", fontSize: 17, color: "red" }}>
            {this.state.msg}
          </Text>
          <List>
            <ListItem itemDivider>
              <Text>Mobiles Sold Today</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Button onPress={() => this.refresh()} style={{ backgroundColor: 'red', width: 100 }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', padding: 20 }}>Refresh</Text>
                </Button>
              </Left>
              <Right>
                {this.makeLoader()}
              </Right>
            </ListItem>
            {this.makeList()}
          </List>
        </Content>
      </Container>
    );
  }
}
export default Sold;
