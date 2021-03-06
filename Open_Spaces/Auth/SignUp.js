import React from 'react';
import {ScrollView, TextInput, StyleSheet, TouchableOpacity, Text, AsyncStorage} from 'react-native';
import {Card, Button,FormLabel,FormInput} from 'react-native-elements';
import {connect} from 'react-redux';
import {saveUserToken,getUserToken} from '../actions';

class SignUp extends React.Component {
  state = {
    username:"",
    password:"",
    bio:"",
    avatar:"",
}

  isUserLoggedIn = (token)=>{
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

  onSignUp = (state)=>{
    fetch('http://localhost:3000/api/v1/users',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body: JSON.stringify({user:state})
  })
  .then(res =>res.json())
  .then(res => this.isUserLoggedIn(res.jwt))
  .catch(err=>console.log(err))
  }

  render(){
    console.log(this.props);
    return(
      <ScrollView>
          <TextInput onChangeText={(username)=>this.setState({username:username})}name="username"style={styles.textInput} placeholder={"Username here..."}maxLength={20}/>
          <TextInput onChangeText={(password)=>this.setState({password:password})} name="password"style={styles.textInput} placeholder={"Password here..."}maxLength={20}/>
          <TextInput onChangeText={(bio)=>this.setState({bio:bio})} name="bio"style={styles.textInput} placeholder={"Bio here..."}maxLength={20}/>
          <TextInput onChangeText={(avatar)=>this.setState({avatar:avatar})} name="avatar"style={styles.textInput} placeholder={"Avatar here..."}maxLength={20}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.onSignUp(this.state)}>
             <Text  style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} >
            <Text>Go To Login</Text>
          </TouchableOpacity>
      </ScrollView>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
