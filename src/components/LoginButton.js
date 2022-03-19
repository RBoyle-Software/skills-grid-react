import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={() => loginWithRedirect({ redirectUri: 'http://localhost:3000/main' })}>
      Click to Authenticate with Auth0
    </div>
  )
}

export default LoginButton;
