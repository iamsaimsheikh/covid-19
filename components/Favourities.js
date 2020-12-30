import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, FlatList,Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const starOutline=<Ionicons name="star-outline" size={30} color="#ea3c53"/>
const starIcon= <Ionicons name="star" size={32} color="#ea3c53"/>
export default function Favourities({navigation}) {
    const [favourities,setFavourities] = useState([])

    
    const getItem = async () =>{
            
        try{
            
           await AsyncStorage.getItem('1')
            .then(i=>{
                setFavourities( prevFav => {
                return (  
                  JSON.parse(i)
                )
                })
            
            })
            
        }
        catch(error){
            console.log(error)
        }

        
    }


      React.useEffect(()=>{
        getItem()
        
      },[favourities])          
        


    

  return (
    <View style={styles.container}>
        <View style={styles.headingView}> 
        {starIcon}
        <Text style={styles.heading}>FAVOURITIES</Text>  
            </View>
      <View style={styles.listView}>
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList 
      data={favourities}
      keyExtractor={(item)=>{item.name}}
      renderItem={({item})=>{
          return(
              <FavList fav={item} navigation={navigation} />
          )
      }}
      />
      </SafeAreaView>
      </View>
    </View>
  );
}


const FavList = ({fav,navigation}) =>{

    useEffect(() => {
      
    }, [fav])

     

    return(
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => {navigation.navigate('FavouritiesDetail',{ favObj: fav}) }} >
            <Text style={styles.listText}>{fav.name}</Text>
            <Text style={styles.listText} >{starIcon}</Text>
        </TouchableOpacity>
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