import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryChart
} from 'victory-native';

import styles from '../../styles';

export default class DetailedProgress extends Component<{}> {
  constructor() {
    super();
    this.state = {
      rendered: false
    };
  }

  componentDidMount() {
    let bench = [],
      ohp,
      deadlift,
      squat;
    const exercises = [
      'Bench (ORM)',
      'Overhead Press (ORM)',
      'Deadlift (ORM)',
      'Squat (ORM)'
    ];

    let renderedSquat = [];
    let renderedBench = [];
    let renderedOhp = [];
    let renderedDeadlift = [];

    for (let i = 0; i < exercises.length; i++) {
      let count = 0;
      exercises[i] = this.props.progress.map(a => {
        const lift = {};
        const obj = {};
        // obj['x'] = count;
        // obj['x'] = a['name'];
        obj['x'] = count;
        obj['y'] = parseInt(a[exercises[i]]);
        count += 1;
        if (exercises[i] === 'Bench (ORM)') {
          renderedBench.push(obj);
        } else if (exercises[i] === 'Overhead Press (ORM)') {
          renderedOhp.push(obj);
        } else if (exercises[i] === 'Squat (ORM)') {
          renderedSquat.push(obj);
        } else if (exercises[i] === 'Deadlift (ORM)') {
          renderedDeadlift.push(obj);
        }
      });
    }

    this.setState({
      renderedSquat,
      renderedBench,
      renderedDeadlift,
      renderedOhp,
      rendered: true
    });
  }

  render() {
    return (
      <ScrollView>
        <Text
          style={{ textAlign: 'center', fontSize: 32, marginBottom: '15%' }}>
          Your ORM Progress
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Bench</Text>
        <VictoryChart
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}>
          {this.state.renderedBench && (
            <VictoryLine
              interpolation="natural"
              data={this.state.renderedBench}
            />
          )}
        </VictoryChart>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Overhead Press
        </Text>
        <VictoryChart>
          {this.state.renderedOhp && (
            <VictoryLine
              interpolation="natural"
              data={this.state.renderedOhp}
            />
          )}
        </VictoryChart>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Squats</Text>
        <VictoryChart>
          {this.state.renderedSquat && (
            <VictoryLine
              interpolation="natural"
              data={this.state.renderedSquat}
            />
          )}
        </VictoryChart>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Deadlift</Text>
        <VictoryChart>
          {this.state.renderedDeadlift && (
            <VictoryLine
              interpolation="natural"
              data={this.state.renderedDeadlift}
            />
          )}
        </VictoryChart>
      </ScrollView>
    );
  }
}
