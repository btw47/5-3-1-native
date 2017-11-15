import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends Component<{}> {
  handleLogin = () => {
    const { navigate } = this.props.navigation;
    navigate('Login');
  };

  render() {
    return (
      <View>
        <Text>WELCOME TO THE HOME PAGE</Text>
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}
