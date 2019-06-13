import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import {createStackNavigator, createAppContainer, NavigationActions, StackActions} from 'react-navigation';

const styles = StyleSheet.create({
  text_center: {
    alignSelf: 'center',
  },
  text_center_bottom: {
    alignSelf:'center',
    marginBottom: 20,
  },
  text_center_top: {
    alignSelf:'center',
    marginTop: 30,
  },
});

class PokemonDetails extends Component {

    constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }
    componentDidMount(){
      const { navigation } = this.props;
      const pokemon_name = navigation.getParam('name', 'NO-ID');
      var newurl = 'https://pokeapi.co/api/v2/pokemon/'+pokemon_name;
      return fetch(newurl)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.abilities);
          this.setState({
            isLoading: false,
            PokemonName: responseJson.name,
            PokemonImage: responseJson.sprites.front_default,
            PokemonId:responseJson.id,
            PokemonAbilities: responseJson.abilities,
            PokemonMoves: responseJson.moves,
            PokemonStats: responseJson.stats,

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

      let pic = {
        uri: this.state.PokemonImage
      };
        
      return(
            <View style={{flex: 1, paddingTop:20}}>
              <Text style={styles.text_center_bottom}>{this.state.PokemonName} n°{this.state.PokemonId}</Text>
              <Image source={pic} style={{width: 193, height: 160, alignSelf: 'center'}} />

              <Text style={styles.text_center_bottom}>Stats</Text>
              <FlatList style={{borderColor:'black'}}
              data={this.state.PokemonStats}
              renderItem={({item}) => 
              <Text style={styles.text_center}>{item.stat.name} : {item.base_stat}</Text>}
              keyExtractor={({id}, index) => id}
            />
              
            </View>
      );
        
      
    }
  
  }

  export default PokemonDetails;