import { useDrop } from 'react-dnd';

import Task from '../Task/Task'
import { useEffect } from 'react';


export default function List(props) {
  const { list, tasks, onTaskMove } = props;

  // useEffect(() => {
  //   console.log(list);
  // }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      return {
        targetListId: list.id,
        movedTaskId: item.task.id
      };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="project__container">
      <h3 className="container__title">{list.title}</h3>
      <ul className="container__task-list" ref={drop}>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} onDragEnd={onTaskMove} />
        })}
      </ul>
    </div>
  );
}
