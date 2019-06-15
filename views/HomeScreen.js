import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';

class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
      componentDidMount(){
        return fetch('https://pokeapi.co/api/v2/pokemon/')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.results,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }
    
      render(){
        if(this.state.isLoading){
          return(
            <View style={{padding: 20}}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
          )
        }
    
        return(
          <View style={{flex: 1, paddingTop:40}}>
            <FlatList style={{borderColor:'black'}}
              data={this.state.dataSource}
              renderItem={({item}) => 
              <Button
          title={item.name}
          onPress={ () => {this.props.navigation.navigate('Pokemon', {
            name: item.name,
          });
        }}
        />}
              keyExtractor={({id}, index) => id}
            />
          </View>
        );
      }
  }

export default HomeScreen;