import { Link } from 'react-router-dom';

function LoginLink(props) {
  const onLogout = () => {
    window.location.href = '/signin';
    localStorage.clear();
  };

  return (
    <li className='nav-item' onClick={onLogout}>
      <Link className='nav-link'>( Logout )</Link>
    </li>
  );
}

export default LoginLink;
