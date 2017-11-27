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
  constructor() {
    super();
    this.state = {
      completed: []
    };
  }

  renderTitle = () => {
    const lifts = ['Bench', 'Overhead Press', 'Squat', 'Deadlift'];
    return (
      <View>
        <Text style={styles.title}>{lifts[this.props.liftIndex]}</Text>
      </View>
    );
  };

  handleComplete = event => {
    console.log('HANDLE COMPLETE', this.A.value);
  };

  render() {
    const { completed } = this.props;
    console.log('LIFT PROPS', this.props);
    console.log('LIFT STATE', this.state);
    console.log('TEST', this.A.value);
    return (
      <Card>
        <CardContent>
          <View>{this.renderTitle()}</View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Image
              source={require('../../images/bench.gif')}
              style={{
                flex: 1,
                flexDirection: 'row',
                height: '75%',
                resizeMode: 'contain',
                position: 'absolute',
                marginTop: '20%'
              }}
            />
          </View>
          <View
            style={{
              marginLeft: '5%',
              width: '100%',
              height: '20%',
              marginBottom: '10%'
            }}>
            {this.props.templates &&
              this.props.liftIndex === 0 &&
              this.props.templates.benchTemplate[0].map(a => (
                <CheckBox
                  label={
                    a.split(' x')[0] + 'lbs x' + a.split(' x')[1] + ' reps'
                  }
                  key={a}
                  checkedImage={require('../../images/checked.png')}
                  uncheckedImage={require('../../images/unchecked.png')}
                />
              ))}
            {this.props.templates &&
              this.props.liftIndex === 1 &&
              this.props.templates.ohpTemplate[0].map(a => (
                <CheckBox
                  label={
                    a.split(' x')[0] + 'lbs x' + a.split(' x')[1] + ' reps'
                  }
                  key={a}
                  checkedImage={require('../../images/checked.png')}
                  uncheckedImage={require('../../images/unchecked.png')}
                />
              ))}
            {this.props.templates &&
              this.props.liftIndex === 2 &&
              this.props.templates.squatTemplate[0].map(a => (
                <CheckBox
                  label={
                    a.split(' x')[0] + 'lbs x' + a.split(' x')[1] + ' reps'
                  }
                  key={a}
                  checkedImage={require('../../images/checked.png')}
                  uncheckedImage={require('../../images/unchecked.png')}
                />
              ))}
            {this.props.templates &&
              this.props.liftIndex === 3 &&
              this.props.templates.deadliftTemplate[0].map(a => (
                <CheckBox
                  label={
                    a.split(' x')[0] + 'lbs x' + a.split(' x')[1] + ' reps'
                  }
                  key={a}
                  checkedImage={require('../../images/checked.png')}
                  uncheckedImage={require('../../images/unchecked.png')}
                />
              ))}
          </View>
        </CardContent>
      </Card>
    );
  }
}
