import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '../../images/logo.svg';
import userPhoto from '../../images/man.png';

export default function Header() {
  const location = useLocation();

  const [isLong, setIsLong] = useState([]);

  useEffect(() => {
    setIsLong(location.pathname.includes('projects/'));
  }, [location]);

  return (
    <header className={`header ${isLong ? 'header--long' : ''}`}>
      <Link className="header__box link-dissolution" to="/projects">
        <img className="header__logo-icon" src={logo} alt="logo" />
        <span className="header__logo-label">SANSARA</span>
      </Link>
      <Link className="header__box link-dissolution" to="/">
        <img className="header__profile-photo" src={userPhoto} alt="userPhoto" />
      </Link>
    </header>
  )
}