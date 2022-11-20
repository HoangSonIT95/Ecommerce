import React, { useEffect, useState } from 'react';
import Logoicon from '../Image/logo-icon.png';
import Logotext from '../Image/logo-text.png';
import Logolight from '../Image/logo-light-text.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { pink } from '@mui/material/colors';

function Header(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = JSON.parse(localStorage.getItem('user'));
    setUser(loadUser);
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className='topbar' data-navbarbg='skin6'>
      <nav className='navbar top-navbar navbar-expand-md'>
        <div className='navbar-header' data-logobg='skin6'>
          <span className='nav-toggler waves-effect waves-light d-block d-md-none'>
            <i className='ti-menu ti-close'></i>
          </span>
          <div className='navbar-brand'>
            <b className='logo-icon'>
              <img src={Logoicon} alt='homepage' className='dark-logo' />
              <img src={Logoicon} alt='homepage' className='light-logo' />
            </b>
            <span className='logo-text'>
              <img src={Logotext} alt='homepage' className='dark-logo' />
              <img src={Logolight} className='light-logo' alt='homepage' />
            </span>
          </div>
        </div>
        <div className='navbar-collapse collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav float-left mr-auto ml-3 pl-1'></ul>
          <ul className='navbar-nav float-right mr-3'>
            <li className='nav-item dropdown'>
              <span
                type='button'
                className='nav-link dropdown-toggle'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <img
                  src='https://img.icons8.com/color/36/000000/administrator-male.png'
                  alt='user'
                  className='rounded-circle mr-3'
                  width='40'
                />
                <span className='ml-2 d-none d-lg-inline-block'>
                  <span className='text-dark mr-3'>
                    {user && user.fullName}
                  </span>{' '}
                  <ExpandMoreIcon />{' '}
                </span>
              </span>
              <div className='dropdown-menu dropdown-menu-right user-dd animated flipInY'>
                <button className='dropdown-item' onClick={handleLogout}>
                  <LogoutIcon sx={{ color: pink[500] }} className='mr-2' />
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
