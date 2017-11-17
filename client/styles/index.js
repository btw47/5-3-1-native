import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  }
});

export default styles;
