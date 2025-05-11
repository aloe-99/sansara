import { useDrop } from 'react-dnd';
import Task from '../Task/Task';

export default function List(props) {
  const { title, tasks, onTaskMove, listId, onDeleteTask } = props;

  // Настройка области для дропа
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => ({
      targetListId: listId, // ID списка, куда перенесли задачу
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="project__container"
    >
      <h3 className="container__title">{title}</h3>
      <ul className="container__task-list">
        {tasks.map((task) => (
          <Task key={task._id} task={task} onDragEnd={onTaskMove} onDeleteTask={onDeleteTask} />
        ))}
      </ul>
    </div>
  );
}