import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Text, AsyncStorage} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {connect} from 'react-redux';
import {saveUserToken,getUserToken} from '../actions';

class Login extends React.Component {
  state = {
    username:"",
    password:""
  }

  componentDidMount(){
    this.__asyncgetUserToken()
  }

  __asyncgetUserToken = ()=>{
    this.props.getUserToken()
      if (this.props.token.token) {
        this.props.navigation.navigate("Home")
      } else {
        this.props.navigation.navigate("Login")

      }
    }

  onLogin = (state)=>{
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user:state})
    })
      .then(resp => resp.json())
      .then(data => {
          AsyncStorage.setItem("token", data.jwt)
          this.props.saveUserToken(data.jwt)
          this.isUserAuthenticated()
      })

  }

  isUserAuthenticated = ()=>{
    this.props.token.token? (this.props.navigation.navigate("Home")):(this.props.navigation.navigate("Login"))
  }

  render() {
    return (
      <ScrollView>
          <TextInput onChangeText={(username)=>this.setState({username:username})}name="username"style={styles.textInput} placeholder={"Username here..."}maxLength={20}/>
          <TextInput secureTextEntry onChangeText={(password)=>this.setState({password:password})} name="password"style={styles.textInput} placeholder={"Password here..."}maxLength={20}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.onLogin(this.state)}>
             <Text  style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')} >
            <Text>Sign Up</Text>
          </TouchableOpacity>
      </ScrollView>
    );
  }
}
  const styles = StyleSheet.create({
    inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical: 15
      },
  goToLogin:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
      },
  })

const mapStateToProps = (state)=>{
  return{token: state.token}
}
const mapDispatchToProps = (dispatch)=>{
  return{
    saveUserToken:userInfo=>dispatch(saveUserToken(userInfo)),
    getUserToken:()=>dispatch(getUserToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
