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
        <View style={styles.sideBySideButtons}>
          <View style={{ flex: 1, position: 'absolute', right: '50%' }}>
            <Button
              title="<"
              onPress={() =>
                this.setState({ liftIndex: this.state.liftIndex - 1 })}
            />
          </View>
          <View style={{ flex: 1, position: 'absolute', left: '50%' }}>
            <Button
              title=">"
              onPress={() =>
                this.setState({ liftIndex: this.state.liftIndex + 1 })}
            />
          </View>
        </View>
      );
      //5 needs to be changed to the liftIndex of exercises
    } else if (this.state.liftIndex > 0) {
      return (
        <View style={styles.sideBySideButtons}>
          <View style={{ flex: 1 }}>
            <Button
              title="<"
              onPress={() =>
                this.setState({ liftIndex: this.state.liftIndex - 1 })}
            />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      );
    } else {
      return (
        <View style={styles.sideBySideButtons}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <Button
              title=">"
              onPress={() =>
                this.setState({ liftIndex: this.state.liftIndex + 1 })}
            />
          </View>
        </View>
      );
    }
  };

  renderTitle = () => {
    const lifts = ['Bench', 'Overhead Press', 'Squat', 'Deadlift'];
    return <Text style={{ fontSize: 30 }}>{lifts[this.state.liftIndex]}</Text>;
  };

  render() {
    return (
      <View style={{ height: '100%' }}>
        <Card>
          <View
            style={{
              padding: '10%'
            }}>
            {/* <CardTitle> */}
            <Text style={styles.title}>Today's Workout</Text>
            {/* </CardTitle> */}
            <View style={{ alignItems: 'center' }}>
              <CardContent>
                <View style={{ alignItems: 'center' }}>
                  {this.renderTitle()}
                  {this.props.templates &&
                    this.state.liftIndex === 0 &&
                    this.props.templates.benchTemplate[0].map(a => (
                      <View key={a}>
                        <Text style={{ fontSize: 20 }}>
                          {a.split(' x')[0] +
                            'lbs x' +
                            a.split(' x')[1] +
                            ' reps'}
                        </Text>
                      </View>
                    ))}
                  {this.props.templates &&
                    this.state.liftIndex === 1 &&
                    this.props.templates.ohpTemplate[0].map(a => (
                      <View key={a}>
                        <Text style={{ fontSize: 20 }}>
                          {a.split(' x')[0] +
                            'lbs x' +
                            a.split(' x')[1] +
                            ' reps'}
                        </Text>
                      </View>
                    ))}
                  {this.props.templates &&
                    this.state.liftIndex === 2 &&
                    this.props.templates.squatTemplate[0].map(a => (
                      <View key={a}>
                        <Text style={{ fontSize: 20 }} key={a}>
                          {a.split(' x')[0] +
                            'lbs x' +
                            a.split(' x')[1] +
                            ' reps'}
                        </Text>
                      </View>
                    ))}
                  {this.props.templates &&
                    this.state.liftIndex === 3 &&
                    this.props.templates.deadliftTemplate[0].map(a => (
                      <View key={a}>
                        <Text style={{ fontSize: 20 }} key={a}>
                          {a.split(' x')[0] +
                            'lbs x' +
                            a.split(' x')[1] +
                            ' reps'}
                        </Text>
                      </View>
                    ))}
                  <View
                    style={{
                      height: '10%',
                      marginTop: '5%',
                      marginBottom: '5%'
                    }}>
                    {this.renderButtons()}
                  </View>
                </View>
              </CardContent>
              <CardAction>
                <Button
                  style={styles.button}
                  onPress={() => this.handleRedirect()}
                  title="start your workout"
                />
              </CardAction>
            </View>
          </View>
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
