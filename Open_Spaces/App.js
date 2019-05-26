import React from 'react';
import Navigation from './Components/router';
import {AsyncStorage} from 'react-native';
import Home from './Components/Home';


class App extends React.Component{
  state ={
    user:null,
    token:null
  }
  componentDidMount(){
    let token = null
    AsyncStorage.getItem('token')
    .then(res=> token = res)
    console.log("This is the token",token);
  }


  logOut = ()=>{
    if (this.state.token) {
      AsyncStorage.clear()
      .then(res=>{
        console.log("Inside Logout:",res)
        this.setState({
          token:null
        })
      })
    }else {
      return null
    }
  }




  render(){
    return(
      <Navigation screenProps={{
        createNewUser: this.createNewUser,
        user: this.state.user,
        token: this.state.token,
        logOut: this.logOut
      }}/>
    )
  }
}
export default App;
