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
import mapOPR from '../../untils/tables/mapOPR';

function Form({ setModal, setModalChild, job, setJob, listJob }) {
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
  const [commit, setCommit] = useState('');
  const [inputValue, setInputValue] = useState({
    probability: '', //Вероятность
    heaviness: '', // Тяжесть
    probability1: '',
    heaviness1: '',
    periodicity: '', // Периодичность
    responsiblePerson: '', // Ответственное лицо
    completionMark: '', // Отметка о выполнении
    existingRiskManagement: '', // Существующие меры упр-я рисками
  });
  const [requiredSIZ, setRequiredSIZ] = useState(false);
  const ERROR = 'Ошибка';
  const [isRiskManagement, setRiskManagement] = useState([]);
  const [count, setCount] = useState(0);
  const [subdivision, setSubdivision] = useState(false);

  // состояние спойлер бокса
  const [isOrder767, setOrder767] = useState(true);
  const [isOrder776, setOrder776] = useState(true);
  const [isIPR, setIPR] = useState(true);

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
        probability1: inputValue.probability1,
        heaviness1: inputValue.heaviness1,
        ipr1: ipr1,
        riskAttitude1: riskAttitude1,
        risk1: risk1,
        acceptability1: acceptability1,
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
        periodicity: inputValue.periodicity,
        responsiblePerson: inputValue.responsiblePerson,
        completionMark: inputValue.completionMark,
        existingRiskManagement: inputValue.existingRiskManagement,
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
        probability1: inputValue.probability1,
        heaviness1: inputValue.heaviness1,
        ipr1: ipr1,
        riskAttitude1: riskAttitude1,
        risk1: risk1,
        acceptability1: acceptability1,
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
        periodicity: inputValue.periodicity,
        responsiblePerson: inputValue.responsiblePerson,
        completionMark: inputValue.completionMark,
        existingRiskManagement: inputValue.existingRiskManagement,
      });
    }
  }, [
    ipr1,
    riskAttitude1,
    risk1,
    acceptability1,
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

  const handleFilter = (arr1, arr2) => {
    console.log(arr1.filter((item) => arr2.label === item.dependence));
  };

  useEffect(() => {
    handleFilter(danger, isDangerGroup);
  }, [isDangerGroup]);

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
    if (!listObj.includes(obj)) {
      setListObj([...listObj, obj]);
    }
    if (!listSource.includes(source)) {
      setListSource([...listSource, source]);
    }
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
      { header: 'Тяжесть', key: 'heaviness1', width: 8 },
      { header: 'Вероятность', key: 'probability1', width: 12 },
      { header: 'ИПР', key: 'ipr1', width: 5 },
      { header: 'Уровень риска1', key: 'risk1', width: 20 },
      { header: 'Приемлемость1', key: 'acceptability1', width: 20 },
      { header: 'Отношение к риску1', key: 'riskAttitude1', width: 20 },
      {
        header: 'Существующие меры упр-я рисками',
        key: 'existingRiskManagement',
        width: 20,
      },
      { header: 'Периодичность', key: 'periodicity', width: 20 },
      { header: 'Ответственное лицо', key: 'responsiblePerson', width: 20 },
      { header: 'Отметка о выполнении', key: 'completionMark', width: 20 },
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
      { header: '2', key: 'reportProff' },
      { header: '3', key: 'typeSIZ' },
      { header: '4', key: 'nameSIZ' },
      { header: '5', key: 'issuanceRate' },
      { header: '6', key: 'repotEvt' },
      { header: '7', key: 'dangerGroupId' },
      { header: '8', key: 'dangerGroup' },
      { header: '9', key: 'dangerEventID' },
      { header: '10', key: 'dangerEvent' },
    ];
    formValue.forEach((item) => {
      item['reportProff'] = item.proff || item.job || item.subdivision;
      item['nameSIZ'] =
        item.typeSIZ + ' ' + item.standart + ' ' + item.OperatingLevel;
      item['repotEvt'] = item.dangerEventID + ', Приложения 2 Приказа 767н';
      console.log(item);
      sheet.addRow(item);
    });

    let i = 0;
    while (i < 10) {
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
    setRisk1(ERROR);
    setAcceptability1(ERROR);
    setRiskAttitude1(ERROR);
    setSelectedTipeSIZ('');
    setObj('');
    setSource('');
    setJob('');
    setCommit('');
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
    setSubdivision(false);
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

  useEffect(() => {
    if (subdivision) {
      setModal(true);
      setModalChild('подразделение');
    }
  }, [setModal, setModalChild, subdivision]);

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
            <label className='label'>
              Объект
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setObj(evt.target.value)}
                list='obj'
              ></input>
              <datalist id='obj'>
                {listObj.map((item) => (
                  <option>{item}</option>
                ))}
              </datalist>
            </label>
            <label className='label'>
              Источник
              <input
                className='form__input standart'
                autoComplete='on'
                onChange={(evt) => setSource(evt.target.value)}
                list='source'
              ></input>
              <datalist id='source'>
                {listSource.map((item) => (
                  <option>{item}</option>
                ))}
              </datalist>
            </label>
            <label className='label'>
              Должность отсутствует:
              <input className='form__input standart' />
            </label>
            <label className='label'>
              Подразделение:
              <input className='form__input standart' />
            </label>
          </div>
          <button className='button copy' type='button'>Копия</button>
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
          <button className='button copy' type='button'>Копия</button>
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
          <button className='button button__table' type='button'>
            Базовая таблица
          </button>
          <button className='button button__table' type='button'>
            Реестр опасностей
          </button>
          <button className='button button__table' type='button'>
            Карты опасностей
          </button>
          <button className='button button__table' type='button'>
            Меры управления без СИЗ
          </button>
          <button className='button button__table' type='button'>
            Нормы выдачи СИЗ
          </button>
          <p className='total'>всего записей: {count}</p>
          <div className='line-horiz'></div>
          {/*<button onClick={table} className='button button__table'>
            Выгрузить в таблицу
          </button>
          <button onClick={tableReport} className='button button__table'>
            Выгрузить в форму
          </button>
          <button onClick={mapOPR} className='button button__table'>
            Карта опасностей
          </button>*/}
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
              <input className='form__input input' type='text' value={ipr} />
            </label>
            <span className=' label risk__attitude'>Отношение к риску:</span>
            <span className='risk__attitude-text'>{riskAttitude}</span>
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
              <input className='form__input input' type='text' value={ipr1} />
            </label>
            <span className=' label risk__attitude'>Отношение к риску:</span>
            <span className='risk__attitude-text'>{riskAttitude}</span>
          </div>
        </section>

        {/*
        
<div className='form__container'>
            <div className='wrapper'>
              <span className='wrapper_text'>ИПР: {ipr}</span>
              <span className='wrapper_text'>Уровень риска: {risk}</span>
              <span className='wrapper_text'>
                Приемлемость: {acceptability}
              </span>
              
            </div>
          </div>


        <SpoilerBox
          title={'ИПР1'}
          stateSpoileBox={isIPR}
          toggleSpoileBox={setIPR}
        >
          
          <div className='form__container'>
            <div className='wrapper'>
              <span className='wrapper_text'>ИПР1: {ipr1}</span>
              <span className='wrapper_text'>Уровень риска1: {risk1}</span>
              <span className='wrapper_text'>
                Приемлемость1: {acceptability1}
              </span>
              <span className='wrapper_text'>
                Отношение к риску1: {riskAttitude1}
              </span>
            </div>
          </div>
        </SpoilerBox>

       
              */}
        {/* ---старые чек-боксы---
          
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
  </div>*/}
      </form>
    </>
  );
}

export default Form;
