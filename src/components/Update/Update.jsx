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
        <button onClick={hendleDengerGroup}>Группа опасности</button>
        <button onClick={hendleDengerGroup}>Опасность</button>
        <button onClick={hendleDengerGroup}>Опасное событие</button>
      </div>
    </div>
  );
}

export default Update;
