import { fetchSignInMethodsForEmail } from 'firebase/auth';
import isEmailInUse from '../../../../../src/modules/auth/utils/isEmailInUse';

const email = 'test@email.com';

describe('isEmailInUse', () => {
  afterEach(() => jest.resetAllMocks());

  it.each([
    [true, 'is in use', ['google.com', 'facebook.com']],
    [false, 'is not in use', []],
  ])('should return %s if the email %s', async (expected, _, providers) => {
    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValue(providers);

    const { isInUse } = await isEmailInUse(email);

    expect(fetchSignInMethodsForEmail).toHaveBeenCalled();
    expect(isInUse).toEqual(expected);
  });

  it('should return the list of providers linked to the email', async () => {
    const providers = ['google.com', 'facebook.com'];
    (fetchSignInMethodsForEmail as jest.Mock).mockResolvedValue(providers);

    const { linkedProviders } = await isEmailInUse(email);

    expect(linkedProviders).toEqual(providers);
  });
});
