import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, FlatList,Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const starIcon= <Ionicons name="star" size={32} color="#ea3c53"/>
export default function FavouritiesDetails({navigation,route}){
    const favouritie = route.params.favObj
    

    return(
        <View style={styles.container}>
          <View style={styles.headingView}> 
          {starIcon}
          <Text style={styles.heading}>{favouritie.name}</Text> 
          </View> 
          <View style={styles.row}>
        <View style={styles.column}>
            <Text style={styles.textPercentage}> {favouritie.cases} </Text>
            <Text style={styles.textFooter}>New Confirmed</Text>
        </View>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{favouritie.recovered}</Text>
            <Text style={styles.textFooter}>Recovered</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{favouritie.critical}</Text>
            <Text style={styles.textFooter}>Critical</Text>
        </View>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{favouritie.deaths}</Text>
            <Text style={styles.textFooter}>Deaths</Text>
        </View>
    </View>

    <Text style={styles.countryWiseText} onPress={()=> navigation.goBack()}> &lt; Go Back</Text>

          </View>
          
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    headingView:{
      flex:0.1,
      alignItems:'flex-end',
      justifyContent:'center',
      width:'100%',
      backgroundColor:'pink',
      flexDirection:'row',
      padding:25
  },
  heading:{
      fontSize:25,
      color:'white',
      fontWeight:'bold',
      paddingTop:0,
      marginLeft:10
      
  },

  row:{
    flex:0.2,
    width:'100%',
    alignItems:'center',
    alignContent:'center',
    flexDirection:'row',
    padding:5,
    marginTop:10

},

column:{
    flex:0.5,
    alignItems:'center',
    alignContent:'center',
    backgroundColor:'white',
    margin:10,
    height:130,
    textAlign:"center",
    paddingTop:30,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
   },
    shadowOpacity: 0.27,
   shadowRadius: 4.65,
   elevation: 6,   
},

textPercentage:{
    fontSize:23,
    fontWeight:'bold',
    color:'#ea3c53',
    margin:5
},

textFooter:{
    fontSize:15,
    color:'maroon',
    fontWeight:'bold',
},

countryWiseText:{
    alignItems:'flex-end',
    fontSize:20,
    color:'#ea3c53',
    fontWeight:'bold',
    backgroundColor:'white',
    borderRadius:10,
    width:'70%',
    textAlign:'center',
    height:30,
    marginTop:30,
    shadowColor: "#000",
      shadowOffset: {
	  width: 0,
	  height: 3,
     },
      shadowOpacity: 0.27,
     shadowRadius: 4.65,
     elevation: 6,
  }
})