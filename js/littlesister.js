var artContent = document.getElementById("artContent");
var eleContent = document.getElementById("eleContent");
var infoContent = document.getElementById("infoContent");

function init_sister() {

	var artStr = '';
	var eleStr = '';
	var infoStr = '';
	var artStrU = '';
	var eleStrU = '';
	var infoStrU = '';
	var commonStartStrU = '<div class="mui-card">' +
		'<div class="mui-card-header" style="font-weight: bold;">尚未订餐</div>' +
		'<div class="mui-card-content">' +
		'<div class="mui-card-content-inner">' +
		'<ul class="mui-table-view-divider">';
		
	var commonStartStr = '<div class="mui-card">' +
		'<div class="mui-card-header" style="font-weight: bold;">已订餐</div>' +
		'<div class="mui-card-content">' +
		'<div class="mui-card-content-inner">' +
		'<ul class="mui-table-view-divider">';

	var commonEndStr = '</ul>' +
		'</div></div>' +
		'<div class="mui-card-footer">' +
		'</div></div>';

	//统计
	var url = urlStr + '/order/getds?' + 'od=' + tomorrowStr;
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast('获取数据成功....');
			for (let k of data) {
				if (k.orderid == null) {
					if (k.studentCollege == 'Information Engineering') {
						infoStrU += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px; color: crimson;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					} else if (k.studentCollege == 'Electromechanical School') {
						eleStrU += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px; color: crimson;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					} else {
						artStrU += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px; color: crimson;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					}
				} else {
					if (k.studentCollege == 'Information Engineering') {
						infoStr += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					} else if (k.studentCollege == 'Electromechanical School') {
						eleStr += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					} else {
						artStr += '<li class="mui-table-view-cell">' +
							'<span style="font-size: 18px;">' +
							k.studentName + '</span>' +
							'<span class="mui-badge">' +
							k.studentRoom + '</span></li>';
					}
				}
			}

			artContent.innerHTML = commonStartStrU + artStrU + commonEndStr + commonStartStr + artStr + commonEndStr;
			eleContent.innerHTML = commonStartStrU + eleStrU + commonEndStr + commonStartStr + eleStr + commonEndStr;
			infoContent.innerHTML = commonStartStrU + infoStrU + commonEndStr + commonStartStr + infoStr + commonEndStr;

		},
		error: function(xhr, type, errorThrown) {
			mui.toast('数据获取失败.');
		}
	});

};

//刷新按钮
var dom_refresh_btn = document.getElementById("refreshBtn");
dom_refresh_btn.addEventListener('tap', function(e) {
	init_sister();
});

init_sister();
