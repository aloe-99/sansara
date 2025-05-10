import './Promo.css';
import { Link } from 'react-router-dom';

function Promo(props) {
  return (
    <section className='section promo'>
      <h1 className='section__header'>Выпускной проект студента  ИнЭИ факультета Бизнес Информатика.</h1>
      <Link className='promo__link' to='/projects'>К проектам</Link>
    </section>
  );
}

export default Promo;