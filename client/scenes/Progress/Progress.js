import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Button } from 'react-native';
import firebase from 'firebase';
import { VictoryChart, VictoryArea } from 'victory-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailedProgress from './DetailedProgress';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';
import styles from '../../styles';

class Progress extends Component<{}> {
  state = { showModal: false };

  componentWillMount() {
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

  componentDidMount() {
    const exercises = ['Weight'];

    let renderedWeight = [];

    for (let i = 0; i < exercises.length; i++) {
      let count = 0;
      exercises[i] = this.props.state.user.progress.map(a => {
        const lift = {};
        const obj = {};
        // obj['x'] = count;
        // obj['x'] = a['name'];
        obj['x'] = count;
        obj['y'] = parseInt(a[exercises[i]]);
        count += 1;
        if (exercises[i] === 'Weight') {
          renderedWeight.push(obj);
        }
      });
    }

    this.setState({
      renderedWeight,
      rendered: true
    });
  }

  renderProgress = () => {
    let progressList = [];
    if (this.props.state.user.progress) {
      this.props.state.user.progress.map(a => {
        progressList.push(a);
      });
    }
    return progressList;
  };

  renderPage = () => {
    if (this.props.state.user.progress.length > 1) {
      return (
        <View style={{ marginTop: '5%' }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}>
            {this.props.state.user && (
              <DetailedProgress progress={this.renderProgress()} />
            )}
          </Modal>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 28 }}>Weight</Text>
            <VictoryChart>
              {this.state.renderedWeight && (
                <VictoryArea
                  interpolation="natural"
                  style={{
                    data: { fill: '#ed8c42' }
                  }}
                  data={this.state.renderedWeight}
                />
              )}
            </VictoryChart>
          </View>
          <Button
            title="see more stats"
            onPress={() => {
              this.setState({ showModal: true });
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>Please update your stats first</Text>
        </View>
      );
    }
  };

  render() {
    return <View>{this.renderPage()}</View>;
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
