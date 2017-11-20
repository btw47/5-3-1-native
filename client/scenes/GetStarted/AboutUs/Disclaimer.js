import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../../../styles';

export default class Disclaimer extends Component<{}> {
  render() {
    return (
      <ScrollView>
        <View style={{ marginTop: '15%', marginBottom: '5%' }}>
          <View style={{ marginBottom: '10%' }}>
            <Text style={styles.title}>Waiver of Liability</Text>
          </View>
          <Text style={styles.instructions}>
            This agreement releases 5-3-1 Pro from all liability relating to
            injuries that may occur during activity. By signing this agreement,
            I agree to hold 5-3-1 Pro entirely free from any liability,
            including financial responsibility for injuries incurred, regardless
            of whether injuries are caused by negligence. I also acknowledge the
            risks involved in weight lifting and general exercise. I swear that
            I am participating voluntarily, and that all risks have been made
            clear to me. Additionally, I do not have any conditions that will
            increase my likelihood of experiencing injuries while engaging in
            this activity. By signing below I forfeit all right to bring a suit
            against 5-3-1 Pro for any reason. In return, I will receive access
            to the 5-3-1 Pro application. I will also make every effort to obey
            safety precautions as listed in writing and as explained to me
            verbally. I will ask for clarification when needed.
          </Text>
        </View>
      </ScrollView>
    );
  }
}
