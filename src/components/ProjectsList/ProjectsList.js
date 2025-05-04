import { useEffect } from 'react';
import Card from '../Card/Card';

export default function ProjectsList(props) {
  const initData = props.data;


  // useEffect(() => {
  //   projectsData.map((item) => {
  //     return console.log(item['project-1'].name)
  //   })
  // }, [])

  return (
    <ul className="project-list">
      {
        initData.projectOrder.map(projectId => {
          const project = initData.projects[projectId]
          return <Card projectId={project.id} projectName={project.name} projectImage={project.img} key={project.key} />;
        })
      }
    </ul>
  );
}