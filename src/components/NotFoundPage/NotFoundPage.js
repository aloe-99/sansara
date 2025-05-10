import './NotFoundPage.css';

function NotFoundPage() {
  function returnHistory() {
    return window.history.back();
  }

  return (
    <div className='notfound'>
      <div className='notfound__container'>
        <span className='notfound__title'>404</span>
        <span className='notfound__subtitle'>Страница не найдена</span>
        <button className='notfound__link link-dissolution' onClick={returnHistory}>Назад</button>
      </div>
    </div>
  );
}

export default NotFoundPage;