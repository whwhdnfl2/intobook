// firebase를 초기화하고 firebase 앱 객체를 만듦
import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';

//firebase 구성객체
const firebaseConfig = {
  apiKey: "AIzaSyBqXN4Cca5eHs2M-8hDraBx61nyGYghlhA",
  authDomain: "reboot-623ba.firebaseapp.com",
  projectId: "reboot-623ba",
  storageBucket: "reboot-623ba.appspot.com",
  messagingSenderId: "1055736308919",
  appId: "1:1055736308919:web:8c45f6662740d1fc9f1932",
  measurementId: "G-70KL4BF6XB"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

