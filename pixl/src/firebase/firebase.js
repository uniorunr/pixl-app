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

  static async auth() {
    const provider = new firebase.auth.GithubAuthProvider();

    const token = await firebase.auth().signInWithPopup(provider)
      .then(result => result.credential.accessToken)
      .catch((error) => {
        throw new Error(`signing error: ${error.message}`);
      });

    const userData = await fetch(`https://api.github.com/user?access_token=${token}`)
      .then(response => response.json())
      .catch((error) => {
        throw new Error(`error while request to github api: ${error}`);
      });

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: userData.login,
      photoURL: userData.avatar_url,
    }).catch((error) => { throw new Error(`error while updating user profile: ${error}`); });
  }

  static logout() {
    firebase.auth().signOut().then(() => {
      window.location.reload();
    }).catch((error) => { throw new Error(`signout error: ${error}`); });
    localStorage.removeItem('selectedMentor');
  }
}

export default FireBase;
