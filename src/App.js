import './App.css';
import dangerGroup from './untils/dangerGroup';
import danger from './untils/danger';
import prof from './untils/prof';
import dangerEvent from './untils/dangerousEvent';
import Select from 'react-select';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
function App() {
  const [isDangerGroup, setDangerGroup] = useState({});
  const [isDanger, setisDanger] = useState({});
  const [isDangerEvent, setDangerEvent] = useState([]);
  const [isDangerEventArr, setDangerEventArr] = useState([]);
  const [isArr, setArr] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({
    danger: isDangerGroup.label,
    dangerGroup: isDanger.label,
    dangerEvent: isDangerEvent.label,
  });
  const [formValue, setFormValue] = useState([]);
  const [ipr, setIpr] = useState(0);
  const [probability, setProbability] = useState(0);
  const [count, setCount] = useState(0);
  const [risk, setRisk] = useState('');
  //var Excel = require('exceljs');
  useEffect(() => {
    setCount(probability * ipr);
    if (count === 0) {
      setRisk('Ошибка');
    } else if (count <= 2) {
      setRisk('Незначительный');
    } else if (count <= 6) {
      setRisk('Низкий');
    } else if (count <= 12) {
      setRisk('Средний');
    } else if (count <= 16) {
      setRisk('Высокий');
    } else if (count > 19) {
      setRisk('Критический');
    }
  }, [count, ipr, probability]);

  useEffect(() => {
    setValue({
      danger: isDangerGroup.label,
      dangerGroup: isDanger.label,
      dangerEvent: isDangerEvent.label,
    });
  }, [isDanger, isDangerEvent, isDangerGroup]);

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
        { header: 'Группа опасности', key: 'dangerGroup', width: 32 },
        { header: 'Опасности', key: 'danger', width: 32 },
        { header: 'Опасное событие.', key: 'dangerEvent', width: 32 }
      ];
      sheet.addRow(formValue)
      return workbook.xlsx.writeBuffer()
      .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
      .catch(err => console.log('Error writing excel export', err))

  };
console.log(formValue)
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
              type='number'
              className='form__input'
              placeholder='Вероятность'
              onChange={(evt) => setProbability(evt.target.value)}
            ></input>
            <input
              type='number'
              className='form__input'
              placeholder='ИПР'
              onChange={(evt) => setIpr(evt.target.value)}
            ></input>
            <span>
              Уровень риска: {count}:{risk}
            </span>
          </div>
          <input type='submit' className='submit'></input>
        </form>
        <button onClick={table}>dfdf</button>
      </main>
    </div>
  );
}

export default App;
