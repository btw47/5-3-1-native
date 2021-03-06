import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';

import Dashboard from '../Dashboard/Dashboard';
import Progress from '../Progress/Progress';
import UserStats from '../UserStats/UserStats';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import styles from '../../styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      page: 'Dashboard'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === 'Progress' && (
          <Progress navigation={this.props.navigation} />
        )}
        {this.state.page === 'Dashboard' && (
          <Dashboard navigation={this.props.navigation} />
        )}
        {this.state.page === 'UpdateProfile' && (
          <UpdateProfile navigation={this.props.navigation} />
        )}
        {this.state.page === 'UserStats' && (
          <UserStats navigation={this.props.navigation} />
        )}

        <Tabbar
          stateFunc={tab => {
            this.setState({ page: tab.page });
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: 'Progress',
              icon: 'md-trending-up',
              iconText: 'Progress'
            },
            {
              page: 'Dashboard',
              icon: 'home',
              iconText: 'Dashboard'
            },
            {
              page: 'UpdateProfile',
              icon: 'md-calculator',
              iconText: 'Update Stats'
            },
            {
              page: 'UserStats',
              icon: 'ios-stats',
              iconText: 'Current Stats'
            }
          ]}
        />
      </View>
    );
  }
}
