import {
  Auth,
  AuthError,
  AuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { UserDTO, UserInfo } from '../../../../api/dtos/user';
import { functions } from '../../../../services/firebase';
import { AuthHook, AuthOptions } from './types';

const useAuth = (auth: Auth, options?: AuthOptions): AuthHook => {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, async (currentUser) => {
      if (options?.onUserChange) {
        try {
          await options.onUserChange(currentUser);
        } catch (err) {
          setError(err as AuthError);
        }
      }

      setUser(currentUser);
      setLoading(false);
      setError(undefined);
    });

    return () => authListener();
  }, [auth, options, setError]);

  const signInWithProvider = useCallback(
    async (provider: AuthProvider) => {
      setLoading(true);

      try {
        const credential = await signInWithPopup(auth, provider);

        // const token = await getIdToken(credential.user);

        const additionalUserInfo = getAdditionalUserInfo(credential);

        if (additionalUserInfo?.isNewUser) {
          try {
            const persistPostgresUser = httpsCallable(
              functions,
              'persistPostgresUser'
            );

            await persistPostgresUser({
              firstName: additionalUserInfo.profile?.given_name,
              lastName: additionalUserInfo.profile?.family_name,
              birthday: additionalUserInfo.profile?.birthday,
            });
          } catch (err) {
            await deleteUser(credential.user);

            throw err;
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err as AuthError);
        setLoading(false);
      }
    },
    [auth, user]
  );

  const internalSignInWithEmailPassword = useCallback(
    async (email: UserDTO['email'], password: string) => {
      setLoading(true);

      try {
        await signInWithEmailAndPassword(auth, email, password);

        setLoading(false);
      } catch (err) {
        setError(err as AuthError);
        setLoading(false);
      }
    },
    [auth]
  );

  const internalSignUpWithEmailPassword = useCallback(
    async (email: UserDTO['email'], password: string, userInfo?: UserInfo) => {
      setLoading(true);

      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        try {
          const persistPostgresUser = httpsCallable(
            functions,
            'persistPostgresUser'
          );

          await persistPostgresUser(userInfo);
        } catch (err) {
          await deleteUser(credential.user);

          throw err;
        }

        setLoading(false);
      } catch (err) {
        setError(err as AuthError);
        setLoading(false);
      }
    },
    [auth, user]
  );

  const internalSignOut = useCallback(async () => {
    setLoading(true);

    try {
      await signOut(auth);

      setLoading(false);
    } catch (err) {
      setError(err as AuthError);
      setLoading(false);
    }
  }, [auth]);

  return useMemo<AuthHook>(
    () => ({
      user,
      loading,
      error,
      signInWithProvider,
      signInWithEmailPassword: internalSignInWithEmailPassword,
      signUpWithEmailPassword: internalSignUpWithEmailPassword,
      signOut: internalSignOut,
    }),
    [
      user,
      loading,
      error,
      signInWithProvider,
      internalSignInWithEmailPassword,
      internalSignUpWithEmailPassword,
      internalSignOut,
    ]
  );
};

export default useAuth;
