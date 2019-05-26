import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Home from './Home';
import SignUp from '../Auth/SignUp';
import Login from '../Auth/Login';
import {FontAwesome} from 'react-native-vector-icons';

const headerStyle = {
  marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
}

const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions:{
      title: "Sign Up",
      headerStyle
    }
  },
});
const LoginScreen = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      title: "Login",
      headerStyle
    }
  },
});

const SignedIn = createStackNavigator({
  Home: {
    screen: Home,
  }},
{headerMode: 'none',
navigationOptions: {
  headerVisible: false,
}}
);

const CreateRootNavigator =
    createSwitchNavigator(
      {
        SignedIn:{
          screen: SignedIn
        },
        SignedOut:{
          screen:SignedOut
        },
        LoginScreen: {
          screen: LoginScreen
        }
      },
      {
        initialRouteName: "LoginScreen"
      }
    )


const Navigation = createAppContainer(CreateRootNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default Navigation;
