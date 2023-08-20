import './App.css';
import dangerGroup from './untils/dangerGroup';
import danger from './untils/danger';
import prof from './untils/prof';
import dangerEvent from './untils/dangerousEvent';
import Select from 'react-select';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { useEffect, useState } from 'react';
import Footer from './Footer';

function App() {

  const [isModal, setModal] = useState(false)
  return (
    <div className='App'>
      <main className='main'>
        <form className='form' onSubmit={handleSubmit} required>
          <div className='lable-wrapper'>
            <label className='lable'>
              Профессии:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={prof}
                onChange={(evt) => console.log(evt)}
                placeholder={'Профессии'}
              />
            </label>
            <label className='lable'>
              Группа опасности:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={dangerGroup}
                onChange={(name) => clearDangerGroup(name)}
                required
                placeholder={'Группа опасности'}
                value={selectedOption}
              />
            </label>
            <label className='lable'>
              Опасности:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={isArr}
                onChange={(evt) => clearDanger(evt)}
                isDisabled={disabled}
                required
                placeholder={'Опасности'}
                value={selectedOptionDanger}
              />
            </label>
            <label className='lable'>
              Опасное событие
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={isDangerEventArr}
                onChange={(evt) => clearDangerEvent(evt)}
                required
                placeholder={'Опасное событие'}
                value={selectedOptionDangerEvt}
              />
            </label>
            <label className='lable box'>
              Тяжесть
              <input
                className='form__input input'
                onChange={(evt) => setProbability(evt.target.value)}
                required
              ></input>
            </label>
            <label className='lable box'>
              Вероятность
              <input
                className='form__input input'
                onChange={(evt) => setHeaviness(evt.target.value)}
                required
              ></input>
            </label>
          </div>
          <div className='form__container'>
            <div className='wrapper'>
              <span className='wrapper_text'>ИПР: {ipr}</span>
              <span className='wrapper_text'>Уровень риска: {risk}</span>
              <span className='wrapper_text'>
                Приемлемость: {acceptability}
              </span>
              <span className='wrapper_text'>
                Отношение к риску: {riskAttitude}
              </span>
            </div>
          </div>
          <div className='lable-wrapper'>
            <label className='lable'>
              Объект
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setObj(evt.target.value)}
              ></input>
            </label>
            <label className='lable'>
              Источник
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setSource(evt.target.value)}
              ></input>
            </label>
          </div>
          <div className='buttons_wrapper'>
            <input type='submit' className='btn send'></input>
            <input type='reset' className='btn reset' onClick={clear}></input>
          </div>
        </form>
        <button onClick={table} className='btn button__table'>
          Выгрузить в таблицу
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default App;
