import {View, Text, Alert, Button} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import RNVoipCall from 'react-native-voip-call';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const token = async () => {
    const fcmToken = await messaging().getToken();
    console.log('fact fcm token', fcmToken);
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    requestUserPermission();
    token();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const showPush = () => {
    console.log('called-----------------', RNVoipCall);
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
        console.log(data);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>App</Text>
      <Button
        title="Push Notification"
        onPress={() => {
          showPush();
        }}
      />
    </View>
  );
};

export default App;
