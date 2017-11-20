import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  login: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  profileImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  workoutCard: {
    position: 'absolute',
    justifyContent: 'center',
    top: '10%'
  },
  containerWebView: {
    flex: 1,
    justifyContent: 'center'
  },
  getStatedButton: {
    backgroundColor: '#1a8cff',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22,
    margin: '5%'
  },
  getStartedButtonText: {
    width: 200,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'white'
  }
});

export default styles;
