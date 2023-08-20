import './App.css';
import dangerGroup from './untils/dangerGroup';
import danger from './untils/danger';
import prof from './untils/prof';
import dangerEvent from './untils/dangerousEvent';
import Select from 'react-select';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { useEffect, useState } from 'react';

function App() {
  const [isDangerGroup, setDangerGroup] = useState({});
  const [isDanger, setisDanger] = useState({});
  const [isDangerEvent, setDangerEvent] = useState([]);
  const [isDangerEventArr, setDangerEventArr] = useState([]);
  const [isArr, setArr] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({});
  const [formValue, setFormValue] = useState([]); // массив для записи в таблицу
  const [ipr, setIpr] = useState(0); // ИПР
  const [probability, setProbability] = useState(0); // Тяжесть
  const [risk, setRisk] = useState(''); // уровень риска
  const [acceptability, setAcceptability] = useState(''); // приемлемость
  const [riskAttitude, setRiskAttitude] = useState(''); // отношение к риску
  const [heaviness, setHeaviness] = useState(0); // вероятность
  const [obj, setObj] = useState(''); //объект
  const [source, setSource] = useState(''); // источник
  console.log(formValue);
  useEffect(() => {
    setIpr(probability * heaviness);
    if (ipr === 0) {
      setRisk('Ошибка');
      setAcceptability('Ошибка');
      setRiskAttitude('Ошибка');
    } else if (ipr <= 2) {
      setRisk('Незначительный');
      setAcceptability('Приемлемый');
      setRiskAttitude('Меры не требуются');
    } else if (ipr <= 6) {
      setRisk('Низкий');
      setAcceptability('Приемлемый');
      setRiskAttitude('Необходимо уделить внимание');
    } else if (ipr <= 12) {
      setAcceptability('Допустимый');
      setRisk('Средний');
      setRiskAttitude(
        'Требуются меры по снижению уровня риска в установленные сроки'
      );
    } else if (ipr <= 16) {
      setAcceptability('Неприемлемый');
      setRisk('Высокий');
      setRiskAttitude('Требуются неотложные меры, усовершенствования');
    } else if (ipr > 19) {
      setAcceptability('Неприемлемый');
      setRisk('Критический');
      setRiskAttitude('Немедленное прекращение деятельности');
    }
  }, [ipr, heaviness, probability]);

  useEffect(() => {
    setValue({
      danger: isDangerGroup.label,
      dangerID: isDangerGroup.dangerID,
      dangerGroup: isDanger.label,
      dangerGroupId: isDanger.groupId,
      dangerEvent: isDangerEvent.label,
      probability: probability,
      heaviness: heaviness,
      ipr: ipr,
      riskAttitude: riskAttitude,
      risk: risk,
      acceptability: acceptability,
      obj: obj,
      source: source,
    });
  }, [
    acceptability,
    heaviness,
    ipr,
    isDanger,
    isDangerEvent,
    isDangerGroup,
    obj,
    probability,
    risk,
    riskAttitude,
    source,
  ]);

  useEffect(() => {
    if (isDangerGroup) {
      const res = danger.filter(
        (item) => isDangerGroup.label === item.dependence
      );
      setArr(res);
      setDisabled(false);
    } else {
      return setDisabled(true);
    }
  }, [isDangerGroup]);

  useEffect(() => {
    if (isDanger) {
      const res = dangerEvent.filter(
        (item) => isDanger.label === item.dependence
      );
      setDangerEventArr(res);
      setDisabled(false);
    }
  }, [isDanger]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormValue([...formValue, value]);

    clear();
  };

  var FileSaver = require('file-saver');
  const table = () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('sheet');

    sheet.columns = [
      { header: '№ п/п', key: 'number', width: 9 },
      { header: 'ОБЪЕКТ', key: 'obj', width: 20 },
      { header: 'Источник', key: 'source', width: 20 },
      { header: 'ID группы опасностей', key: 'dangerID', width: 20 },
      { header: 'Группа опасности', key: 'danger', width: 25 },
      { header: 'Опасность, ID 767', key: 'dangerGroupId', width: 17 },
      { header: 'Опасности', key: 'dangerGroup', width: 25 },
      { header: 'Опасное событие', key: 'dangerEvent', width: 25 },
      { header: 'Тяжесть', key: 'probability', width: 8 },
      { header: 'Вероятность', key: 'heaviness', width: 12 },
      { header: 'ИПР', key: 'ipr', width: 5 },
      { header: 'Уровень риска', key: 'risk', width: 20 },
      { header: 'Приемлемость', key: 'acceptability', width: 20 },
      { header: 'Отношение к риску', key: 'riskAttitude', width: 20 },
    ];
    let i = 0;
    console.log(i);
    formValue.forEach((item) => {
      item['number'] = i += 1;
      sheet.addRow(item);
      console.log(item);
    });

    return workbook.xlsx
      .writeBuffer()
      .then((buffer) =>
        FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
      )
      .catch((err) => console.log('Error writing excel export', err));
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionDanger, setSelectedOptionDanger] = useState(null);
  const [selectedOptionDangerEvt, setSelectedOptionDangerEvt] = useState(null);

  const clearDangerGroup = (item) => {
    setSelectedOption(item);
    setDangerGroup(item);
  };
  const clearDanger = (item) => {
    setSelectedOptionDanger(item);
    setisDanger(item);
  };
  const clearDangerEvent = (item) => {
    setSelectedOptionDangerEvt(item);
    setDangerEvent(item);
  };

  const clear = () => {
    setSelectedOption('');
    setSelectedOptionDanger('');
    setSelectedOptionDangerEvt('');
    document.querySelector('.form').reset();
    setRisk('Ошибка');
    setAcceptability('Ошибка');
    setRiskAttitude('Ошибка');
  };

  return (
    <div className='App'>
      <main className='main'>
        <form className='form' onSubmit={handleSubmit} required>
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
          <div className='form__container'>
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
          <div className='buttons_wrapper'>
            <input type='submit' className='btn send'></input>
            <input type='reset' className='btn reset' onClick={clear}></input>
          </div>
        </form>
        <button onClick={table} className='btn button__table'>
          Выгрузить в таблицу
        </button>
      </main>
    </div>
  );
}

export default App;
