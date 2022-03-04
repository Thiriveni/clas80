import React, { Component } from 'react';
import { Alert, Text, View, ImageBackground, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import axios from 'axios';
import MapView,{Marker}  from  "react-native-maps"

export default class IssLocationScreen extends Component {

constructor(){
    super();
    this.state={
        location:{}
    }
}

    componentDidMount(){
        this.getIssLocation()
    }

    getIssLocation=()=>{
     axios
     .get("https://api.wheretheiss.at/v1/satellites/25544")
     .then(
         (responce)=>{
          this.setState({
              location:responce.data
          })
     .catch(
         (error)=>{
          Alert.alert(error.message)
         }
     )
         }
     )
    }
    render() {
        if(Object.keys(this.state.location).length===0){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <Text>
                      Loading...
                  </Text>
                </View>
            )
        }
        else{

        
        return (
            
            <View
                style={{
                    flex: 1,
                    
                }}>
                     <SafeAreaView style={styles.droidSafeArea}>
                         </SafeAreaView>
                <ImageBackground 
                source={require("../ISS-assets/assets/iss_bg.jpg")}
                style={styles.backgroundImage}
                >
                  
                
               <View style={styles.titleBar}>  
               <Text style={styles.titleText}>ISS Location</Text>  
               </View>
               <View style={styles.mapContainer}>
                   <MapView 
                   style={styles.map}
                   region={{
                       latitude:this.state.location.latitude,
                       longitude:this.state.location.longitude,
                       latitudeDelta:100,
                       longitudeDelta:100
                   }}
                   >
                <Marker coordinate={{
                    latitude:this.state.location.latitude,
                    longitude:this.state.location.longitude
                    }}>
                        <Image
                        source={require("../ISS-assets/assets/iss_icon.png")}
                        style={{height:50,width:50}}
                        />

                </Marker>

                   </MapView>
               </View>
               <View style={styles.infoContainer}>
               <Text style={styles.infoText}>
                   Latitude: {this.state.location.latitude} </Text>
                   <Text style={styles.infoText}>Longitude: {this.state.location.longitude} </Text>
                   <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude} </Text>
                   <Text style={styles.infoText}>Velocity (KM/H): {this.state.location.velocity} </Text>
               </View>
                </ImageBackground>
            </View>
        )
                }
    }
}

const styles=StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
     },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    mapContainer: {
        flex:0.7
    },
    map: {
        width:"100%",
        height:"100%"

    },
    infoContainer:{
        flex:0.2,
        backgroundColor:"white",
        marginTop:-10,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:30
    },
    infoText:{
        fontSize:15,
        color:"black",
        fontWeight:"bold"
    }
})
