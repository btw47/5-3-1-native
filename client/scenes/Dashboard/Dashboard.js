import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashboardHeader from './DashboardHeader';
import WorkoutCard from './WorkoutCard';
import Logout from '../../components/Logout';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';
import styles from '../../styles';

class Dashboard extends Component<{}> {
  constructor() {
    super();
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;

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
            this.props.fetchProfileImage(thisUser.uid);
            this.props.fetchUser(thisUser);
            this.props.fetchTodaysWorkout(thisUser.uid);
            this.props.fetchOldStats(thisUser);
            this.props.fetchProgress(thisUser);
            this.props.loggedIn();
          }
        });
      }
    });
  }

  static navigationOptions = {
    title: 'Dashboard'
  };

  render() {
    const { state } = this.props;
    return (
      <View>
        <View
          style={{
            height: '20%'
            // backgroundColor: 'gray'
          }}>
          <View
            style={{
              marginTop: '5%',
              marginLeft: '3%',
              height: '15%'
            }}>
            {/* <Logout
              style={{ flex: 1, position: 'relative', top: '5%' }}
              navigation={this.props.navigation}
            /> */}
            <DashboardHeader
              profileImage={state.user.profileImage}
              user={state.user}
            />
          </View>
        </View>
        <View style={styles.workoutCard}>
          <WorkoutCard
            navigation={this.props.navigation}
            templates={this.props.state.user.templates}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
