var app = SpreadsheetApp;
var spreadsheet = app.getActiveSpreadsheet();
var activeSheet = spreadsheet.getActiveSheet();

forecastQ2 = spreadsheet.getSheetByName('Forecast Q2');

vQ2 = forecastQ2.getRange('A1').getValue();

sheetNames = ['RJ', 'Bree', 'Dan', 'Nikesh', 'Jeff', 'Weldon', 'AM'];
currentForecCast = ['D', 'E', 'G', 'H'];
lasForeCast = ['F'];

move = (e, mode) => {
  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#ffffff');

  var val = spreadsheet.getSheetByName(e).getRange(cell).getValue();
  var newRange = spreadsheet.getSheetByName(e).getRange(cell).offset(0, mode).getA1Notation();
  var inFront = spreadsheet.getSheetByName(e).getRange(newRange).offset(0, -1).getA1Notation();

  spreadsheet.getSheetByName(e).getRange('A1').setValue(newRange);
  spreadsheet
    .getSheetByName('Forecast Q2')
    .getRange('A1')
    .setValue(newRange.toString().split('')[0]);
  spreadsheet
    .getSheetByName('Forecast Q2')
    .getRange('B1')
    .setValue(inFront.toString().split('')[0]);

  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  //activeSheet.getRange("A3").setValue("="+ cell);
  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#00ff00');

  //prevCell.offset(0,1);
};

//------------------------------------------

function changeFormula() {
  var val = spreadsheet.getSheetByName('Forecast Q2').getRange('D5').getFormula();
  var letter = spreadsheet.getSheetByName('Forecast Q2').getRange('A1').getValue();
  var newVal = val.replace(/\!(\w)/, '!' + letter);
  //spreadsheet.getSheetByName("Forecast Q2").getRange('D5').setValue();
  Logger.log(newVal);
}

//------------------------------------------

function logger() {
  var sheet = spreadsheet.getSheetByName('Forecast Q2');
  var dataRange = sheet.getRange('C1:H20');
  var letter = spreadsheet.getSheetByName('Forecast Q2').getRange('A1').getValue();
  var prev = spreadsheet.getSheetByName('Forecast Q2').getRange('B1').getValue();
  var values = dataRange.getDisplayValues();

  for (i = 0; i < values.length; i++) {
    for (j = 0; j < values[i].length; j++) {
      if (sheetNames.indexOf(values[i][j]) >= 0) {
        Logger.log(values[i][j], `D${i + 1}`);
        sheet.getRange(`D${i + 1}`).setValue(`=${values[i][j]}!${letter}4`);
        sheet.getRange(`E${i + 1}`).setValue(`=${values[i][j]}!${letter}5`);
        sheet.getRange(`F${i + 1}`).setValue(`=E${i + 1}-${values[i][j]}!${prev}5`);
        sheet.getRange(`G${i + 1}`).setValue(`=${values[i][j]}!${letter}6`);
        sheet.getRange(`H${i + 1}`).setValue(`=${values[i][j]}!${letter}7`);
      }
    }
  }
}

function forward() {
  sheetNames.forEach((name) => {
    move(name, 1);
  });
  logger();
}

function back() {
  sheetNames.forEach((name) => {
    move(name, -1);
  });
  logger();
}
