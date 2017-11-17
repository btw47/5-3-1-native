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
  render() {
    return (
      <Card>
        <CardTitle>
          <Text style={styles.title}>This Exercise</Text>
        </CardTitle>
        <CardContent>
          <CheckBox
            label="10 reps x 150 lbs"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="6 reps x 175 lbs"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="4 reps x 200 lbs"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
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
