import { AuthProvider, CustomParameters } from 'firebase/auth';

export type Provider = AuthProvider & {
  addScope: (scope: string) => void;
  setCustomParameters: (customParameters: CustomParameters) => void;
};
