import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import logo from '../../images/logo.svg';
// import userPhoto from '../../images/man.png';

export default function Header(props) {

  const currentUser = useContext(CurrentUserContext);
  const { loggedIn } = props;

  const location = useLocation();

  const [isLong, setIsLong] = useState([]);

  useEffect(() => {
    setIsLong(location.pathname.includes('projects/'));
  }, [location]);

  return (
    <header className={`header ${isLong ? 'header--long' : ''}`}>
      <Link className="header__box link-dissolution" to="/">
        <img className="header__logo-icon" src={logo} alt="logo" />
        <span className="header__logo-label">SANSARA</span>
      </Link>
      {loggedIn ?
        <Link className="header__box link-dissolution" to="/">
          {currentUser.name}
          {/* <img className="header__profile-photo" src={userPhoto} alt="userPhoto" /> */}
        </Link> :
        <Link className="header__box link-dissolution" to="/">
          Войти
        </Link>
      }
    </header>
  )
}