import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import CheckBox from 'react-native-modest-checkbox';

class GoalsUpdate extends Component<{}> {
  render() {
    console.log('GOALS UPDATE STATE', this.state);
    return (
      <View>
        <Text>How many days will you be lifting each week?</Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            label="2 days"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
            onChange={checked => this.setState({ numDays: { twoDays: true } })}
          />
          <CheckBox
            label="3 days"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
            onChange={checked =>
              this.setState({ numDays: { threeDays: true } })}
          />
          <CheckBox
            label="4 days"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
            onChange={checked => this.setState({ numDays: { fourDays: true } })}
          />
        </View>
        <Text>Thats great pansyboy! What days will you be exercising on?</Text>
        <View>
          <CheckBox
            label=""
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Tuesday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Wednesday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Thursday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Friday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Saturday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Sunday"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
        </View>
        <View>
          <Text>Choose an exercise template</Text>
          <CheckBox
            label="Boring But Big"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Triumvirate"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="I'm Not Doing Jack Shit"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Periodization Bible"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
          <CheckBox
            label="Bodyweight"
            checkedImage={require('../../images/checked.png')}
            uncheckedImage={require('../../images/unchecked.png')}
          />
        </View>
        <Button
          title="go to dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalsUpdate);
