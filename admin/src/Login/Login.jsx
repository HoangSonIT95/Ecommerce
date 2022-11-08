import './login.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    const res = await axios.post(
      'http://localhost:5000/auth/login',
      credentials
    );

    if (res.data.role === 'admin') {
      const user = JSON.stringify(res.data);
      localStorage.setItem('user', user);
      navigate('/');
    } else {
      setError('You are not authentication!');
    }
  };

  return (
    <div className='page-wrapper'>
      <div className='login'>
        <div className='lContainer'>
          <h1 className='lTitle'>Login</h1>
          <div className='item'>
            <label>Email</label>
            <input
              type='text'
              placeholder='Email'
              id='email'
              onChange={handleChange}
              className='lInput'
            ></input>
          </div>
          <div className='item'>
            <label>Password</label>
            <input
              type='password'
              placeholder='password'
              id='password'
              onChange={handleChange}
              className='lInput'
            ></input>
          </div>
          <button className='lButton' onClick={handleClick}>
            Login
          </button>
          {error && <span> {error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
