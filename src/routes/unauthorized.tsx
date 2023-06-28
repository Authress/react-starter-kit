import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="App">      
      <h1>User is not logged in</h1>

      <div
        style={{
          border: '1px white solid',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <div>This page is displayed when a user attempts to navigate a protected page and they are not logged in. When this happens, it makes sense to automatically redirect them to the login page.</div>

        <br></br>
        <button style={{ marginRight: '1rem' }} onClick={() => navigate('/')}>
          Login
        </button>
      </div>
    </div>
  );
}
