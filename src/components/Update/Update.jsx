import './Update.css';

function Update({setModal}) {
  return (
    <div className='update'>
      <div className='update__cont'>
        <h2>Выберете что нужно добавить</h2>
        <button onClick={()=>setModal(true)}>Группа опасности</button>
        <button>Опасность</button>
        <button>Опасное событие</button>
      </div>
    </div>
  );
}

export default Update;
