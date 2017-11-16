import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import profileImage from '../../../images/anon-user.jpg';
import styles from '../../../../styles';

export default class UserStats extends Component<{}> {
  renderImage = () => {
    const image = this.props.profileImage
      ? this.props.profileImage
      : require('../../../images/anon-user.jpg');
    return (
      <Image source={image} style={styles.profileImage} resizeMode="contain" />
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: 65, height: 65 }}>{this.renderImage()}</View>
        <View>
          <Text>Name: {user.fullName}</Text>
          <Text>Weight: {user.weight}</Text>
          <Text>ONE REP MAXES</Text>
          <Text>Bench: {user.ormBench}</Text>
          <Text>Overhead Press: {user.ormOverheadPress}</Text>
          <Text>Squat: {user.ormSquat}</Text>
          <Text>Deadlift: {user.ormDeadlift}</Text>
        </View>
      </View>
    );
  }
}
