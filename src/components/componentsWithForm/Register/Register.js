import { useState } from 'react';
import '../form.css';
import { Link } from 'react-router-dom';
import logoPath from '../../../images/logo.svg'
import { customValidator } from '../../../utils/CustomValidator';
import { emailRegExp, nameRegExp } from '../../../utils/regExp';

function Register(props) {
  const { userName, email, password, setUserName, setEmail, setPassword, onRegister } = props;
  const [isValid, setIsValid] = useState(false);

  function onChangeName(e) {
    setUserName(e.target.value);
    const nameInput = document.getElementById('name');
    customValidator.checkInputValidity(nameInput);
    setIsValid(customValidator.checkFormValidity());
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
    const emailInput = document.getElementById('email');
    customValidator.checkInputValidity(emailInput);
    setIsValid(customValidator.checkFormValidity());
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
    const passwordInput = document.getElementById('password');
    customValidator.checkInputValidity(passwordInput);
    setIsValid(customValidator.checkFormValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister();
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <fieldset className='form__preview'>
        <Link className='form__logo-container link-dissolution' to='/'>
          <img className='form__logo' src={logoPath} alt='Логотип' />
          <span className='form__logo-label'>SANSARA</span>
        </Link>
        <h2 className='form__title form__title_profile'>Добро пожаловать!</h2>
      </fieldset>
      <fieldset className='form__inputs'>
        <label className='form__label' htmlFor='name'>Логин</label>
        <input className='form__input' type='text' id='name' value={userName} onChange={onChangeName} pattern={nameRegExp} required />
        <span className='form__error-text form-error-name'></span>
        <label className='form__label' htmlFor='email'>E-mail</label>
        <input className='form__input' type='email' id='email' value={email} onChange={onChangeEmail} pattern={emailRegExp} required />
        <span className='form__error-text form-error-email'></span>
        <label className='form__label' htmlFor='password'>Пароль</label>
        <input className='form__input' type='password' name='password' id='password' value={password} onChange={onChangePassword} required />
        <span className='form__error-text form-error-password'></span>
      </fieldset>
      <fieldset className='form__buttons'>
        <span className='form__error-text form-error-response'></span>
        <button className={`form__btn btn-dissolution ${isValid ? '' : 'form__btn_disabled'}`} type='submit' disabled={!isValid}>Зарегистрироваться</button>
        <span className='form__text'>
          Уже зарегистрированы?
          <Link className='form__link link-dissolution' to='/signin'>Войти</Link>
        </span>
      </fieldset>
    </form>
  );
}

export default Register;