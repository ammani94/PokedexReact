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
    color:'white',
    fontWeight:'bold'
  },
  text_center_top: {
    alignSelf:'center',
    marginTop: 30,
  },
  display_image: {
    backgroundColor: 'grey',
    alignSelf:'center',
    width: 100,
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
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }

      let pic = {
        uri: this.state.PokemonImage
      };
        
      return(
            <View style={{flex: 1, paddingTop:0}}>
              <View style={{backgroundColor:'black'}}>
                <Text style={styles.text_center_bottom}>{this.state.PokemonName} n°{this.state.PokemonId}</Text>
                <Image source={pic} style={{width: 193, height: 160, alignSelf: 'center'}} />
              </View>
              
              <View style={{flex: 2, paddingTop:20, flexDirection:'row'}}>
                <View style={{flex: 1, height:150, marginLeft:20}}>
                  <Text style={{marginBottom: 20, color:'grey', fontWeight:'bold'}}>Stats</Text>
                  <FlatList
                  data={this.state.PokemonStats}
                  renderItem={({item}) =>
                  <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginRight:10, marginTop:10}}>
                    <Text style={{}}>{item.stat.name} : {item.base_stat}</Text>

                  </View>
                  }
                  keyExtractor={({id}, index) => id}
                  />
                </View>

                <View style={{flex: 1, height:150, marginLeft:20}}>
                
                  <Text style={{marginBottom: 20, color:'grey', fontWeight:'bold'}}>Abilities</Text>
                  {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}></View> */}
                  <FlatList 
                  data={this.state.PokemonAbilities}
                  renderItem={({item}) => 
                  <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginRight:10, marginTop:10}}>
                    <Text>{item.ability.name}</Text>

                  </View>
                  }
                  keyExtractor={({id}, index) => id}
              />
                </View>

              </View>

            </View>
      );
        
      
    }
  
  }

  export default PokemonDetails;