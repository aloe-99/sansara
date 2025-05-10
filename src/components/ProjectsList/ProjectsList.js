import { useEffect } from 'react';
import Card from '../Card/Card';

export default function ProjectsList(props) {
  const projects = props.data;
  const { setProject } = props;

  return (
    <ul className="project-list">
      {
        projects.map(project => {
          return <Card key={project._id} projectId={project._id} projectName={project.name} projectImage={project.img} onCardClick={setProject} />;
        })
      }
    </ul>
  );
}