import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
import styles from '../../styles';

import * as actions from '../../redux/actions';

class LiftByLift extends Component<{}> {
  render() {
    return (
      <Card style={styles.container}>
        <CardTitle>
          <Text style={styles.title}>Today's Workout</Text>
        </CardTitle>
        <CardContent>
          <Text style={{ textDecorationLine: 'line-through' }}>Content</Text>
          <Text>Content</Text>
        </CardContent>
        <CardAction>
          <Button
            style={styles.button}
            onPress={() => this.handleRedirect()}
            title="start your workout"
          />
        </CardAction>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LiftByLift);
