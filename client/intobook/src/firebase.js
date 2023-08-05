// firebase를 초기화하고 firebase 앱 객체를 만듦
import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';

//firebase 구성객체
const firebaseConfig = {
  apiKey: "AIzaSyAq0vKv3Vxk5akJ04zO5S63DFoYl-qWvaI",
  authDomain: "intobook-706bb.firebaseapp.com",
  projectId: "intobook-706bb",
  storageBucket: "intobook-706bb.appspot.com",
  messagingSenderId: "666090916041",
  appId: "1:666090916041:web:f3d1ae6e27f6fc08e3a518"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

