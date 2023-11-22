import * as Excel from 'exceljs/dist/exceljs.min.js';
import log from './2 Перечень идентифицированных опасностей.xlsx';
var FileSaver = require('file-saver');
const mapOPR = async () => {
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('sheet');

  // Стили
  const borderBottom = {
    border: { bottom: { style: 'thin' } },
    alignment: { horizontal: 'center' },
  };

  // мердж ячеек
  sheet.mergeCells('D2', 'S2');
  sheet.mergeCells('D3', 'S3');
  sheet.mergeCells('H5', 'I5');
  sheet.mergeCells('J5', 'K5');
  sheet.mergeCells('M5', 'N5');
  sheet.mergeCells('I6', 'M6');
  // ячейки
  const row2 = sheet.getCell('D2');
  const row3 = sheet.getCell('D3');
  const cellJ5 = (sheet.getCell('J5').style = borderBottom);
  const cellK5 = (sheet.getCell('K5').style = borderBottom);
  const cellM5 = (sheet.getCell('M5').style = borderBottom);
  const cellN5 = (sheet.getCell('N5').style = borderBottom);
  const cellH5 = sheet.getCell('H5');
  const cellL5 = sheet.getCell('L5');
  const cellI6 = sheet.getCell('I6');

  // cellJ5.style = borderBottom;
  // cellK5.style = borderBottom;
  // cellM5.style = borderBottom;
  // cellN5.style = borderBottom;
  row2.border = { bottom: { style: 'thin' } };
  row3.alignment = { horizontal: 'center' };
  cellH5.alignment = { horizontal: 'center' };
  cellL5.alignment = { horizontal: 'center' };
  cellI6.alignment = { horizontal: 'center' };
  // Текст ячейки
  row3.value = '(полное наименование организации)';
  cellH5.value = 'Карта  №';
  cellL5.value = 'от'
  cellI6.value = 'оценки профессиональных рисков'
  cellI6.getStyle()
  return workbook.xlsx
    .writeBuffer()
    .then((buffer) =>
      FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
    )
    .catch((err) => console.log('Error writing excel export', err));
};

export default mapOPR;
