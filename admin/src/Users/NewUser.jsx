import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';

const NewUser = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleChange = e => {
    setUser(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await UserAPI.postSignUp(user);
    if (response) {
      navigate('/users');
    }
  };

  return (
    <div className='page-wrapper d-block'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-12'>
            <form className='col-10' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='fullName'
                  placeholder='Enter Full Name'
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter Email'
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='form-control'
                  rows='2'
                  id='password'
                  placeholder='Enter password'
                  onChange={handleChange}
                ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  className='form-control'
                  rows='2'
                  id='phone'
                  placeholder='Enter Phone Number'
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className='form-group'>
                <label htmlFor='role'>Role</label>
                <select
                  className='form-control'
                  rows='2'
                  id='role'
                  required
                  onChange={handleChange}
                >
                  <option value='client'>client</option>
                  <option value='counselors'>counselors</option>
                  <option value='admin'>admin</option>
                </select>
              </div>

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by
        <a href='https://www.facebook.com/nunhivole/'> Hoang Son</a>.
      </footer>
    </div>
  );
};

export default NewUser;
