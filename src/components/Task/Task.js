import { useDrag } from "react-dnd";

export default function Task(props) {
  const { key, task, onDragEnd } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { key, task },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        onDragEnd(item.task.id, dropResult.targetListId);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li className="task" ref={drag}
      style={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? "grabbing" : "grab" }}>
      <p className="task__text">{task.content}</p>
    </li>
  )
}