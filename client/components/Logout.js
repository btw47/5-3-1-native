import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';

const Logout = props => {
  const handleLogout = () => {
    console.log('LOGOUT');

    firebase
      .auth()
      .signOut()
      .catch(function(error) {
        console.error('SIGN OUT ERROR', error);
      });
  };

  return (
    <View>
      <Button title="log out" onPress={() => handleLogout()} />
    </View>
  );
};

export default Logout;
