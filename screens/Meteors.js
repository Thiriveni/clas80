import React, { Component } from 'react';
import { Text, View, Alert, FlatList, SafeAreaView, Platform, StatusBar, Dimensions, ImageBackground, Image,StyleSheet } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    keyExtractor=(item,index)=>{
      index.toString()
    }

    renderItem=({item})=>{
      let meteor=item
      let bg_Img,speed,size;
      if(meteor.threat_score<=30){
        bg_Img=require("../ISS-assets/assets/meteor_bg1.png")
        speed=require("../ISS-assets/assets/meteor_speed3.gif")
        size=100
      }
      else if(meteor.threat_score<=75){
        bg_Img=require("../ISS-assets/assets/meteor_bg2.png")
        speed=require("../ISS-assets/assets/meteor_speed3.gif")
        size=150
      }
      else {
        bg_Img=require("../ISS-assets/assets/meteor_bg3.png")
        speed=require("../ISS-assets/assets/meteor_speed3.gif")
        size=200
      }
      return(
          <View>
           <ImageBackground 
           source={bg_Img}
           style={styles.backgroundImage}
           >
               <View style={styles.gifContainer}>
            <Image source={speed}
            style={{width:size,height:size,alignSelf:"center"}}
            >

            </Image>
            <View>
                <Text style={styles.cardTitle}>{
                    item.name
                   }   </Text>
                <Text style={[styles.cardText,{marginTop:20,marginLeft:50}]}>
                    Closest to Earth - {item.close_approach_data[0].close_approach_date_full}
                </Text>
                <Text style={[styles.cardText,{marginTop:5,marginLeft:50}]}>
                    Minimum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_min}
                </Text>
                <Text style={[styles.cardText,{marginTop:5,marginLeft:50}]}>
                    Maximum Diameter (km) - {item.estimated_diameter.kilometers.estimated_diameter_max}
                </Text>
                <Text style={[styles.cardText,{marginTop:5,marginLeft:50}]}>
                    Velocity (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                </Text>
                <Text style={[styles.cardText,{marginTop:5,marginLeft:50}]}>
                    Missing Earth by (km) - {item.close_approach_data[0].miss_distance.kilometers}
                </Text>
        
                
            
                </View>
            </View>

           
           </ImageBackground>
          </View>
      )
    }

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

          meteors.sort(function(a,b){
            return b.threat_score-a.threat_score
          })

          meteors=meteors.slice(0,5)

            return (
                <View style={{flex:1}}>
                    <SafeAreaView
                    style={styles.droidSafeArea}
                    />
                <FlatList 
                data={
                    meteors
                }
                renderItem={
                    this.renderItem
                }
                keyExtractor={
                    this.keyExtractor
                }
                horizontal={
                    true
                }
                >
                    
                   
                   
         </FlatList>    
                   
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
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
    },
    gifContainer:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    cardTitle:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold',
        color:"white",
        marginTop:400,
        marginLeft:50
    },
    cardText:{
        color:"white"
    }
})