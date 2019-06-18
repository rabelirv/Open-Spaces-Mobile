import React from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {removeUserToken} from '../actions';

class MenuOptions extends React.Component {

  logOut = ()=>{
    this.props.removeUserToken()
    this.props.navigation.navigate("Login")
  }

  render(){
    return(
      <View>
        <Button
        style={styles.button}
        onPress={()=>this.logOut()}
        large
        icon={{name: 'envira', type: 'font-awesome'}}
        title="Sign Out" />
      </View>
    )
  }
}

const HEIGHT = Dimensions.get('window').height
const styles = StyleSheet.create({
  button:{
    top: HEIGHT - 80
  }
})

const mapStateToProps = (state)=>{
  return{
    token: state.token,
    navigate: state.navigate
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    removeUserToken:()=>dispatch(removeUserToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions)
