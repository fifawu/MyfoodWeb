var artContent = document.getElementById("artContent");
var eleContent = document.getElementById("eleContent");
var infoContent = document.getElementById("infoContent");
var countOneInfo = 0;
var countOneEle = 0;
var countOneArt = 0;
var artStr = '';
var eleStr = '';
var infoStr = '';
var artTableStr = '';
var eleTableStr = '';
var infoTableStr = '';
var oldstudentName = '';
var lastobjArt;
var lastobjEle;
var lastobjInfo;
var indexStu = 0;

function init_list() {
	
	countOneInfo = 0;
	countOneEle = 0;
	countOneArt = 0;
	artStr = '';
	eleStr = '';
	infoStr = '';
	artTableStr = '';
	eleTableStr = '';
	infoTableStr = '';
	oldstudentName = '';
	indexStu = 0;
	
	var commonStartStrU = '<div class="mui-card">' +
		'<div class="mui-card-header" style="font-weight: bold;">尚未订餐</div>' +
		'<div class="mui-card-content">' +
		'<div class="mui-card-content-inner">';
	var commonEndStr = '</div></div>' +
		'<div class="mui-card-footer">' +
		'</div></div>';
	var beginflagInfo = true;
	var beginflagEle = true;
	var beginflagArt = true;
	
	var tableStartStr = '<div class="mui-card">' +
		'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
		'费用简表</div>' +
		'<div class="mui-card-content">' +
		'<div class="mui-card-content-inner">' +
		'<ul class="mui-table-view-divider">';	
	var tableEndStr = '</ul></div></div>' +
		'<div class="mui-card-footer"></div></div>';

	//统计
	var url = urlStr + '/order/getalldetail';
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast('获取数据成功....');

			for (let k of data) {
				if (k.studentName != oldstudentName) {
					oldstudentName = k.studentName;	
					if (k.studentCollege == 'Information Engineering') {
						infoStr += makeOutStr(1, k, beginflagInfo,0);
						lastobjInfo = k;
						beginflagInfo = false;
					} else if (k.studentCollege == 'Electromechanical School') {
						eleStr += makeOutStr(1, k, beginflagEle,1);
						lastobjEle = k;
						beginflagEle = false;
					} else {
						artStr += makeOutStr(1, k, beginflagArt,2);
						lastobjArt = k;
						beginflagArt = false;
					}
				} else {
					if (k.studentCollege == 'Information Engineering') {
						infoStr += makeOutStr(0, k, beginflagInfo, 0);
					} else if (k.studentCollege == 'Electromechanical School') {
						eleStr += makeOutStr(0, k, beginflagEle, 1);
					} else {
						artStr += makeOutStr(0, k, beginflagArt, 2);
					}
				}
			}
			
			artTableStr += '<li class="mui-table-view-cell"><a href="#artEnd">' +
				lastobjArt.studentName +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				countOneArt + '</span>元</span></li>' ;
			artContent.innerHTML = tableStartStr + artTableStr + tableEndStr +
				artStr + '<div class="mui-card-footer" id="artEnd">合计:' +
				'<a style="font-weight: bold;color: crimson; font-size: 24px">' +
				countOneArt + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
			
			eleTableStr += '<li class="mui-table-view-cell"><a href="#eleEnd">' +
				lastobjEle.studentName +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				countOneEle + '</span>元</span></li>' ;	
			eleContent.innerHTML = tableStartStr + eleTableStr + tableEndStr +
				eleStr + '<div class="mui-card-footer" id="eleEnd">合计:' +
				'<a style="font-weight: bold;color: crimson; font-size: 24px">' +
				countOneEle + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
				
			infoTableStr += '<li class="mui-table-view-cell"><a href="#infoEnd">' +
				lastobjInfo.studentName +
				'</a><span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				countOneInfo + '</span>元</span></li>' ;	
			infoContent.innerHTML = tableStartStr + infoTableStr + tableEndStr +
				infoStr + '<div class="mui-card-footer" id="infoEnd">合计:' +
				'<a style="font-weight: bold;color: crimson; font-size: 24px">' +
				countOneInfo + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('数据获取失败.');
		}
	});
}

