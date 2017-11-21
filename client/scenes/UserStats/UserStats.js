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
      <View style={{ marginBottom: '20%' }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, marginBottom: '10%' }}>
            Current Stats
          </Text>
          {/* <View style={{ width: '50%', height: '50%', resizeMode: 'contain' }}>
            {this.renderImage()}
          </View> */}
          <View style={{ width: '40%', height: '40%' }}>
            <Text style={styles.title}>
              EITHER USER IMAGE OR GRAPHS WILL GO HERE
            </Text>
          </View>
          <View>
            <Text style={styles.userStats}>Name: {user.fullName}</Text>
            <Text style={styles.userStats}>Weight: {user.weight}</Text>
            <Text style={styles.userStats}>ONE REP MAXES</Text>
            <Text style={styles.userStats}>Bench: {user.ormBench}</Text>
            <Text style={styles.userStats}>
              Overhead Press: {user.ormOverheadPress}
            </Text>
            <Text style={styles.userStats}>Squat: {user.ormSquat}</Text>
            <Text style={styles.userStats}>Deadlift: {user.ormDeadlift}</Text>
          </View>
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
