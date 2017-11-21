import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
    // marginBottom: '50%'
  },
  dashboardTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginLeft: '5%'
    // marginBottom: '50%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  logoStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    position: 'absolute'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 15
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%'
  },
  containerWebView: {
    flex: 1,
    justifyContent: 'center'
  },
  getStartedButton: {
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
  },
  sideBySideButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  calculatorTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%'
  },
  calculatorButton: {
    backgroundColor: '#1a8cff',
    borderColor: '#333',
    borderWidth: 0.2,
    borderRadius: 22,
    margin: '5%'
  },
  userStats: {
    marginTop: 0,
    fontSize: 20
  }
});

export default styles;
