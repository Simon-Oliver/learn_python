var app = SpreadsheetApp;
var spreadsheet = app.getActiveSpreadsheet();
var activeSheet = spreadsheet.getActiveSheet();

forecastQ2 = spreadsheet.getSheetByName('Forecast Q2');

vQ2 = forecastQ2.getRange('A1').getValue();

sheetNames = ['RJ', 'Sam'];

//---------------------------------------
moveFoward = (e) => {
  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#ffffff');

  var val = spreadsheet.getSheetByName(e).getRange(cell).getValue();
  var newRange = spreadsheet.getSheetByName(e).getRange(cell).offset(0, 1).getA1Notation();

  spreadsheet.getSheetByName(e).getRange('A1').setValue(newRange);

  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  //activeSheet.getRange("A3").setValue("="+ cell);
  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#00ff00');

  //prevCell.offset(0,1);
};

//---------------------------------------

moveBack = (e) => {
  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#ffffff');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#ffffff');

  var val = spreadsheet.getSheetByName(e).getRange(cell).getValue();
  var newRange = spreadsheet.getSheetByName(e).getRange(cell).offset(0, -1).getA1Notation();

  spreadsheet.getSheetByName(e).getRange('A1').setValue(newRange);

  cell = spreadsheet.getSheetByName(e).getRange('A1').getValue();

  //activeSheet.getRange("A3").setValue("="+ cell);
  spreadsheet.getSheetByName(e).getRange(cell).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(1, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(2, 0).setBackground('#00ff00');
  spreadsheet.getSheetByName(e).getRange(cell).offset(3, 0).setBackground('#00ff00');

  //prevCell.offset(0,1);
};

//------------------------------------------

forward = () => {
  sheetNames.forEach((name) => {
    moveFoward(name);
  });
};

back = () => {
  sheetNames.forEach((name) => {
    moveFoward(name);
  });
};

Logger.log(vQ2);
