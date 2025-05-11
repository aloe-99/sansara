import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from '../List/List';


export default function Project(props) {
  const lists = props.listsData;
  const tasks = props.tasksData;
  const { onTaskMove, onDeleteTask } = props;

  useEffect(() => {

  }, [lists])



  return (
    <div className="project">
      <DndProvider backend={HTML5Backend}>
        {
          tasks
            ?
            lists.map((list) => {
              const tasksFiltred = tasks.filter((task) => task.listID === list._id)
              return <List key={list._id} listId={list._id} title={list.title} tasks={tasksFiltred} onTaskMove={onTaskMove} onDeleteTask={onDeleteTask} />
            })
            :
            ''
        }
      </DndProvider>
    </div>
  )
}