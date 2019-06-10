import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class PokemonDetails extends Component {

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
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
  
      return(
        <View style={{flex: 1, paddingTop:40}}>
          <FlatList style={{borderColor:'black'}}
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={({id}, index) => id}
          />
        </View>
      );
    }
  
  }

  export default PokemonDetails;