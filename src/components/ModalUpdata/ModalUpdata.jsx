import './ModalUpdata.css';
import Select from 'react-select';
import api from '../../untils/api';
import { useState } from 'react';
import dangerGroup from '../../untils/dangerGroup';
import danger from '../../untils/danger';
import NewModal from '../NewModal/NewModal';

function ModalUpdata({ active, setModal, modalChild, setJob }) {
  const [isValue, setValue] = useState({});
  const [isDependence, setDependence] = useState(null);
  console.log(isDependence);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (modalChild === 'Группа опасности') {
      setValue({
        ...isValue,
        [name]: value,
      });
    } else {
      isValue['dependence'] = isDependence;
      setValue({
        ...isValue,
        [name]: value,
      });
    }
  };

  const handleChangeJob = (evt) => {
    const { value } = evt.target;
    setJob({job: value})
  };

  const handleSubmitJob = (evt) => {
    evt.preventDefault();
    document.querySelector('.profession').reset();
    setModal(false)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (modalChild === 'Группа опасности') {
      api
        .createDangerGroups(isValue)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setValue({});
      document
        .querySelectorAll('.form__input')
        .forEach((item) => (item.value = ''));
    } else if (modalChild === 'Опасность') {
      api
        .createDangers(isValue)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const dengerGroup = (
    <form className='danger' onSubmit={handleSubmit}>
      <label className='label'>
        Группа опасности
        {/* тут должнеы быть обычные инпуты
        ДОБАВИЛА СТИЛИ
        <Select
          options={dangerGroup}
          className='react-select-container'
          classNamePrefix='react-select'
          name='label'
          onChange={handleChange}
        ></Select> */}
        <input
          className='form__input input'
          name='label'
          onChange={handleChange}
        ></input>
      </label>
      <label className='label box'>
        id группы опасности
        <input
          className='form__input id'
          name='dangerID'
          onChange={handleChange}
        ></input>
      </label>
      <button className='button send'>Отправить</button>
    </form>
  );

  const dangers = (
    <form className='danger' onSubmit={handleSubmit}>
      <label className='label'>
        Зависимость от группы опасностей
        <Select
          options={dangerGroup}
          className='react-select-container'
          classNamePrefix='react-select'
          onChange={(v) => setDependence(v.label)}
        ></Select>
      </label>
      <label className='label'>
        Опасности
        {/* тут тоже про инпут
        ТУТ ТОЖЕ ДОБАВИЛА СТИЛИ
        <Select
          className='react-select-container'
          classNamePrefix='react-select'
          onChange={handleChange}
          name='label'
        ></Select> */}
        <input
          className='form__input input'
          onChange={handleChange}
          name='label'
        ></input>
      </label>
      <label className='label box'>
        id опасности
        <input
          className='form__input input'
          onChange={handleChange}
          name='groupId'
        ></input>
      </label>
      <button className='button send'>Отправить</button>
    </form>
  );

  const dangerEvt = (
    <form className='danger' onSubmit={handleSubmit}>
      <label className='label'>
        Зависимость от опасностей
        <Select
          options={danger}
          className='react-select-container'
          classNamePrefix='react-select'
          onChange={(v) => setDependence(v.label)}
        ></Select>
      </label>
      <label className='label'>
        Опасное событие
        <Select
          className='react-select-container'
          classNamePrefix='react-select'
          onChange={handleChange}
          name='label'
        ></Select>
        {/*  <input
          className='form__input input'
          onChange={handleChange}
          name='label'
  ></input>*/}
      </label>
      <label className='label box'>
        id опасного события
        <input
          className='form__input id'
          onChange={handleChange}
          name='groupId'
        ></input>
      </label>
      <button className='button send'>Отправить</button>
    </form>
  );
  const newProfession = (
    <form className='profession' onSubmit={handleSubmit}>
      <label className='label profession'>
        Добавить новую должность?
        <input
          className='form__input input'
          onChange={handleChangeJob}
          name='job-title'
        ></input>
      </label>
      <button className='button send' onClick={handleSubmitJob}>
        Добавить
      </button>
      <button className='button button-cancel' onClick={() => setModal(false)}>
        Отмена
      </button>
    </form>
  );
  const handleChild = () => {
    if (modalChild === 'Группа опасности') {
      return dengerGroup;
    } else if (modalChild === 'Опасность') {
      return dangers;
    } else if (modalChild === 'Опасное событие') {
      return dangerEvt;
    } else if (modalChild === 'Профессия') {
      return newProfession;
    } else {
      return <NewModal />;
    }
  };

  return (
    <div
      className={active ? 'modal__overlay' : 'modal__overlay-disabled'}
      onClick={() => setModal(false)}
    >
      <div className='modal__window' onClick={(evt) => evt.stopPropagation()}>
        <button
          className='button_close'
          onClick={() => setModal(false)}
        ></button>
        {handleChild()}
      </div>
    </div>
  );
}

export default ModalUpdata;
