import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'


export default function MyAccount () {

  const { user } = useAuth0();
  console.log(user)


  return (
    <div className='board'>
      <div className='account'>
        Hello, {user.given_name || user.nickname}!
        <br></br>
        <button>Delete Account</button>
      </div>
    </div>
  )

}