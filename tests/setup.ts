jest.mock('firebase/functions', () => ({
  httpsCallable: jest.fn(),
  getFunctions: jest.fn(),
}));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn().mockReturnValue([]),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  fetchSignInMethodsForEmail: jest.fn(),
}));
