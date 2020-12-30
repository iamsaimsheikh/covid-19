import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Audiowide from '@expo-google-fonts/audiowide';
import axios from 'axios';
import {useState} from 'react'
import CountryStatisticsScreen from './CountryStatisticsScreen'
import { useEffect } from 'react';

const alertIcon= <Icon name="warning" size={35} color="red"/>

export default function WorldStatisticsScreen({navigation}) {
    const [data,setData]=useState([]);
    const [population,setPopulation]=useState([]);
    const [update,setUpdate]=useState('');

    useEffect(()=>{
        getData()
        getWorldPopulation()
    },[])

    const getData = () => { axios.get('https://api.covid19api.com/summary')
    .then(response => {setTimeout(()=>{
        setData(response.data.Global)
        let today = new Date().toISOString().slice(0, 10);
        setUpdate(today);
    },10000)
    })
    .catch(error => {console.log(error)})
}

    const options =  {
        method: 'GET',
        url: 'https://world-population.p.rapidapi.com/worldpopulation',
        headers: {
          'x-rapidapi-key': '223d2eeb67msh46031512f907e59p138271jsn78138a542e73',
          'x-rapidapi-host': 'world-population.p.rapidapi.com'
        }
      };


      
    const getWorldPopulation = () => {   axios.request(options).then(function (response) {
          setPopulation(response.data.body.world_population);

      }).catch(function (error) {
          console.error(error);
      });
    }



  return (
    <View style={styles.container}>
        
       
    <View style={styles.headingView}> 
        {alertIcon}
        <Text style={styles.heading}>COVID-19 STATISTICS</Text>  
    </View>

    <View style={styles.totalView}>
        <Text style={styles.totalTextNum}>{data.TotalConfirmed}</Text>
        <Text style={styles.totalTextFooter}>Total Confirmed</Text>
        <Text style={styles.totalTextNum}>{population}</Text>
        <Text style={styles.totalTextFooter}>Total Population</Text>
    </View>

    <View style={styles.row}>
        <View style={styles.column}>
            <Text style={styles.textPercentage}> {(data.TotalConfirmed/population*100).toFixed(3)}%</Text>
            <Text style={styles.textFooter}>New Confirmed</Text>
        </View>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{(data.TotalRecovered/population*100).toFixed(3)}%</Text>
            <Text style={styles.textFooter}>Recovered</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{(data.NewConfirmed/population*100).toFixed(3)}%</Text>
            <Text style={styles.textFooter}>Critical</Text>
        </View>
        <View style={styles.column}>
            <Text style={styles.textPercentage}>{(data.TotalDeaths/population*100).toFixed(3)}%</Text>
            <Text style={styles.textFooter}>Deaths</Text>
        </View>
    </View>

    
    <Text style={styles.countryWiseText} onPress={()=> navigation.navigate('Country Statistics')}>Country-wise Statistics &gt;</Text>
    <View style={styles.lastUpdateView}>
    <Text style={styles.lastUpdateText}>Last Updated: {update}</Text>
    </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headingView:{
      flex:0.125,
      alignItems:'flex-end',
      justifyContent:'center',
      width:'100%',
      backgroundColor:'pink',
      flexDirection:'row',
      borderBottomColor:'pink',
      borderBottomWidth:15,
      borderBottomLeftRadius:15,
      borderBottomRightRadius:15
  },
  heading:{
      fontSize:20,
      color:'white',
      fontWeight:'bold',
      fontFamily:Audiowide,
      paddingTop:0,
      margin:5
  },

  totalView:{
      flex:0.3,
      paddingTop:10,
      alignItems:'center',
      justifyContent:'center',
      width:'100%'
  },

  totalTextNum:{
      fontSize:40,
      color:'#ea3c53',
      margin:5,
      fontWeight:'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius: 7,
      elevation:6
  },

  totalTextFooter:{
      fontSize:16,
      color:'maroon',
      fontWeight:'bold'
  },

  row:{
      flex:0.2,
      width:'100%',
      alignItems:'center',
      alignContent:'center',
      flexDirection:'row',
      padding:5

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
      fontSize:36,
      fontWeight:'bold',
      color:'#ea3c53',
  },

  textFooter:{
      fontSize:15,
      color:'maroon',
      fontWeight:'bold',
  },

  lastUpdateView:{
      flex:0.1,
      alignItems:'center',
      alignContent:'center'
  },

  lastUpdateText:{
    fontSize:15,
    color:'maroon',
    lineHeight:60
  },
  
  countryWiseText:{
    fontSize:20,
    color:'#ea3c53',
    fontWeight:'bold',
    backgroundColor:'white',
    borderRadius:10,
    width:'70%',
    textAlign:'center',
    height:30,
    marginTop:20,
    shadowColor: "#000",
      shadowOffset: {
	  width: 0,
	  height: 3,
     },
      shadowOpacity: 0.27,
     shadowRadius: 4.65,
     elevation: 6,
  }

});