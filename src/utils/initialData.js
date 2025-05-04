import p1 from '../images/p1.jpg';
import p2 from '../images/p2.jpg';
import p3 from '../images/p3.jpg';
import baikal from '../images/baikal.jpg';

const initialData = {
  projects: {
    'project-1': {
      id: 'project-1',
      name: 'Lorem',
      img: p1,
      listIds: ['list-1', 'list-2', 'list-3', 'list-4']
    },
    'project-2': {
      id: 'project-2',
      name: 'Ipsum',
      img: p2,
      listIds: ['list-3', 'list-2', 'list-1', 'list-4']
    }
  },
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
    },
    'list-3': {
      id: 'list-3',
      title: 'In Progress',
      taskIds: []
    },
    'list-4': {
      id: 'list-4',
      title: 'Done',
      taskIds: []
    }
  },
  projectOrder: ['project-1', 'project-2']
}

export default initialData;