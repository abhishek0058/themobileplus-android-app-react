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
  Button
} from "native-base";
import PickerHelper from "./PickerHelper";
import BarCode from "./barcode/BarCode";

class UpdateStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderid: 0,
      receiverid: "0",
      imeino: "",
      ready: false,
      stores: [],
      person: ""
    };
  }

  async componentDidMount() {
    try {
      const { id } = this.props.store;
      const data = await getData(`user/storeAllButMeBarCode/${id}`);
      this.setState({
        stores: data,
        senderid: id,
        ready: true
      });
      
    } catch (e) {
      console.log(e);
    }
  }

  update = async () => {
    this.setState({ successMsg: "", msg: "" });
    if (this.state.receiverid == "0") {
      this.setState({ msg: "Please Select a Store" });
      return;
    } else if (this.state.imeino == "") {
      this.setState({ msg: "Please Enter an IMEI Number" });
      return;
    } else if (this.state.person == "") {
      this.setState({ msg: "Please Enter the Person" });
      return;
    } else {
      this.setState({ loading: true });
      try {
        const body = {
          senderid: this.state.senderid,
          receiverid: this.state.receiverid,
          imeino: this.state.imeino,
          person: this.state.person
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
  };

  loading = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
  };

  fillIMEINO = imeino => {
    if(this.state.imeino != imeino)
      this.setState({ imeino });
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
              <Item>
                <Label style={{ fontWeight: "bold" }}>IMEI Number</Label>
                <Input
                  onChangeText={imeino => this.setState({ imeino })}
                  value={this.state.imeino}
                />
              </Item>
              <Item>
                <Label style={{ fontWeight: "bold" }}>Person</Label>
                <Input
                  onChangeText={person => this.setState({ person })}
                  value={this.state.person}
                />
              </Item>
            </Form>

            <View>
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
            <View style={{ width: 300, height: 300, alignSelf: "center" }}>
              <BarCode fillIMEINO={this.fillIMEINO} />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ padding: 10 }}>
                Keep the camera on the Bar code or QR Code. It will
                automatically take it.
              </Text>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default UpdateStock;
