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
 */
const isEmailInUse = async (email: string): Promise<IsEmailInUse> => {
  const signInMethodsForEmail = await fetchSignInMethodsForEmail(auth, email);

  return {
    isInUse: signInMethodsForEmail.length > 0,
    linkedProviders: signInMethodsForEmail,
  };
};

export default isEmailInUse;
