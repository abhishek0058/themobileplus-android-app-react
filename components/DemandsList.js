// import React, { Component } from "react";
// import { View, Text } from "react-native";
// import { getData } from "../FetchService";
// import { List, ListItem, Left, Right, Icon, Spinner, Container, Content, Card, CardItem, Item, Body } from "native-base";
// import { getFromAsync } from "../AsyncService";

// class DemandList extends Component {
//   static navigationOptions = {
//     header: null
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       ready: false,
//       data: []
//     };
//   }

//   async componentDidMount() {
//     try {
//       const store = await getFromAsync("store");
//       if(!store) {
//         alert("Restart app again");
//         return null;
//       }
//       const data = await getData(`user/demand-all/${store.id}`);
//       this.setState({ data, ready: true });
//     } catch (e) {
//       console.log("Brand: " + e);
//     }
//   }

//   modelDetails = () => {
//     const model = this.props.navigation.state.params.model;
//     return (
//       <Card>
//         <CardItem>
//           <Body>
//             <Text>{model.name}</Text>
//           </Body>
//         </CardItem>
//         <CardItem footer>
//           <Text>{model.modelno}</Text>
//         </CardItem>
//       </Card>
//     );
//   };

//   makeList = () => {

//     if(this.state.data.length == 0) {
//       const modelid = this.props.navigation.state.params.model.id;
//       const color = this.props.navigation.state.params.color;
//       return (
//         <Demand 
//           modelid={modelid}
//           color={color}
//           receiver_store_id={0}
//           closeDemandPanel={null}
//         />)
//     }

//     return this.state.data.map((item, index) => {
//       const isAvailable = item.count ? true : false;
//       let color = 'grey', fontWeight = "normal";
//       if(isAvailable) {
//         color = 'green';
//         fontWeight = "bold";
//       }
//       return (
//         <ListItem
//           key={index}
//           onPress={() =>
//             this.props.navigation.navigate("stock", {
//               storeid: item.storeid,
//               storename: item.storename,
//               modelid: this.props.navigation.state.params.model.id,
//               color: this.props.navigation.state.params.color
//             })
//           }
//         >
//           <Left>
//             <Text>{item.storename}</Text>
//           </Left>
//           <Right>
//             <View style={{ flex: 1, flexDirection: 'row' }}>
//               <Text style={{ marginRight: 10, fontWeight: fontWeight, color: color }}>{item.count}</Text>
//               <Icon name="arrow-forward" />
//             </View>
//           </Right>
//         </ListItem>
//       );
//     });
//   };

//   render() {
//     if (this.state.ready) {
//       return (
//         <Container>
//           <Content>
//             {this.modelDetails()}
//             <List>
//               <ListItem onPress={() => this.props.navigation.pop()}>
//                 <Left>
//                   <Icon name="arrow-back" />
//                 </Left>
//                 <Right>
//                   <Text>Back</Text>
//                 </Right>
//               </ListItem>
//               <ListItem itemDivider>
//                 <Text>Choose Store</Text>
//               </ListItem>
//               {this.makeList()}
//             </List>
//           </Content>
//         </Container>
//       );
//     } else {
//       return (
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Spinner />
//           <Text>fetching stores ...</Text>
//         </View>
//       );
//     }
//   }
// }
// export default Store;
