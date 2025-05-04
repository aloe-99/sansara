import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from '../List/List';

import initialData from "../../utils/initialData";

export default function Project() {
  const { projectId, projectName } = useParams();

  const [initData, setInitData] = useState(initialData);

  const listOrder = initData.projects[projectId].listIds;

  const moveTask = (taskId, targetListId) => {
    setInitData(prevData => {
      const updatedLists = { ...prevData.lists };

      Object.keys(updatedLists).forEach(listId => {
        const list = updatedLists[listId];
        const filteredTaskIds = list.taskIds.filter(id => id !== taskId);

        if (listId === targetListId) {
          updatedLists[listId] = {
            ...list,
            taskIds: [taskId, ...filteredTaskIds],
          };
        } else {
          updatedLists[listId] = {
            ...list,
            taskIds: filteredTaskIds,
          };
        }
      });

      return {
        ...prevData,
        lists: updatedLists,
      };
    });
  };

  useEffect(() => {
    console.log('change state');
  }, [initData])

  return (
    <div className="project">
      <DndProvider backend={HTML5Backend}>
        {
          listOrder.map((listId) => {
            console.log(projectName);
            const list = initData.lists[listId];
            const tasks = list.taskIds.map((taskId) => initData.tasks[taskId])

            return <List key={list.id} list={list} tasks={tasks} onTaskMove={moveTask} />
          })
        }
      </DndProvider>
    </div>
  )
}