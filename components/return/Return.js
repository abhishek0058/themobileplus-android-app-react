import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { getData, postData } from "../FetchService";
import { Container, Content, Spinner, Form, Item, Label, Input, Button, Textarea
} from "native-base";
import BarCode from "../barcode/BarCode";

class Returns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imeino: "",
      reason: "",
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
    } else if (this.state.reason == "") {
      this.setState({ msg: "Please Enter the Reason for returning the piece" });
      return;
    } else {
      try {
        const body = {
          storeid: this.props.store.id,
          imeino: this.state.imeino,
          reason: this.state.reason
        };
        const result = await postData("user/productReturn", body);
        if (result == "true") {
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

  fillIMEINO = imeino => {
    if (this.state.imeino != imeino) this.setState({ imeino });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Label style={{ fontWeight: "bold" }}>IMEI Number</Label>
              <Input
                onChangeText={imeino => this.setState({ imeino })}
                value={this.state.imeino}
              />
            </Item>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Reason for Returns"
              onChangeText={reason => this.setState({ reason })}
              value={this.state.reason}
            />
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
          <Text
            style={{ alignSelf: "center", fontSize: 17, paddingHorizontal: 20 }}
          >
            {this.state.msg}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default Returns;
