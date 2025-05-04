import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';

import initialData from '../../utils/initialData';

function App() {
  const initData = initialData;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/projects" element={<ProjectsList data={initData} />} />
        <Route path="/projects/:projectId/:projectName" element={<Project />} />
      </Routes>
    </>
  )
}

export default App;