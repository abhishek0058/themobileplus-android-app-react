import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { getData, postData } from "./FetchService";
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
import PickerHelper from "./PickerHelper";

class UpdateStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderid: 0,
      receiverid: "0",
      imeino: "",
      ready: false,
      stores: []
    };
  }

  async componentDidMount() {
    try {
      const { id } = this.props.store;
      const data = await getData(`user/storeAllButMe/${id}`);
      console.log(data);
      this.setState({
        stores: data[0],
        imeinumbers: data[1],
        senderid: id,
        ready: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  update = async () => {
    this.setState({ successMsg: "", loading: true, msg: "" });
    if (this.state.receiverid == "0") {
      this.setState({ msg: "Please Select a Store" });
      return;
    } else if (this.state.imeino == "") {
      this.setState({ msg: "Please Enter an IMEI Number" });
      return;
    } else {
      try {
        const body = {
          senderid: this.state.senderid,
          receiverid: this.state.receiverid,
          imeino: this.state.imeino
        };
        const result = await postData("user/update", body);
        if (result) {
          this.setState({
            loading: false,
            successMsg: "Transaction Successful.",
            msg: ""
          });
        } else {
          this.setState({
            loading: false,
            successMsg: "",
            msg: "Server Error."
          });
        }
      } catch (e) {
        console.log("Update Stock: " + e);
      }
    }
  };

  valueChange = obj => {
    this.setState(obj);
    console.log(obj);
  };

  loading = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
  };

  makeList = () => {
    return this.state.imeinumbers.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() => this.setState({ imeino: item.imeino })}
        >
          <Left>
            <Text>{item.imeino}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  refresh = async () => {
    try {
      const { id } = this.props.store;
      const data = await getData(`user/storeAllButMe/${id}`);
      console.log(data);
      this.setState({
        stores: data[0],
        imeinumbers: data[1],
        senderid: id,
        ready: true
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.state.ready) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner />
          <Text style={{ alignSelf: "center" }}>Fetching Stores ... </Text>
        </View>
      );
    } else {
      return (
        <Container>
          <Content>
            <Text
              style={{ margin: 5, paddingHorizontal: 10, fontWeight: "bold" }}
            >
              Receiving Store
            </Text>
            <PickerHelper
              label="Select a Store"
              options={this.state.stores}
              name="receiverid"
              valueChange={this.valueChange}
            />
            <Form>
              <Item floatingLabel>
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
                paddingHorizontal: 30,
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
                onPress={() => this.update()}
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

              <Button
                info
                style={{
                  width: 100,
                  alignSelf: "center",
                  marginTop: 5
                }}
                onPress={() => this.refresh()}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    padding: 20
                  }}
                >
                  Refresh
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
                <Text>IMEI Numbers</Text>
              </ListItem>
              {this.makeList()}
            </List>
          </Content>
        </Container>
      );
    }
  }
}
export default UpdateStock;
