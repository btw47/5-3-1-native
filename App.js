import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './client/scenes/Home/Home';
import Login from './client/scenes/Login/Login';
import Dashboard from './client/scenes/Dashboard/Dashboard';
import Progress from './client/scenes/Dashboard/Progress/Progress';
import styles from './styles';

const App = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  Dashboard: { screen: Dashboard },
  Progress: { screen: Progress }
});

export default App;
