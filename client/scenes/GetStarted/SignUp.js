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
            navigate('SetProfile');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Error', 'Please enter a valid email address');
            }
            Alert.alert('Error', error.code);
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
        <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
          <Text
            style={{ fontSize: 30, textAlign: 'center', marginBottom: '15%' }}>
            Create an account
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
            ref="Password"
            secureTextEntry={true}
            onSubmitEditing={event => {
              this.refs.Password2.focus();
            }}
          />
          <TextInput
            onChangeText={value => this.setState({ repeatPassword: value })}
            placeholder="re-enter password"
            secureTextEntry={true}
            ref="Password2"
          />
          <View style={{ marginTop: '10%' }}>
            <Button
              onPress={() => this.handleSignUp()}
              title="Sign Up"
              color="#f49842"
            />
          </View>
        </View>
      </View>
    );
  }
}
