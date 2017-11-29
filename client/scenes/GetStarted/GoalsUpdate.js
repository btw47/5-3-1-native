import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Button,
  Alert
} from 'react-native';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';
import CheckBox from 'react-native-modest-checkbox';
import firebase from 'firebase';

import { firebaseDb } from '../../../server/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

class GoalsUpdate extends React.Component {
  state = {};

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

          if (uploadList.length != 0) {
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

  renderSegmentControlClone = () => {
    const options = ['2days', '3days', '4days'];

    function setSelectedOption(selectedDay) {
      this.setState({
        selectedDay
      });
    }

    return (
      <View style={{ marginTop: 10, padding: 20, backgroundColor: 'white' }}>
        <Text style={{ paddingBottom: 10, fontWeight: 'bold' }}>
          Workout Split
        </Text>
        <SegmentedControls
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedDay}
        />
        <Text style={{ marginTop: 10 }}>
          Selected option: {this.state.selectedDay || 'none'}
        </Text>
      </View>
    );
  };

  renderDaySelection = () => {
    function setSelectedOption(selectedDay) {
      const dayList = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];

      const selectedWeekday = this.state.selectedWeekday
        ? this.state.selectedWeekday
        : {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
          };

      const selected = dayList.indexOf(selectedDay.label);
      selectedWeekday[selected] = !selectedWeekday[selected];

      const limit = parseInt(this.state.selectedDay.split('days')[0]);
      const trackCheckboxes = [];

      for (prop in selectedWeekday) {
        if (selectedWeekday[prop] === true) {
          trackCheckboxes.push(prop);
        }
      }

      if (trackCheckboxes.length > limit) {
        Alert.alert(`Please only select ${limit} days.`);
      } else {
        this.setState({
          selectedWeekday
        });
      }
    }

    return (
      <View style={{ backgroundColor: 'white' }}>
        <Text>Thats great pansyboy! What days will you be exercising on?</Text>
        <CheckBox
          label="Monday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Tuesday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Wednesday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Thursday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Friday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Saturday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
        <CheckBox
          label="Sunday"
          checkedImage={require('../../images/checked.png')}
          uncheckedImage={require('../../images/unchecked.png')}
          onChange={setSelectedOption.bind(this)}
        />
      </View>
    );
  };

  renderTemplate = () => {
    const options = [
      'Boring But Big',
      'Triumvirate',
      'Not Doing Jack',
      'Periodization Bible',
      'Bodyweight'
    ];

    function setSelectedOption(selectedExercise) {
      this.setState({
        selectedExercise
      });
    }

    return (
      <View style={{ marginTop: 10, padding: 20, backgroundColor: 'white' }}>
        <Text style={{ paddingBottom: 10, fontWeight: 'bold' }}>
          Choose an exercise template
        </Text>
        <SegmentedControls
          direction={'column'}
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedExercise}
        />
        <Text style={{ marginTop: 10 }}>
          Selected option: {this.state.selectedExercise || 'none'}
        </Text>
      </View>
    );
  };

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
    if (
      !this.state.selectedDay ||
      !this.state.selectedWeekday ||
      !this.state.selectedExercise
    ) {
      Alert.alert('Fill out all your stats');
    } else {
      const thisUser = firebase.auth().currentUser;
      if (thisUser != null) {
        var uid = thisUser.uid;
      }

      const date = Date();

      const uploadSelectedWeekday = [];

      for (prop in this.state.selectedWeekday) {
        if (this.state.selectedWeekday[prop] === true) {
          const propInt = parseInt(prop);
          uploadSelectedWeekday.push(propInt);
        }
      }

      const { user } = this.props.state;

      const Deadlift = this.weeklyTemplate(user.ormDeadlift);
      const Bench = this.weeklyTemplate(user.ormBench);
      const Squat = this.weeklyTemplate(user.ormSquat);
      const Overhead = this.weeklyTemplate(user.ormOverheadPress);

      //TODO: need to replace with keyword in database

      const template = this.state.selectedExercise;
      let pushTemplate;
      if (template === 'Boring But Big') {
        pushTemplate = 'boringButBig';
      } else if (template === 'Triumvirate') {
        pushTemplate = 'triumvirate';
      } else if (template === 'Not Doing Jack') {
        pushTemplate = 'jackShit';
      } else if (template === 'Periodization Bible') {
        pushTemplate = 'perBible';
      } else if (template === 'Bodyweight') {
        pushTemplate = 'bodyweight';
      }

      const firebasePush = {
        selectedDay: this.state.selectedDay,
        selectedWeekday: uploadSelectedWeekday,
        selectedExercise: pushTemplate,
        benchTemplate: Bench,
        deadliftTemplate: Deadlift,
        squatTemplate: Squat,
        ohpTemplate: Overhead,
        date: date
      };

      firebaseDb
        .ref('users/' + uid + '/calendar/')
        .push(firebasePush)
        .then(() => {
          this.props.navigation.navigate('Dashboard');
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderSegmentControlClone()}
        {this.renderDaySelection()}
        {this.renderTemplate()}
        <Button title="go to dashboard" onPress={() => this.handleSubmit()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GoalsUpdate);
