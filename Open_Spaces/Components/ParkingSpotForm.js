import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import Geocode from "react-geocode";

 class ParkingSpotForm extends Component {
   state={
     address:""
   }

   findParking = ()=>{
     Geocode.setApiKey("AIzaSyDttJHB3OrnX9ebfnOv7KHHvUjtCujPesI")
     Geocode.fromAddress(this.state.adresss).then(
       response => {
         const { lat, lng } = response.results[0].geometry.location;
         console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);
   }

   handleChange = (text)=>{
     this.setState({
       address:text
     })
   }
  render() {
    console.log(this.state.address)
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input onChangeText={(text)=>this.handleChange(text)}/>
            </Item>
            <Button onPress={this.findParking}full success>
              <Text>Get Parking</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate("Home")}iconLeft>
              <Icon name='home' />
            <Text>Home</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ParkingSpotForm
