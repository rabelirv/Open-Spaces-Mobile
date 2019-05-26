import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'

class MenuOptions extends React.Component {
  render(){
    return(
      <View>
        <Button
        large
        icon={{name: 'envira', type: 'font-awesome'}}
        title='LARGE WITH ICON TYPE' />
      </View>
    )
  }
}

export default MenuOptions
