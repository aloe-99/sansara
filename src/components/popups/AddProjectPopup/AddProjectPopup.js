import { useRef } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddProjectPopup(props) {
  const { isOpen, onClose, onAddProject } = props;

  const cardTitleRef = useRef();
  const cardLinkRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddProject({ name: cardTitleRef.current.value, img: cardLinkRef.current.value });
  }

  return (
    <PopupWithForm title="Новый проект" name="addProject" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_edit_name"
        name="name"
        type="text"
        placeholder="Название"
        id="project"
        minLength="2"
        maxLength="30"
        ref={cardTitleRef}
        required
      />
      <span className="popup__error-text project-error">&nbsp;</span>
      <input
        className="popup__input popup__input_edit_text"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        id="project-image"
        ref={cardLinkRef}
        required
      />
      <span className="popup__error-text project-image-error">&nbsp;</span>
    </PopupWithForm>
  )
}