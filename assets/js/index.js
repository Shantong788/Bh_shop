$(".index_1").click(function() {
	window.location.href = "index.html"
})
$(".index_2").click(function() {
	window.location.href = "index_2.html"
})
$(".index_3").click(function() {
	window.location.href = "index_3.html"
})
$(".index_4").click(function() {
	window.location.href = "index_4.html"
})
$(".message").click(function() {
	window.location.href = "details.html"
})
$('#zhx_title').on('touchend', 'span', function() {
	$('#zhx_title span').removeClass('zhx_act');
	$(this).addClass('zhx_act')
})
//	-----推荐------
Recommend(true)

function Recommend(isfir) {
	$.ajax({
		url: platform.https + "/App/BhShop/get_nav_tab.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			// user_id: 8712,
		}),
		success: function(ret) {
			if(ret.status == 200) {
				for(var i in ret.data) {
					var class_style = '123';
					if(ret.data[i]['id'] == 10) {
						if(isfir) {
							class_style = 'zhx_act';
						}
					} else {
					}
					$(".title").append(
						//ret.data[i]['key']
						//'<span>推荐</span>'	
						'<span class=' + class_style + ' onclick=cik(' + ret.data[i]['id'] + ')>' + ret.data[i]['name'] + '</span>'
					);
				}
				cik(ret.data[0]['id'])

			} else {}
		},
		error: function(ret) {}
	});
}

function cik(id) {
	//		   	window.location.href="../html/details.html"
	//			timedMsg()	
console.log(id,'idddddddd')
	if(id == 10) {
		$('.main').css("background", "#fff");
		$('.layui-carousel').css("display", "block");
		
	} else {
		$('.layui-carousel').css("display", "none");
	}

	$.ajax({
		url: platform.https + "/App/BhShop/nav_get_goods.html",
		type: 'POST',
		dataType: 'json',
		//		             data:'type_id='+id,
		data: JSON.stringify({
			"type_id": id
		}),
		success: function(ret) {
			//		             	console.log(id)
			console.log(ret.goods)
			var item_click
			if(ret.status == 200) {
				if(ret.goods == '') {
                    $('.moment').css("display", "block");
                }else {
                    $('.moment').css("display", "none");
                }
				var html = ''
				for(var i in ret.goods) {
					item_click = ret.goods[i]['id']
					html += '<div class="message cnt"onclick=change11(' + item_click + ')>' +
						'<div class="message_info cnt">' +
						'<li class="msg_rgt"style="background:url('+ret.goods[i]['img']+');background-size: cover"></li>' +
						'<div class="msg_left">' +
						'<div class="msg_top"><p>' + ret.goods[i]['name'] + '</p></div>' +
						'<div class="msg_btom cnt"><span style="color:#d82b2b;font-size: .3rem;">￥' + ret.goods[i][userRolePrice()] + '</span><span class="cnt">&nbsp;市场指导价:' + ret.goods[i]['market_price'] + '</span></div>' +
						'</div>' +
						'</div>' +
						'</div>'
				}
				$("#list").html(html);
//				eq(0).click()
			} else {}
		}
	});

}

function change11(id) {
	window.location.href = "../html/details.html?id=" + id + ""
	//			alert(id)
}
getUserRole()
// 		首先 请求得到用户身份     
var userRole = ''; // 声明一个变量接收此用户身份
// 调用请求
//		getUserRole()
function getUserRole() {
	// 请求
	$.ajax({
		url: platform.https + "/App/BhShop/get_user_info.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			// user_id: 8712,
		}),
		success: function(status) {
			sessionStorage.setItem('level', status.data.level);
			//					console.log(ret.level)
			// 请求成功后将变量赋值
			userRole = status.data.level
			//cik()
		}
	});
}