import './AboutMe.css';
import photoPath from '../../../images/profile-photo.png';

function AboutMe(props) {
  return (
    <section className="section student" id='student'>
      <div className="section__hr">
        <h3 className="section__title">Выполнил</h3>
      </div>
      <div className='section__container section__container_profile'>
        <div className='section__profile-text'>
          <span className="section__header section__header_profile">Шалонский Тимофей</span>
          <span className="section__container-title section__container-title_profile">25 лет</span>
          <p className="section__text">
            Студент МЭИ ИнЭИ факультет Бизнес Информатика
          </p>
        </div>
        <img className="section__profile-photo" src={photoPath} alt='Фото профиля' />
      </div>
    </section>
  );
}

export default AboutMe;