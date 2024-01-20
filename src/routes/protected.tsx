import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedPage() {
  const navigate = useNavigate();
  return (
    <div className="App">      
      <h1>Authress Protected Page</h1>

      <div
        style={{
          border: '1px white solid',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <div>This page is protected with a route guard. The route guard checks for a valid user session before allowing the user to enter it. If the user has a valid session they will enter. Without a valid session the guard will redirect the user to log in with their selected provider.</div>

        <br></br>
        <button style={{ marginRight: '1rem' }} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
