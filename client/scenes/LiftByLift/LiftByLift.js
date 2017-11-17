import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../styles';

import Lift from './Lift';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';

class LiftByLift extends Component<{}> {
  constructor() {
    super();
    this.state = {
      liftIndex: 0
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
            this.props.fetchProfileImage(thisUser.uid);
            this.props.fetchUser(thisUser);
            this.props.fetchTodaysWorkout(thisUser.uid);
            // this.props.fetchOldStats(thisUser);
            // this.props.fetchProgress(thisUser);
            this.props.loggedIn();
          }
        });
      }
    });
  }

  renderButtons = () => {
    if (this.state.liftIndex > 0 && this.state.liftIndex < 5) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Button
            title="<"
            onPress={() =>
              this.setState({ liftIndex: this.state.liftIndex - 1 })}
          />
          <Button
            title=">"
            onPress={() =>
              this.setState({ liftIndex: this.state.liftIndex + 1 })}
          />
        </View>
      );
      //5 needs to be changed to the liftIndex of exercises
    } else if (this.state.liftIndex > 0) {
      return (
        <Button
          title="<"
          onPress={() => this.setState({ liftIndex: this.state.liftIndex - 1 })}
        />
      );
    } else {
      return (
        <Button
          title=">"
          onPress={() => this.setState({ liftIndex: this.state.liftIndex + 1 })}
        />
      );
    }
  };

  render() {
    console.log('LIFT BY LIFT STATE', this.state);
    console.log('LIFT BY LIFT PROPS', this.props);
    return (
      <View style={styles.container}>
        <Lift liftIndex={this.state.liftIndex} />
        {this.renderButtons()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LiftByLift);
