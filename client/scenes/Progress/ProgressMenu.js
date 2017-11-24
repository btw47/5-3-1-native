import React, { Component, StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

class ProgressMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            console.log('hi');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
