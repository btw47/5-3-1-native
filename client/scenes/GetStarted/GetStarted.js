import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import styles from '../../styles';

export default class GetStarted extends Component<{}> {
  handleRedirect = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Get Started</Text>
        <Text>
          Here we can say what the app is about and why people should use it
        </Text>
        <Button
          title="create your account"
          onPress={() => this.handleRedirect()}
        />
      </View>
    );
  }
}
