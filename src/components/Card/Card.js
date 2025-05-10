import { Link } from "react-router-dom";

export default function Card(props) {
  const { projectId, projectName, projectImage, onCardClick } = props;

  function handleCardClick() {
    onCardClick(projectId);
  }

  return (
    <Link className="project-list__container" to={projectId} onClick={handleCardClick}>
      <li className="card">
        <img className="card__image" src={projectImage} alt="project-image" />
        <span className="card__text">{projectName}</span>
      </li>
    </Link>
  )
}