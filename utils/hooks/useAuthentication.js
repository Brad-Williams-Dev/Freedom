import React from 'react';
import { navigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState();

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(undefined);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
    signOut
  };
}