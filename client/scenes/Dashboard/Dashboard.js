import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Progress from './Progress/Progress';
import Logout from '../../components/Logout';
import { firebaseDb } from '../../../server/firebase';
import * as actions from '../../redux/actions';

class Dashboard extends Component<{}> {
  constructor() {
    super();
    this.state = {
      page: 'Dashboard'
    };
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate('Login');
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
            navigate('Login');
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

  // componentDidMount() {
  //   const thisUser = firebase.auth().currentUser;
  //
  //   this.props.fetchUser(thisUser);
  //   this.props.loggedIn();
  // }

  static navigationOptions = {
    title: 'Dashboard'
  };

  renderPage = () => {
    return (
      <View>
        <Text>TEST TEXT</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Text>TEST TEXT</Text>
      </View>
      // <View style={{ flex: 1 }}>
      //   {/* {this.state.page === 'Progress' && <Progress />} */}
      //   {this.state.page === 'Dashboard' && <Text>Dashboard HERE</Text>}
      //   {this.state.page === 'Today' && <Text>TODAY WILL GO HERE</Text>}
      //
      //   {this.state.page === 'Dashboard' && (
      //     <Progress navigation={this.props.navigation} />
      //   )}
      //
      //   <Tabbar
      //     stateFunc={tab => {
      //       this.setState({ page: tab.page });
      //       //this.props.navigation.setParams({tabTitle: tab.title})
      //     }}
      //     activePage={this.state.page}
      //     tabs={[
      //       {
      //         page: 'Progress',
      //         icon: 'home'
      //       },
      //       {
      //         page: 'Dashboard',
      //         icon: 'home'
      //       },
      //       {
      //         page: 'Today',
      //         icon: 'home'
      //       }
      //     ]}
      //   />
      // </View>
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