function makeOutStr(isstart, objK, beginflag,college) {

	var str = '';
	var count = 0;
	//同名开始
	if (isstart == 0) {
		str += makeOneDayStr(objK);
		count = computeOneDayTotal(objK)
		str += '小计:<span style="font-weight: bold;color: crimson;">' + count + '</span>元</p>';
	}

	//同名第一条订单
	else {
		
		if (!beginflag) {
			str += '</div></div>' +
				'<div class="mui-card-footer">合计:' +
				'<a style="font-weight: bold;color: crimson; font-size: 24px">';
			
			if(college == 0)
			{
				str += countOneInfo + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
				infoTableStr += '<li class="mui-table-view-cell"><a href="#stu' + indexStu + '">' +
					lastobjInfo.studentName +
					'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
					countOneInfo + '</span>元</span></li>' ;
				countOneInfo = 0;
			}
			else if(college == 1){
				str += countOneEle + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
				eleTableStr += '<li class="mui-table-view-cell"><a href="#stu' + indexStu + '">' +
					lastobjEle.studentName +
					'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
					countOneEle + '</span>元</span></li>' ;
				countOneEle = 0;
			}else{
				str += countOneArt + '</a>元 &nbsp;&nbsp;&nbsp; <a href="#">回到顶部</a></div></div>';
				artTableStr += '<li class="mui-table-view-cell"><a href="#stu' + indexStu + '">' +
					lastobjArt.studentName +
					'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
					countOneArt + '</span>元</span></li>' ;
				countOneArt = 0;
			}							
		}
		indexStu ++;
		str += '<div class="mui-card" id="stu' + indexStu +'">' +
			'<div class="mui-card-header" style="font-weight: bold;">' +
			objK.studentName + '</div>' +
			'<div class="mui-card-content">' +
			'<div class="mui-card-content-inner">';
		if(objK.orderdate != null){
			str += makeOneDayStr(objK);
			count = computeOneDayTotal(objK);
			str += '小计:<span style="font-weight: bold;color: crimson;">' + count + '</span>元</p>';			
		}
		else{
			str += "没有任何订单";
		}
	}
	if(college == 0){
		countOneInfo += count;
	}
	else if(college == 1){
		countOneEle += count;
	}else{
		countOneArt += count;
	}
	return str;
}

function makeOneDayStr(objK){
	var str = '';
	var arr = (objK.orderdate + ' ').split('T');
	str += '<span style="font-weight: bold;">' + arr[0] + '</span></p>';
	if (objK.orderbreakfast != 0) str += '早餐 * ' + objK.orderbreakfast + '</p>';
	if (objK.orderla != 0) str += 'A餐 * ' + objK.orderla + '&nbsp;&nbsp;';
	if (objK.orderlb != 0) str += 'B餐 * ' + objK.orderlb + '&nbsp;&nbsp;';
	if (objK.orderlc != 0) str += 'C餐 * ' + objK.orderlc + '&nbsp;&nbsp;';
	if (objK.orderlcola != 0) str += '可乐 * ' + objK.orderlcola + '&nbsp;&nbsp;';
	if (objK.orderlsp != 0) str += '雪碧 * ' + objK.orderlsp + '&nbsp;&nbsp;';
	if (objK.orderlrice != 0) str += '米饭 * ' + objK.orderlrice + '&nbsp;&nbsp;';
	str += '</p>';
	if (objK.ordersa != 0) str += 'A餐 * ' + objK.ordersa + '&nbsp;&nbsp;';
	if (objK.ordersb != 0) str += 'B餐 * ' + objK.ordersb + '&nbsp;&nbsp;';
	if (objK.ordersc != 0) str += 'C餐 * ' + objK.ordersc + '&nbsp;&nbsp;';
	if (objK.orderscola != 0) str += '可乐 * ' + objK.orderscola + '&nbsp;&nbsp;';
	if (objK.orderssp != 0) str += '雪碧 * ' + objK.orderssp + '&nbsp;&nbsp;';
	if (objK.ordersrice != 0) str += '米饭 * ' + objK.ordersrice + '&nbsp;&nbsp;';
	str += '</p>------------------</p>';
	return str;
}

function computeOneDayTotal(objK){
	return objK.orderbreakfast * 3 +
			objK.orderla * 15 + objK.orderlb * 15 + objK.orderlc * 15 +
			objK.orderlcola * 3.5 + objK.orderlsp * 3.5 + objK.orderlrice * 1.5 +
			objK.ordersa * 15 + objK.ordersb * 15 + objK.ordersc * 15 +
			objK.orderscola * 3.5 + objK.orderssp * 3.5 + objK.ordersrice * 1.5 ;
			
}

//刷新按钮
var dom_refresh_btn = document.getElementById("refreshBtn");
dom_refresh_btn.addEventListener('tap', function(e) {
	init_list();
});

init_list();
