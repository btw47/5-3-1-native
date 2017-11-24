import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryChart,
  VictoryArea
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
          style={{
            textAlign: 'center',
            fontSize: 32,
            marginTop: '10%'
          }}>
          Your ORM Progress
        </Text>
        <View style={{ paddingTop: '10%' }}>
          <Text style={{ textAlign: 'center', fontSize: 28 }}>Bench</Text>
          <VictoryChart>
            {this.state.renderedBench && (
              <VictoryArea
                interpolation="natural"
                data={this.state.renderedBench}
                style={{
                  data: { fill: '#cc4b35' }
                }}
              />
            )}
          </VictoryChart>
        </View>
        <View style={{ paddingTop: '10%' }}>
          <Text style={{ textAlign: 'center', fontSize: 28 }}>
            Overhead Press
          </Text>
          <VictoryChart>
            {this.state.renderedOhp && (
              <VictoryArea
                interpolation="natural"
                data={this.state.renderedOhp}
                style={{
                  data: { fill: '#22ad3e' }
                }}
              />
            )}
          </VictoryChart>
        </View>
        <View style={{ paddingTop: '10%' }}>
          <Text style={{ textAlign: 'center', fontSize: 28 }}>Squats</Text>
          <VictoryChart>
            {this.state.renderedSquat && (
              <VictoryArea
                interpolation="natural"
                data={this.state.renderedSquat}
                style={{
                  data: { fill: '#11c1a7' }
                }}
              />
            )}
          </VictoryChart>
        </View>
        <View style={{ paddingTop: '10%' }}>
          <Text style={{ textAlign: 'center', fontSize: 28 }}>Deadlift</Text>
          <VictoryChart>
            {this.state.renderedDeadlift && (
              <VictoryArea
                interpolation="natural"
                data={this.state.renderedDeadlift}
                style={{
                  data: { fill: '#6b42f4' }
                }}
              />
            )}
          </VictoryChart>
        </View>
      </ScrollView>
    );
  }
}
