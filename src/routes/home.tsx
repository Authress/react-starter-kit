import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";


import { login, logout, makeApiCallWithUserToken, starterKitIsConfiguredCorrectly, authressLoginClient } from '../authressClient';
import reactLogo from './assets/react.svg';
import authressLogo from './assets/logo.svg';
import Openapi from './openapi';

function App() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [authressLoginHostUrlIsSet, setAuthressLoginHostUrlIsSet] = useState(true);

  // let userProfile;
  useEffect(() => {
    async function func() {
      if (starterKitIsConfiguredCorrectly) {
        authressLoginClient.userSessionExists().then((userIsLoggedIn) => {
          setUserProfile(authressLoginClient.getUserIdentity());
          console.log('User is Logged In', userIsLoggedIn, userProfile);
        });
      }
    }

    func();
  }, []);

  useEffect(() => {
    setAuthressLoginHostUrlIsSet(starterKitIsConfiguredCorrectly);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://authress.io" target="_blank">
          <img src={authressLogo} className="logo" alt="Authress logo" />
        </a>
        <a href="https://authress.io/knowledge-base/docs/SDKs/javascript#starter-kits" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Authress + React</h1>

      {/* <Openapi /> */}
      <div
        style={{
          border: '1px white solid',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        {authressLoginHostUrlIsSet ? (
          <div>
            {!userProfile ? 
              <button style={{ marginRight: '1rem' }} onClick={login}>
                Login
              </button>
              : <button style={{ marginRight: '1rem' }} onClick={logout}>
                Logout
              </button>
            }
            <button style={{ marginRight: '1rem' }} onClick={() => navigate('/protected')}>
              Go to Authress Protected Route Page
            </button>

            {userProfile ?
              <button style={{ marginRight: '1rem' }} onClick={makeApiCallWithUserToken}>
                Call your service API
              </button>
              : ''
            }

            <br></br>
            <br></br>

            <div style={{ textAlign: 'left' }}>
              <span>User Profile:</span>
              <pre style={{ whiteSpace: 'break-spaces', overflowWrap: 'break-word' }}>{JSON.stringify(userProfile || 'Not logged in', null, 2)}</pre>
            </div>

            <br></br>
          </div>
        ) : (
          <div>
            <div>
              Authress Account Host URL is missing from your configuration.<br></br>Specify the <strong>AuthressLoginHostUrl</strong> at the top of the <code style={{ color: '#dc3545' }}>src/authressClient.tsx</code> file.
              <br /><br />
              If you need an account, sign up for free at <a href="https://authress.io/app/#/signup">Authress.io</a>!
            </div>
          </div>
        )}
      </div>
      <p className="read-the-docs">Click on the Authress logo to learn more</p>
    </div>
  );
}

export default App;
