import { LoginClient } from '@authress/login';

let loginClient: LoginClient = null;
try {
  loginClient = new LoginClient({
    // app_default is the default Authress created application.
    // * Configure the default Authress application at https://authress.io/app/#/settings?focus=applications&applicationId=app_default
    // * Create a new application at https://authress.io/app/#/settings?focus=applications
    // * Or Create an application using the quick setup flow: https://authress.io/app/#/settings?focus=quick&flow=authentication
    applicationId: 'app_default',

    // Create a custom domain: https://authress.io/app/#/settings?focus=domain (https://login.application.com)
    // * OR use the default one for your account: https://authress.io/app/#/api?route=overview (https://ACCOUNT_ID.api-region.authress.io)
    authressApiUrl: '',
  });

  loginClient.userSessionExists().then(userIsLoggedIn => {
    cachedUserIsCurrentlyLoggedIn = userIsLoggedIn;
  });
} catch (error) {
  loginClient = null;
  console.error(error);
}

export const starterKitIsConfiguredCorrectly = !!loginClient;

export const authressLoginClient = loginClient;

let cachedUserIsCurrentlyLoggedIn = false;
export function userIsCurrentlyLoggedIn() {
  loginClient.userSessionExists().then(userIsLoggedIn => {
    cachedUserIsCurrentlyLoggedIn = userIsLoggedIn;
  });
  return cachedUserIsCurrentlyLoggedIn;
}

export async function login() {
    console.log('Logging the user in');
  
    await loginClient.authenticate({});
  }
  
export async function logout() {
    console.log('Logging out');
  
    await loginClient.logout(window.location.href);
  }
  
export async function makeApiCallWithUserToken() {
    const userAccessToken = await loginClient.ensureToken({});
    try {
      const result = await fetch('http://localhost:8080/api/endpoint', {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });
      console.log('API Call request', result);
    } catch (error) {
      console.error('Error calling API', error);
    }
  }

