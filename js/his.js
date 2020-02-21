
//下单按钮事件
var dom_order_btn = document.getElementById("submitOrder");
dom_order_btn.addEventListener('tap', function(e) {
	
	var sid = document.getElementById("account").value;
	var bk = document.getElementById("bk").value;
	var la = document.getElementById("la").value;
	var lb = document.getElementById("lb").value;
	var lc = document.getElementById("lc").value;
	var lco = document.getElementById("lco").value;
	var lsp = document.getElementById("lsp").value;
	var lrice = document.getElementById("lrice").value;
	var sa = document.getElementById("sa").value;
	var sb = document.getElementById("sb").value;
	var sc = document.getElementById("sc").value;
	var sco = document.getElementById("sco").value;
	var ssp = document.getElementById("ssp").value;
	var srice = document.getElementById("srice").value;
	var od = '2020-02-16';

	var url = urlStr + '/order/neworder?sid=' + sid +
		'&od=' + od + '&bk=' + bk +
		'&la=' + la + '&lb=' + lb +
		'&lc=' + lc + '&lco=' + lco +
		'&lsp=' + lsp + '&lrice=' + lrice +
		'&sa=' + sa + '&sb=' + sb +
		'&sc=' + sc + '&sco=' + sco +
		'&ssp=' + ssp + '&srice=' + srice;
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast('Ok, submited!');
			document.getElementById("bk").value = 0;
			document.getElementById("la").value = 0;
			document.getElementById("lb").value = 0;
			document.getElementById("lc").value = 0;
			document.getElementById("lco").value = 0;
			document.getElementById("lsp").value = 0;
			document.getElementById("lrice").value = 0;
			document.getElementById("sa").value = 0;
			document.getElementById("sb").value = 0;
			document.getElementById("sc").value = 0;
			document.getElementById("sco").value = 0;
			document.getElementById("ssp").value = 0;
			document.getElementById("srice").value = 0;
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('Submit failed, please check your input.');
		}
	});

});
