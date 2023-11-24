import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '@app/slices/auth';
import { useDispatch } from 'react-redux';
import { clearToken } from '@utils/localStorage';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    clearToken();
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="menu-circle"></div>
      <div className="header-menu">
        <div></div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
