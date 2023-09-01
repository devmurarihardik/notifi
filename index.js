/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNVoipCall from 'react-native-voip-call';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    let data;
    if (remoteMessage.data) {
      data = remoteMessage.data;
    }
    let callOptions = {
      callerId: '825f4094-a674-4765-96a7-1ac512c02a71', // Important uuid must in this format
      ios: {
        phoneNumber: '12344', // Caller Mobile Number
        name: 'RNVoip', // caller Name
        hasVideo: true,
      },
      android: {
        ringtuneSound: true, // defualt true
        ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw
        duration: 20000, // defualt 30000
        vibration: true, // defualt is true
        channel_name: 'call1asd', //
        notificationId: 1121,
        notificationTitle: 'Incomming Call',
        notificationBody: 'Some One is Calling...',
        answerActionTitle: 'Answer',
        declineActionTitle: 'Decline',
      },
    };

    RNVoipCall.displayIncomingCall(callOptions)
      .then(data => {
        console.log('background calll--------------------', data);
      })
      .catch(e => console.log(e));
  }
});
AppRegistry.registerComponent(appName, () => App);
