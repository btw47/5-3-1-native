import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from '../../styles';

export default class DashboardHeader extends Component<{}> {
  renderImage = () => {
    const image = this.props.profileImage
      ? this.props.profileImage
      : require('../../images/anon-user.jpg');
    return (
      <Image source={image} style={styles.profileImage} resizeMode="contain" />
    );
  };

  render() {
    const { user } = this.props;

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: 65, height: 65 }}>{this.renderImage()}</View>
        <View>
          <Text>Name: {user.fullName}</Text>
        </View>
      </View>
    );
  }
}
