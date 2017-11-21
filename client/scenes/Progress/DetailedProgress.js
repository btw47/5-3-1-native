import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryChart
} from 'victory-native';

export default class DetailedProgress extends Component<{}> {
  render() {
    console.log('DETAILED PROGRESS PROPS', this.props);
    let bench = [];
    let count = 0;
    bench = this.props.progress.map(a => {
      let obj = {};
      // obj['x'] = count;
      obj['x'] = a['name'];
      obj['y'] = parseInt(a['Bench (ORM)']);
      count += 1;
      return obj;
    });
    console.log('bench', bench);

    return (
      <View>
        <VictoryChart>
          <VictoryLine interpolation="natural" data={bench} />
        </VictoryChart>
      </View>
    );
  }
}
