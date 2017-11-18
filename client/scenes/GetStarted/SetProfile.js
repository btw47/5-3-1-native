import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    this.state = { showModal: false };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate('SignUp');
      } else if (user) {
        this.props.loggedIn();
      }
    });
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
      deadlift,
      squat,
      overheadPress,
      bench,
      fullName,
      weight
    } = this.state;

    if (
      !deadlift ||
      !squat ||
      !overheadPress ||
      !bench ||
      !fullName ||
      !weight
    ) {
      Alert.alert('Fill out all your stats');
    } else {
      const thisUser = firebase.auth().currentUser;
      if (thisUser != null) {
        var uid = thisUser.uid;
      }

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
      const oneRepMax = {
        squatORM: squat,
        deadliftORM: deadlift,
        benchORM: bench,
        overheadPressORM: overheadPress
      };

      const date = Date();

      const firebasePush = {
        weight: this.state.weight,
        fullName: this.state.fullName,
        date,
        oneRepMax
      };

      console.log('FIREBASE PUSH', firebasePush);

      firebaseDb.ref('users/' + uid + '/user').push(firebasePush);
    }
  };

  render() {
    if (this.props.state.OneRep.calculatedMax) {
      if (this.props.state.OneRep.calculatedMax.bench) {
        const calculatedMax = this.props.state.OneRep.calculatedMax;
        this.squat.value = calculatedMax.squat;
        this.deadlift.value = calculatedMax.deadlift;
        this.bench.value = calculatedMax.bench;
        this.overheadPress.value = calculatedMax.overhead;
      }
    }

    return (
      <View>
        <Text style={styles.title}>Enter your information below</Text>
        <View>
          <TextInput
            onChangeText={value => this.setState({ fullName: value })}
            placeholder="Username"
          />
          <TextInput
            onChangeText={value => this.setState({ weight: value })}
            placeholder="Current Weight (lbs)"
            keyboardType="numeric"
          />
          <View>
            <Text>What are your current one rep maxes?</Text>
            <Text style={{ color: 'blue' }}>
              dont know your current maxes? use our calculator!
            </Text>
            <Calculator />
            <TextInput
              onChangeText={value => this.setState({ bench: value })}
              placeholder="Bench Press (lbs)"
              keyboardType="numeric"
              ref={ref => (this.bench = ref)}
            />
            <TextInput
              onChangeText={value => this.setState({ overheadPress: value })}
              placeholder="Overhead Press (lbs)"
              keyboardType="numeric"
              ref={ref => (this.overheadPress = ref)}
            />
            <TextInput
              onChangeText={value => this.setState({ deadlift: value })}
              placeholder="Deadlift (lbs)"
              keyboardType="numeric"
              ref={ref => (this.deadlift = ref)}
            />
            <TextInput
              onChangeText={value => this.setState({ squat: value })}
              placeholder="Squat (lbs)"
              keyboardType="numeric"
              ref={ref => (this.squat = ref)}
            />
          </View>

          <Button title="set profile" onPress={() => this.handleSubmit()} />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetProfile);
