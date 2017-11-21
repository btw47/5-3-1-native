import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine } from 'victory-native';

export default class DetailedProgress extends Component<{}> {
  render() {
    return (
      <View>
        <VictoryLine interpolation="natural" />
      </View>
    );
  }
}
