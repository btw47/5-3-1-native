import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
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
        <CardContent>
          <Text style={styles.title}>{this.renderTitle()}</Text>
          <Image
            source={require('../../images/bench.gif')}
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '65%',
              height: '65%',
              resizeMode: 'contain',
              position: 'absolute',
              marginTop: '20%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          {this.props.templates &&
            this.props.liftIndex === 0 &&
            this.props.templates.benchTemplate[0].map(a => (
              <CheckBox
                label={a}
                key={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 1 &&
            this.props.templates.ohpTemplate[0].map(a => (
              <CheckBox
                label={a}
                key={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 2 &&
            this.props.templates.squatTemplate[0].map(a => (
              <CheckBox
                label={a}
                key={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
          {this.props.templates &&
            this.props.liftIndex === 3 &&
            this.props.templates.deadliftTemplate[0].map(a => (
              <CheckBox
                label={a}
                key={a}
                checkedImage={require('../../images/checked.png')}
                uncheckedImage={require('../../images/unchecked.png')}
              />
            ))}
        </CardContent>
      </Card>
    );
  }
}
