import React from 'react';
import './styles/navbar.css';


function TopNav() {
  return (
    <nav id="top-menu">
      <ul>
        <li><a href="/temp">Home</a></li>
        <li><a href="/temp">Prompts</a></li>
        <li><a href="/temp">App Tracker</a></li>
        <li><a href="/logout">Sign Out</a></li>
        <li><a href="/temp">My Account</a></li>
      </ul>
    </nav>
  )
}


export default TopNav;
