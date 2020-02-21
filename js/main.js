
//服务器地址
//var urlStr = 'http://47.111.239.249:9090/sa';
//本地地址
var urlStr = 'http://localhost:9090';

//系统关闭时间
var limitHour = 20;

var today = new Date();
var tomorrow = new Date((today / 1000 + 86400) * 1000);
var todayStr = date2str(today);
var tomorrowStr = date2str(tomorrow);

//日期字符串转换
function date2str(dd) {
	var str = dd.getFullYear();
	var month = dd.getMonth() + 1;
	if (month < 10) {
		str = str + '-0' + month;
	} else {
		str = str + '-' + month;
	}
	var day = dd.getDate();
	if (day < 10) {
		str = str + '-0' + day;
	} else {
		str = str + '-' + day;
	}
	return str;
}

function sleep(milliSeconds){
	    var startTime = new Date().getTime(); // get the current time    
	    while (new Date().getTime() < startTime + milliSeconds);
}

mui.init();