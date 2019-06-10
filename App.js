import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './views/HomeScreen';
import PokemonDetails from './views/PokemonDetails';

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Pokemon: {screen: PokemonDetails},
});

export default createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return <RootStack />;
  }
}

