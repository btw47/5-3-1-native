import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import firebase from 'firebase';

import Progress from './Progress/Progress';
import Logout from '../../components/Logout';

export default class Dashboard extends Component<{}> {
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
        navigate('Login');
      }
    });
  }

  static navigationOptions = {
    title: 'Dashboard'
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.page === 'Progress' && <Progress />}
        {this.state.page === 'Dashboard' && <Text>DASHBOARD HERE</Text>}
        {this.state.page === 'Today' && <Text>TODAY WILL GO HERE</Text>}

        {/* {this.state.page === 'Dashboard' && (
            <Dashboard navigation={this.props.navigation}>Screen1</Dashboard>
          )} */}

        <Tabbar
          stateFunc={tab => {
            this.setState({ page: tab.page });
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: 'Progress',
              icon: 'home'
            },
            {
              page: 'Dashboard',
              icon: 'home'
            },
            {
              page: 'Today',
              icon: 'home'
            }
          ]}
        />
      </View>
    );
  }
}
