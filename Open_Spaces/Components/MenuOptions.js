import React from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'

class MenuOptions extends React.Component {

  logOut = ()=>{
    let token = null
    AsyncStorage.getItem("token")
      .then(res => token = res)
      console.log(token)
    if (token) {
      console.log("token is true", token);
      AsyncStorage.clear()
      this.props.navigation.navigate("Login")
    }else {
      console.log("token is false", token);
      return null
    }
  }
  render(){
    return(
      <View>
        <Button
        style={styles.button}
        onPress={this.logOut}
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

export default MenuOptions
