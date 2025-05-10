import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

  const location = useLocation();


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
        setInitialLists(initialLists);
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

  // Обработчик перемещения задачи
  const handleTaskMove = (projectId, taskId, newListId) => {
    MainAPI.moveTask(projectId, taskId, newListId)
      .then(getInitialLists(currentProject))
      .then(getInitialTasks(currentProject))

    // Для отладки - можно посмотреть результат
    console.log(`Задача ${taskId} перемещена в список ${newListId}`);
    console.log('Обновленные задачи:', initialTasks);
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      {checkLocationHeader(<Header loggedIn={loggedIn} />)}
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/projects' element={<ProjectsList data={initialProjects} setProject={setCurrentProject} />} />
          <Route path='/projects/:projectId' element={<Project listsData={initialLists} tasksData={initialTasks} onTaskMove={handleTaskMove} />} />
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
    </CurrentUserContext.Provider >
  )
}

export default App;