import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../styles';

import Lift from './Lift';
import * as actions from '../../redux/actions';

class LiftByLift extends Component<{}> {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  renderButtons = () => {
    if (this.state.count > 0 && this.state.count < 5) {
      return (
        <View>
          <Button
            title="<"
            onPress={() => this.setState({ count: this.state.count - 1 })}
          />
          <Button
            title=">"
            onPress={() => this.setState({ count: this.state.count + 1 })}
          />
        </View>
      );
      //5 needs to be changed to the count of exercises
    } else if (this.state.count > 0) {
      return (
        <Button
          title="<"
          onPress={() => this.setState({ count: this.state.count - 1 })}
        />
      );
    } else {
      return (
        <Button
          title=">"
          onPress={() => this.setState({ count: this.state.count + 1 })}
        />
      );
    }
  };

  render() {
    console.log('LIFT BY LIFT STATE', this.state);
    return (
      <View style={styles.container}>
        <Lift />
        {this.renderButtons()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LiftByLift);
