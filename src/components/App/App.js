import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';

import projectsData from '../../utils/projectsData';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/projects" element={<ProjectsList data={projectsData} />} />
        <Route path="/projects/:projectName" element={<Project />} />
      </Routes>
    </>
  )
}

export default App;