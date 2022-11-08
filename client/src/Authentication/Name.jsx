import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAPI from '../API/UserAPI';

function Name(props) {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const id_user = localStorage.getItem('id_user');
      if (!id_user) return;
      const response = await axios.get(
        `http://localhost:5000/users/${id_user}`
      );
      setName(response.data);
    };

    fetchData();
  }, []);

  return (
    <li className='nav-item dropdown'>
      <a
        className='nav-link dropdown-toggle'
        style={{ cursor: 'pointer' }}
        id='pagesDropdown'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <i className='fas fa-user-alt mr-1 text-gray'></i>
        {name.fullName}
      </a>
      <div className='dropdown-menu mt-3' aria-labelledby='pagesDropdown'>
        {/* <Link
					className='dropdown-item border-0 transition-link'
					to={'/manage'}>
					Manage
				</Link> */}
        <Link
          className='dropdown-item border-0 transition-link'
          to={'/history'}
        >
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
