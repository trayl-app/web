import { FirebaseError } from 'firebase/app';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../services/firebase';

type IsEmailInUse = {
  isInUse: boolean;
  linkedProviders: string[];
};

/**
 * Returns true if the email is linked to an existing account,
 * and the list of providers linked to the email.
 * @param {string} email - The email to check.
 * @return {Promise<IsEmailInUse>} True if the email is linked, and the list of providers linked to the email.
 * @throws {FirebaseError} If the email is not valid.
 */
const isEmailInUse = async (email: string): Promise<IsEmailInUse> => {
  try {
    const signInMethodsForEmail = await fetchSignInMethodsForEmail(auth, email);

    return {
      isInUse: signInMethodsForEmail.length > 0,
      linkedProviders: signInMethodsForEmail,
    };
  } catch (err) {
    throw err as FirebaseError;
  }
};

export default isEmailInUse;
