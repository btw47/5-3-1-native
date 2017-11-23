import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';

import UserChart from './UserChart';

export default class UserStatsModal extends Component<{}> {
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
            <UserChart user={this.props.user} />
          </View>
          <View style={{ marginBottom: '20%' }}>
            <Button
              title="I agree"
              onPress={() => this.setState({ showModal: false })}
            />
          </View>
        </Modal>

        <View style={{ marginBottom: '5%' }}>
          <Button
            title="See Stats"
            onPress={() => {
              this.setState({ showModal: true });
            }}
          />
        </View>
      </View>
    );
  }
}
