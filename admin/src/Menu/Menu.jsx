import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import './Menu.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DevicesIcon from '@mui/icons-material/Devices';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { red } from '@mui/material/colors';

function Menu(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = JSON.parse(localStorage.getItem('user'));
    if (!loadUser) {
      return <Navigate to='/login' />;
    }
    setUser(loadUser);
  }, []);

  return (
    <aside className='left-sidebar' data-sidebarbg='skin6'>
      <div
        className='scroll-sidebar  ps-container ps-theme-default ps-active-y'
        data-sidebarbg='skin6'
      >
        <nav className='sidebar-nav'>
          <ul id='sidebarnav'>
            {user.role === 'counselors' && (
              <>
                <li className='sidebar-item'>
                  <NavLink to='/chat' className='sidebar-link'>
                    <MessageIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'>Chat</span>
                  </NavLink>
                </li>
              </>
            )}{' '}
            {user.role === 'admin' && (
              <>
                <li className='sidebar-item'>
                  <NavLink className='sidebar-link' to='/'>
                    <DashboardIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'> Dashboard</span>
                  </NavLink>
                </li>
                <li className='list-divider'></li>

                <li className='nav-small-cap'>
                  <span className='hide-menu'>Components</span>
                </li>

                <li className='sidebar-item'>
                  <NavLink to='/chat' className='sidebar-link'>
                    <MessageIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'>Chat</span>
                  </NavLink>
                </li>

                <li className='sidebar-item'>
                  <NavLink to='/users' className='sidebar-link'>
                    <ManageAccountsIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'>Users</span>
                  </NavLink>
                </li>
                <li className='sidebar-item'>
                  <NavLink to='/products' className='sidebar-link'>
                    <DevicesIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'>Products</span>
                  </NavLink>
                </li>
                <li className='sidebar-item'>
                  <NavLink to='/orders' className='sidebar-link'>
                    <ReceiptLongIcon sx={{ color: red[500] }} />
                    <span className='hide-menu ml-2'>Orders</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
