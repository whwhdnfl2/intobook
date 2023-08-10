import { getToken } from 'firebase/messaging';
import { messaging } from './../../firebase';

const fetchFCMtoken = () => {
    // console.log('Requesting permission...');
    //권한을 허용할 것인지 묻는 알림을 띄움. 사용자가 허용시 토큰 받는 로직
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            // console.log('Notification permission granted.')
            getToken(messaging).then((currentToken) => {
                if (currentToken) {
                    // console.log('FCM Token : ', currentToken)
                    console.log('push-messaging is permitted')
                } else {
                    console.log('FCM Token Unavailable')
                }
            }).catch((err) => {
                console.log('error', err);
            })
        }
      }).catch((err) => {
        console.log('error', err);
      })
    };

export default fetchFCMtoken;