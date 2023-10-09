import dangerGroup from '../../untils/dangerGroup';
import danger from '../../untils/danger';
import prof from '../../untils/prof';
import dangerEvent from '../../untils/dangerousEvent';
import Select from 'react-select';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { useEffect, useState } from 'react';
import typeSiz from '../../untils/typeSIZ';
import './Form.css';

function Form({ setModal, setModalChild, job, setJob }) {
  const [isDangerGroup, setDangerGroup] = useState([]);
  const [isDanger, setisDanger] = useState([]);
  const [isDangerEvent, setDangerEvent] = useState([]);
  const [value, setValue] = useState({});
  const [formValue, setFormValue] = useState([]); // массив для записи в таблицу
  const [ipr, setIpr] = useState(0); // ИПР
  const [risk, setRisk] = useState(''); // уровень риска
  const [acceptability, setAcceptability] = useState(''); // приемлемость
  const [riskAttitude, setRiskAttitude] = useState(''); // отношение к риску
  const [obj, setObj] = useState(''); //объект
  const [source, setSource] = useState(''); // источник
  const [selectedTipeSIZ, setSelectedTipeSIZ] = useState([]);
  const [isProff, setProff] = useState([]);
  const [checkboxSiz, setCheckboxSIZ] = useState(false); // чекбокс доп средства
  const [commit, setCommit] = useState('');
  const [inputValue, setInputValue] = useState({
    probability: '',
    heaviness: '',
  });
  const [requiredSIZ, setRequiredSIZ] = useState(false);
  const ERROR = 'Ошибка';

  console.log(inputValue);
  useEffect(() => {
    setIpr(inputValue.probability * inputValue.heaviness);
    if (ipr === 0) {
      setRisk(ERROR);
      setAcceptability(ERROR);
      setRiskAttitude(ERROR);
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
  }, [ipr, inputValue]);

  //console.log(formValue);
  useEffect(() => {
    if (checkboxSiz) {
      setValue({
        proff: isProff.label,
        proffId: isProff.profId,
        danger: isDangerGroup.label,
        dangerID: isDangerGroup.dangerID,
        dangerGroup: isDanger.label,
        dangerGroupId: isDanger.groupId,
        dangerEvent: isDangerEvent.label,
        dangerEventID: isDangerEvent.groupId,
        probability: inputValue.probability,
        heaviness: inputValue.heaviness,
        ipr: ipr,
        riskAttitude: riskAttitude,
        risk: risk,
        acceptability: acceptability,
        obj: obj,
        source: source,
        typeSIZ: selectedTipeSIZ.label,
        speciesSIZ: selectedTipeSIZ.speciesSIZ,
        issuanceRate: selectedTipeSIZ.issuanceRate,
        additionalMeans: selectedTipeSIZ.additionalMeans,
        job: job.job,
        commit: commit,
        proffSIZ: isProff.SIZ,
      });
    } else {
      setValue({
        proff: isProff.label,
        proffId: isProff.profId,
        danger: isDangerGroup.label,
        dangerID: isDangerGroup.dangerID,
        dangerGroup: isDanger.label,
        dangerGroupId: isDanger.groupId,
        dangerEvent: isDangerEvent.label,
        dangerEventID: isDangerEvent.groupId,
        probability: inputValue.probability,
        heaviness: inputValue.heaviness,
        ipr: ipr,
        riskAttitude: riskAttitude,
        risk: risk,
        acceptability: acceptability,
        obj: obj,
        source: source,
        typeSIZ: selectedTipeSIZ.label,
        speciesSIZ: selectedTipeSIZ.speciesSIZ,
        issuanceRate: selectedTipeSIZ.issuanceRate,
        job: job.job,
        commit: commit,
        proffSIZ: isProff.SIZ,
      });
    }
  }, [
    commit,
    acceptability,
    checkboxSiz,
    ipr,
    isDanger,
    isDangerEvent,
    isDangerGroup,
    isProff,
    job,
    obj,
    risk,
    riskAttitude,
    selectedTipeSIZ,
    source,
    inputValue,
  ]);

  // useEffect(()=>{
  //   if(requiredSIZ) {
  //     value['proffSIZ'] = isProff.SIZ
  //   }
  // },[requiredSIZ, isProff, value])

  const resDangerGroup = danger.filter(
    (item) => isDangerGroup.label === item.dependence
  );

  const resDangerEvent = dangerEvent.filter(
    (item) => isDanger.label === item.dependence
  );

  const resTypeSiz = typeSiz.filter(
    (item) => isDangerEvent.groupId === item.dependence
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormValue([...formValue, value]);

    clear();
  };
  const [additionalMeans, setAdditionalMeans] = useState(false);

  useEffect(() => {
    if (typeof selectedTipeSIZ.additionalMeans === 'string') {
      setAdditionalMeans(true);
    } else {
      setAdditionalMeans(false);
    }
  }, [selectedTipeSIZ]);

  var FileSaver = require('file-saver');
  const table = async () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('sheet');

    sheet.columns = [
      { header: '№ п/п', key: 'number', width: 9 },
      { header: 'Код профессии (при наличии)', key: 'proffId', width: 20 },
      { header: 'Профессия', key: 'proff', width: 20 },
      { header: 'Должность', key: 'job', width: 20 },
      { header: 'Тип средства защиты', key: 'type', width: 20 },
      {
        header:
          'Наименование специальной одежды, специальной обуви и других средств индивидуальной защиты',
        key: 'vid',
        width: 20,
      },
      {
        header: 'Нормы выдачи на год (период) (штуки, пары, комплекты, мл)',
        key: 'norm',
        width: 20,
      },
      { header: 'ОБЪЕКТ', key: 'obj', width: 20 },
      { header: 'Источник', key: 'source', width: 20 },
      { header: 'ID группы опасностей', key: 'dangerID', width: 20 },
      { header: 'Группа опасности', key: 'danger', width: 25 },
      { header: 'Опасность, ID 767', key: 'dangerGroupId', width: 17 },
      { header: 'Опасности', key: 'dangerGroup', width: 25 },
      { header: 'Опасное событие, текст 767', key: 'dangerEventID', width: 25 },
      { header: 'Опасное событие', key: 'dangerEvent', width: 25 },
      { header: 'Тяжесть', key: 'heaviness', width: 8 },
      { header: 'Вероятность', key: 'probability', width: 12 },
      { header: 'ИПР', key: 'ipr', width: 5 },
      { header: 'Уровень риска', key: 'risk', width: 20 },
      { header: 'Приемлемость', key: 'acceptability', width: 20 },
      { header: 'Отношение к риску', key: 'riskAttitude', width: 20 },
      { header: 'Тип СИЗ', key: 'typeSIZ', width: 20 },
      { header: 'Вид СИЗ', key: 'speciesSIZ', width: 20 },
      {
        header:
          'Нормы выдачи средств индивидуальной защиты на год (штуки, пары, комплекты, мл)',
        key: 'issuanceRate',
        width: 20,
      },
      { header: 'ДОП средства', key: 'additionalMeans', width: 20 },
      { header: 'Комментарий', key: 'commit', width: 20 },
    ];

    let i = 0;
    formValue.forEach((item) => {
      item['number'] = i += 1;
      sheet.addRow(item);

      if (item.proffSIZ) {
        item.proffSIZ.forEach((SIZ) => sheet.addRow(SIZ));
      }
    });

    return workbook.xlsx
      .writeBuffer()
      .then((buffer) =>
        FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
      )
      .catch((err) => console.log('Error writing excel export', err));
  };

  const clear = () => {
    setDangerEvent('');
    setDangerGroup('');
    setisDanger('');
    setProff('');
    setRisk(ERROR);
    setAcceptability(ERROR);
    setRiskAttitude(ERROR);
    setSelectedTipeSIZ('');
    setObj('');
    setSource('');
    setJob('');
    setCommit('');
    setIpr(0);
    setInputValue({ probability: '', heaviness: '' });
    document.querySelector('.form').reset();
  };

  function hendleOpenModal() {
    console.log('gg');
    setModal(true);
    setModalChild('Профессия');
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  console.log(additionalMeans);
  return (
    <>
      <main className='main'>
        <form className='form' onSubmit={handleSubmit} required>
          <div className='label-wrapper'>
            <label className='label'>
              Профессии:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={prof}
                onChange={(evt) => setProff(evt)}
                placeholder={'Профессии'}
                noOptionsMessage={() => 'Значение не найдено'}
                value={isProff}
              />
              <label className='checkbox__label'>
                <input
                  type='checkbox'
                  name='profession'
                  className='form__checkbox visually-hidden'
                  onClick={hendleOpenModal}
                />
                <span className='form__pseudo-checkbox'></span>
                <span className='checkbox__label-text'>
                  Должность отсутствует
                </span>
              </label>
              <label className='checkbox__label'>
                <input
                  type='checkbox'
                  name='siz'
                  className='form__checkbox visually-hidden'
                  onClick={(evt) => setRequiredSIZ(evt.target.checked)}
                />
                <span className='form__pseudo-checkbox'></span>
                <span className='checkbox__label-text'>СИЗ</span>
              </label>
            </label>
            <label className='label'>
              Группа опасности:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={dangerGroup}
                onChange={(name) => setDangerGroup(name)}
                placeholder={'Группа опасности'}
                value={isDangerGroup}
              />
            </label>
            <label className='label'>
              Опасности:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={resDangerGroup}
                onChange={(evt) => setisDanger(evt)}
                placeholder={'Опасности'}
                value={isDanger}
              />
            </label>
            <label className='label'>
              Опасное событие:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={resDangerEvent}
                onChange={(evt) => setDangerEvent(evt)}
                placeholder={'Опасное событие'}
                value={isDangerEvent}
              />
            </label>
            <label className='label'>
              Тип СИЗ:
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={resTypeSiz}
                onChange={(evt) => setSelectedTipeSIZ(evt)}
                placeholder={'Тип СИЗ'}
                value={selectedTipeSIZ}
              />
              {/*} <label
                className={additionalMeans ? 'SIZ__label' : 'SIZ__label-hiden'}
              >*/}
              <label
                for='additional-means'
                className={
                  additionalMeans
                    ? 'checkbox__label'
                    : 'checkbox__label disabled '
                }
              >
                <input
                  id='additional-means'
                  type='checkbox'
                  name='additional-means'
                  className='additional-means form__checkbox visually-hidden'
                  onClick={(evt) => setCheckboxSIZ(evt.target.checked)}
                  disabled={!additionalMeans}
                />
                <span className='form__pseudo-checkbox'></span>
                <span className='checkbox__label-text'>ДОП средства</span>
              </label>
            </label>
            <label className='label'>
              Комментарий
              <input
                className='form__input standart'
                onChange={(evt) => setCommit(evt.target.value)}
              ></input>
            </label>
            <div className='label box'>
              <label className='label box'>
                Тяжесть
                <input
                  name='heaviness'
                  type='number'
                  className='form__input input'
                  onChange={handleChange}
                  //onChange={evt => console.log(evt.target.value)}
                  pattern='/^([1-5]+)$/'
                  value={inputValue.heaviness}
                ></input>
              </label>
              <label className='label box'>
                Вероятность
                <input
                  name='probability'
                  type='number'
                  className='form__input input'
                  //onChange={evt => console.log(evt.target.value)}
                  onChange={handleChange}
                  pattern='/^([1-5]+)$/'
                  value={inputValue.probability}
                ></input>
              </label>
            </div>
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
          <div className='label-wrapper'>
            <label className='label'>
              Объект
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setObj(evt.target.value)}
              ></input>
            </label>
            <label className='label'>
              Источник
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setSource(evt.target.value)}
              ></input>
            </label>
          </div>
          <div className='buttons_wrapper'>
            <input type='submit' className='button send'></input>
            <input
              type='reset'
              className='button reset'
              onClick={clear}
            ></input>
            <datalist id='number'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </datalist>
          </div>
        </form>
        <button onClick={table} className='button button__table'>
          Выгрузить в таблицу
        </button>
      </main>
    </>
  );
}

export default Form;
