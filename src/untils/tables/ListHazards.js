import * as Excel from 'exceljs/dist/exceljs.min.js';
var FileSaver = require('file-saver');
const ListHazards = (arr) => {
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('sheet');

  const cellA16 = sheet.getCell('A16');
  const cellB16 = sheet.getCell('B16');
  const cellC16 = sheet.getCell('C16');
  const cellD16 = sheet.getCell('D16');
  const cellE16 = sheet.getCell('E16');

  const border = {
    border: {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' },
    },
    alignment: {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: 'true',
    },
    font: {
      size: 8,
      bold: true,
      name: 'Arial',
    },
  };

  const textRotation = {
    border: {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' },
    },
    alignment: {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: 'true',
      textRotation: 'vertical',
    },
    font: {
      size: 8,
      bold: true,
      name: 'Arial',
    },
  };

  cellA16.style = border;
  cellC16.style = border;
  cellE16.style = border;

  cellB16.style = textRotation;
  cellD16.style = textRotation;

  cellA16.value = '№ п/п';
  cellB16.value = '№ опасности*';
  cellC16.value = 'Наименование опасности';
  cellD16.value = '№ опасного события*';
  cellE16.value = 'Наименование опасного события';

  sheet.getColumn(1).width = 6;
  sheet.getColumn(2).width = 8;
  sheet.getColumn(3).width = 20;
  sheet.getColumn(4).width = 8;
  sheet.getColumn(5).width = 20;
  const row = sheet.lastRow;
  let i = 17;
  let col = 6;
  let val = 17;
  let t = 6;
  const cellValue = [];

  // const arr = [
  //   { proff: 1, dangerEvent776Id: 1 },
  //   { proff: 'sada', dangerEvent776Id: 1 },
  //   { proff: 'asdasda', dangerEvent776Id: 1 },
  //   { proff: 2, dangerEvent776Id: 2 },
  //   { proff: 1, dangerEvent776Id: 1 },
  //   { proff: 2, dangerEvent776Id: 2 },
  //   { proff: 1, dangerEvent776Id: 1 },
  // ];

  const table = {};
  const table2 = {};
  const res = arr.filter(
    ({ dangerEvent776Id }) =>
      !table[dangerEvent776Id] && (table[dangerEvent776Id] = 1)
  );
  const resProff = arr.filter(
    ({ proff }) =>
      !table2[proff] && (table2[proff] = 1)
  );

  res.forEach((e) => {
    sheet.getCell('A' + i).value = e.number;
    sheet.getCell('B' + i).value = e.danger776Id;
    sheet.getCell('C' + i).value = e.danger776;
    sheet.getCell('D' + i).value = e.dangerEvent776Id;
    sheet.getCell('E' + i).value = e.dangerEvent776;

    sheet.getCell('A' + i).style = border;
    sheet.getCell('B' + i).style = border;
    sheet.getCell('C' + i).style = border;
    sheet.getCell('D' + i).style = border;
    sheet.getCell('E' + i).style = border;
    // const currentCell = sheet.getColumn(col).letter;
    // sheet.getCell(currentCell + 16).value = resProff.proff;
    //   sheet.getCell(currentCell + 16).style = border;
    //   sheet.getCell(currentCell + 16).width = 20;
    //   col++;

    // sheet.getRow(16).eachCell(function (cell) {
    //   cellValue.push(cell.value);
    // });

    // if (!cellValue.includes(e.proff)) {
    //   const currentCell = sheet.getColumn(col).letter;
    //   sheet.getCell(currentCell + 16).value = e.proff;
    //   sheet.getCell(currentCell + 16).style = border;
    //   sheet.getCell(currentCell + 16).width = 20;
    //   col++;
    // }

    // const currentCell1 = sheet.getColumn(t).letter;

    //   console.log(sheet.getCell(currentCell1 + i))
    //   if (sheet.getCell('D' + val).value === e.dangerEvent776Id) {
    //     sheet.getCell(currentCell1 + i).value = '+';
    //     //console.log(row._cells.length);
    // }

    // t++;
    i++;
    //val++;
  });

  resProff.forEach(e=>{
    const currentCell = sheet.getColumn(col).letter;
    sheet.getCell(currentCell + 16).value = e.proff;
      sheet.getCell(currentCell + 16).style = border;
      sheet.getCell(currentCell + 16).width = 20;
      col++;
  })

  // sheet.getRow(16).eachCell(function (cell) {
    
  //   const proffFilter = arr.filter((i)=> i.proff === cell.value)
  //   console.log(proffFilter)
  //   if(proffFilter>=0) {
  //     console.log(cell._column.letter)
  //     proffFilter.forEach(e=>{
  //       console.log(e.dangerEvent776Id)
  //       if(e.dangerEvent776Id === sheet.getCell('D' + val)) {
  //         console.log(cell)
  //         sheet.getCell(cell._column.letter + val).value = '+'
  //       }
  //       val++
  //     })
  //   }

  // });
  arr.forEach(e=>{
    sheet.getRow(16).eachCell(function (cell) {
      
      const proffFilter = arr.filter((i)=> i.proff === cell.value)
      console.log(proffFilter)
      proffFilter.forEach(e=>{
              if(e.dangerEvent776Id === sheet.getCell('D' + val).value) {
                sheet.getCell(cell._column.letter + val).value = '+'
                sheet.getCell(cell._column.letter + val).style = border;
              }
              
            })
    })
    val++
  })


  return workbook.xlsx
    .writeBuffer()
    .then((buffer) =>
      FileSaver.saveAs(
        new Blob([buffer]),
        `${Date.now()}_Реестр опасностей.xlsx`
      )
    )
    .catch((err) => console.log('Error writing excel export', err));
};

export default ListHazards;
