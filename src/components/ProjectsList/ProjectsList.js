import Card from '../Card/Card';

export default function ProjectsList(props) {
  const projectsData = props.data;

  function renderProjectCard(item) {
    const img = item.img;
    return (<Card projectName={item.name} projectImage={img} key={item.key} />);
  }

  return (
    <ul className="project-list">
      {projectsData.map(project => {
        return renderProjectCard(project);
      })}
    </ul>
  );
}