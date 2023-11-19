import dangerGroup from '../../untils/dangerGroup';
import danger from '../../untils/danger';
import prof from '../../untils/prof';
import dangerEvent from '../../untils/dangerousEvent';
import Select from 'react-select';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { useEffect, useState } from 'react';
import typeSiz from '../../untils/typeSIZ';
import danget776 from '../../untils/danger775';
import dangerEvent776 from '../../untils/dangerEvent776';
import riskManagement from '../../untils/riskManagement';
import conversion from '../../untils/converct';
import './Form.css';
import SpoilerBox from '../SpoilerBox/SpoilerBox';

function Form({ setModal, setModalChild, job, setJob, listJob }) {
  const [isDangerGroup, setDangerGroup] = useState([]);
  const [isDanger, setisDanger] = useState([]);
  const [isDanger776, setDanger776] = useState([]);
  const [isDangerEvent776, setDangerEvent776] = useState({});
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
  const [isRiskManagement, setRiskManagement] = useState([]);
  const [count, setCount] = useState(0);
  const [subdivision, setSubdivision] = useState(false);

  const number767 = 767;
  const number776 = 776;

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

  //console.log(value);
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
        AdditionalIssuanceRate: selectedTipeSIZ.AdditionalIssuanceRate,
        standart: selectedTipeSIZ.standart,
        OperatingLevel: selectedTipeSIZ.OperatingLevel,
        job: job.job,
        commit: commit,
        proffSIZ: isProff.SIZ,
        danger776: isDanger776.label,
        danger776Id: isDanger776.ID,
        dangerEvent776: isDangerEvent776.label,
        dangerEvent776Id: isDangerEvent776.ID,
        riskManagement: isRiskManagement.label,
        riskManagementID: isRiskManagement.ID,
        subdivision: job.subdivision,
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
        danger776: isDanger776.label,
        danger776Id: isDanger776.ID,
        dangerEvent776: isDangerEvent776.label,
        dangerEvent776Id: isDangerEvent776.ID,
        riskManagement: isRiskManagement.label,
        riskManagementID: isRiskManagement.ID,
        subdivision: job.subdivision,
        standart: selectedTipeSIZ.standart,
        OperatingLevel: selectedTipeSIZ.OperatingLevel,
      });
    }
  }, [
    isDangerEvent776,
    isDanger776,
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
    isRiskManagement,
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
  console.log(value);
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
    clear();
  };
  const [additionalMeans, setAdditionalMeans] = useState(false);
  console.table(selectedTipeSIZ.additionalMeans);
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

  var FileSaver = require('file-saver');
  const table = () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('sheet');

    sheet.columns = [
      { header: '№ п/п', key: 'number', width: 9 },
      { header: 'Код профессии (при наличии)', key: 'proffId', width: 20 },
      { header: 'Профессия', key: 'proff', width: 20 },
      { header: 'Должность', key: 'job', width: 20 },
      { header: 'Подразделение', key: 'subdivision', width: 20 },
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
      { header: 'Вид СИЗ', key: 'speciesSIZ', width: 40 },
      {
        header:
          'Нормы выдачи средств индивидуальной защиты на год (штуки, пары, комплекты, мл)',
        key: 'issuanceRate',
        width: 20,
      },
      { header: 'ДОП средства', key: 'additionalMeans', width: 20 },
      {
        header:
          'Нормы выдачи средств индивидуальной защиты, выдаваемых дополнительно, на год (штуки, пары, комплекты, мл)',
        key: 'AdditionalIssuanceRate',
        width: 20,
      },
      { header: 'Стандарты (ГОСТ, EN)', key: 'standart', width: 20 },
      { header: 'Экспл.уровень', key: 'OperatingLevel', width: 20 },
      { header: 'Комментарий', key: 'commit', width: 20 },
      { header: 'ID опасности 776н', key: 'danger776Id', width: 20 },
      { header: 'Опасности 776н', key: 'danger776', width: 20 },
      {
        header: 'ID опасного события 776н',
        key: 'dangerEvent776Id',
        width: 20,
      },
      { header: 'Опасное событие 776н', key: 'dangerEvent776', width: 20 },
      { header: 'ID мер управления', key: 'riskManagementID', width: 20 },
      {
        header: 'Меры управления/контроля профессиональных рисков',
        key: 'riskManagement',
        width: 20,
      },
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

  const tableReport = () => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('sheet');
    const border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    sheet.columns = [
      {
        header: '1',
        key: 'number',
      },
      { header: '2', key: 'risk' },
      { header: '3', key: 'typeSIZ' },
      { header: '4', key: 'risk' },
      { header: '5', key: 'risk' },
      { header: '6', key: 'risk' },
      { header: '7', key: 'risk' },
      { header: '8', key: 'risk' },
      { header: '9', key: 'risk' },
      { header: '10', key: 'risk' },
    ];
    formValue.forEach((item) => {
      sheet.addRow(item);
    });

    let i = 0;
    while (i < 10) {
      console.log(i);
      sheet.insertRow(1);
      i++;
    }

    const font = { bold: true, name: 'Times New Roman', size: 11 };
    const alignment = { horizontal: 'right' };
    const color = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF2CD' },
    };

    const cell1 = sheet.getCell('J1');
    const cell2 = sheet.getCell('J2');
    const cell3 = sheet.getCell('J3');
    const cell5 = sheet.getCell('A5');
    const cell7 = sheet.getCell('A7');
    const cellA10 = sheet.getCell('A10');
    const cellB10 = sheet.getCell('B10');
    const cellC10 = sheet.getCell('C10');
    const cellD10 = sheet.getCell('D10');
    const cellE10 = sheet.getCell('E10');
    const cellF10 = sheet.getCell('F10');
    const cellG10 = sheet.getCell('G10');
    const cellH10 = sheet.getCell('H10');
    const cellI10 = sheet.getCell('I10');
    const cellJ10 = sheet.getCell('J10');

    sheet.mergeCells('F2', 'J2');
    sheet.mergeCells('H1', 'J1');
    sheet.mergeCells('H3', 'J3');
    sheet.mergeCells('A5', 'J5');

    cell1.font = font;
    cell2.font = font;
    cell3.font = font;
    cell5.font = font;
    cell7.font = {
      bold: true,
      name: 'Times New Roman',
      size: 12,
      underline: true,
    };
    sheet.getRow(10).font = { name: 'Times New Roman', size: 9, bold: true };

    cell1.alignment = alignment;
    cell2.alignment = alignment;
    cell3.alignment = alignment;
    cell5.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: 'true',
    };
    sheet.getRow(10).alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: 'true',
    };
    // заливка фона ячеек
    cellA10.fill = color;
    cellB10.fill = color;
    cellC10.fill = color;
    cellD10.fill = color;
    cellE10.fill = color;
    cellF10.fill = color;
    cellG10.fill = color;
    cellH10.fill = color;
    cellI10.fill = color;
    cellJ10.fill = color;
    // рамка таблици
    cellA10.border = border;
    cellB10.border = border;
    cellC10.border = border;
    cellD10.border = border;
    cellE10.border = border;
    cellF10.border = border;
    cellG10.border = border;
    cellH10.border = border;
    cellI10.border = border;
    cellJ10.border = border;

    sheet.getRow(11).alignment = {
      horizontal: 'center',
    };

    sheet.getRow(5).height = 84;
    sheet.getRow(10).height = 208;
    sheet.getColumn(1).width = 4.85;
    sheet.getColumn(2).width = 13;
    sheet.getColumn(3).width = 11.57;
    sheet.getColumn(4).width = 31.14;
    sheet.getColumn(5).width = 11.57;
    sheet.getColumn(6).width = 13.49;
    sheet.getColumn(7).width = 7;
    sheet.getColumn(8).width = 17.14;
    sheet.getColumn(9).width = 7;
    sheet.getColumn(10).width = 19.14;

    cell1.value = 'УТВЕРЖДАЮ:';
    cell2.value = 'Руководитель ___________ (подпись, инициалы, фамилия)';
    cell3.value = '«____» _____________ 20___г';
    cell5.value =
      '"Нормы выдачи средств индивидуальной защиты (далее — СИЗ) в __________________ (наименование подразделения, организации) в соответствии с требованиями приказов Минтруда от 29 октября 2021 г. №767н «Об утверждении единых типовых норм (далее – ЕТН) выдачи СИЗ и смывающих средств», №766н «Об утверждении правил обеспечения работников средствами индивидуальной защиты и смывающими средствами» (далее - приказ №766н)"';
    cell7.value = 'Раздел 1. НОРМЫ ВЫДАЧИ СРЕДСТВ ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ';
    cellA10.value = '№ пп';
    cellB10.value = 'Наименование профессии/ должности, подразделения';
    cellC10.value = 'Тип СИЗ';
    cellD10.value =
      'Наименование СИЗ (с указанием конкретных данных о конструкции, о классе защиты, категориях эффективности и/или  эксплуатационных уровнях)';
    cellE10.value =
      'Нормы выдачи СИЗ с указанием периодичности выдачи, количества выдачи на период (штуки, пары, комплекты, мл)';
    cellF10.value = 'Основание выдачи СИЗ (пункты ЕТН, ПОТ и иных документов)';
    cellG10.value = '№ опасности из Приложения №2 к ЕТН';
    cellH10.value =
      'Опасности, представляющие угрозу жизни и здоровью работников, а также факторы окружающей среды или трудового процесса, способные привести к травме или профессиональному заболеванию';
    cellI10.value = '№ опасного события из Приложения №2 к ЕТН';
    cellJ10.value =
      'Опасные события, представляющие угрозу жизни и здоровью работников';

    const row = sheet.lastRow;
    const lastRow = row._number + 3;
    console.log(lastRow);
    const lastCell = sheet.getCell('A' + lastRow);
    lastCell.value =
      'Ответственное лицо __________________ (подпись, фамилия, инициалы)';
    let l = 11;
    while (l < lastRow - 2) {
      sheet.getCell('A' + l).border = border;
      sheet.getCell('B' + l).border = border;
      sheet.getCell('C' + l).border = border;
      sheet.getCell('D' + l).border = border;
      sheet.getCell('E' + l).border = border;
      sheet.getCell('F' + l).border = border;
      sheet.getCell('G' + l).border = border;
      sheet.getCell('H' + l).border = border;
      sheet.getCell('I' + l).border = border;
      sheet.getCell('J' + l).border = border;
      l++;
    }
    return workbook.xlsx
      .writeBuffer()
      .then((buffer) =>
        FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
      )
      .catch((err) => console.log('Error writing excel export', err));
  };

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
    setSelectedTipeSIZ('');
    setObj('');
    setSource('');
    setJob('');
    setCommit('');
    setRequiredSIZ(false);
    setIpr(0);
    setInputValue({ probability: '', heaviness: '' });
    setCheckboxSIZ(false);
    setRiskManagement('');
    document.querySelector('.form').reset();
    setSubdivision(false);
  };

  function hendleOpenModal() {
    setModal(true);
    setModalChild('Профессия');
  }

  // useEffect(() => {
  //   api.getDangers().then(t=>console.log(t))
  //   console.log(danger)
  //   //danger.map(item=>api.createDangers(item).then(i=>console.log(i)).catch(err=>console.log(err)))
  // }, []);

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

    // const table = {};
    // const res = dangerEvent776.filter(({ label }) => !table[label] && (table[label] = 1));
    // console.log(res);
  }, [value.danger776, value.dangerEvent776]);

  useEffect(() => {
    // danger.forEach(item=>item.label = item.label + ` id: ${item.groupId}`)
    // console.log(danger)
  }, []);

  useEffect(() => {
    if (subdivision) {
      setModal(true);
      setModalChild('подразделение');
    }
  }, [setModal, setModalChild, subdivision]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit} required>
        <span>Кол-во записей: {count}</span>
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
          </label>
          <div className='label__checkbox'>
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
              <span className='checkbox__label-text'>Обязательные СИЗ</span>
            </label>
            <label className='checkbox__label'>
              <input
                type='checkbox'
                name='siz'
                className='form__checkbox visually-hidden'
                onChange={(evt) => setSubdivision(evt.target.checked)}
                checked={subdivision}
              />
              <span className='form__pseudo-checkbox'></span>
              <span className='checkbox__label-text'>Подразделение</span>
            </label>
          </div>

          <SpoilerBox number={number767}>
            <label className='label'>
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
            <label className='label'>
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
            <label className='label'>
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

          <SpoilerBox number={number776}>
            <label className='label'>
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
            <label className='label'>
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
              Меры упр-я/контроля проф. рисков
              <Select
                className='react-select-container order'
                classNamePrefix='react-select'
                options={sortedRiskManagemet}
                onChange={(evt) => setRiskManagement(evt)}
                placeholder={'Меры управления/контроля'}
                value={isRiskManagement}
              />
            </label>
          </SpoilerBox>

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
            <label
              htmlFor='additional-means'
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
            Комментарий:
            <input
              className='form__input standart'
              onChange={(evt) => setCommit(evt.target.value)}
            ></input>
          </label>
          <div className='label-wrapper'>
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
          </div>
        </div>
        <div className='form__container'>
          <div className='wrapper'>
            <span className='wrapper_text'>ИПР: {ipr}</span>
            <span className='wrapper_text'>Уровень риска: {risk}</span>
            <span className='wrapper_text'>Приемлемость: {acceptability}</span>
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
          <input type='reset' className='button reset' onClick={clear}></input>
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
      <button onClick={tableReport} className='button button__table'>
        Выгрузить в форму
      </button>
    </>
  );
}

export default Form;
