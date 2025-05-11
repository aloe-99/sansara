import closeIconPath from '../../../images/popup/close-Icon.svg';

export default function PopupWithForm(props) {
  const { isOpen, name, title, children, onClose, onSubmit } = props;
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={name}>
      <div className="popup__item popup__target">
        <h2 className="popup__header">{title}</h2>
        <form
          className="popup__form"
          name={`${name}-form`}
          id={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className="popup__save-button"
          >
            <span className="popup__save-text">
              Сохранить
            </span>
          </button>
        </form>
        <button type="button" className="popup__close-button">
          <img
            className="popup__close-image"
            onClick={onClose}
            src={closeIconPath}
            alt="Закрыть"
          />
        </button>
      </div>
    </div>
  )
}