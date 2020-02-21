var countContent = document.getElementById("countOrder");
var breakfastContent = document.getElementById("breakfastOrder");
var lunchContent = document.getElementById("lunchOrder");
var supperContent = document.getElementById("supperOrder");

function init_aunt() {
	var breakfastStr = '';
	var lunchStr = '';
	var supperStr = '';
	var countStr = '';
	var oldroom = '999';
	var isBegin = true;
	var count = 0;
	var countLa = 0;
	var countLb = 0;
	var countLc = 0;
	var countLco = 0;
	var countLsp = 0;
	var countLrice = 0;
	var countSa = 0;
	var countSb = 0;
	var countSc = 0;
	var countSco = 0;
	var countSsp = 0;
	var countSrice = 0;
	var g_total_b = 0;
	var g_total_la = 0;
	var g_total_lb = 0;
	var g_total_lc = 0;
	var g_total_lco = 0;
	var g_total_lsp = 0;
	var g_total_lrice = 0;
	var g_total_sa = 0;
	var g_total_sb = 0;
	var g_total_sc = 0;
	var g_total_sco = 0;
	var g_total_ssp = 0;
	var g_total_srice = 0;
	var obj;

	//明日统计
	var url = urlStr + '/order/getdayorder?' + 'od=' + tomorrowStr;
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast('获取数据成功！！！');
			for (let k of data) {
				g_total_b += k.orderbreakfast;
				g_total_la += k.orderla;
				g_total_lb += k.orderlb;
				g_total_lc += k.orderlc;
				g_total_lco += k.orderlcola;
				g_total_lsp += k.orderlsp;
				g_total_lrice += k.orderlrice;
				g_total_sa += k.ordersa;
				g_total_sb += k.ordersb;
				g_total_sc += k.ordersc;
				g_total_sco += k.orderscola;
				g_total_ssp += k.orderssp;
				g_total_srice += k.ordersrice;
			}

			//明日统计
			countStr += '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">明天:&nbsp;' +
				tomorrowStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">总计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">早餐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				g_total_b + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_la + g_total_sa) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lb + g_total_sb) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lc + g_total_sc) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lco + g_total_sco) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lsp + g_total_ssp) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lrice + g_total_srice) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul>' +
				'</div></div>' +
				'<div class="mui-card-footer">' +
				'</div></div>';
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('数据获取失败.');
		}
	});
	
	sleep(3000);

	//今日统计
	url = urlStr + '/order/getdayorder?' + 'od=' + todayStr;
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			//mui.toast('获取今日数据成功！！！');
			g_total_b = 0;
			g_total_la = 0;
			g_total_lb = 0;
			g_total_lc = 0;
			g_total_lco = 0;
			g_total_lsp = 0;
			g_total_lrice = 0;
			g_total_sa = 0;
			g_total_sb = 0;
			g_total_sc = 0;
			g_total_sco = 0;
			g_total_ssp = 0;
			g_total_srice = 0;
			var gz_total_b = 0;
			var gz_total_la = 0;
			var gz_total_lb = 0;
			var gz_total_lc = 0;
			var gz_total_lco = 0;
			var gz_total_lsp = 0;
			var gz_total_lrice = 0;
			var gz_total_sa = 0;
			var gz_total_sb = 0;
			var gz_total_sc = 0;
			var gz_total_sco = 0;
			var gz_total_ssp = 0;
			var gz_total_srice = 0;
			oldroom = '999';
			isBegin = true;
			for (let k of data) {
				obj = k;
				if (k.studentRoom != oldroom) {
					oldroom = k.studentRoom;

					if (!isBegin) {

						//早餐尾部处理
						breakfastStr += '</p>-----------------------</p>' +
							'合计:&nbsp;<span style="font-weight: bold; font-size: 34px; color: crimson;">' +
							count + '</span>&nbsp;份' +
							'</div></div>' +
							'<div class="mui-card-footer">' +
							'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
							'<a class="mui-card-link">' +
							'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
							'<input name="radiob' + k.studentRoom + '00" type="radio"></div>' +
							'<div class="mui-input-row mui-radio mui-left">' +
							'<label style="color: #323232">未送</label><input name="radiob' + k.studentRoom +
							'00" type="radio" checked></div>' +
							'</a></div></div>';

						//中餐尾部处理
						lunchStr += '</p>-----------------------</p>合计:</p>';
						if (countLa > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐A&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLa + '</span>&nbsp;份&nbsp;&nbsp;</span>';
						}
						if (countLb > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐B&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLb + '</span>&nbsp;份&nbsp;&nbsp;</span>';
						}
						if (countLc > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐C&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLc + '</span>&nbsp;份</span>';
						}
						lunchStr += '</p>';
						if (countLco > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">可乐&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLco + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
						}
						if (countLsp > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">雪碧&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLsp + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
						}
						if (countLrice > 0) {
							lunchStr += '<span style="font-weight: bold; font-size: 20px;">米饭&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countLrice + '</span>&nbsp;份</span>';
						}
						lunchStr += '</div></div>' +
							'<div class="mui-card-footer">' +
							'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
							'<a class="mui-card-link">' +
							'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
							'<input name="radiol' + k.studentRoom + '01" type="radio"></div>' +
							'<div class="mui-input-row mui-radio mui-left">' +
							'<label style="color: #323232">未送</label><input name="radiol' + k.studentRoom +
							'01" type="radio" checked></div>' +
							'</a></div></div>';

						//晚餐尾部处理
						supperStr += '</p>-----------------------</p>合计:</p>';
						if (countSa > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">餐A&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSa + '</span>&nbsp;份&nbsp;&nbsp;</span>';
						}
						if (countSb > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">餐B&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSb + '</span>&nbsp;份&nbsp;&nbsp;</span>';
						}
						if (countSc > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">餐C&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSc + '</span>&nbsp;份</span>';
						}
						supperStr += '</p>';
						if (countSco > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">可乐&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSco + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
						}
						if (countSsp > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">雪碧&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSsp + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
						}
						if (countSrice > 0) {
							supperStr += '<span style="font-weight: bold; font-size: 20px;">米饭&nbsp;' +
								'<span style="font-size: 34px; color: crimson;">' +
								countSrice + '</span>&nbsp;份</span>';
						}
						supperStr += '</div></div>' +
							'<div class="mui-card-footer">' +
							'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
							'<a class="mui-card-link">' +
							'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
							'<input name="radios' + k.studentRoom + '02" type="radio"></div>' +
							'<div class="mui-input-row mui-radio mui-left">' +
							'<label style="color: #323232">未送</label><input name="radios' + k.studentRoom +
							'02" type="radio" checked></div>' +
							'</a></div></div>';

						count = 0;
						countLa = 0;
						countLb = 0;
						countLc = 0;
						countLco = 0;
						countLsp = 0;
						countLrice = 0;
						countSa = 0;
						countSb = 0;
						countSc = 0;
						countSco = 0;
						countSsp = 0;
						countSrice = 0;
					}

					//早餐头
					breakfastStr += '<div class="mui-card">' +
						'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
						k.roomPosition + ' - ' + k.studentRoom + '</div>' +
						'<div class="mui-card-content">' +
						'<div class="mui-card-content-inner">';


					//午餐头
					lunchStr += '<div class="mui-card">' +
						'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
						k.roomPosition + ' - ' + k.studentRoom + '</div>' +
						'<div class="mui-card-content">' +
						'<div class="mui-card-content-inner">';


					//晚餐头
					supperStr += '<div class="mui-card">' +
						'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
						k.roomPosition + ' - ' + k.studentRoom + '</div>' +
						'<div class="mui-card-content">' +
						'<div class="mui-card-content-inner">';

					isBegin = false;
				}

				//早餐中间值处理
				breakfastStr += k.studentName;
				if(k.orderbreakfast > 0)
					breakfastStr +=  k.orderbreakfast + '份&nbsp;';
					
				breakfastStr += '</p>';

				//午餐中间值处理
				lunchStr += k.studentName + ':'
				if (k.orderla > 0) {
					lunchStr += '餐A' + k.orderla + '份&nbsp;';
				}
				if (k.orderlb > 0) {
					lunchStr += '餐B' + k.orderlb + '份&nbsp;';
				}
				if (k.orderlc > 0) {
					lunchStr += '餐C' + k.orderlc + '份&nbsp;';
				}
				if (k.orderlcola > 0) {
					lunchStr += '可乐' + k.orderlcola + '瓶&nbsp;';
				}
				if (k.orderlsp > 0) {
					lunchStr += '雪碧' + k.orderlsp + '瓶&nbsp;';
				}
				if (k.orderlrice > 0) {
					lunchStr += '米饭' + k.orderlrice + '份&nbsp;';
				}
				lunchStr += '</p>';

				//晚餐中间值处理
				supperStr += k.studentName + ':'
				if (k.ordersa > 0) {
					supperStr += '餐A' + k.ordersa + '份&nbsp;';
				}
				if (k.ordersb > 0) {
					supperStr += '餐B' + k.ordersb + '份&nbsp;';
				}
				if (k.ordersc > 0) {
					supperStr += '餐C' + k.ordersc + '份&nbsp;';
				}
				if (k.orderscola > 0) {
					supperStr += '可乐' + k.orderscola + '瓶&nbsp;';
				}
				if (k.orderssp > 0) {
					supperStr += '雪碧' + k.orderssp + '瓶&nbsp;';
				}
				if (k.ordersrice > 0) {
					supperStr += '米饭' + k.ordersrice + '份&nbsp;';
				}
				supperStr += '</p>';
				
				g_total_b += k.orderbreakfast;
				g_total_la += k.orderla;
				g_total_lb += k.orderlb;
				g_total_lc += k.orderlc;
				g_total_lco += k.orderlcola;
				g_total_lsp += k.orderlsp;
				g_total_lrice += k.orderlrice;
				g_total_sa += k.ordersa;
				g_total_sb += k.ordersb;
				g_total_sc += k.ordersc;
				g_total_sco += k.orderscola;
				g_total_ssp += k.orderssp;
				g_total_srice += k.ordersrice;
				
				count += k.orderbreakfast;
				countLa += k.orderla;
				countLb += k.orderlb;
				countLc += k.orderlc;
				countLco += k.orderlcola;
				countLsp += k.orderlsp;
				countLrice += k.orderlrice;
				countSa += k.ordersa;
				countSb += k.ordersb;
				countSc += k.ordersc;
				countSco += k.orderscola;
				countSsp += k.orderssp;
				countSrice += k.ordersrice;
				
				if(k.roomPosition == '招待所'){
					gz_total_b += k.orderbreakfast;
					gz_total_la += k.orderla;
					gz_total_lb += k.orderlb;
					gz_total_lc += k.orderlc;
					gz_total_lco += k.orderlcola;
					gz_total_lsp += k.orderlsp;
					gz_total_lrice += k.orderlrice;
					gz_total_sa += k.ordersa;
					gz_total_sb += k.ordersb;
					gz_total_sc += k.ordersc;
					gz_total_sco += k.orderscola;
					gz_total_ssp += k.orderssp;
					gz_total_srice += k.ordersrice;
					
				}
			}
			if (!isBegin) {

				//早餐扫尾
				breakfastStr += '</p>-----------------------</p>' +
					'合计:&nbsp;<span style="font-weight: bold; font-size: 34px; color: crimson;">' +
					count + '</span>&nbsp;份' +
					'</div></div>' +
					'<div class="mui-card-footer">' +
					'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
					'<a class="mui-card-link">' +
					'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
					'<input name="radiob' + obj.studentRoom + '" type="radio"></div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label style="color: #323232">未送</label><input name="radiob' + obj.studentRoom +
					'" type="radio" checked></div>' +
					'</a></div></div>';

				//午餐扫尾
				lunchStr += '</p>-----------------------</p>合计:</p>';

				if (countLa > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐A&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLa + '</span>&nbsp;份&nbsp;&nbsp;</span>';
				}
				if (countLb > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐B&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLb + '</span>&nbsp;份&nbsp;&nbsp;</span>';
				}
				if (countLc > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">餐C&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLc + '</span>&nbsp;份</span>';
				}
				lunchStr += '</p>';
				if (countLco > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">可乐&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLco + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
				}
				if (countLsp > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">雪碧&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLsp + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
				}
				if (countLrice > 0) {
					lunchStr += '<span style="font-weight: bold; font-size: 20px;">米饭&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countLrice + '</span>&nbsp;份</span>';
				}
				lunchStr += '</div></div>' +
					'<div class="mui-card-footer">' +
					'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
					'<a class="mui-card-link">' +
					'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
					'<input name="radiol' + obj.studentRoom + '" type="radio"></div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label style="color: #323232">未送</label><input name="radiol' + obj.studentRoom +
					'" type="radio" checked></div>' +
					'</a></div></div>';

				//晚餐扫尾
				supperStr += '</p>-----------------------</p>合计:</p>';

				if (countSa > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">餐A&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSa + '</span>&nbsp;份&nbsp;&nbsp;</span>';
				}
				if (countSb > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">餐B&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSb + '</span>&nbsp;份&nbsp;&nbsp;</span>';
				}
				if (countSc > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">餐C&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSc + '</span>&nbsp;份</span>';
				}
				supperStr += '</p>';
				if (countSco > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">可乐&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSco + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
				}
				if (countSsp > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">雪碧&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSsp + '</span>&nbsp;瓶&nbsp;&nbsp;</span>';
				}
				if (countSrice > 0) {
					supperStr += '<span style="font-weight: bold; font-size: 20px;">米饭&nbsp;' +
						'<span style="font-size: 34px; color: crimson;">' +
						countSrice + '</span>&nbsp;份</span>';
				}
				supperStr += '</div></div>' +
					'<div class="mui-card-footer">' +
					'<a class="mui-card-link" style="color: #323232">' + todayStr + '</a>' +
					'<a class="mui-card-link">' +
					'<div class="mui-input-row mui-radio mui-left"><label style="color: #323232">已送</label>' +
					'<input name="radios' + obj.studentRoom + '" type="radio"></div>' +
					'<div class="mui-input-row mui-radio mui-left">' +
					'<label style="color: #323232">未送</label><input name="radios' + obj.studentRoom +
					'" type="radio" checked></div>' +
					'</a></div></div>';
			}

			//今日统计
			countStr += '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">今天:&nbsp;' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">总计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">早餐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				g_total_b + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_la + g_total_sa) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lb + g_total_sb) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lc + g_total_sc) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lco + g_total_sco) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lsp + g_total_ssp) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lrice + g_total_srice) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul>' +
				'</div></div>' +
				'<div class="mui-card-footer">' +
				'</div></div>';
				
			var breakfastHotelStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">招待所合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">早餐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				gz_total_b + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';
				
			var breakfastHouseStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">桂园合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">早餐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_b - gz_total_b) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';
				
			var lunchHotelStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">招待所合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_la ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_lb ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_lc ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_lco ) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_lsp ) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_lrice ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';
			
			var lunchHouseStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">桂园合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_la - gz_total_la) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lb - gz_total_lb) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lc - gz_total_lc) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lco - gz_total_lco) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lsp - gz_total_lsp) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_lrice - gz_total_lrice ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';
			
			var supperHotelStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">招待所合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_sa ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_sb ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_sc ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_sco ) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_ssp ) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(gz_total_srice ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';
			
			var supperHouseStr = '<div class="mui-card">' +
				'<div class="mui-card-header" style="color: crimson;font-weight: bold;">' +
				todayStr + '</div>' +
				'<div class="mui-card-content">' +
				'<div class="mui-card-content-inner">' +
				'<label style="font-weight: bold; font-size: 16px;color: #323232">桂园合计:</label>' +
				'<ul class="mui-table-view-divider">' +
				'<li class="mui-table-view-cell">套餐A&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_sa - gz_total_sa) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐B&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_sb - gz_total_sb) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">套餐C&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_sc - gz_total_sc) + '</span>&nbsp;份&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">可乐&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_sco - gz_total_sco) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">雪碧&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_ssp - gz_total_ssp) + '</span>&nbsp;瓶&nbsp;</span></li>' +
				'<li class="mui-table-view-cell">米饭&nbsp;' +
				'<span class="mui-badge"><span style="font-size: 18px; color: crimson;">' +
				(g_total_srice - gz_total_srice ) + '</span>&nbsp;份&nbsp;</span></li>' +
				'</ul></div></div></div>';

			if(breakfastStr.length > 0){
				breakfastContent.innerHTML = breakfastHotelStr + breakfastHouseStr + breakfastStr;
			}
			if(lunchStr.length > 0){
				lunchContent.innerHTML = lunchHotelStr + lunchHouseStr + lunchStr;
			}
			if(supperStr.length > 0){
				supperContent.innerHTML = supperHotelStr + supperHouseStr + supperStr;
			}
			if(countStr.length > 0)
			{
				countContent.innerHTML = countStr;
			}
			
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('数据获取失败.');
		}
	});
};

//刷新按钮
var dom_refresh_btn = document.getElementById("refreshBtn");
dom_refresh_btn.addEventListener('tap', function(e) {
	init_aunt();
});

init_aunt();