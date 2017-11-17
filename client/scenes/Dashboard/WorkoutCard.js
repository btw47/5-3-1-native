import React, { Component } from 'react';
import { StyleSheet, Button, Text } from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default class WorkoutCard extends Component {
  handleRedirect = () => {
    const { navigate } = this.props.navigation;
    navigate('LiftByLift');
  };

  render() {
    return (
      <Card>
        <CardTitle>
          <Text style={styles.title}>Today's Workout</Text>
        </CardTitle>
        <CardContent>
          <Text>Content</Text>
          <Text>Content</Text>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});
