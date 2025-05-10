import './Main.css';
import Promo from './Promo/Promo';
import AboutMe from './AboutMe/AboutMe';

function Main(props) {
  return (
    <main className='main'>
      <Promo />
      <AboutMe />
    </main>
  );
}

export default Main;