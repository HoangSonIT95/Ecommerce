import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const imageStyle = {
  position: 'relative',
  width: '100%',
};

const btnStyle = {
  position: 'absolute',
  zIndex: '1',
  right: '0',
  top: '0',
  color: 'red',
};

const EditUser = () => {
  const { userId } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/users/${userId}`).then(res => {
      setUser(res.data);
    });
  }, []);

  const handleChange = e => {
    setUser(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`/users/${userId}`, user, {
        withCredentials: true,
      })
      .then(res => {
        window.location.href = '/users';
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className='page-wrapper'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-12'>
            <form className='col-10' onSubmit={handleSubmit}>
              <div class='form-group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  type='text'
                  class='form-control'
                  id='fullName'
                  placeholder='Enter Full Name'
                  required
                  defaultValue={user.fullName}
                  onChange={handleChange}
                />
              </div>
              <div class='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  class='form-control'
                  id='email'
                  placeholder='Enter Email'
                  required
                  defaultValue={user.email}
                  onChange={handleChange}
                />
              </div>
              <div class='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  class='form-control'
                  rows='2'
                  id='password'
                  placeholder='Enter password'
                  onChange={handleChange}
                ></input>
              </div>
              <div class='form-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  class='form-control'
                  rows='2'
                  id='phone'
                  placeholder='Enter Phone Number'
                  required
                  defaultValue={user.phone}
                  onChange={handleChange}
                ></input>
              </div>
              <div class='form-group'>
                <label htmlFor='role'>Role</label>
                <select
                  class='form-control'
                  rows='2'
                  id='role'
                  placeholder='Enter Phone Number'
                  required
                  onChange={handleChange}
                >
                  <option value='kh' selected={user.role === 'kh'}>
                    kh
                  </option>
                  <option value='ctv' selected={user.role === 'ctv'}>
                    ctv
                  </option>
                  <option value='admin' selected={user.role === 'admin'}>
                    admin
                  </option>
                </select>
              </div>

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
