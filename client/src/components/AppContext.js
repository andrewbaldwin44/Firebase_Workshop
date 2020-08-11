import React, { createContext, useEffect, useState } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

export const AppContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDz1GwAdm4Fq3ZaXUzNsXuhn-U5o1kSgmQ",
  authDomain: "user-app-1b8fa.firebaseapp.com",
  databaseURL: "https://user-app-1b8fa.firebaseio.com",
  projectId: "user-app-1b8fa",
  storageBucket: "user-app-1b8fa.appspot.com",
  messagingSenderId: "550553302804",
  appId: "1:550553302804:web:d16dd04dd370c7332cb401"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  }

  useEffect(() => {
    if (user) {
      fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
      .then(response => response.json())
      .then(data => {
        setAppUser(data.data);
        setMessage(data.message);
      })
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        appUser,
        signInWithGoogle,
        handleSignOut,
        message,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
