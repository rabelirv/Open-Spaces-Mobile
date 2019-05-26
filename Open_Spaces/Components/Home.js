import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MapView, Permissions, Location} from 'expo';
import DestinationButton from './DestinationButton';
import MenuOptions from './MenuOptions';
import MenuButton from './MenuButton';
import CurrentLocationButton from './CurrentLocationButton';
import ParkingSpot from './ParkingSpot';
import Drawer from 'react-native-drawer';

 class Home extends React.Component {
   state = {
     region: null,
     menuOpen:false
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
   closeMenuPanel = () => {
    this._drawer.close()
    };
   openMenuPanel = () => {
      this._drawer.open()
    };

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
    console.log("Menu Open?",this.state.menuOpen);
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        open={this.state.menuOpen}
        content={<MenuOptions />}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
        >
        <DestinationButton/>
        <CurrentLocationButton cb={()=>{this.centerMap()}}/>
        <MenuButton cb={()=>{this.centerMap()}} onPress={()=>{this.setState({menuOpen:true})}}/>
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
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const drawerStyles= {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export default Home;
