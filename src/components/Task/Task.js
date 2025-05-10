import { useDrag } from "react-dnd";

export default function Task(props) {
  const { task, onDragEnd } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { task }, // Передаем всю задачу
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item.task.listId !== dropResult.targetListId) {
        console.log(`${item.task.projectID} ${item.task._id}`);
        onDragEnd(item.task.projectID, item.task._id, dropResult.targetListId); // Вызываем колбэк
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
    </li>
  );
}