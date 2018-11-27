$('.returns').click(function() {
	history.go(-1);
})
foundSearch('');
getUserRole()
//-----历史搜索记录-----
$(".begin").click(function() {
	var key = $('#ipt').val();
	if(key == '') {
		layer.alert('搜索不能为空')
		return;
	}
	$("#fond").css({
		"display": "none"
	})
	$("#shop_new").css({
		"display": "flex"
	})
	foundSearch(key);
})
//		搜索商品列表
function foundSearch(key) {
	$.ajax({
		url: platform.https + "/App/BhShop/goods_search.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			key: key,
			"user_id": 8712
		}),
		success: function(ret) {
			//		        console.log(id)
			console.log(ret.goods)
			var item_click
			if(ret.status == 200) {
				if(ret.goods.length == 0) {
					$('.main').css("background-image", "url(http://p8fswj9xi.bkt.clouddn.com/328c0b91467ca72e82bb160c571c96f7)");
					$(".main").css("background-size", "100% 100%");
					console.log("暂无数据");
				} else {
					$(".rgt").css("background", "#f9f8f8");
				}
				var html = ''
				for(var i in ret.goods) {
					item_click2 = ret.goods[i]['id'];
					html += '<div class="list_logo cnt"onclick=deta2(' + item_click2 + ')>' +
						'<div class="logo_info">' +
						'<ul class="logo_top" style="background:url('+ret.goods[i]['img']+');background-size:cover"></ul>'+
						'<div class="lo_bor">' +
						'<p class="tit">'+ret.goods[i]['name']+'</p>'+
						'<li class="logo_btm cnt"><span>￥' + ret.goods[i][userRolePrice()] + '</span> <span>市场指导价:' + ret.goods[i]['market_price'] + '</span></li>' +
						'</div>' +
						'</div>' +
						'</div>'
				}
				$("#list_info").html(html);
			} else {
				alert(ret.msg);
			}
		},
		error: function(ret) {}
	});
}

function deta2(id) {
	window.location.href = "../html/details.html?id=" + id + ""
//	alert(id)
}

//循环历史记录
$.ajax({
	url: platform.https + "/App/BhShop/get_history_look.html",
	type: 'POST',
	dataType: 'json',
	data: JSON.stringify({
		// user_id: 8712
	}),
	success: function(ret) {

		console.log(ret.data)
		//           	var item_click
		if(ret.status == 200) {
			var html = ''
			for(var i in ret.data) {
				html+='<span class="next_ix" onclick=next_ix(this)>' + ret.data[i] + '</span>'
			};
			$(".huo_dog").html(html)
		} else {
			alert(ret.msg);
		}
	},
	error: function(ret) {}
});
//------点击历史记录进商品列表--------
	function next_ix(that) {
		var key = $(that).text();
		$("#fond").css({
			"display": "none"
		})
		$("#shop_new").css({
			"display": "flex"
		})
		foundSearch(key);
	}

//--------清除历史记录----------
$("#delete").click(function() {
	$.ajax({
		url: platform.https + "/App/BhShop/del_history_search.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			// user_id: 8712
		}),
		success: function(ret) {
			if(ret.status == 200) {
				timedMsg()
			} else {
				alert(ret.msg);
			}
		},
		error: function(ret) {}
	});
	layer.msg('删除成功');
})