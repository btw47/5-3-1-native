import React, { Component } from 'react';
import { Button, Text, View, Image, ScrollView } from 'react-native';

import AboutUs from './AboutUs/AboutUsModal';
import styles from '../../styles';

export default class GetStarted extends Component<{}> {
  handleRedirect = () => {
    this.props.navigation.navigate('SignUp');
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
          <AboutUs />
          <Button
            title="create an account"
            onPress={() => this.handleRedirect()}
          />
        </View>
      </View>
      // <View style={styles.container}>
      //   <Image
      //     source={require('../../images/better-button-logo-best.png')}
      //     style={{
      //       width: '50%',
      //       height: '50%',
      //       resizeMode: 'contain',
      //       flex: 1,
      //       position: 'absolute',
      //       marginBottom: '30%'
      //     }}
      //   />
      //   <Text style={{ textAlign: 'center', marginTop: '40%', flex: 0.5 }}>
      //     Here we can say what the app is about and why people should use it
      //   </Text>
      //
      // </View>
    );
  }
}
