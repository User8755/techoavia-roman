import './Update.css';

function Update({ setModal, setModalCild }) {
  const hendleDengerGroup = (evt) => {
    setModal(true);
    setModalCild(evt.target.textContent);
  };

  return (
    <div className='update'>
      <div className='update__cont'>
        <h2>Выберете что нужно добавить</h2>
        <button className='btn btn_danger' onClick={hendleDengerGroup}>
          Группа опасности
        </button>
        <button className='btn btn_danger' onClick={hendleDengerGroup}>
          Опасность
        </button>
        <button className='btn btn_danger' onClick={hendleDengerGroup}>
          Опасное событие
        </button>
      </div>
    </div>
  );
}

export default Update;
