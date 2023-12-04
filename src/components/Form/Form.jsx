import dangerGroup from '../../untils/dangerGroup';
import danger from '../../untils/danger';
import prof from '../../untils/prof';
import dangerEvent from '../../untils/dangerousEvent';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import typeSiz from '../../untils/typeSIZ';
import danget776 from '../../untils/danger775';
import dangerEvent776 from '../../untils/dangerEvent776';
import riskManagement from '../../untils/riskManagement';
import conversion from '../../untils/converct';
import './Form.css';
import SpoilerBox from '../SpoilerBox/SpoilerBox';
import mapOPR from '../../untils/tables/mapOPR';
import baseTable from '../../untils/tables/baseTable';
import normSiz from '../../untils/tables/normSIZ';
import ListHazards from '../../untils/tables/ListHazards';

function Form() {
  const [isDangerGroup, setDangerGroup] = useState([]);
  const [isDanger, setisDanger] = useState([]);
  const [isDanger776, setDanger776] = useState([]);
  const [isDangerEvent776, setDangerEvent776] = useState({});
  const [isDangerEvent, setDangerEvent] = useState([]);
  const [value, setValue] = useState({});
  const [formValue, setFormValue] = useState([]); // массив для записи в таблицу
  const [ipr, setIpr] = useState(0); // ИПР
  const [ipr1, setIpr1] = useState(0); // ИПР1
  const [risk, setRisk] = useState(''); // уровень риска
  const [acceptability, setAcceptability] = useState(''); // приемлемость
  const [riskAttitude, setRiskAttitude] = useState(''); // отношение к риску
  const [risk1, setRisk1] = useState(''); // уровень риска
  const [acceptability1, setAcceptability1] = useState(''); // приемлемость
  const [riskAttitude1, setRiskAttitude1] = useState(''); // отношение к риску
  const [obj, setObj] = useState(''); //объект
  const [source, setSource] = useState(''); // источник
  const [selectedTipeSIZ, setSelectedTipeSIZ] = useState([]);
  const [isProff, setProff] = useState([]);
  const [checkboxSiz, setCheckboxSIZ] = useState(false); // чекбокс доп средства
  const [inputValue, setInputValue] = useState({
    probability: '', //Вероятность
    heaviness: '', // Тяжесть
    probability1: '', // Тяжесть1
    heaviness1: '', //Вероятность1
    periodicity: '', // Периодичность
    responsiblePerson: '', // Ответственное лицо
    completionMark: '', // Отметка о выполнении
    existingRiskManagement: '', // Существующие меры упр-я рисками
    obj: '', // объект
    source: '', // источник
    job: '', // Должность
    subdivision: '', // Подразделение
    commit: '', // Комментарий
  });
  const [requiredSIZ, setRequiredSIZ] = useState(false);
  const ERROR = 'Ошибка';
  const [isRiskManagement, setRiskManagement] = useState([]);
  const [count, setCount] = useState(0);

  // состояние спойлер бокса
  const [isOrder767, setOrder767] = useState(true);
  const [isOrder776, setOrder776] = useState(true);

  // обучаемые списки объект, источник
  const [listObj, setListObj] = useState([]);
  const [listSource, setListSource] = useState([]);

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

  // результат ИПР1
  useEffect(() => {
    setIpr1(inputValue.probability1 * inputValue.heaviness1);
    if (ipr1 === 0) {
      setRisk1(ERROR);
      setAcceptability1(ERROR);
      setRiskAttitude1(ERROR);
    } else if (ipr1 <= 2) {
      setRisk1('Незначительный');
      setAcceptability1('Приемлемый');
      setRiskAttitude1('Меры не требуются');
    } else if (ipr1 <= 6) {
      setRisk1('Низкий');
      setAcceptability1('Приемлемый');
      setRiskAttitude1('Необходимо уделить внимание');
    } else if (ipr1 <= 12) {
      setAcceptability1('Допустимый');
      setRisk1('Средний');
      setRiskAttitude1(
        'Требуются меры по снижению уровня риска в установленные сроки'
      );
    } else if (ipr1 <= 16) {
      setAcceptability1('Неприемлемый');
      setRisk1('Высокий');
      setRiskAttitude1('Требуются неотложные меры, усовершенствования');
    } else if (ipr1 > 19) {
      setAcceptability1('Неприемлемый');
      setRisk1('Критический');
      setRiskAttitude1('Немедленное прекращение деятельности');
    }
  }, [ipr1, inputValue]);

  useEffect(() => {
    if (checkboxSiz) {
      setValue({
        ...inputValue,
        proff: isProff.label,
        proffId: isProff.profId,
        danger: isDangerGroup.label,
        dangerID: isDangerGroup.dangerID,
        dangerGroup: isDanger.label,
        dangerGroupId: isDanger.groupId,
        dangerEvent: isDangerEvent.label,
        dangerEventID: isDangerEvent.groupId,
        ipr: ipr,
        riskAttitude: riskAttitude,
        risk: risk,
        acceptability: acceptability,
        probability1: inputValue.probability1,
        heaviness1: inputValue.heaviness1,
        ipr1: ipr1,
        riskAttitude1: riskAttitude1,
        risk1: risk1,
        acceptability1: acceptability1,
        typeSIZ: selectedTipeSIZ.label,
        speciesSIZ: selectedTipeSIZ.speciesSIZ,
        issuanceRate: selectedTipeSIZ.issuanceRate,
        commit: inputValue.commit,
        proffSIZ: isProff.SIZ,
        danger776: isDanger776.label,
        danger776Id: isDanger776.ID,
        dangerEvent776: isDangerEvent776.label,
        dangerEvent776Id: isDangerEvent776.ID,
        riskManagement: isRiskManagement.label,
        riskManagementID: isRiskManagement.ID,
        standart: selectedTipeSIZ.standart,
        OperatingLevel: selectedTipeSIZ.OperatingLevel,
        periodicity: inputValue.periodicity,
        additionalMeans: selectedTipeSIZ.additionalMeans,
        AdditionalIssuanceRate: selectedTipeSIZ.AdditionalIssuanceRate,
      });
    } else {
      setValue({
        ...inputValue,
        proff: isProff.label,
        proffId: isProff.profId,
        danger: isDangerGroup.label,
        dangerID: isDangerGroup.dangerID,
        dangerGroup: isDanger.label,
        dangerGroupId: isDanger.groupId,
        dangerEvent: isDangerEvent.label,
        dangerEventID: isDangerEvent.groupId,
        ipr: ipr,
        riskAttitude: riskAttitude,
        risk: risk,
        acceptability: acceptability,
        probability1: inputValue.probability1,
        heaviness1: inputValue.heaviness1,
        ipr1: ipr1,
        riskAttitude1: riskAttitude1,
        risk1: risk1,
        acceptability1: acceptability1,
        typeSIZ: selectedTipeSIZ.label,
        speciesSIZ: selectedTipeSIZ.speciesSIZ,
        issuanceRate: selectedTipeSIZ.issuanceRate,
        commit: inputValue.commit,
        proffSIZ: isProff.SIZ,
        danger776: isDanger776.label,
        danger776Id: isDanger776.ID,
        dangerEvent776: isDangerEvent776.label,
        dangerEvent776Id: isDangerEvent776.ID,
        riskManagement: isRiskManagement.label,
        riskManagementID: isRiskManagement.ID,
        standart: selectedTipeSIZ.standart,
        OperatingLevel: selectedTipeSIZ.OperatingLevel,
        periodicity: inputValue.periodicity,
      });
    }
  }, [
    acceptability,
    acceptability1,
    checkboxSiz,
    inputValue,
    ipr,
    ipr1,
    isDanger,
    isDanger776,
    isDangerEvent,
    isDangerEvent776,
    isDangerGroup,
    isProff,
    isRiskManagement,
    risk,
    risk1,
    riskAttitude,
    riskAttitude1,
    selectedTipeSIZ,
  ]);

  const resDangerGroup = danger.filter(
    (item) => isDangerGroup.label === item.dependence
  );

  const resDangerEvent = dangerEvent.filter(
    (item) => isDanger.label === item.dependence
  );

  const resTypeSiz = typeSiz.filter(
    (item) => isDangerEvent.groupId === item.dependence
  );

  const resDangerEvent776 = dangerEvent776.filter(
    (item) => isDanger776.label === item.dependence
  );

  const resRiskManagemet = riskManagement.filter(
    (item) => isDangerEvent776.label === item.dependence
  );

  // const handleFilter = (arr1, arr2) => {
  //   return arr1.filter((item) => arr2.label === item.dependence);
  // };

  // const handlerSorted = (arr1, arr2) => {
  //   const filter = arr1.filter((item) => arr2.label === item.dependence);
  //   filter.sort(function (a, b) {
  //     var nameA = a.label.toLowerCase(),
  //       nameB = b.label.toLowerCase();
  //     if (nameA < nameB)
  //       //сортируем строки по возрастанию
  //       return -1;
  //     if (nameA > nameB) return 1;

  //     return 0; // Никакой сортировки
  //   });
  // };

  // сортировка значений по алфавиту
  const sortedDanger776 = danget776.sort(function (a, b) {
    var nameA = a.label.toLowerCase(),
      nameB = b.label.toLowerCase();
    if (nameA < nameB)
      //сортируем строки по возрастанию
      return -1;
    if (nameA > nameB) return 1;
    return 0; // Никакой сортировки
  });

  const sortedDangerEvent776 = resDangerEvent776.sort(function (a, b) {
    var nameA = a.label.toLowerCase(),
      nameB = b.label.toLowerCase();
    if (nameA < nameB)
      //сортируем строки по возрастанию
      return -1;
    if (nameA > nameB) return 1;
    return 0; // Никакой сортировки
  });

  const sortedRiskManagemet = resRiskManagemet.sort(function (a, b) {
    var nameA = a.label.toLowerCase(),
      nameB = b.label.toLowerCase();
    if (nameA < nameB)
      //сортируем строки по возрастанию
      return -1;
    if (nameA > nameB) return 1;
    return 0; // Никакой сортировки
  });

  const sortedDangerGroup = resDangerGroup.sort(function (a, b) {
    var nameA = a.label.toLowerCase(),
      nameB = b.label.toLowerCase();
    if (nameA < nameB)
      //сортируем строки по возрастанию
      return -1;
    if (nameA > nameB) return 1;
    return 0; // Никакой сортировки
  });

  const sortedDangerEvent = resDangerEvent.sort(function (a, b) {
    var nameA = a.label.toLowerCase(),
      nameB = b.label.toLowerCase();
    if (nameA < nameB)
      //сортируем строки по возрастанию
      return -1;
    if (nameA > nameB) return 1;
    return 0; // Никакой сортировки
  });

  const input = JSON.parse(localStorage.getItem('input'));

  const handleCopyData = () => {
    if (localStorage.getItem('input') || localStorage.getItem('proff')) {
      setProff(JSON.parse(localStorage.getItem('proff')));
      setInputValue({
        job: input.job,
        obj: input.obj,
        source: input.source,
        subdivision: input.subdivision,
      });
    }
  };

  const handleCopyOPR = () => {
    if (localStorage.getItem('Danger') || localStorage.getItem('Danger776')) {
      setDangerGroup(JSON.parse(localStorage.getItem('DangerGroup')));
      setisDanger(JSON.parse(localStorage.getItem('Danger')));
      setDangerEvent(JSON.parse(localStorage.getItem('DangerEvent')));
      setDangerEvent776(JSON.parse(localStorage.getItem('DangerEvent776')));
      setDanger776(JSON.parse(localStorage.getItem('Danger776')));
    }
  };

  //console.log(value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setCount(count + 1);
    value['number'] = count + 1;
    if (!requiredSIZ) {
      delete value.proffSIZ;
      setFormValue([...formValue, value]);
    } else {
      setFormValue([...formValue, value]);
    }
    if (!listObj.includes(obj)) {
      setListObj([...listObj, obj]);
    }
    if (!listSource.includes(source)) {
      setListSource([...listSource, source]);
    }
    localStorage.setItem('proff', JSON.stringify(isProff));
    localStorage.setItem('input', JSON.stringify(inputValue));
    localStorage.setItem('Danger776', JSON.stringify(isDanger776));
    localStorage.setItem('DangerEvent776', JSON.stringify(isDangerEvent776));
    localStorage.setItem('Danger', JSON.stringify(isDanger));
    localStorage.setItem('DangerEvent', JSON.stringify(isDangerEvent));
    localStorage.setItem('DangerGroup', JSON.stringify(isDangerGroup));
    clear();
  };
  const [additionalMeans, setAdditionalMeans] = useState(false);
  useEffect(() => {
    if (
      typeof selectedTipeSIZ.additionalMeans === 'undefined' ||
      selectedTipeSIZ.additionalMeans.length < 1
    ) {
      setAdditionalMeans(false);
    } else {
      setAdditionalMeans(true);
    }
  }, [selectedTipeSIZ]);

  const clear = () => {
    setDanger776({});
    setDangerEvent776({});
    setDangerEvent('');
    setDangerGroup('');
    setisDanger('');
    setProff('');
    setRisk(ERROR);
    setAcceptability(ERROR);
    setRiskAttitude(ERROR);
    setRisk1(ERROR);
    setAcceptability1(ERROR);
    setRiskAttitude1(ERROR);
    setSelectedTipeSIZ('');
    setObj('');
    setSource('');
    setRequiredSIZ(false);
    setIpr(0);
    setIpr1(0);
    setInputValue({
      probability: '',
      heaviness: '',
      probability1: '',
      heaviness1: '',
      periodicity: '',
      responsiblePerson: '',
      completionMark: '',
      existingRiskManagement: '',
    });
    setCheckboxSIZ(false);
    setRiskManagement('');
    document.querySelector('.form').reset();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    conversion.forEach((item) => {
      if (
        value.danger776 === item.Danger776 &&
        value.dangerEvent776 === item.dangerEvent776
      ) {
        setisDanger({ groupId: item.IdDanger767, label: item.danger767 });
        setDangerEvent({
          groupId: item.IdDangerEvent767,
          label: item.dangerEvent767,
        });
      }
    });
  }, [value.danger776, value.dangerEvent776]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit} required>
        <div className='form__header left'>
          <h1 className='form__header-title'>Данные о предприятии</h1>
        </div>
        <div className='form__header center'>
          <h1 className='form__header-title'>ОПР</h1>
        </div>
        <div className='form__header right'>
          <h1 className='form__header-title'>Меры управления</h1>
        </div>
        <section className='section profess'>
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
          </label>
          <label className='label'>
            Объект:
            <input
              className='form__input standart'
              autoComplete='on'
              onChange={handleChange}
              list='obj'
              name='obj'
              value={inputValue.obj}
            ></input>
            <datalist id='obj'>
              {listObj.map((item) => (
                <option>{item}</option>
              ))}
            </datalist>
          </label>
          <label className='label'>
            Источник:
            <input
              className='form__input standart'
              autoComplete='on'
              onChange={handleChange}
              list='source'
              name='source'
              value={inputValue.source}
            ></input>
            <datalist id='source'>
              {listSource.map((item) => (
                <option>{item}</option>
              ))}
            </datalist>
          </label>
          <label className='label'>
            Должность отсутствует:
            <input
              className='form__input standart'
              name='job'
              onChange={handleChange}
              value={inputValue.job}
            />
          </label>
          <label className='label'>
            Подразделение:
            <input
              className='form__input standart'
              name='subdivision'
              onChange={handleChange}
              value={inputValue.subdivision}
            />
          </label>

          <button
            className='button copy'
            type='button'
            onClick={handleCopyData}
          >
            Копия
          </button>
        </section>
        <section className='section orders opr'>
          <div className='spoiler-wrapper'>
            <SpoilerBox
              title={'Приказ 776'}
              stateSpoileBox={isOrder776}
              toggleSpoileBox={setOrder776}
            >
              <label className='invisible'></label>
              <label className='label order-input'>
                Опасности:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={sortedDanger776}
                  onChange={(evt) => setDanger776(evt)}
                  placeholder={'Опасности'}
                  value={isDanger776}
                />
              </label>
              <label className='label order-input'>
                Опасное событие:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={sortedDangerEvent776}
                  onChange={(evt) => setDangerEvent776(evt)}
                  placeholder={'Опасное событие'}
                  value={isDangerEvent776}
                />
              </label>
              <label className='label'>
                Существующие меры управления:
                <input
                  name='existingRiskManagement'
                  className='form__input standart'
                  onChange={handleChange}
                ></input>
              </label>
            </SpoilerBox>
            <div className='line'></div>
            <SpoilerBox
              title={'Приказ 767'}
              stateSpoileBox={isOrder767}
              toggleSpoileBox={setOrder767}
            >
              <label className='label order-input'>
                Группа опасности:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={dangerGroup}
                  onChange={(name) => setDangerGroup(name)}
                  placeholder={'Группа опасности'}
                  value={isDangerGroup}
                />
              </label>
              <label className='label order-input'>
                Опасности:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={sortedDangerGroup}
                  onChange={(evt) => setisDanger(evt)}
                  placeholder={'Опасности'}
                  value={isDanger}
                />
              </label>
              <label className='label order-input'>
                Опасное событие:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={sortedDangerEvent}
                  onChange={(evt) => setDangerEvent(evt)}
                  placeholder={'Опасное событие'}
                  value={isDangerEvent}
                />
              </label>
            </SpoilerBox>
          </div>
          <button className='button copy' type='button' onClick={handleCopyOPR}>
            Копия
          </button>
        </section>
        <section className='section orders measures'>
          <div className='spoiler-wrapper'>
            <SpoilerBox
              title={'Приказ 776'}
              stateSpoileBox={isOrder776}
              toggleSpoileBox={setOrder776}
            >
              <label className='label order-input'>
                Меры управления:
                <Select
                  className='react-select-container order'
                  classNamePrefix='react-select'
                  options={sortedRiskManagemet}
                  onChange={(evt) => setRiskManagement(evt)}
                  placeholder={'Меры управления'}
                  value={isRiskManagement}
                />
              </label>
            </SpoilerBox>
            <div className='line'></div>
            <SpoilerBox
              title={'Приказ 767'}
              stateSpoileBox={isOrder767}
              toggleSpoileBox={setOrder767}
            >
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
                <label className='checkbox__label'>
                  <input
                    type='checkbox'
                    name='siz'
                    className='form__checkbox visually-hidden'
                    onClick={(evt) => setRequiredSIZ(evt.target.checked)}
                  />
                  <span className='form__pseudo-checkbox'></span>
                  <span className='checkbox__label-text'>Обязательные СИЗ</span>
                </label>
                <label
                  htmlFor='additional-means'
                  className={
                    additionalMeans
                      ? 'checkbox__label'
                      : 'checkbox__label disabled'
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
                  <span className='checkbox__label-text'>
                    Доп. средства защиты
                  </span>
                </label>
              </label>
            </SpoilerBox>
          </div>
        </section>
        <section className='section buttons'>
          <button
            className='button button__table'
            type='button'
            onClick={() => baseTable(formValue)}
          >
            Базовая таблица
          </button>
          <button
            className='button button__table'
            type='button'
            onClick={() => ListHazards(formValue)}
          >
            Реестр опасностей
          </button>
          <button
            className='button button__table'
            type='button'
            onClick={() => mapOPR(formValue)}
          >
            Карты опасностей
          </button>
          <button className='button button__table' type='button'>
            Меры управления без СИЗ
          </button>
          <button
            className='button button__table'
            type='button'
            onClick={() => normSiz(formValue)}
          >
            Нормы выдачи СИЗ
          </button>
          <p className='total'>всего записей: {count}</p>
          <div className='line-horiz'></div>
        </section>
        <section className='risk risk-opr'>
          <div className='risk__labels'>
            <label className='label box'>
              Тяжесть:
              <input
                name='heaviness'
                type='number'
                className='form__input input'
                onChange={handleChange}
                value={inputValue.heaviness}
              ></input>
            </label>
            <label className='label box'>
              Вероятность:
              <input
                name='probability'
                type='number'
                className='form__input input'
                onChange={handleChange}
                value={inputValue.probability}
              ></input>
            </label>
            <label className='label box'>
              ИПР:
              <span className='form__input input ipr'>{ipr}</span>
            </label>
            <span className=' label risk__attitude'>Отношение к риску:</span>
            <span className='risk__attitude-text'>{riskAttitude}</span>

            <label className='label box comments'>
              Комментарии:
              <input
                name='commit'
                type='text'
                className='form__input input'
                onChange={handleChange}
                value={inputValue.commit}
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
          </div>
        </section>
        <section className='plan'>
          <h2 className='plan__title'>План-график</h2>
          <div className='plan__container'>
            <label className='label'>
              Ответственное лицо
              <input
                name='responsiblePerson'
                className='form__input plan-input'
                onChange={handleChange}
                placeholder='Ответственное лицо'
              ></input>
            </label>
            <label className='label'>
              Периодичность
              <input
                name='periodicity'
                className='form__input plan-input'
                onChange={handleChange}
                placeholder='Периодичность'
              ></input>
            </label>
            <label className='label'>
              Отметка о выполнении
              <input
                name='completionMark'
                className='form__input plan-input'
                onChange={handleChange}
                placeholder='Отметка о выполнении'
              ></input>
            </label>
          </div>
        </section>
        <section className='risk risk-measures'>
          <div className='risk__labels'>
            <label className='label box'>
              Тяжесть1:
              <input
                name='heaviness1'
                type='number'
                className='form__input input'
                onChange={handleChange}
                value={inputValue.heaviness1}
              ></input>
            </label>
            <label className='label box'>
              Вероятность1:
              <input
                name='probability1'
                type='number'
                className='form__input input'
                onChange={handleChange}
                value={inputValue.probability1}
              ></input>
            </label>
            <label className='label box'>
              ИПР1:
              <span className='form__input input ipr'>{ipr1}</span>
            </label>
            <span className=' label risk__attitude'>Отношение к риску:</span>
            <span className='risk__attitude-text'>{riskAttitude1}</span>
          </div>
        </section>
      </form>
    </>
  );
}

export default Form;
