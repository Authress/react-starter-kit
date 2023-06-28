import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { LoginClient } from 'authress-login';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { authressLoginClient, starterKitIsConfiguredCorrectly, userIsCurrentlyLoggedIn } from './authressClient';

import Home from './routes/home';
import ProtectedPage from './routes/protected';

import './index.css'
import Unauthorized from './routes/unauthorized';


interface GuardedRouteProps {
	isRouteAccessible?: boolean;
	redirectRoute?: string;
}

function LoginGuardedRoute() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [authressLoginHostUrlIsSet, setAuthressLoginHostUrlIsSet] = useState(true);

  useEffect(async () => {
    
  }, []);

  useEffect(() => {
    setAuthressLoginHostUrlIsSet(!!loginClient);
  }, []);

  return (
    <div className="App">      
      <Children />
    </div>
  );
};

const LoginProtectedRoute = ({ children }) => {
  console.log('User navigating to guarded page.');
  if (!starterKitIsConfiguredCorrectly) {
    return <Navigate to="/" replace />;
  }

  const userIsLoggedIn = userIsCurrentlyLoggedIn();
  if (!userIsLoggedIn) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/unauthorized' Component={Unauthorized} />
      <Route path='/protected' element={
        <LoginProtectedRoute>
          <ProtectedPage />
        </LoginProtectedRoute>
      } />
    </Routes>
  </Router>
)
