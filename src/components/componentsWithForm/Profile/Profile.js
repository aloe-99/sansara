import { useContext, useState } from 'react';
import './Profile.css';
import '../form.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { MainAPI } from '../../../utils/MainApi';
import { customValidator } from '../../../utils/CustomValidator';
import { emailRegExp, nameRegExp } from '../../../utils/regExp';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const responseField = document.querySelector('.form-error-response');
    MainAPI.editUser({ name: userName, email: userEmail })
      .then((res) => {
        currentUser.name = res.name;
        currentUser.email = res.email;
        responseField.classList.add('form__error-text_complete');
        responseField.textContent = 'Данные успешно изменены';
      })
      .catch((err) => {
        responseField.textContent = err.message;
      });
  }

  function onChangeName(e) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    customValidator.checkInputValidity(nameInput);
    if (nameInput.value !== currentUser.name || emailInput.value.toLowerCase() !== currentUser.email.toLowerCase()) {
      setIsValid(customValidator.checkFormValidity());
    } else {
      setIsValid(false);
    }
  }

  function onChangeEmail(e) {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    customValidator.checkInputValidity(emailInput);
    if (nameInput.value !== currentUser.name || emailInput.value.toLowerCase() !== currentUser.email.toLowerCase()) {
      setIsValid(customValidator.checkFormValidity());
    } else {
      setIsValid(false);
    }
  }

  return (
    <form className='form form_profile' onSubmit={handleSubmit} noValidate>
      <fieldset className='form__preview form__preview_profile'>
        <h2 className='form__title form__title_profile form__title_position_center'>{`Привет, ${currentUser.name}!`}</h2>
      </fieldset>
      <fieldset className='form__inputs'>
        <div className='form__group form__group_profile'>
          <span className='form__error-text form-error-name'></span>
          <label className='form__label form__label_profile' htmlFor='name'>Имя</label>
          <input className='form__input form__input_profile' type='text' id='name' defaultValue={currentUser.name} required pattern={nameRegExp} onChange={onChangeName} />
        </div>
        <div className='form__group form__group_profile form__group_profile_underline-disable'>
          <label className='form__label form__label_profile' htmlFor='email'>E-mail</label>
          <input className='form__input form__input_profile form__input_profile_underline-disable' type='email' name='email' id='email' defaultValue={currentUser.email} required pattern={emailRegExp} onChange={onChangeEmail} />
          <span className='form__error-text form-error-email'></span>
        </div>
      </fieldset>
      <fieldset className='form__buttons'>
        <span className='form__error-text form-error-response'></span>
        <button className={`form__text form__text_color_light form__text-btn link-dissolution ${!isValid && 'form__text-btn_disabled'}`} type='submit' disabled={!isValid}>Редактировать</button>
        <button onClick={props.onLogout} className='form__text form__text_color_red form__text-btn link-dissolution'>Выйти из аккаунта</button>
      </fieldset>
    </form>
  );
}

export default Profile;