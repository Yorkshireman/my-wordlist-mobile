import { SIGN_UP_URL } from '@env';
import { storeAuthToken } from './storeAuthToken';

export const signUp = ({
  email,
  myWordlistCreate,
  password,
  setErrorMessage,
  setLoading
}) => {
  setLoading(true);
  return fetch(SIGN_UP_URL, {
    body: JSON.stringify({
      user: {
        email: email.trim(),
        password: password.trim()
      }
    }),
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        const status = response.status;
        return response.json().then(resBody => {
          const errors = resBody.errors.length ? JSON.stringify(resBody.errors) : null;
          throw new Error(`Signup request HTTP error! Status: ${status}, errors: ${errors}`);
        });
      }

      return response.json();
    })
    .then(({ data: { token }}) => storeAuthToken(token))
    .then(() => myWordlistCreate())
    .catch(e => {
      console.error(e);
      setErrorMessage('Sorry, something went wrong. Please ensure you have entered a valid email address and try again.');
    })
    .finally(() => setLoading(false));
};
