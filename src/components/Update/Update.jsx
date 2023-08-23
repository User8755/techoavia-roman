import './Update.css';

function Update({ setModal, setModalChild }) {
  const hendleOpenModal = (evt) => {
    setModal(true);
    setModalChild(evt.target.textContent);
  };

  return (
    <div className='update'>
      <div className='update__cont'>
        <h2>Выберете что нужно добавить</h2>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Группа опасности
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Опасность
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Опасное событие
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Тип СИЗ
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Вид СИЗ
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Свойства, ГОСТ
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Свойства EN
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Комплектация
        </button>
        <button className='btn btn_danger' onClick={hendleOpenModal}>
          Эргономика
        </button>
      </div>
    </div>
  );
}

export default Update;
