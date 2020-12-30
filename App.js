import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CountryStatisticsScreen from './components/CountryStatisticsScreen';
import WorldStatisticsScreen from './components/WorldStatisticsScreen';
import Favourities from './components/Favourities'
import FavouritiesDetail from './components/FavouritiesDetails'


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Statistics">
        <Drawer.Screen name="World Statistics" component={WorldStatisticsScreen} />
        <Drawer.Screen name="Country Statistics" component={CountryStatisticsScreen} />
        <Drawer.Screen name="Favourities" component={Favourities} />
        <Drawer.Screen name="FavouritiesDetail" component={FavouritiesDetail} options={{drawerLabel:()=> null}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
