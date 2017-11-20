import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './client/scenes/Home/Home';
import Login from './client/scenes/Login/Login';
import Dashboard from './client/scenes/Dashboard/Dashboard';
import UserStats from './client/scenes/UserStats/UserStats';
import LiftByLift from './client/scenes/LiftByLift/LiftByLift';
import Main from './client/scenes/Main/Main';
import GetStarted from './client/scenes/GetStarted/GetStarted';
import SignUp from './client/scenes/GetStarted/SignUp';
import SetProfile from './client/scenes/GetStarted/SetProfile';
import GoalsUpdate from './client/scenes/GetStarted/GoalsUpdate';

import Progress from './client/scenes/Progress/Progress';

const App = StackNavigator({
  Home: { screen: Home },
  // Home: { screen: LiftByLift },
  Login: { screen: Login },
  LiftByLift: { screen: LiftByLift },
  Dashboard: { screen: Main },
  GetStarted: { screen: GetStarted },
  SignUp: { screen: SignUp },
  SetProfile: { screen: SetProfile },
  GoalsUpdate: { screen: GoalsUpdate }
});

export default App;
