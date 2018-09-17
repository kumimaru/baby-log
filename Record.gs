// スプレッドシートに寝た日時・起きた日時をセット
function addDate() {
  var sheet = SpreadsheetApp.getActiveSheet();  
  
  // 最終行を取得
  var lastRow = sheet.getLastRow();
  // 最新更新日付をセット 
  sheet.getRange(lastRow, 1).setValue(new Date());
  sheet.getRange(lastRow, 1).setNumberFormat("yyyy/mm/dd HH:mm:ss")
  
  // 寝た時間の最終行の情報を取得
  var p_bed_time_row = sheet.getRange("C:C").getValues();
  Logger.log("寝た時間の最終行の行:" + p_bed_time_row);
  var p_bed_time_row_num = p_bed_time_row.filter(String).length;
  Logger.log("寝た時間の最終行の行数:" + p_bed_time_row_num);
  
  // 起きた時間の最終行の情報を取得
  var p_wake_up_time_row = sheet.getRange("B:B").getValues();
  Logger.log("起きた時間の最終行の行:" + p_wake_up_time_row);
  var p_wake_up_time_row_num = p_wake_up_time_row.filter(String).length;
  Logger.log("起きた時間の最終行の行数:" + p_wake_up_time_row_num);
  
  // 登録した日付をカレンダーにセットする
  createSleepCalendar(p_bed_time_row_num, p_wake_up_time_row_num);
}

// 起きた時間をカレンダーに追加
function createSleepCalendar(x_bed_time_row_num, x_wake_up_time_row_num) {
  
  Logger.log("寝た時間の最終行の行数:" + x_bed_time_row_num);
  Logger.log("起きた時間の最終行の行数:" + x_wake_up_time_row_num);
  
  // 設定するシートを取得
  var p_sheet = SpreadsheetApp.getActiveSheet();  
  
  // 最終行がおは であれば 光ちゃん、おは のカレンダーを作成する。このとき睡眠時間を作成する。
  // 最終行がすや であれば 光ちゃん、すやあ のカレンダーを作成する。このとき睡眠時間は作成しない。
  // カレンダー名を取得
  var p_calendar_nm;
  // すやあの時間を取得
  var p_bed_time = p_sheet.getRange(x_bed_time_row_num, 1).getValue();

  // おはの値がなければカレンダー名はすやあとする。あればおは。
  
  if(p_sheet.getRange(x_wake_up_time_row_num, 1).isBlank()) {
    // カレンダー名を取得
    var p_calendar_nm = "光ちゃん、すやあ";
    // カレンダーを作成する
    createEvent(p_calendar_nm, p_bed_time, null, null);

  } else {
    // カレンダー名を取得
    var p_calendar_nm = "光ちゃん、おはあ";
    // おはあの時間を取得
    var p_wake_up_time = p_sheet.getRange(x_wake_up_time_row_num, 1).getValue();
    // 睡眠時間を取得
    var p_sleeping_time = p_bed_time - p_wake_up_time;
    // カレンダーを作成する
    createEvent(p_calendar_nm, p_bed_time, p_wake_up_time, p_sleeping_time);
  }  
}

// カレンダーに日付をセットする
function createEvent(x_calendar_nm, x_bed_time, x_wakeup_time, x_sleeping_time){
  Logger.log("カレンダー名:" + x_calendar_nm);

  var p_calendar = CalendarApp.getCalendarById("kumimaru11m.h@gmail.com");
  p_calendar.createEvent(x_calendar_nm, new Date(x_bed_time), new Date(x_wakeup_time) , {description: x_sleeping_time}); 
}