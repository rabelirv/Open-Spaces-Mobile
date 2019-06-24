import React from 'react';
import { AsyncStorage,Platform, Animated,Image,TouchableOpacity,Dimensions,InteractionManager, StyleSheet, Text, View } from 'react-native';
import {MapView, Permissions, Location} from 'expo';
import DestinationButton from './DestinationButton';
import MenuOptions from './MenuOptions';
import MenuButton from './MenuButton';
import CurrentLocationButton from './CurrentLocationButton';
import ParkingSpot from './ParkingSpot';
import Drawer from 'react-native-drawer';
import {connect} from 'react-redux';
import {removeUserToken,getUserToken} from '../actions';
import {RideRequestSection} from './RideRequestSection';
import {HomeScreenButtons} from './HomeScreenButtons';
import DestinationInput from './DestinationInput';

 class Home extends React.Component {
   state = {
     region: null,
     menuOpen: false,
     errorMessage: null,
     requestSectionOpen: false,
     destinationInputOpen: false,
     route:null
   }

   componentDidMount(){
     this.props.getUserToken()
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

    setRegionToCurrentLocation=()=> {
        this.setState({region: this.getRegionFromLocation(this.state.location)})
    }

    toggleComponentOverlay=()=> {
        this.setState({requestSectionOpen: !this.state.requestSectionOpen})
    }

    toggleDestinationInput=()=> {
        this.setState({destinationInputOpen: !this.state.destinationInputOpen})
    }

    componentOverlay=()=> {
        if(this.state.requestSectionOpen)
            return <RideRequestSection
                backCb={() => { this.toggleComponentOverlay() }}
                locationCb={() => { this.centerMap() }} />
        else if(this.state.destInputOpen && !this.state.requestSectionOpen)
            return <DestinationInput
                backCb={() => { this.toggleDestinationInput() }}
                coordsCb={(coords) => { this.setState({route: coords}) }} />
        else
            return <HomeScreenButtons
                navigation={this.props.navigation}
                toggleDestinationInput={() => { this.toggleDestinationInput() }}
                toggleComponentOverlay={() => { this.toggleComponentOverlay() }}
                setRegionToCurrentLocation={() => { this.centerMap() }} />
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
        {this.componentOverlay()}
        </MapView>

    );
  }
}

// <Drawer
// open={this.state.menuOpen}
// content={<MenuOptions navigation={this.props.navigation}/>}
// type="overlay"
// tapToClose={true}
// openDrawerOffset={0.2}
// panCloseMask={0.2}
// closedDrawerOffset={-3}
// styles={drawerStyles}
// tweenHandler={(ratio) => ({
//   main: { opacity:(2-ratio)/2 }
// })}
// >
// <DestinationButton cb={()=>{this.props.navigation.navigate("ParkingForm")}}/>
// <CurrentLocationButton cb={()=>{this.centerMap()}}/>
// <MenuButton cb={()=>this.setState({menuOpen:true})}/>
const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
    getUserToken:()=>dispatch(getUserToken())
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
