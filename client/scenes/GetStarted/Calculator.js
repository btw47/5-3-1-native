import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';

class Calculator extends Component<{}> {
  state = { showModal: false, calculated: false };

  oneRepMax = (weight, reps) => {
    let max = (weight * reps * 0.0333 + weight) * 0.9;
    return Math.ceil(max);
  };

  calculateORM = () => {
    const {
      BenchWeight,
      BenchReps,
      OverheadWeight,
      OverheadReps,
      SquatWeight,
      SquatReps,
      DeadliftWeight,
      DeadliftReps
    } = this.state;

    if (
      !BenchWeight ||
      !BenchReps ||
      !OverheadWeight ||
      !OverheadReps ||
      !SquatWeight ||
      !SquatReps ||
      !DeadliftWeight ||
      !DeadliftReps
    ) {
      Alert.alert('All input fields must be filled out');
    } else {
      console.log('SUBMITTED');
      // const calculatedBench = this.oneRepMax(
      //   parseInt(this.state.BenchWeight.value),
      //   parseInt(this.state.BenchReps.value)
      // );
      //
      // const calculatedOhp = this.oneRepMax(
      //   parseInt(this.state.OverheadWeight.value),
      //   parseInt(this.state.OverheadReps.value)
      // );
      //
      // const calculatedDeadlift = this.oneRepMax(
      //   parseInt(this.state.DeadliftWeight.value),
      //   parseInt(this.state.DeadliftReps.value)
      // );
      // const calculatedSquat = this.oneRepMax(
      //   parseInt(this.state.SquatWeight.value),
      //   parseInt(this.state.SquatReps.value)
      // );
      //
      this.props.setORM(
        BenchWeight,
        BenchReps,
        OverheadWeight,
        OverheadReps,
        SquatWeight,
        SquatReps,
        DeadliftWeight,
        DeadliftReps
      );

      this.setState({ showModal: false });
    }
  };

  render() {
    console.log('THIS STATE', this.state);
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
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
            <Button
              title="Calculate ORM"
              onPress={() => {
                this.calculateORM();
              }}
            />
          </View>
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

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
