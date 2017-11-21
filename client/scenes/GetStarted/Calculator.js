import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Alert,
  ScrollView,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';

import styles from '../../styles';

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
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ScrollView style={{ marginHorizontal: '1%' }}>
            <Text style={styles.title}>ORM Calculator</Text>
            <View>
              <View>
                <Text style={styles.calculatorTitle}>Bench Press</Text>
              </View>
              <TextInput
                onChangeText={value => this.setState({ BenchWeight: value })}
                placeholder="Weight (lbs)"
                keyboardType="numeric"
                onSubmitEditing={event => {
                  this.refs.Two.focus();
                }}
              />
              <TextInput
                onChangeText={value => this.setState({ BenchReps: value })}
                placeholder="Reps"
                keyboardType="numeric"
                ref="Two"
                onSubmitEditing={event => {
                  this.refs.Three.focus();
                }}
              />
              <View>
                <Text style={styles.calculatorTitle}>Overhead Press</Text>
              </View>
              <TextInput
                onChangeText={value => this.setState({ OverheadWeight: value })}
                placeholder="Weight (lbs)"
                keyboardType="numeric"
                ref="Three"
                onSubmitEditing={event => {
                  this.refs.Four.focus();
                }}
              />
              <TextInput
                onChangeText={value => this.setState({ OverheadReps: value })}
                placeholder="Reps"
                keyboardType="numeric"
                ref="Four"
                onSubmitEditing={event => {
                  this.refs.Five.focus();
                }}
              />
              <View>
                <Text style={styles.calculatorTitle}>Squats</Text>
              </View>
              <TextInput
                onChangeText={value => this.setState({ SquatWeight: value })}
                placeholder="Weight (lbs)"
                keyboardType="numeric"
                ref="Five"
                onSubmitEditing={event => {
                  this.refs.Six.focus();
                }}
              />
              <TextInput
                onChangeText={value => this.setState({ SquatReps: value })}
                placeholder="Reps"
                keyboardType="numeric"
                ref="Six"
                onSubmitEditing={event => {
                  this.refs.Seven.focus();
                }}
              />
              <View>
                <Text style={styles.calculatorTitle}>Deadlift</Text>
              </View>
              <TextInput
                onChangeText={value => this.setState({ DeadliftWeight: value })}
                placeholder="Weight (lbs)"
                keyboardType="numeric"
                ref="Seven"
                onSubmitEditing={event => {
                  this.refs.Eight.focus();
                }}
              />
              <TextInput
                onChangeText={value => this.setState({ DeadliftReps: value })}
                placeholder="Reps"
                keyboardType="numeric"
                ref="Eight"
              />
              <Button
                title="Calculate ORM"
                onPress={() => {
                  this.calculateORM();
                }}
              />
            </View>
          </ScrollView>
        </Modal>

        <View style={{ marginBottom: '10%', marginTop: '10%' }}>
          <Button
            title="ORM CALCULTOR"
            onPress={() => {
              this.setState({ showModal: true });
            }}
          />
        </View>
        {/* <Button
          style={styles.calculatorButton}
          onPress={() => {
            this.setState({ showModal: true });
          }}
          textStyle={{ fontSize: 20, width: 200, color: 'white' }}>
          ORM Calculator
        </Button> */}
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
