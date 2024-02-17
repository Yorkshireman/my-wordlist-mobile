import { isInvalidEmail } from '../../src/utils/isInvalidEmail';

describe('isInvalidEmail()', () => {
  describe('when email is one character', () => {
    test.each(['a', 'x', '!', '*', '@', '1', '0'])('returns true when email is %s', email => {
      expect(isInvalidEmail(email)).toBe(true);
    });
  });

  describe('when email is more than one character and does not contain a @', () => {
    test('returns true', () => {
      expect(isInvalidEmail('foobar.com')).toBe(true);
    });
  });

  describe('when email is more than one character and contains a @', () => {
    test.each(['a@', '@x', '!kjsdf@', 'foobar@hotmail.com'])('returns false when email is %s', email => {
      expect(isInvalidEmail(email)).toBe(false);
    });
  });
});
