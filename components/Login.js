import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Form, Item, Input, Label, Button, Spinner } from "native-base";
import { AsyncStorage } from "react-native";
import BaseURL from "./BaseURL";

class Login extends Component {
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: "red"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      ready: false
    };
  }

  checkPreviousLogin = async () => {
    try {
      const store = await AsyncStorage.getItem("store");
      if (store) {
        console.log("user here", store);
        this.props.navigation.replace("TabBar", { store: JSON.parse(store) });
      } else {
        this.setState({ ready: true });
      }
    } catch (e) {
      console.log("checkPreviousLogin", e);
    }
  };

  async componentWillMount() {
    //await AsyncStorage.removeItem('user')
    try {
      this.checkPreviousLogin();
    } catch (e) {
      console.log(e);
    }
  }

  async login() {
    this.setState({ loading: true });
    const { username, password } = this.state;
    if (username.length == 0 && password.length == 0) {
      this.setState({ message: "Please Fill both the fields", loading: false });
      return;
    }
    try {
      const response = await fetch(`${BaseURL}/user/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ username, password })
      });
      const { result, token } = await response.json();
      //console.log('Login result', JSON.stringify(result[0]))
      if (result.length) {
        console.log("token", token);
        await AsyncStorage.setItem("store", JSON.stringify(result[0]));
        await AsyncStorage.setItem("token", token);
        this.setState({ loading: false });
        this.props.navigation.replace("TabBar", { store: result[0] });
      } else {
        this.setState({ loading: false, message: "Invalid Credentials" });
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log("Check LOGIN ERROR", e);
    }
  }

  loginButton = () => {
    if (this.state.loading) {
      return <Spinner style={{ marginVertical: 50, alignSelf: "center" }} />;
    } else {
      return (
        <Button
          full
          info
          style={{ margin: 20, marginTop: 30, backgroundColor: 'red' }}
          onPress={() => this.login()}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
        </Button>
      );
    }
  };

  render() {
    if (!this.state.ready) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Spinner color="blue" />
          <Text>Loading ...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              marginTop: 50
            }}
          />
          <Form style={{ marginTop: 25 }}>
            <Item>
              <Label style={{ fontSize: 20 }}>Username</Label>
              <Input onChangeText={username => this.setState({ username })} />
            </Item>
            <Item>
              <Label style={{ fontSize: 20 }}>Password</Label>
              <Input onChangeText={password => this.setState({ password })} />
            </Item>
          </Form>
          {this.loginButton()}
          <Text style={{ alignSelf: "center", color: "red", fontSize: 17 }}>
            {this.state.message}
          </Text>
        </View>
      );
    }
  }
}
export default Login;
