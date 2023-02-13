import { AuthProvider, CustomParameters, User } from 'firebase/auth';
import { UserDTO, UserInfo } from '../../../../api/dtos/user';

export interface LoadingHook<T, E> {
  value: T | undefined;
  loading: boolean;
  error: E | undefined;
}

export type Provider = AuthProvider & {
  addScope: (scope: string) => void;
  setCustomParameters: (customParameters: CustomParameters) => void;
};

export type AuthHook = Omit<LoadingHook<User | null, Error>, 'value'> & {
  user: User | null;
  signInWithProvider: <T extends Provider>(
    provider: T,
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => Promise<void>;
  signInWithEmailPassword: (
    email: UserDTO['email'],
    password: string
  ) => Promise<void>;
  signUpWithEmailPassword: (
    email: UserDTO['email'],
    password: string,
    userInfo?: UserInfo
  ) => Promise<void>;
  signOut(): Promise<void>;
};

export type AuthOptions = {
  onUserChange?: (user: User | null) => Promise<void>;
};
