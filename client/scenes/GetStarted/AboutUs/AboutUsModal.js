import React, { Component } from 'react';
import { View, Text, Modal, Button } from 'react-native';

import AboutUsContent from './AboutUsContent';
import Disclaimer from './Disclaimer';

export default class AboutUs extends Component {
  state = { showModal: false };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View>
            <Disclaimer />
          </View>
          <Button
            title="I agree"
            onPress={() => this.setState({ showModal: false })}
          />
        </Modal>

        <View style={{ marginBottom: '5%' }}>
          <Button
            title="disclaimer"
            onPress={() => {
              this.setState({ showModal: true });
            }}
          />
        </View>
      </View>
    );
  }
}
