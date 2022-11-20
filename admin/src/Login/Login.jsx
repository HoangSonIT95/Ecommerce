import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();

    UserAPI.login(credentials)
      .then(res => {
        const user = res.details;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', res.accessToken);
        if (user.role === 'admin') {
          navigate('/');
        } else if (user.role === 'counselors') {
          navigate('/chat');
        } else {
          setError('You are not authentication!');
        }
      })
      .catch(err => {
        setError(err.response?.data);
      });
  };

  return (
    <div className='d-flex justify-content-center align-item-center vh-100'>
      <form
        className='d-flex flex-column justify-content-center '
        style={{ width: '30%' }}
        onSubmit={handleClick}
      >
        <h1 className='align-self-center p-3'>Login</h1>
        <div className='form-group '>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='Enter email'
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group '>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control '
            id='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        {error && (
          <h3 className='p-2 text-danger align-self-center'> {error}</h3>
        )}
      </form>
    </div>
  );
};

export default Login;
