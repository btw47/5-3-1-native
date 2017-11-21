import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Button } from 'react-native';
import firebase from 'firebase';
import { VictoryLine } from 'victory-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailedProgress from './DetailedProgress';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';
import styles from '../../styles';

class Progress extends Component<{}> {
  state = { showModal: false };

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
            this.props.fetchOldStats(thisUser);
            this.props.fetchProgress(thisUser);
            this.props.loggedIn();
          }
        });
      }
    });
  }

  //   data={[
  //   { x: 1, y: 2 },
  //   { x: 2, y: 3 },
  //   { x: 3, y: 5 },
  //   { x: 4, y: 4 },
  //   { x: 5, y: 7 }
  // ]}

  renderProgress = () => {
    let progressList = [];
    if (this.props.state.user.progress) {
      this.props.state.user.progress.map(a => {
        progressList.push(a);
      });
    }
    console.log('PROGRESS LIST', progressList);
    return progressList;
  };

  render() {
    console.log('PROGRESS', this.props);
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>PROGRESS</Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          {this.props.state.user && (
            <DetailedProgress progress={this.renderProgress()} />
          )}
        </Modal>
        <VictoryLine interpolation="natural" />
        <Button
          title="visualize progress"
          onPress={() => {
            this.setState({ showModal: true });
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
