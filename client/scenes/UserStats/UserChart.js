import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';

import styles from '../../styles';

export default class UserChart extends Component<{}> {
  componentWillMount() {
    const { user } = this.props;

    const bench = {};
    bench['x'] = '0';
    bench['y'] = user.ormBench;
    bench['label'] = 'Bench';
    bench['fill'] = 'red';

    const ohp = {};
    ohp['x'] = '1';
    ohp['y'] = user.ormOverheadPress;
    ohp['label'] = 'Overhead Press';
    ohp['fill'] = 'orange';

    const squat = {};
    squat['x'] = '2';
    squat['y'] = user.ormSquat;
    squat['label'] = 'Squat';
    squat['fill'] = 'gold';

    const deadlift = {};
    deadlift['x'] = '3';
    deadlift['y'] = user.ormDeadlift;
    deadlift['label'] = 'Deadlift';
    deadlift['fill'] = 'cyan';

    const renderChart = [bench, ohp, squat, deadlift];

    this.setState({ renderChart });
  }
  render() {
    console.log('RENDER CHART', this.state.renderChart);

    return (
      <View style={styles.chartStyle}>
        <VictoryChart polar>
          <VictoryBar
            style={{ data: { fill: 'tomato', opacity: 0.5 } }}
            size={9}
            data={this.state.renderChart}
          />
        </VictoryChart>
      </View>
    );
  }
}
