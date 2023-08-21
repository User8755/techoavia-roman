import './ModalUpdata.css';
import Select from 'react-select';

function ModalUpdata({ active, setModal, modalCild }) {
  const dengerGroup = (
    <form>
      <label>
        Группа опасности
        <input></input>
      </label>
      <label>
        id группы опасности
        <input></input>
      </label>
    </form>
  );

  const danger = (
    <form>
       <label>
        Зависемость от группы опасностей
        <Select></Select>
      </label>
      <label>
        Опасности
        <input></input>
      </label>
      <label>
        id опасности
        <input></input>
      </label>
    </form>
  );
  console.log(modalCild);
  const handleChild = () => {
    if(modalCild==='Группа опасности') {
      console.log(1)
      return dengerGroup
    }
    else if(modalCild==='Опасность') {
      console.log(2)
      return danger
    }
  }

  return (
    <div
      className={active ? 'modal__overlay' : 'modal__overlay-disabled'}
      onClick={() => setModal(false)}
    >
      <div className='modal__window' onClick={(evt) => evt.stopPropagation()}>
        {handleChild()}
      </div>
    </div>
  );
}

export default ModalUpdata;
