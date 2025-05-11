import { useRef } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function AddTaskPopup(props) {
  const { isOpen, onClose, onAddTask, currentProject, initialLists } = props;

  const taskTextRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    const projectID = currentProject;
    const backlog = initialLists.find(list => list.title === 'Backlog');
    const listID = backlog._id;

    onAddTask({ projectID, listID, text: taskTextRef.current.value });
  }

  return (
    <PopupWithForm title="Добавить задачу" name="addTask" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_edit_text"
        name="text"
        type="url"
        placeholder="Текст задачи"
        id="task"
        ref={taskTextRef}
        required
      />
      <span className="popup__error-text task-error">&nbsp;</span>
    </PopupWithForm>
  )
}