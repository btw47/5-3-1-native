import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase';

import { firebaseApp } from '../../../server/firebase';

// import styles from '../../styles';

export default class Login extends Component<{}> {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('Dashboard');
      }
    });
  }

  handleLogIn = () => {
    // const { navigate } = this.props.navigation;
    // navigate('Dashboard');

    const { email, password } = this.state;

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        Alert.alert(error);
        this.setState({ error });
      });
  };

  static navigationOptions = {
    title: '5-3-1 Pro'
  };

  renderError = () => {
    if (this.state.error) {
      switch (this.state.error.code) {
        case 'auth/wrong-password':
          return (
            <Text style={{ textAlign: 'center' }}>
              Sorry, wrong email or password
            </Text>
          );
        case 'auth/invalid-email':
          return (
            <Text style={{ textAlign: 'center' }}>
              Please enter a valid email
            </Text>
          );
        case 'auth/user-not-found':
          return (
            <Text style={{ textAlign: 'center' }}>
              Sorry, this user was not found.
            </Text>
          );
        default:
          return <View />;
      }
    }
  };

  render() {
    return (
      <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
        <Text
          style={{ fontSize: 30, textAlign: 'center', marginBottom: '15%' }}>
          Log In
        </Text>
        <TextInput
          onChangeText={value => this.setState({ email: value })}
          placeholder="email"
          keyboardType="email-address"
          onSubmitEditing={event => {
            this.refs.Password.focus();
          }}
        />
        <TextInput
          onChangeText={value => this.setState({ password: value })}
          placeholder="password"
          secureTextEntry={true}
          ref="Password"
        />
        <View style={{ marginTop: '10%' }}>
          <Button
            onPress={() => {
              if (this.state.email && this.state.password) {
                this.handleLogIn();
              }
            }}
            title="Log In"
            color="#787881"
          />
        </View>

        {this.renderError()}
      </View>
    );
  }
}
