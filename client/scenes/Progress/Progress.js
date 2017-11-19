// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import firebase from 'firebase';
//
// export default class Progress extends Component<{}> {
//   render() {
//     return (
//       <View>
//         <Text>PROGRESS WILL GO HERE</Text>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { StyleSheet } from 'react';
import WebViewAndroid from 'react-native-webview-android';

import styles from '../../styles';

const SITE_URL = 'https://app-ffb9e.firebaseapp.com/DetailedProgress';

export default class Progress extends React.Component {
  constructor() {
    super();
    this.state = {
      url: SITE_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true
    };
  }

  goBack() {
    this.refs.webViewAndroidSample.goBack();
  }

  goForward() {
    this.refs.webViewAndroidSample.goForward();
  }
  reload() {
    this.refs.webViewAndroidSample.reload();
  }

  stopLoading() {
    // stops the current load
    this.refs.webViewAndroidSample.stopLoading();
  }
  postMessage(data) {
    // posts a message to web view
    this.refs.webViewAndroidSample.postMessage(data);
  }
  injectJavaScript(script) {
    // executes JavaScript immediately in web view
    this.refs.webViewAndroidSample.injectJavaScript(script);
  }
  onNavigationStateChange(event) {
    console.log(event);

    this.setState({
      backButtonEnabled: event.canGoBack,
      forwardButtonEnabled: event.canGoForward,
      url: event.url,
      status: event.title,
      loading: event.loading
    });
  }

  render() {
    return (
      <WebViewAndroid
        ref="webViewAndroidSample"
        javaScriptEnabled={true}
        geolocationEnabled={false}
        builtInZoomControls={false}
        onNavigationStateChange={event => this.onNavigationStateChange(event)}
        url={SITE_URL} // or use the source(object) attribute...
        style={styles.containerWebView}
      />
    );

    // other attributes: source(object), html(string), htmlCharset(string), baseUrl(string), injectedJavaScript(string), disableCookies(bool), disablePlugins(bool), userAgent(string)
  }
}
