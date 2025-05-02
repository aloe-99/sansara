import { Link } from "react-router-dom";

export default function Card(props) {
  const { projectName, projectImage } = props;

  return (
    <Link className="project-list__container" to={projectName}>
      <li className="card">
        <img className="card__image" src={projectImage} alt="project-image" />
        <span className="card__text">{projectName}</span>
      </li>
    </Link>
  )
}