import React, { Component } from 'react';
import {
  Text,
  AppRegistry,
  TextInput,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class Field extends Component{
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      badInput: false,
      fieldAlert: [''],
      keyExtractor: null,
      onChangeText: '',
      secureTextEntry:false,
    };
  }

  render(){

    if (this.props.badInput){
      field_style = {
        //backgroundColor: '#F78181',
        color: 'red',
      }
    }
    else{ // default button style
      field_style = {
        color: '#49515f',
        //borderWidth: 2,
      }
    }
  return(
    <View style={styles.container}>
        <Item floatingLabel last>
            <Label style={field_style}>{this.props.placeholder}</Label>
            <Input 
                style={{color: 'black'}}
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.props.onChangeText}
            />
        </Item>
        <FlatList
            data={this.props.fieldAlert}
            renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
            keyExtractor={item => this.props.keyExtractor}
        />
     </View>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '90%',
    justifyContent: 'center',
  },
})