import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/TopNav.css';

export const gradients = {
  '/': 'linear-gradient(185deg, #72456b, #42243e)',
  '/main': 'linear-gradient(185deg, #2f527c, #0b2344)',
  '/under-construction': 'linear-gradient(185deg, #b6a765, #4e4a0c)'
};


export default function TopNav(props) {

  const { user } = useAuth0();


  return (
    <nav id="top-menu">
      <ul>
        
        <li><Link to="/">Home</Link></li>

        <li><Link to="/main">Board</Link></li>

        <li><Link to="/under-construction">App Tracker</Link></li>
          
        <li><LogoutButton /></li>

        <li><a href="/temp">My Account</a></li>

      </ul>

      { user && <img src={user.picture} className="user-image" alt="user profile" /> }

    </nav>
  )

}
