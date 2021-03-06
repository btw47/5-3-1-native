import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';

const Logout = props => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .catch(function(error) {
        console.error('SIGN OUT ERROR', error);
      });

    props.navigation.navigate('Login');
  };

  return (
    <View>
      <Button title="log out" onPress={() => handleLogout()} />
    </View>
  );
};

export default Logout;
