import * as React from 'react';
import { Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ReadScreen from "./screens/ReadStoryScreen";
import WriteScreen from "./screens/WriteStoryScreen";
import LoginScreen from "./screens/LoginScreen";

export default class App extends React.Component {
  render() {
  return (
    <AppContainer/>
  );
  }
}

var tabNavigator = createBottomTabNavigator({
  Read: {screen:ReadScreen}, 
  Write: {screen:WriteScreen}, },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === "Read") {
          return(
            <Image source = {require("./assets/readingbook.png")}
            style= {{width: 40, height: 40}}/>
          )
        }

        else if (routeName === "Write") {
          return(
            <Image source = {require("./assets/writingbook.png")}
            style= {{width: 30, height: 30}}/>
          )
        }
      }
    })
  } );
const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen}, 
  tabNavigator: {screen: tabNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator);