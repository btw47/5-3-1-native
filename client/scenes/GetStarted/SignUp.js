import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import { firebaseApp } from '../../../server/firebase';
import styles from '../../styles';

export default class SignUp extends Component<{}> {
  constructor() {
    super();
    this.state = {};
  }

  handleSignUp = () => {
    const { navigate } = this.props.navigation;

    const { email, password } = this.state;

    if (this.state.email && this.state.password && this.state.repeatPassword) {
      if (this.state.password === this.state.repeatPassword) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          //------UNCOMMENT IF YOU WANT TO CREATE ADMIN ACCOUNT-----
          // .then(() => {
          //   const thisUser = firebase.auth().currentUser;
          //   const uid = thisUser.uid;
          //   admin.auth().setCustomUserClaims(uid, { admin: true });
          // })
          //---------------------------------------------------------
          .then(() => {
            navigate('Dashboard');
          })
          .catch(error => {
            Alert.alert('Error', error.code);
            this.setState({ error });
          });
      } else {
        Alert.alert('Passwords do not match', 'Please re-enter your password');
      }
    } else {
      Alert.alert('Missing Fields', 'Please fill out all input fields');
    }
  };

  render() {
    return (
      <View>
        <View>
          <TextInput
            onChangeText={value => this.setState({ email: value })}
            placeholder="email"
            keyboardType="email-address"
          />
          <TextInput
            onChangeText={value => this.setState({ password: value })}
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={value => this.setState({ repeatPassword: value })}
            placeholder="re-enter password"
            secureTextEntry={true}
          />
          <Button
            onPress={() => this.handleSignUp()}
            title="Log In"
            color="#787881"
          />
        </View>
      </View>
    );
  }
}
