import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebase';
import '../App.css';

const NavBar = ({ user, logoutUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav>

      <div className="nav-wrapper indigo darken-4">

        <Link to="/" className="brand-logo ">News App</Link>

        <ul id="nav-mobile" className="right ">
          {
            user
              ? (
                <li>
                  <button
                    type="button"
                    className="btn red"
                    onClick={() => {
                      auth.signOut();
                      logoutUser(null);
                      navigate('/');
                    }}
                  >logout
                  </button>
                </li>
              )
              : (
                <>
                  {location.pathname === '/signup' ? (
                    <li><button className="btn light-blue accent-3"><Link to="/login">login</Link></button></li>
                  )
                    : (
                      <li><button className="btn light-blue accent-3"><Link to="/signup">signup</Link></button></li>
                    )}
                </>
              )

          }

        </ul>
      </div>

    </nav>

  );
};

export default NavBar;
