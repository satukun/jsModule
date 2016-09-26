function postTime(){
    var time = "2016-09-20 06:12:45";
    var now = new Date();
    var diffTime = Math.ceil((now - new Date(time).getTime()) / 1000);
    var text = '';
    var d = new Date(new Date(time).getTime());
    var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
     num = "0" + num;
    }
 　  return num;
    };
    var yyyy = toDoubleDigits(d.getFullYear());
    var mm = toDoubleDigits(d.getMonth()+1);
    var dd = toDoubleDigits(d.getDate());
    var hh = toDoubleDigits(d.getHours());
    var mi = toDoubleDigits(d.getMinutes()); 
 
    if (diffTime < 60) { // 1 分未満
      text = diffTime +'秒';
    } else if (diffTime < 120) { // 2 分未満
      text = '1分前';
    } else if (diffTime < ( 60 * 60 )) { // 1 時間未満
      text = Math.floor(diffTime / 60) + '分前';
    } else if (diffTime < ( 24 * 60 * 60 )) { // 1 日未満
      text = Math.floor(diffTime / 3600) + '時間前';
    } else { // 1 週間未満
      var diffDate = Math.floor(diffTime / 86400);
      if (diffDate === 1) {
        text = "昨日 " + hh + ":" + mi;
      } else {
        text = yyyy + '年' + mm + '月' + dd + '日 ' + hh + ':' + mi;
      }
    }
    document.getElementById("days").innerText = text;
};
