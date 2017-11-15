import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './client/scenes/Home/Home';
import Login from './client/scenes/Login/Login.js';
import Dashboard from './client/scenes/Dashboard/Dashboard.js';
import styles from './styles';

const App = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  Dashboard: { screen: Dashboard }
});

export default App;
