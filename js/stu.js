//检查登录状态
function checkLogin() {
	if (localStorage.getItem('sname') == null) {
		mui.openWindow({
			url: 'login.html'
		});
	}
}
//检查登录状态
checkLogin();

//设置标题
var ts = document.getElementById('stutitle');
ts.innerHTML = localStorage.getItem('sname');

//登出按钮事件
var dom_logout_btn = document.getElementById("logout");
dom_logout_btn.addEventListener('tap', function(e) {
	localStorage.removeItem('sid');
	localStorage.removeItem('sname');
	localStorage.removeItem('sroom');
	localStorage.removeItem('scollege');
	localStorage.removeItem('sroompos');
	mui.openWindow({
		url: 'login.html'
	});
});

//修改密码事件
var dom_change_btn = document.getElementById("changePass");
dom_change_btn.addEventListener('tap', function(e) {
	var oldpass = document.getElementById("oldpass").value.trim();
	var newpass = document.getElementById("newpass").value.trim();
	var repass = document.getElementById("newpassagin").value.trim();
	if (oldpass.trim().length == 0) {
		mui.toast("Old password can't be empty!");
		return;
	} else if (newpass.trim().length <= 7 || newpass.trim().length >= 15) {
		mui.toast("New password is invalid!!");
		return;
	} else if (repass.trim().length <= 7 || repass.trim().length >= 15) {
		mui.toast("Repeat new password is invalid!!");
		return;
	} else if (newpass.trim() != repass.trim()) {
		mui.toast("New 2 passwords can't be different!");
		return;
	} else {
		var sid = localStorage.getItem('sid');
		var url = urlStr + '/stu/changepass?sid=' + sid +
			'&oldpass=' + oldpass + '&newpass=' + newpass;
		mui.ajax(url, {
			data: {},
			type: 'post',
			timeout: 10000,
			success: function(data) {
				mui.toast('Ok, changed!');
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('Change failed, please check your input.');
			}
		});
	}
});

//下单按钮事件
var dom_order_btn = document.getElementById("submitOrder");
dom_order_btn.addEventListener('tap', function(e) {
	var btnArray = ['Yes', 'No'];
	mui.confirm('If you confirmed, it can not be modified. Are you sure?', 'Notice', btnArray, function(e) {
		if (e.index == 0) {
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
			var today = new Date();
			var tomorrow = new Date((today / 1000 + 86400) * 1000);
			var od = date2str(tomorrow);

			var sid = localStorage.getItem('sid');
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
					dom_order_btn.setAttribute("disabled", true);
					init_stu();
					mui.toast('Ok, submited!');
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('Submit failed, please check your input.');
				}
			});
		} else {

		}
	})
});

//页面数据初始化
function init_stu() {
	//处理提交按钮禁用问题
	var od = date2str(tomorrow);
	var sid = localStorage.getItem('sid');
	var url = urlStr + '/order/getorder?sid=' + sid +
		'&od=' + od;
		
	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			//明日订单已有,禁用提交按钮
			if (data.orderid != null) {
				dom_order_btn.setAttribute("disabled", true);
				dom_order_btn.innerHTML = "Only one chance per day.";
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('Server is busy.');
		}
	});

	var hour = today.getHours();
	if (hour >= limitHour) {
		dom_order_btn.setAttribute("disabled", true);
		dom_order_btn.innerHTML = "You're late!!!";
	}

	//填充历史订单数据
	var ole = document.getElementById("historyOrder");
	var content = '';

	var sid = localStorage.getItem('sid');
	var url = urlStr + '/order/getstuallorder?sid=' + sid;

	mui.ajax(url, {
		data: {},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			for (let k of data) {
				var arr=k.orderdate.split("T");
				var date_arrive = new Date(arr[0]);
				var month = date_arrive.getMonth() + 1;
				var date_arr_str = date_arrive.getFullYear() + '-' + month + '-' + date_arrive.getDate();
				var lunchstr = '';
				var dinnerstr = '';
				if (k.orderla != 0) lunchstr += 'Suit A * ' + k.orderla + '&nbsp;&nbsp;';
				if (k.orderlb != 0) lunchstr += 'Suit B * ' + k.orderlb + '&nbsp;&nbsp;';
				if (k.orderlc != 0) lunchstr += 'Suit C * ' + k.orderlc + '&nbsp;&nbsp;';
				if (k.orderlcola != 0) lunchstr += 'CocaCola * ' + k.orderlcola + '&nbsp;&nbsp;';
				if (k.orderlsp != 0) lunchstr += 'Sprite * ' + k.orderlsp + '&nbsp;&nbsp;';
				if (k.orderlrice != 0) lunchstr += 'Rice * ' + k.orderlrice + '&nbsp;&nbsp;';

				if (k.ordersa != 0) dinnerstr += 'Suit A * ' + k.ordersa + '&nbsp;&nbsp;';
				if (k.ordersb != 0) dinnerstr += 'Suit B * ' + k.ordersb + '&nbsp;&nbsp;';
				if (k.ordersc != 0) dinnerstr += 'Suit C * ' + k.ordersc + '&nbsp;&nbsp;';
				if (k.orderscola != 0) dinnerstr += 'CocaCola * ' + k.orderscola + '&nbsp;&nbsp;';
				if (k.orderssp != 0) dinnerstr += 'Sprite * ' + k.orderssp + '&nbsp;&nbsp;';
				if (k.ordersrice != 0) dinnerstr += 'Rice * ' + k.ordersrice + '&nbsp;&nbsp;';
				content += '<div class="mui-card">' +
					'<div class="mui-card-header" style="color: crimson;font-weight: bold;">Arrive: ' + date_arr_str + '</div>' +
					'<div class="mui-card-content">' +
					'<div class="mui-card-content-inner">' +
					'Breakfast:' + k.orderbreakfast + '</p>' +
					'Lunch:' + lunchstr + '</p>' +
					'Dinner:' + dinnerstr +
					'</div>' +
					'</div>' +
					'<div class="mui-card-footer" style="color: crimson;">Order:' + k.ordertime + '</div>' +
					'</div>';
			}
			if (content.length > 0) {
				ole.innerHTML = content;
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('Server is busy......');
		}
	});
}

//初始化
init_stu();
