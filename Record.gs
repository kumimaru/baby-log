//// 初期値：行番号
//const INITIAL_ROW = 1;
//// 初期値：列番号
//const INITIAL_COLUM = 1;

// スプレッドシートに寝た日時・起きた日時をセット
function addDate() {
  var sheet = SpreadsheetApp.getActiveSheet();  
  var sheet_nama = sheet.getActiveCell();
  Logger.log("行数：" + sheet_nama);
  
  // 最終行を取得
  var lastRow = sheet.getLastRow();
  Logger.log("行数：" + lastRow);
  // 最終列を取得
  var lastColum = sheet.getLastColumn();
  Logger.log("列数：" + lastColum);
  // 最新更新日付をセット ※初回入力の場合は固定値をセットする
  if(lastRow<=0 || lastColum <= 0){
    sheet.getRange(1, 1).setValue(new Date());
    return;
  }
  // 最新更新日付をセット 
  sheet.getRange(lastRow, 1).setValue(new Date());
  Logger.log(new Date());
}
