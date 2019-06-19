import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, Button, Image } from 'react-native';
import {createStackNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';

class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
      componentDidMount(){
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=365')
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
          <View style={{flex: 1, paddingTop:0}}>
            <View style={{backgroundColor:'#ef5350', alignItems:'center',justifyContent: 'center',}}>
              {/* <Text style={{color:'white', alignItems:'center',justifyContent: 'center', fontWeight:'bold'}}>Pokedex</Text> */}
              <Image style={{height:90}} source={require('../assets/logo-pokemon.png')} />
            </View>
            <FlatList style={{marginTop:10}}
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