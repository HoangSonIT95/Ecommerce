import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import LoginLink from '../../Authentication/LoginLink';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';

function Header() {
  const [active, setActive] = useState('Home');
  const [isLogin, setIsLogin] = useState(false);
  const [nameUser, setNameUser] = useState();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      setNameUser(user.fullName);
    }
  }, [user]);

  const handlerActive = value => {
    setActive(value);
  };

  return (
    <div className='container px-0 px-lg-3'>
      <nav className='navbar navbar-expand-lg navbar-light py-3 px-lg-0'>
        <Link className='navbar-brand' to={`/`}>
          <span className='font-weight-bold text-uppercase text-dark'>
            Boutique
          </span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item' onClick={() => handlerActive('Home')}>
              <Link
                className='nav-link'
                to={`/`}
                style={
                  active === 'Home' ? { color: '#dcb14a' } : { color: 'black' }
                }
              >
                Home
              </Link>
            </li>
            <li className='nav-item' onClick={() => handlerActive('Shop')}>
              <Link
                className='nav-link'
                to={`/shop`}
                style={
                  active === 'Shop' ? { color: '#dcb14a' } : { color: 'black' }
                }
              >
                Shop
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to={user ? '/cart' : '/signin'}>
                <i className='fas fa-dolly-flatbed mr-1 text-gray'></i>
                Cart
              </Link>
            </li>
            {nameUser ? <Name nameUser={nameUser} /> : ''}
            {isLogin ? <LoginLink /> : <LogoutLink />}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
