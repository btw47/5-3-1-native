import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Calculator from './Calculator';
import * as actions from '../../redux/actions';
import { firebaseDb } from '../../../server/firebase';
import styles from '../../styles';

class SetProfile extends Component<{}> {
  constructor() {
    super();
    this.state = {
      showModal: false,
      calculatedSquat: '',
      calculatedOhp: '',
      calculatedDeadlift: '',
      calculatedBench: '',
      calculated: null
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.loggedIn();
      }
    });
  }

  componentDidUpdate() {
    if (!this.state.calculated) {
      if (this.props.state.OneRep.calculatedMax) {
        if (this.props.state.OneRep.calculatedMax.bench) {
          const calculatedMax = this.props.state.OneRep.calculatedMax;
          this.state.calculatedSquat = String(calculatedMax.squat);
          this.state.calculatedDeadlift = String(calculatedMax.deadlift);
          this.state.calculatedBench = String(calculatedMax.bench);
          this.state.calculatedOhp = String(calculatedMax.overhead);

          this.setState({ calculated: true });
        }
      }
    }
  }

  weeklyTemplate = inputValues => {
    let reps = 1;
    let max = parseInt(inputValues);
    const oneRepMax = Math.ceil(max);
    const t = ({ percent, reps }) =>
      `${Math.round(percent * oneRepMax)} x ${reps}`;
    //const t = ({ percent, reps }) => `${Math.round(percent * oneRepMax)}${unit} x ${reps}`;

    return [
      // week 1
      [
        t({ percent: 0.65, reps: 5 }),
        t({ percent: 0.75, reps: 5 }),
        t({ percent: 0.85, reps: '5+' })
      ],
      // week 2
      [
        t({ percent: 0.7, reps: 3 }),
        t({ percent: 0.8, reps: 3 }),
        t({ percent: 0.9, reps: '3+' })
      ],
      // week 3
      [
        t({ percent: 0.75, reps: 5 }),
        t({ percent: 0.85, reps: 3 }),
        t({ percent: 0.95, reps: '1+' })
      ],
      // week 4
      [
        t({ percent: 0.4, reps: 5 }),
        t({ percent: 0.5, reps: 5 }),
        t({ percent: 0.6, reps: 'only 5' })
      ]
    ];
  };

  handleSubmit = () => {
    const {
      calculatedDeadlift,
      calculatedSquat,
      calculatedOhp,
      calculatedBench,
      fullName,
      weight
    } = this.state;

    if (
      !calculatedDeadlift ||
      !calculatedSquat ||
      !calculatedOhp ||
      !calculatedBench ||
      !fullName ||
      !weight
    ) {
      Alert.alert('Fill out all your stats');
    } else {
      const thisUser = firebase.auth().currentUser;
      if (thisUser != null) {
        var uid = thisUser.uid;
      }

      const oneRepMax = {
        squatORM: calculatedSquat,
        deadliftORM: calculatedDeadlift,
        benchORM: calculatedBench,
        overheadPressORM: calculatedOhp
      };

      const date = Date();

      const firebasePush = {
        weight: this.state.weight,
        fullName: this.state.fullName,
        date,
        oneRepMax
      };

      console.log('FIREBASE PUSH', firebasePush);

      firebaseDb
        .ref('users/' + uid + '/user')
        .push(firebasePush)
        .then(() => this.props.navigation.navigate('GoalsUpdate'))
        .catch(error => console.log(error));
    }
  };

  handleOneRepMax = event => {
    this.setState({
      oneRepMax: {
        squatORM: this.refs.squat.value,
        deadliftORM: this.refs.deadlift.value,
        benchORM: this.refs.bench.value,
        overheadPressORM: this.refs.ohp.value
      }
    });
  };
  render() {
    console.log('SET PROFILE STATE', this.state);
    return (
      <ScrollView style={{ marginHorizontal: '2%' }}>
        <View>
          <Text style={{ fontSize: 35, textAlign: 'center', marginTop: '5%' }}>
            Tell us about yourself
          </Text>
          <View style={{ marginTop: '5%' }}>
            <TextInput
              onChangeText={value => this.setState({ fullName: value })}
              placeholder="Username"
              onSubmitEditing={event => {
                this.refs.Weight.focus();
              }}
            />
            <TextInput
              onChangeText={value => this.setState({ weight: value })}
              placeholder="Current Weight (lbs)"
              ref="Weight"
              keyboardType="numeric"
              onSubmitEditing={event => {
                this.refs.bench.focus();
              }}
            />
            <View style={{ marginTop: '5%' }}>
              <Text style={{ fontSize: 22, textAlign: 'center' }}>
                What are your current one rep maxes?
              </Text>
              {/* {this.state.calculated && (
                <View style={{ marginTop: '5%' }}>
                  <TextInput
                onChangeText={value =>
                this.setState({ calculatedBench: value })}
                placeholder="Bench Press (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedBench}
                ref={ref => (this.bench = ref)}
                onSubmitEditing={event => {
                this.overheadPress.focus();
                }}
                  />
                  <TextInput
                onChangeText={value =>
                this.setState({ calculatedOhp: value })}
                placeholder="Overhead Press (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedOhp}
                ref={ref => (this.overheadPress = ref)}
                onSubmitEditing={event => {
                this.deadlift.focus();
                }}
                  />
                  <TextInput
                onChangeText={value =>
                this.setState({ calculatedSquat: value })}
                placeholder="Squat (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedSquat}
                ref={ref => (this.squat = ref)}
                  />
                  <TextInput
                onChangeText={value =>
                this.setState({ calculatedDeadlift: value })}
                placeholder="Deadlift (lbs)"
                keyboardType="numeric"
                ref={ref => (this.deadlift = ref)}
                value={this.state.calculatedDeadlift}
                onSubmitEditing={event => {
                this.squat.focus();
                }}
                  />
                </View>
              )} */}
              {/* <Calculator /> */}
            </View>

            <View style={{ marginTop: '5%' }}>
              <TextInput
                onChangeText={value =>
                  this.setState({ calculatedBench: value })}
                placeholder="Bench Press (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedBench}
                ref="bench"
                onSubmitEditing={event => {
                  this.refs.ohp.focus();
                }}
              />
              <TextInput
                onChangeText={value => this.setState({ calculatedOhp: value })}
                placeholder="Overhead Press (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedOhp}
                ref="ohp"
                onSubmitEditing={event => {
                  this.refs.squat.focus();
                }}
              />
              <TextInput
                onChangeText={value =>
                  this.setState({ calculatedSquat: value })}
                placeholder="Squat (lbs)"
                keyboardType="numeric"
                value={this.state.calculatedSquat}
                ref="squat"
                onSubmitEditing={event => {
                  this.refs.deadlift.focus();
                }}
              />
              <TextInput
                onChangeText={value =>
                  this.setState({ calculatedDeadlift: value })}
                placeholder="Deadlift (lbs)"
                keyboardType="numeric"
                ref="deadlift"
                value={this.state.calculatedDeadlift}
              />
            </View>

            <Button
              title="set profile"
              onPress={() => this.handleSubmit()}
              style={{ marginBottom: '5%' }}
            />
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetProfile);
