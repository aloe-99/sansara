import { useDrag } from "react-dnd";
import closeIconPath from '../../images/popup/close-Icon.svg';

export default function Task(props) {
  const { task, onDragEnd, onDeleteTask } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { task }, // Передаем всю задачу
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item.task.listId !== dropResult.targetListId) {
        onDragEnd(item.task.projectID, item.task._id, dropResult.targetListId); // Вызываем колбэк
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDeleteClick = () => {
    onDeleteTask(task)
  }

  return (
    <li
      ref={drag}
      className="task"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
    >
      <p className="task__text">{task.text}</p>
      <button type="button" className="task__delete-btn">
        <img
          className="task__delete-img"
          onClick={handleDeleteClick}
          src={closeIconPath}
          alt="удалить"
        />
      </button>
    </li>
  );
}