import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import authressLogo from './assets/logo.svg';
import { LoginClient } from 'authress-login';

let loginClient: LoginClient;
try {
  loginClient = new LoginClient({
    // app_default is the default Authress created application.
    // * Configure the default Authress application at https://authress.io/app/#/settings?focus=applications&applicationId=app_default
    // * Create a new application at https://authress.io/app/#/settings?focus=applications
    // * Or Create an application using the quick setup flow: https://authress.io/app/#/settings?focus=quick&flow=authentication
    applicationId: 'app_default',

    // Create a custom domain: https://authress.io/app/#/settings?focus=domain (https://login.application.com)
    // * OR use the default one for your account: https://authress.io/app/#/api?route=overview (https://ACCOUNT_ID.api-region.authress.io)
    authressLoginHostUrl: '',
  });
} catch (error) {
  console.error(error);
}

import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [authressLoginHostUrlIsSet, setAuthressLoginHostUrlIsSet] = useState(true);

  // let userProfile;
  useEffect(() => {
    if (loginClient) {
      loginClient.userSessionExists().then((userIsLoggedIn) => {
        setUserProfile(loginClient.getUserIdentity());
        console.log('User is Logged In', userIsLoggedIn, userProfile);
      });
    }
  }, []);

  useEffect(() => {
    setAuthressLoginHostUrlIsSet(!!loginClient);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://authress.io" target="_blank">
          <img src={authressLogo} className="logo" alt="Authress logo" />
        </a>
        <a href="https://authress.io/knowledge-base" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Authress + React</h1>
      <div
        style={{
          border: '1px white solid',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        {authressLoginHostUrlIsSet ? (
          <div>
            <button style={{ marginRight: '1rem' }} onClick={login}>
              Login
            </button>
            <button style={{ marginRight: '1rem' }} onClick={logout}>
              Logout
            </button>
            <button style={{ marginRight: '1rem' }} onClick={redirectToGuardedPage}>
              Go to Guarded Page
            </button>
            <button style={{ marginRight: '1rem' }} onClick={makeApiCallWithUserToken}>
              Call your service API
            </button>

            <br></br>
            <br></br>

            <div style={{ textAlign: 'left' }}>
              <span>User Profile:</span>
              <pre>{JSON.stringify(userProfile || 'Not logged in', null, 2)}</pre>
            </div>

            <br></br>
            <br></br>
            <div>
              Edit <code>src/App.tsx</code> to update the login function.
            </div>
          </div>
        ) : (
          <div style={{ color: '#dc3545' }}>
            <div>
              Authress Account Host URL is missing from your configuration. Go to <strong>src/App.tsx</strong> and
              specify the <strong>AuthressLoginHostUrl</strong> at the top of the file. <br />
              If you need an account, sign up for free at <a href="https://authress.io/app/#/signup">Authress.io</a>!
            </div>
          </div>
        )}
      </div>
      <p className="read-the-docs">Click on the Authress logos to learn more</p>
    </div>
  );
}

async function login() {
  console.log('Logging the user in');

  await loginClient.authenticate({});
}

async function logout() {
  console.log('Logging out');

  await loginClient.logout('http://localhost:8080');
}

async function redirectToGuardedPage() {
  console.log('Redirecting the user to a guarded page.');
  const userIsLoggedIn = await loginClient.userSessionExists();
  if (!userIsLoggedIn) {
    await login();
  }
}

async function makeApiCallWithUserToken() {
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

export default App;
