import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Button,
  TextInput
} from 'react-native';

export default class Calculator extends Component<{}> {
  state = { showModal: false };

  oneRepMax = (weight, reps) => {
    let max = (weight * reps * 0.0333 + weight) * 0.9;
    return Math.ceil(max);
  };

  onCalculate = event => {
    this.setState({
      Bench: this.oneRepMax(
        parseInt(this.state.BenchWeight.value),
        parseInt(this.state.BenchReps.value)
      ),
      Overhead: this.oneRepMax(
        parseInt(this.state.OverheadWeight.value),
        parseInt(this.state.OverheadReps.value)
      ),
      Deadlift: this.oneRepMax(
        parseInt(this.state.DeadliftWeight.value),
        parseInt(this.state.DeadliftReps.value)
      ),
      Squat: this.oneRepMax(
        parseInt(this.state.SquatWeight.value),
        parseInt(this.state.SquatReps.value)
      )
    });
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}>
          <View>
            <Text>Bench Press</Text>
            <TextInput
              onChangeText={value => this.setState({ BenchWeight: value })}
              placeholder="Weight (lbs)"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => this.setState({ BenchReps: value })}
              placeholder="Reps"
              keyboardType="numeric"
            />
            <Text>Overhead Press</Text>
            <TextInput
              onChangeText={value => this.setState({ OverheadWeight: value })}
              placeholder="Weight (lbs)"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => this.setState({ OverheadReps: value })}
              placeholder="Reps"
              keyboardType="numeric"
            />
            <Text>Squats</Text>
            <TextInput
              onChangeText={value => this.setState({ SquatWeight: value })}
              placeholder="Weight (lbs)"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => this.setState({ SquatReps: value })}
              placeholder="Reps"
              keyboardType="numeric"
            />
            <Text>Deadlift</Text>
            <TextInput
              onChangeText={value => this.setState({ DeadliftWeight: value })}
              placeholder="Weight (lbs)"
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={value => this.setState({ DeadliftReps: value })}
              placeholder="Reps"
              keyboardType="numeric"
            />
          </View>
          <Button
            title="set ORM"
            onPress={() => {
              this.setState({ showModal: false });
            }}
          />
        </Modal>

        <Button
          title="ORM CALCULTOR"
          onPress={() => {
            this.setState({ showModal: true });
          }}
        />
      </View>
    );
  }
}
