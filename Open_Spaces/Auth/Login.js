import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Text, AsyncStorage} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

class Login extends React.Component {
  state = {
    username:"",
    password:""
  }

  onLogin = (state)=>{
    fetch('http://localhost:3000/api/v1/login',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body: JSON.stringify({user:state})
  })
  .then(res =>res.json())
  .then(res =>this.isUserLoggedIn(res.jwt))
  .catch(err=>console.log(err))
  }

  isUserLoggedIn = (token)=>{
    console.log(token)
    if (token) {
      AsyncStorage.setItem('token', JSON.stringify(token))
    }else {
      return null
    }
    if (token) {
      console.log("In isUserLoggedIn",true);
      this.props.navigation.navigate('Home')
    }else {
      console.log("In isUserLoggedIn",false);
      this.props.navigation.navigate('Login')
    }
  }


  render() {
    return (
      <ScrollView>
          <TextInput onChangeText={(username)=>this.setState({username:username})}name="username"style={styles.textInput} placeholder={"Username here..."}maxLength={20}/>
          <TextInput onChangeText={(password)=>this.setState({password:password})} name="password"style={styles.textInput} placeholder={"Password here..."}maxLength={20}/>
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


export default Login
