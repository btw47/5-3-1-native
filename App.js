import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './client/scenes/Home/Home';
import Login from './client/scenes/Login/Login';
import Dashboard from './client/scenes/Dashboard/Dashboard';
import UserStats from './client/scenes/UserStats/UserStats';
import Main from './client/scenes/Main/Main';
import GetStarted from './client/scenes/GetStarted/GetStarted';

const App = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  Dashboard: { screen: Main },
  GetStarted: { screen: GetStarted }
});

export default App;
