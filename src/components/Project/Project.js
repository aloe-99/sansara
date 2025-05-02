import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from '../List/List';

import initialData from "../../utils/initialData";

export default function Project() {
  const [initData, setInitData] = useState(initialData);

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

  return (
    <div className="project">
      <DndProvider backend={HTML5Backend}>
        {
          initData.listOrder.map((listId) => {
            const list = initData.lists[listId];
            const tasks = list.taskIds.map((taskId) => initData.tasks[taskId])

            return <List key={list.id} list={list} tasks={tasks} onTaskMove={moveTask} />
          })
        }
      </DndProvider>
    </div>
  )
}