import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../componentsWithForm/Register/Register'
import Login from '../componentsWithForm/Login/Login'
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotLoggedInRoute from '../NotLoggedInRoute/NotLoggedInRoute';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { MainAPI } from '../../utils/MainApi';
import AddProjectPopup from '../popups/AddProjectPopup/AddProjectPopup';
import AddTaskPopup from '../popups/AddTaskPopup/AddTaskPopup';


function App(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialProjects, setInitialProjects] = useState([]);
  const [initialLists, setInitialLists] = useState([]);
  const [initialTasks, setInitialTasks] = useState([]);
  const [currentProject, setCurrentProject] = useState('');
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {
    function fetchData() {
      const getInitialProjects = MainAPI.getInitialProjects();
      Promise.all([getInitialProjects])
        .then(([initialProjects]) => {
          setInitialProjects(initialProjects);
        })
        .catch(err => console.log(err));
    }

    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck(location.pathname);
  }, []);

  useEffect(() => {
    function getProject(currentProject) {
      getInitialLists(currentProject);
      getInitialTasks(currentProject);
    }
    if (currentProject) {
      getProject(currentProject)
    }
  }, [currentProject])

  function checkLocationHeader(component) {
    if (location.pathname !== '/signin' && location.pathname !== '/signup') {
      return component;
    }
  }

  function handleRegister() {
    auth.register(email, password, userName)
      .then(() => {
        handleLogin();
      })
      .catch((err) => {
        console.log(err);
        document.querySelector('.form-error-response').textContent = err;
      })
  }


  function handleLogin() {
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail('');
          setPassword('');
          tokenCheck('/projects');
        }
      })
      .catch((err) => {
        console.log(err);
        document.querySelector('.form-error-response').textContent = err;
      })
  }

  function tokenCheck(path) {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
          .then((res) => {
            setCurrentUser(res);
            setLoggedIn(true);
            setEmail(res.email);
            // props.history.push(path);
          })
          .catch((err) => console.log(err));
      }
    }
  }
  function getInitialLists(project) {
    const getInitialLists = MainAPI.getInitialLists(project);
    Promise.all([getInitialLists])
      .then(([initialLists]) => {
        const lists = initialLists.sort((a, b) => a.order - b.order);
        setInitialLists(lists);
      })
      .catch(err => console.log(err));
  }

  function getInitialTasks(project) {
    const getInitialTasks = MainAPI.getInitialTasks(project);
    Promise.all([getInitialTasks])
      .then(([initialTasks]) => {
        setInitialTasks(initialTasks);
      })
      .catch(err => console.log(err));
  }

  const handleTaskMove = (projectId, taskId, newListId) => {
    setInitialTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId
          ? { ...task, listID: newListId }
          : task
      )
    );

    MainAPI.moveTask(projectId, taskId, newListId)
  };

  function handleAddProjectClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddTaskClick() {
    setIsAddTaskPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAddTaskPopupOpen(false);
  }

  function handleAddProjectSubmit(data) {
    MainAPI.postProject(data)
      .then((res) => {
        MainAPI.postList({
          title: "Backlog",
          order: 0,
          projectID: res._id
        }).then(
          MainAPI.postList({
            title: "To Do",
            order: 1,
            projectID: res._id
          }).then(
            MainAPI.postList({
              title: "In Progress",
              order: 2,
              projectID: res._id
            }).then(
              MainAPI.postList({
                title: "Done",
                order: 3,
                projectID: res._id
              })
            )))

        setInitialProjects([res, ...initialProjects]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
    closeAllPopups();
  }

  function handleDeleteProject() {
    MainAPI.deleteProject(currentProject)
      .then((res) => {
        const updatedProjects = initialProjects.filter(item => item._id !== currentProject);
        setInitialProjects(updatedProjects);
      })
      .then(navigate('/projects'))
  }

  function handleAddTaskSubmit(data) {
    MainAPI.postProjectTask(data)
      .then((task) => setInitialTasks([task, ...initialTasks]))
    closeAllPopups();
  }


  function handleDeleteTask({ projectID, _id: taskID }) {
    MainAPI.deleteProjectTask(projectID, taskID)
      .then((task) => {
        const tasks = initialTasks.filter(item => item._id !== task._id);
        setInitialTasks(tasks);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {checkLocationHeader(<Header loggedIn={loggedIn} onAddProjectBtn={handleAddProjectClick} onDeleteProject={handleDeleteProject} onAddTask={handleAddTaskClick} />)}
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/projects' element={<ProjectsList data={initialProjects} setProject={setCurrentProject} />} />
          <Route path='/projects/:projectId' element={<Project listsData={initialLists} tasksData={initialTasks} onTaskMove={handleTaskMove} onDeleteTask={handleDeleteTask} />} />
        </Route>
        <Route element={<NotLoggedInRoute loggedIn={loggedIn} />}>
          <Route path="/signup"
            element={<Register
              loggedIn={loggedIn}
              userName={userName}
              email={email}
              password={password}
              setUserName={setUserName}
              setEmail={setEmail}
              setPassword={setPassword}
              onRegister={handleRegister}
            />}
          />
          <Route path="/signin"
            element={<Login
              loggedIn={loggedIn}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onLogin={handleLogin}
            />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AddProjectPopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddProject={handleAddProjectSubmit}>
      </AddProjectPopup>
      <AddTaskPopup
        currentProject={currentProject}
        initialLists={initialLists}
        isOpen={isAddTaskPopupOpen}
        onClose={closeAllPopups}
        onAddTask={handleAddTaskSubmit}>
      </AddTaskPopup>
    </CurrentUserContext.Provider >
  )
}

export default App;