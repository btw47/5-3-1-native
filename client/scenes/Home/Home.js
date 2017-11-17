import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';

import styles from '../../styles';

const logoStyle = {
  flex: 1,
  flexDirection: 'row',
  width: '65%',
  height: '65%',
  resizeMode: 'contain',
  position: 'absolute'
};

export default class Home extends Component<{}> {
  static navigationOptions = {
    title: 'Welcome to 5-3-1 Pro'
  };

  handleLogin = () => {
    const { navigate } = this.props.navigation;
    navigate('Login');
  };

  handleGetStarted = () => {
    const { navigate } = this.props.navigation;
    navigate('GetStarted');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require('../../images/better-button-logo-best.png')}
            style={logoStyle}
          />
        </View>
        <View style={{ flex: 1, position: 'relative', top: '5%' }}>
          <Button title="get started" onPress={this.handleGetStarted} />
        </View>
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}
