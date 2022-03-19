import React from 'react';
import { Link } from "react-router-dom";
import './styles/TopNav.css';

export const gradients = {
  loginScreen: 'linear-gradient(185deg, #72456b, #42243e)',
  mainScreen: 'linear-gradient(185deg, #2f527c, #0b2344)',
  constructionScreen: 'linear-gradient(185deg, #b6a765, #4e4a0c)'
};

export default function TopNav(props) {


  return (
    <nav id="top-menu">
      <ul>
        
        <li><Link
          to="/"
          onClick={() => props.backgroundSetter(gradients.loginScreen)}
          >
          Home</Link></li>

        <li><Link
          to="/main"
          onClick={() => props.backgroundSetter(gradients.mainScreen)}
          >
          Board</Link></li>

        <li><a href="/temp">App Tracker</a></li>

        <li><Link
          to="/"
          onClick={() => props.backgroundSetter(gradients.constructionScreen)}
          >
          Sign Out</Link></li>

        <li><a href="/temp">My Account</a></li>

      </ul>
    </nav>
  )

}
