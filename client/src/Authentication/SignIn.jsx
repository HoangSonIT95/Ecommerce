import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import UserAPI from '../API/UserAPI';

function SignIn(props) {
  const [err, setErr] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    await UserAPI.postSignIn(user)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.details));
        localStorage.setItem('accessToken', res.accessToken);
        window.location.href = '/';
      })
      .catch(err => {
        setErr(err.response?.data);
      });
  };

  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50'>
          <span className='login100-form-title p-b-33'>Sign In</span>
          <div className='d-flex justify-content-center pb-5'>
            {err && <span className='text-danger'>{err}</span>}
          </div>
          <form onSubmit={onSubmit}>
            <div className='wrap-input100 validate-input'>
              <input
                className='input100'
                type='email'
                placeholder='Email'
                name='email'
                id='email'
              />
            </div>

            <div className='wrap-input100 rs1 validate-input'>
              <input
                className='input100'
                type='password'
                placeholder='Password'
                name='password'
                id='password'
              />
            </div>

            <div className='container-login100-form-btn m-t-20'>
              <button className='login100-form-btn' type='submit'>
                Sign in
              </button>
            </div>
          </form>

          <div className='text-center p-t-45 p-b-4'>
            <span className='txt1'>Create an account?</span>
            &nbsp;
            <Link to='/signup' className='txt2 hov1'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
