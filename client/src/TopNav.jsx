import { Link } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/TopNav.css';


export default function TopNav(props) {

  const { user } = useAuth0();


  return (
    <nav id="top-menu">
      <ul>
        
        <li><Link to="/login">Home</Link></li>

        <li><Link to="/main">Board</Link></li>

        <li><Link to="/under-construction">App Tracker</Link></li>
          
        <li><LogoutButton /></li>

        <li><Link to='/my-account'>My Account</Link></li>

      </ul>

      { user && <img src={user.picture} className="user-image" alt="user profile" /> }

    </nav>
  )

}
