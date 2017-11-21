import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';

import styles from '../../styles';

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
      <View style={{ flex: 1, marginHorizontal: '2%' }}>
        <View style={styles.container}>
          <Image
            source={require('../../images/better-button-logo-best.png')}
            style={styles.logoStyle}
          />
        </View>
        <View style={{ flex: 1, position: 'relative', top: '5%' }}>
          {/* <Button
            style={styles.getStartedButton}
            onPress={this.handleGetStarted}
            textStyle={styles.getStartedButtonText}>
            Get Started
            </Button>
            <Button
            style={styles.getStartedButton}
            onPress={this.handleLogin}
            textStyle={styles.getStartedButtonText}>
            Log In
          </Button> */}
          <View style={{ marginTop: '10%', marginBottom: '5%' }}>
            <Button
              style={styles.getStartedButton}
              onPress={this.handleGetStarted}
              textStyle={styles.getStartedButtonText}
              title="Get Started"
            />
          </View>
          <Button
            style={styles.getStartedButton}
            onPress={this.handleLogin}
            textStyle={styles.getStartedButtonText}
            title="Log In"
          />
        </View>
      </View>
    );
  }
}
