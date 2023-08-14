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
      dangerGroup: isDanger.label,
      dangerEvent: isDangerEvent.label,
      probability: probability,
      heaviness: heaviness,
      ipr: ipr,
      riskAttitude: riskAttitude,
      risk: risk,
      acceptability: acceptability,
    });
  }, [acceptability, heaviness, ipr, isDanger, isDangerEvent, isDangerGroup, probability, risk, riskAttitude]);

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
  };
  var FileSaver = require('file-saver');
  const table = () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('sds');
    sheet.columns = [
      { header: 'Группа опасности', key: 'danger', width: 32 },
      { header: 'Опасности', key: 'dangerGroup', width: 32 },
      { header: 'Опасное событие.', key: 'dangerEvent', width: 32 },
      { header: 'Тяжесть', key: 'probability', width: 32 },
      { header: 'Вероятность', key: 'heaviness', width: 32 },
      { header: 'ИПР', key: 'ipr', width: 32 },
      { header: 'Уровень риска', key: 'risk', width: 32 },
      { header: 'Приемлемость', key: 'acceptability', width: 32 },
      { header: 'Отношение к риску', key: 'riskAttitude', width: 20 },
    ];
    formValue.forEach((item) => sheet.addRow(item));
    return workbook.xlsx
      .writeBuffer()
      .then((buffer) =>
        FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
      )
      .catch((err) => console.log('Error writing excel export', err));
  };
  console.log(formValue);
  return (
    <div className='App'>
      <main className='main'>
        <form className='form' onSubmit={handleSubmit} required>
          <label className='lable'>
            Профессии:
            <Select options={prof} onChange={(evt) => console.log(evt)} />
          </label>
          <label className='lable'>
            Группа опасности:
            <Select
              options={dangerGroup}
              onChange={(evt) => setDangerGroup(evt)}
              required
            />
          </label>
          <label className='lable'>
            Опасности:
            <Select
              options={isArr}
              onChange={(evt) => setisDanger(evt)}
              isDisabled={disabled}
              required
            />
          </label>
          <label className='lable'>
            Опасное событие
            <Select
              options={isDangerEventArr}
              onChange={(evt) => setDangerEvent(evt)}
              required
            />
          </label>
          <div className='form__container'>
            <input
              className='form__input'
              placeholder='Тяжесть'
              onChange={(evt) => setProbability(evt.target.value)}
              required
            ></input>
            <input
              className='form__input'
              placeholder='Вероятность'
              onChange={(evt) => setHeaviness(evt.target.value)}
              required
            ></input>
            <span>ИПР: {ipr}</span>
            <span>Уровень риска: {risk}</span>
            <span>Приемлемость: {acceptability}</span>
            <span>Отношение к риску: {riskAttitude}</span>
          </div>
          <input type='submit' className='submit'></input>
        </form>
        <button onClick={table}>dfdf</button>
      </main>
    </div>
  );
}

export default App;
