import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Categories from "./searchNavigator/Categories";
import Brand from './searchNavigator/Brand';
import Model from './searchNavigator/Model';
import Color from './searchNavigator/Color';
import Store from './searchNavigator/Store';
import Stock from "./searchNavigator/Stock";

const SearchNavigator = createStackNavigator({
  categories: Categories,
  brand: Brand,
  model: Model,
  color: Color,
  store: Store,
  stock: Stock
});

class Home extends Component {

  render() {
    return (
      <SearchNavigator />
    );
  }
}

export default Home;
