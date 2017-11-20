import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Button } from 'react-native';
import firebase from 'firebase';

import WebViewProgress from './WebViewProgress';

export default class Progress extends Component<{}> {
  state = { showModal: false };
  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Text>PROGRESS WILL GO HERE</Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <WebViewProgress />
        </Modal>
        <Button
          title="visualize progress"
          onPress={() => {
            this.setState({ showModal: true });
          }}
        />
      </View>
    );
  }
}
