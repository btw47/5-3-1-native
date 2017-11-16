import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends Component<{}> {
  static navigationOptions = {
    title: 'Welcome to 5-3-1 Pro'
  };

  handleLogin = () => {
    const { navigate } = this.props.navigation;
    navigate('Login');
  };

  render() {
    return (
      <View>
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}
