import React, { Component } from 'react';
import { View, Text, ScrollView, Button, Image } from 'react-native';
import { Card, CardContent } from 'react-native-card-view';

import styles from '../../../styles';

export default class AboutUsContent extends Component<{}> {
  renderAboutApp() {
    return (
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>About App</Text>
        <Text style={{ textAlign: 'center' }}>
          We have set out to create a fully integrated application that assists
          users in tracking their progress and goals throughout the 5-3-1
          workout program. While most applications focus on simply logging your
          workouts, 5-3-1 Pro offers so much more.
        </Text>
      </View>
    );
  }

  renderAboutTeam() {
    const names = ['Brad', 'JD', 'James', 'Ryan'];
    const github = [
      'https://github.com/btw47',
      'https://github.com/JdScarberry1000',
      'https://github.com/MrNiceGuy1989',
      'https://github.com/rfox0123'
    ];
    const linkedIn = [
      'https://www.linkedin.com/in/bradleywong21/',
      'https://www.linkedin.com/in/jd-scarberry-a97063151/',
      'https://linkedin.com/in/mrniceguy',
      'https://linkedin.com/in/ryanfuchs'
    ];

    return (
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          About the Team
        </Text>

        {names.map(a => {
          console.log('A', a);
          const i = names.indexOf(a);
          return (
            <View style={{ height: '50%', flex: 1 }} key={a}>
              <Card>
                <CardContent>
                  <View>
                    <Text>{names[i]}</Text>
                    <Text>{github[i]}</Text>
                    <Text>{linkedIn[i]}</Text>
                  </View>
                </CardContent>
              </Card>
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderAboutApp()}
        {this.renderAboutTeam()}
      </ScrollView>
    );
  }
}
