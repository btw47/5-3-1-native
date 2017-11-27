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
import ProgressCircle from 'react-native-progress-circle';

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

  handleCompleted = event => {
    console.log('EX', event);

    let newCompleted = this.state.completed;

    if (event.checked) {
      newCompleted.push(event.label);
    } else {
      newCompleted = newCompleted.filter(a => {
        console.log('A', a);
        return a != event.label;
      });
    }

    this.setState({
      completed: newCompleted
    });

    this.props.liftByLift(newCompleted);
  };

  render() {
    const { completed } = this.props;
    console.log('LIFT PROPS', this.props);
    console.log('LIFT STATE', this.state);
    return (
      <Card>
        <CardContent>
          <View>{this.renderTitle()}</View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: '10%'
            }}>
            {/* <Image
              source={require('../../images/bench.gif')}
              style={{
                flex: 1,
                flexDirection: 'row',
                height: '75%',
                resizeMode: 'contain',
                position: 'absolute',
                marginTop: '20%'
              }}
            /> */}
            <ProgressCircle
              percent={this.props.percent}
              radius={50}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff">
              <Text style={{ fontSize: 18 }}>{`${this.props.percent}%`}</Text>
            </ProgressCircle>
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
                  onChange={event => this.handleCompleted(event)}
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
                  onChange={event => this.handleCompleted(event)}
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
                  onChange={event => this.handleCompleted(event)}
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
                  onChange={event => this.handleCompleted(event)}
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
