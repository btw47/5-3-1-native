import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';
import styles from '../../styles';

class UpdateProfile extends Component<{}> {
  constructor() {
    super();
    this.state = {
      weight: null,
      squatORM: null,
      deadliftORM: null,
      benchORM: null,
      overheadPressORM: null
    };
  }

  componentWillMount() {
    // const { navigate } = this.props.navigation;

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigate('Login');
      } else {
        const thisUser = firebase.auth().currentUser;
        const uid = thisUser.uid;

        firebaseDb.ref('users/' + uid).on('value', snapshot => {
          const firebaseOutput = snapshot.val();

          const uploadList = [];
          for (let prop in firebaseOutput) {
            uploadList.push(prop);
          }

          if (uploadList.length === 0) {
            console.log('NO USER INFO YET');
          } else {
            // this.props.fetchCalendar(thisUser);
            this.props.fetchUser(thisUser);
            // this.props.fetchOldStats(thisUser);
            // this.props.fetchProgress(thisUser);
            this.props.loggedIn();
          }
        });
      }
    });
  }

  static navigationOptions = {
    title: 'Update'
  };

  handleSubmit = () => {
    const date = Date();
    const fullName = this.props.state.user.fullName;
    console.log('HANDLE SUBMIT FULL NAME', fullName);

    const oneRepMax = {
      squatORM: this.state.squatORM,
      deadliftORM: this.state.deadliftORM,
      benchORM: this.state.benchORM,
      overheadPressORM: this.state.overheadPressORM
    };

    const userStats = {
      weight: this.state.weight,
      fullName,
      oneRepMax,
      date
    };

    if (!this.state.weight || !userStats) {
      console.log('NOT FILLED OUT YO');
    } else {
      const thisUser = firebase.auth().currentUser;
      if (thisUser != null) {
        var uid = thisUser.uid;
      }

      firebaseDb
        .ref('users/' + uid + '/user/')
        .push(userStats)
        .then(() => {
          console.log('Stats Updated');
        })
        .then(() => {
          const { navigate } = this.props.navigation;

          Alert.alert('Stats Updated', 'Check out the progress tab!');
          navigate('/Dashboard');
        });
    }
  };

  render() {
    return (
      <View style={{ marginBottom: '20%' }}>
        <Text style={{ fontSize: 30, marginBottom: '10%' }}>
          Update Your Stats
        </Text>
        <Text>What is your current weight?</Text>
        <TextInput
          onChangeText={value => this.setState({ weight: value })}
          placeholder="Weight (lbs)"
          onSubmitEditing={event => {
            this.refs.bench.focus();
          }}
        />
        <Text>What are your current one rep maxes?</Text>
        <TextInput
          onChangeText={value => this.setState({ benchORM: value })}
          placeholder="Bench Press (lbs)"
          ref="bench"
          onSubmitEditing={event => {
            this.refs.ohp.focus();
          }}
        />
        <TextInput
          onChangeText={value => this.setState({ overheadPressORM: value })}
          placeholder="Overhead Press (lbs)"
          ref="ohp"
          onSubmitEditing={event => {
            this.refs.squat.focus();
          }}
        />
        <TextInput
          onChangeText={value => this.setState({ squatORM: value })}
          placeholder="Squats (lbs)"
          ref="squat"
          onSubmitEditing={event => {
            this.refs.deadlift.focus();
          }}
        />
        <TextInput
          onChangeText={value => this.setState({ deadliftORM: value })}
          placeholder="Deadlift (lbs)"
          ref="deadlift"
        />
        <View style={{ marginTop: '5%' }}>
          <Button
            onPress={() => this.handleSubmit()}
            title="Update Stats"
            color="#787881"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
