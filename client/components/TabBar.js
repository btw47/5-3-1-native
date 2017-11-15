import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';

import Dashboard from '../scenes/Dashboard/Dashboard';
import Progress from '../scenes/Dashboard/Progress/Progress';
import Logout from './Logout';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.thisPage
    };
  }

  static navigationOptions = {
    title: 'Dashboard'
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.page === 'Progress' && <Progress />}
        {this.state.page === 'Dashboard' && <Dashboard />}
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
