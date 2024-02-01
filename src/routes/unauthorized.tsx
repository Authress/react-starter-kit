import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../authressClient';

export default function Unauthorized() {
  const navigate = useNavigate();

  async function loginAndRedirect() {
    await login();
    navigate('/');
  }

  return (
    <div className="App">      
      <h1>You are not logged in</h1>

      <div
        style={{
          border: '1px white solid',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <div>This page is displayed when a user attempts to navigate to a protected page and they are not logged in. When this happens, it makes sense to automatically redirect them to the login page.</div>

        <br></br>
        <button style={{ marginRight: '1rem' }} onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button style={{ marginRight: '1rem' }} onClick={loginAndRedirect}>
          Login
        </button>
      </div>
    </div>
  );
}
