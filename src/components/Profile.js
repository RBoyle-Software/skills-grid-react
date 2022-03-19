import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
      </div>
    )
  )
}

export default Profile