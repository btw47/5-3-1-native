import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Progress from './Progress/Progress';
import Logout from '../../components/Logout';
import UserStats from './UserStats/UserStats';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';

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

          if (uploadList.length === 0) {
            console.log('NO USER INFO YET');
          } else {
            // this.props.fetchCalendar(thisUser);
            this.props.fetchProfileImage(thisUser.uid);
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
    title: 'Dashboard'
  };

  render() {
    const { state } = this.props;
    return (
      <View>
        <UserStats profileImage={state.user.profileImage} user={state.user} />
        <Logout style={{ flex: 1 }} navigation={this.props.navigation} />
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
