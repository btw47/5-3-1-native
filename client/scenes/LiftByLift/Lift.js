import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
import styles from '../../styles';

export default class Lift extends Component<{}> {
  renderTitle = () => {
    const lifts = ['Bench', 'Overhead Press', 'Squat', 'Deadlift'];
    return <Text style={styles.title}>{lifts[this.props.liftIndex]}</Text>;
  };

  render() {
    console.log('LIFT PROPS', this.props);
    return (
      <Card>
        <CardTitle>{this.renderTitle()}</CardTitle>
        <CardContent>
          {this.props.templates &&
            this.props.liftIndex === 0 &&
            this.props.templates.benchTemplate[0].map(a => (
              <CheckBox
                label={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 1 &&
            this.props.templates.ohpTemplate[0].map(a => (
              <CheckBox
                label={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 2 &&
            this.props.templates.squatTemplate[0].map(a => (
              <CheckBox
                label={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 3 &&
            this.props.templates.deadliftTemplate[0].map(a => (
              <CheckBox
                label={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {/* <CheckBox
            label="4 reps x 200 lbs"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          /> */}
        </CardContent>
        {/* <CardAction>
            <Button
            style={styles.button}
            onPress={() => this.handleRedirect()}
            title="start your workout"
            />
        </CardAction> */}
      </Card>
    );
  }
}
