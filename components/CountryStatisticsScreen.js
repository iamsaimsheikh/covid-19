import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,SafeAreaView,TextInput,AsyncStorage, KeyboardAvoidingView} from 'react-native';

import axios from 'axios'
import {useEffect,useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favourities from './Favourities' 

const earthIcon= <Ionicons name="earth-outline" size={30} color="#ea3c53"/>
const searchIcon=<Ionicons name="search-outline" size={25} color="#ea3c53"/>
const starOutline=<Ionicons name="star-outline" size={30} color="#ea3c53"/>
const starFilled= <Ionicons name="star" size={30} color="#ea3c53"/>
export default function CountryStatisticsScreen({navigation}) {

    const [countryData,setCountryData]=useState([])
    const [favourities,setFavourities]=useState([])
    const [searchText,setSearchText]=useState('')

    
    
    const addToFavourities = (country) =>{
        country.inFavourite=starFilled
        setFavourities(prevFavourities =>{
            return( [
                {id:country.id,name:country.name,cases:country.cases,deaths:country.deaths,
                    todayCases:country.todayCases,recovered:country.recovered,inFavourite:starFilled,critical:country.critical},
                    ...prevFavourities
                ])
            })

            const setItem = async (favourities) =>{

        
                try{
                    await AsyncStorage.setItem('1',JSON.stringify(favourities)).then(i => console.log(i))
                }
                catch(error){
                    console.log(error)
                }
            }

        setItem(favourities)
        
        
    }

            useEffect(()=>{
                getData()
                // setItem()
                // setFavourities()
                
                
            },[])

    
        const getData = () => {
            axios.get('https://coronavirus-19-api.herokuapp.com/countries')
            .then((response) => {
                const data = response.data
                var temp = []
                data.forEach(element => {
                    temp = [...temp,{id:temp.length,name:element.country,cases:element.cases,deaths:element.deaths,
                    todayCases:element.todayCases,recovered:element.recovered,inFavourite:starOutline,critical:element.critical}]
                });
                setCountryData(temp)
            })
            .catch((error)=>{
                console.log(error)
            })
        }

        
    


  return (
    <KeyboardAvoidingView  style={styles.container}>
        <View style={styles.headingView}> 
        {earthIcon}
        <Text style={styles.heading}>COUNTRY STATISTICS</Text>  
            </View>
    <View style={styles.searchView}>
        <View style={{width:"65%",flexDirection:"row",alignItems:"center",justifyContent:'center',
    borderBottomWidth:2,borderBottomColor:'white'}}>
    {searchIcon}
    <TextInput style={styles.searchBox} placeholder="  Search Country" value={searchText} onChangeText={(text) => setSearchText(text)}/>
    </View>
            </View>
            <View style={styles.listView}>
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList 
      data={countryData}
      keyExtractor={(item)=>{item.name}}
      renderItem={({item})=>{
          if((item.name).toLowerCase().includes(searchText) || searchText ==''){
          return(
              <CountryList country={item} onSubmitHandler={addToFavourities} navigation={navigation} />
          )
          }
      }}
      />
      </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const CountryList = ({country,onSubmitHandler,navigation}) =>{

    if(country.inFavourite==starOutline){

    return(
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => {navigation.navigate('FavouritiesDetail',{ favObj: country}) }}>
            
            
            <Text style={styles.listText}>{country.name}</Text>
            <Text  onPress={()=>{onSubmitHandler(country)}} style={styles.listText}>{country.inFavourite}</Text>
            
        </TouchableOpacity>
    )
    }
    else{
        return(
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => {navigation.navigate('FavouritiesDetail',{ favObj: country}) }}  >
                
                <Text style={styles.listText}>{country.name}</Text>
            <Text style={styles.listText}>{country.inFavourite}</Text>
            
                
            </TouchableOpacity>
        )
    }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"transparent"
  },
  headingView:{
    flex:0.15,
    alignItems:'flex-end',
    justifyContent:'center',
    width:'100%',
    backgroundColor:'pink',
    flexDirection:'row',
},
heading:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    paddingTop:0,
    margin:5
},

searchView:{
    flex:0.18,
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor:'pink',
    flexDirection:'row',
    width:"100%",
},

searchBox:{
    width:"80%",
    height:"60%",
    color:'white',
    textAlign:'left',
    padding:10
},

listView:{
    flex:0.7,
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    width:"100%",
},

  safeAreaView:{
      flex:0.9,
      width:"90%",
      justifyContent:'center'
  },

  touchableOpacity:{
      alignItems:"flex-start",
      flexDirection:'row',
      justifyContent:'space-between',
      width:"95%",
      margin:7,
      height:70,
      backgroundColor:"transparent",
      borderBottomWidth:1.5,
      borderColor:'pink',
      borderRadius:10
  },

  listText:{

      color:"#ea3c53",
      padding:5,
      fontSize:23,
      fontWeight:'bold'
  },



  
});