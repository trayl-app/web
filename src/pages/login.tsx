import React from 'react';
import { NextPage } from 'next';
import { GoogleAuthProvider } from 'firebase/auth';
import useAuth from '../modules/auth/hooks/use-auth/useAuth';
import { auth } from '../services/firebase';

const LoginPage: NextPage = () => {
  const { user, signInWithProvider, signOut, error, loading } = useAuth(auth);

  console.log(loading);
  console.log(error);

  return (
    <div>
      <button
        onClick={async () => {
          await signInWithProvider(new GoogleAuthProvider());
        }}
      >
        Sign in with Google
      </button>

      <button onClick={signOut}>logout</button>

      {user && (
        <div>
          <h1>{user.displayName}</h1>
          {user.photoURL && <img src={user.photoURL} />}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
