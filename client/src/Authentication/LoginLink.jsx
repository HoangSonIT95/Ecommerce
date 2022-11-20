function LoginLink(props) {
  const onLogout = () => {
    localStorage.clear();
  };

  return (
    <li className='nav-item' onClick={onLogout}>
      <a className='nav-link' href='/signin'>
        ( Logout )
      </a>
    </li>
  );
}

export default LoginLink;
