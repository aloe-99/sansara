const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'write Diploma' },
    'task-2': { id: 'task-2', content: "don't cry" },
    'task-3': { id: 'task-3', content: 'breathe in' },
    'task-4': { id: 'task-4', content: 'breathe out' },
    'task-5': { id: 'task-5', content: 'write Diploma' },
    'task-6': { id: 'task-6', content: "don't cry" },
    'task-7': { id: 'task-7', content: 'breathe in' },
    'task-8': { id: 'task-8', content: 'breathe out' },
    'task-9': { id: 'task-9', content: 'write Diploma' },
    'task-10': { id: 'task-10', content: "don't cry" },
    'task-11': { id: 'task-11', content: 'breathe in' },
    'task-12': { id: 'task-12', content: 'breathe out' }
  },
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9', 'task-10']
    },
    'list-2': {
      id: 'list-2',
      title: 'To Do',
      taskIds: ['task-3', 'task-4']
    }
  },
  listOrder: ['list-1', 'list-2']
}

export default initialData;