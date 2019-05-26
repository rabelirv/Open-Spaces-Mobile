import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MapView, Permissions, Location} from 'expo';
import DestinationButton from './DestinationButton';
import CurrentLocationButton from './CurrentLocationButton';
import ParkingSpot from './ParkingSpot';

 class Home extends React.Component {
   state = {
     region: null
   }

   componentDidMount(){
     this.__getLocationAsync()
   }
   __getLocationAsync = async ()=>{
     let { status } = await Permissions.askAsync(Permissions.LOCATION)
     if(status !== 'granted')
     console.log('Permission to access location was denied.');
     let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true})
     let region = {
       latitude: location.coords.latitude,
       longitude:location.coords.longitude,
       latitudeDelta: 0.045,
       longitudeDelta: 0.045,
     }

     this.setState({region: region})
   }

   centerMap =  ()=>{
     const{
       latitude,
       longitude,
       latitudeDelta,
       longitudeDelta} = this.state.region;

       this.map.animateToRegion({
         latitude,
         longitude,
         latitudeDelta,
         longitudeDelta
       })
   }
  render() {
    return (
      <View style={styles.container}>
        <DestinationButton/>
        <CurrentLocationButton cb={()=>{this.centerMap()}}/>
        <MapView
        ref={(map)=>{this.map = map}}
        showsUserLocation={true}
        initialRegion={this.state.region}
        showCompass={true}
        rotateEmbeded={false}
        style={{flex:1}}>
        <ParkingSpot driver={{uid: 'null', location:{
          latitude:37.78825,
          longitude:-122.4324,
        }}}/>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default Home;
