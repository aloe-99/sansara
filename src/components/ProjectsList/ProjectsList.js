import { useEffect } from 'react';
import Card from '../Card/Card';

export default function ProjectsList(props) {
  const projects = props.data;
  const { setProject } = props;

  useEffect(() => {

  }, [projects])

  return (
    projects.length > 0 ?
      (<ul className="project-list" >
        {
          projects.map(project => {
            return (
              <Card
                key={project._id}
                projectId={project._id}
                projectName={project.name}
                projectImage={project.img}
                onCardClick={setProject}
              />
            )
          })
        }
      </ul>)
      : <p className="project-list__info">Здесь будут отображены проекты вашей организации после добавления</p>
  );
}