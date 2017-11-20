import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default class WorkoutCard extends Component {
  constructor() {
    super();
    this.state = {
      liftIndex: 0
    };
  }

  handleRedirect = () => {
    const { navigate } = this.props.navigation;
    navigate('LiftByLift');
  };

  renderButtons = () => {
    if (this.state.liftIndex > 0 && this.state.liftIndex < 3) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Button
            title="<"
            onPress={() =>
              this.setState({ liftIndex: this.state.liftIndex - 1 })}
          />
          <Button
            title=">"
            onPress={() =>
              this.setState({ liftIndex: this.state.liftIndex + 1 })}
          />
        </View>
      );
      //5 needs to be changed to the liftIndex of exercises
    } else if (this.state.liftIndex > 0) {
      return (
        <Button
          title="<"
          onPress={() => this.setState({ liftIndex: this.state.liftIndex - 1 })}
        />
      );
    } else {
      return (
        <Button
          title=">"
          onPress={() => this.setState({ liftIndex: this.state.liftIndex + 1 })}
        />
      );
    }
  };

  renderTitle = () => {
    const lifts = ['Bench', 'Overhead Press', 'Squat', 'Deadlift'];
    return <Text>{lifts[this.state.liftIndex]}</Text>;
  };

  render() {
    return (
      <View style={{ height: '75%' }}>
        <Card>
          {/* <CardTitle> */}
          <Text style={styles.title}>Today's Workout</Text>
          {/* </CardTitle> */}
          <CardContent>
            {this.renderTitle()}
            {this.props.templates &&
              this.state.liftIndex === 0 &&
              this.props.templates.benchTemplate[0].map(a => (
                <View key={a}>
                  <Text>{a}</Text>
                </View>
              ))}
            {this.props.templates &&
              this.state.liftIndex === 1 &&
              this.props.templates.ohpTemplate[0].map(a => (
                <View>
                  <Text key={a}>{a}</Text>
                </View>
              ))}
            {this.props.templates &&
              this.state.liftIndex === 2 &&
              this.props.templates.squatTemplate[0].map(a => (
                <View>
                  <Text key={a}>{a}</Text>
                </View>
              ))}
            {this.props.templates &&
              this.state.liftIndex === 3 &&
              this.props.templates.deadliftTemplate[0].map(a => (
                <View>
                  <Text key={a}>{a}</Text>
                </View>
              ))}
            {this.renderButtons()}
          </CardContent>
          <CardAction>
            <Button
              style={styles.button}
              onPress={() => this.handleRedirect()}
              title="start your workout"
            />
          </CardAction>
        </Card>
      </View>
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
