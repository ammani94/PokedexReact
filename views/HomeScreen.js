import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class HomeScreen extends Component {

    render() {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Hello, !</Text>
          </View>
        );
      }
  }

export default HomeScreen;