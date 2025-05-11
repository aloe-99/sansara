import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import logo from '../../images/logo.svg';
// import userPhoto from '../../images/man.png';

export default function Header(props) {

  const currentUser = useContext(CurrentUserContext);
  const { loggedIn, onAddProjectBtn, onDeleteProject, onAddTask } = props;

  const location = useLocation();

  const [isLong, setIsLong] = useState([]);

  useEffect(() => {
    setIsLong(location.pathname.includes('projects/'));
  }, [location]);

  function checkLocation() {
    if (location.pathname === '/projects') {
      return <button className="header__btn link-dissolution" onClick={onAddProjectBtn}>Новый проект</button>;
    }
    if (location.pathname.includes('/projects/')) {
      return (
        <>
          <button className="header__btn link-dissolution" onClick={onAddTask}>Добавить задачу</button>
          <button className="header__btn link-dissolution" onClick={onDeleteProject}>Удалить проект</button>
        </>
      );
    }
  }

  return (
    <header className={`header ${isLong ? 'header--long' : ''}`}>
      <Link className="header__box link-dissolution" to="/projects">
        <img className="header__logo-icon" src={logo} alt="logo" />
        <span className="header__logo-label">SANSARA</span>
      </Link>
      {checkLocation()}
      {loggedIn ?
        <Link className="header__box header__box--profile link-dissolution" to="/">
          {currentUser.name}
          {/* <img className="header__profile-photo" src={userPhoto} alt="userPhoto" /> */}
        </Link> :
        <Link className="header__box header__box--profile link-dissolution" to="/">
          Войти
        </Link>
      }
    </header>
  )
}