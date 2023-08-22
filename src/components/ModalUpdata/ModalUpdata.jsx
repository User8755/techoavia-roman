import './ModalUpdata.css';
import Select from 'react-select';

function ModalUpdata({ active, setModal, modalCild }) {
  const dengerGroup = (
    <form className='form danger'>
      <button className='btn_close' onClick={() => setModal(false)}>
        X
      </button>
      <label className='lable danger'>
        Группа опасности
        <input className='form__input input'></input>
      </label>
      <label className='lable danger'>
        id группы опасности
        <input className='form__input input'></input>
      </label>
      <button className='btn send'>Отправить</button>
    </form>
  );

  const danger = (
    <form className='form danger'>
      <button className='btn_close' onClick={() => setModal(false)}>
        X
      </button>
      <label className='lable'>
        Зависимость от группы опасностей
        <Select
          className='react-select-container'
          classNamePrefix='react-select'
        ></Select>
      </label>
      <label className='lable box'>
        Опасности
        <input className='form__input input'></input>
      </label>
      <label className='lable box'>
        id опасности
        <input className='form__input input'></input>
      </label>
      <button className='btn send'>Отправить</button>
    </form>
  );
  console.log(modalCild);
  const handleChild = () => {
    if (modalCild === 'Группа опасности') {
      console.log(1);
      return dengerGroup;
    } else if (modalCild === 'Опасность') {
      console.log(2);
      return danger;
    }
  };

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
