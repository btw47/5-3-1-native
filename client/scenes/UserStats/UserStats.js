import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import profileImage from '../../images/anon-user.jpg';
import * as actions from '../../redux/actions';
import styles from '../../styles';

class UserStats extends Component<{}> {
  renderImage = () => {
    const image = this.props.state.user.profileImage
      ? this.props.state.user.profileImage
      : require('../../images/anon-user.jpg');
    return (
      <Image source={image} style={styles.profileImage} resizeMode="contain" />
    );
  };

  render() {
    const { user } = this.props.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: 65, height: 65 }}>{this.renderImage()}</View>
        <View>
          <Text>Name: {user.fullName}</Text>
          <Text>Weight: {user.weight}</Text>
          <Text>ONE REP MAXES</Text>
          <Text>Bench: {user.ormBench}</Text>
          <Text>Overhead Press: {user.ormOverheadPress}</Text>
          <Text>Squat: {user.ormSquat}</Text>
          <Text>Deadlift: {user.ormDeadlift}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
