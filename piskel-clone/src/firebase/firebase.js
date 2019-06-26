import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from './config';

class FireBase {
  static init() {
    const firebaseConfig = {
      apiKey: config.API_KEY,
      authDomain: config.AUTH_DOMAIN,
      databaseURL: config.DATABASE_URL,
      projectId: config.PROJECT_ID,
      storageBucket: config.STORAGE_BUCKET,
      messagingSenderId: config.MESSAGING_SENDER_ID,
      appId: config.APP_ID,
    };
    firebase.initializeApp(firebaseConfig);
  }
}

export default FireBase;
