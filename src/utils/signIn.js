import { SIGN_IN_URL } from '@env';
import { storeAuthToken } from './storeAuthToken';

export const signIn = ({ client, email, navigation, password, setLoading, setSignInError }) => {
  setLoading(true);

  return fetch(SIGN_IN_URL, {
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
          throw new Error(`Signin request HTTP error! Status: ${status}, errors: ${errors}`);
        });
      }

      return response.json();
    })
    .then(({ data: { token }}) => storeAuthToken(token))
    // couldn't get client.clearStore() to work on sign-out in NavigationBar.js
    .then(() => client.cache.reset())
    .then(() => navigation.navigate('Home'))
    .catch(e => {
      console.error(e);
      setSignInError(true);
    })
    .finally(() => setLoading(false));
};
