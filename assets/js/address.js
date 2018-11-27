$('.returns').click(function() {
	history.go(-1);
})

//收货地址循环
loop()

function loop() {
	$.ajax({
		url: platform.https + "/App/BhUser/address.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			// user_id: 10128
		}),
		success: function(ret) {
			console.log(123)
			console.log(ret.data)
			//           	var item_click
			if(ret.status == 200) {
				for(var i in ret.data) {
					var data = JSON.stringify(ret.data[i])
					var a_id = JSON.stringify(ret.data[i]['id'])
					if(ret.data[i]['is_default'] == 1) {
						status_info = "默认"
					} else if(ret.data[i]['is_default'] == 0) {
						status_info = "设为默认"
					}
					$(".main").append(
						'<div class="cnt select">' +
						'<div class="select_info cnt">' +
						'<li onclick=dele_Add(' + a_id + ')><img src="http://p8fswj9xi.bkt.clouddn.com/376decef276cd7e069ad9b7c4a14b8c3"/></li>' +
						'<div class="sect_left">' +
						'<p class="name cnt">' +
						'<span>' + ret.data[i]['accept_name'] + '</span><span>' + ret.data[i]['mobile'] + '</span><span class="sele" onclick=add_default(' + a_id + ')>' + status_info + '</span>' +
						'</p>' +
						'<p class="addres">' + ret.data[i]['province_name'] + ret.data[i]['city_name'] + ret.data[i]['county_name'] + ret.data[i]['addr'] + '</p>' +
						'</div>' +
						'<div class="sect_right cnt" onclick=turn_down(' + data + ',' + a_id + ')>' +
						'<span>编辑</span>' +
						'</div>' +
						'</div>' +
						'</div>'
					);
					//				    		console.log(item_click);
				};
			} else {
				alert(ret.msg);
			}
		},
		error: function(ret) {}
	});
}

//	点击默认地址
function add_default(id) {
	$.ajax({
		url: platform.https + "/App/BhUser/addressDefault.html",
		type: 'POST',
		dataType: 'JSON',
		data: JSON.stringify({
			a_id: id,
			// user_id: 10128
		}),
		success: function(ret) {
			if(ret.status == 200) {
				timedMsg()
			} else {
				alert(网络出错)
			}
		}
	})
	layer.msg('设置成功');
}

//三级联动  详细看wl_adderss.js
// weilan三级地址联动插件 必须引入wl-address.js和./wl-address.css
// 先实例化 并传入地址请求api
var wl = new WlAddress();
wl.init({
	action: 'https://api.baihuazhongchuang.com/App/BhUser/area'
}, function() {
	$('#all').fadeToggle({
		"duration": 600,
	})
	$('.build-a').click(function() {
		$(".build").css({
			"display": "flex"
		});
		event.stopPropagation()
	})
	$('#all').on("click", function() {
		$('#all').fadeOut({
			"duration": 600,
		})
	})
	// 这里做地址选择完毕 自动消失后 你的逻辑
	var data = wl.getData();

	//		      $(".three_add").text(data.province+','+data.city+','+data.county)
	console.log('地址选择完毕：', data)
	//		      $("#accept_name").val(data.accept_name)
	//				$("#mobile").val(data.mobile)
	//			省
	$("#province_name").text(data.province).attr('data-id',data.provinceId);
	$("#province").val(data.provinceId)
	//			市
	$("#city").val(data.cityId)
	$("#city_name").text(data.city).attr('data-id',data.cityId);
	//			县
	$("#county").val(data.countyId)
	$("#county_name").text(data.county).attr('data-id',data.countyId);
	//				$("#addr").val(data.addr)
	$(".yes").click(function() {
		ccc('')
	})
});
// 弹出地址选择
function addrShow(type) {
	$('#all').fadeOut({
		"duration": 100,
	});
	if(type == 'create') {
		wl.show();
		$('#accept_name').val('') //  都在这清空编辑内容️
		$('#mobile').val('')
		$('#addr').val('')
		return;
	}

	var city = $("#city_name").text();
	var cityId = $("#city_name").attr('data-id');
	var province = $("#province_name").text();
	var provinceId = $("#province_name").attr('data-id');
	var content = $("#county_name").text();
	var contentId = $("#county_name").attr('data-id');

	// 淡出地址请调用wl.show() 函数 当编辑时传入当前地址 如下注释部分 ，新增时无需传参
	wl.show({
		addr: {
			province: province,
			provinceId: provinceId,
			city: city,
			cityId: cityId,
			content: content,
			contentId: contentId
		}
	});
	
	
	
}

// 获取选择后的地址数据
function getAddr() {
	// 当地址选择完三级后会自动消失 请调用wl.getData()函数拿到你选择的地址数据
	var data = wl.getData();
	console.log(data)
}
//传省市县id
function ccc(id) {
	console.log()
	var accept_name = $('#accept_name').val();
	var mobile = $('#mobile').val();
	var province =$("#province_name").attr('data-id'); 
	var city = $('#city_name').attr('data-id');
	var county = $('#county_name').attr('data-id');
	var addr = $('#addr').val(); 
	console.log(province);
	console.log(city);
	console.log(county);

	$.ajax({
		url: platform.https + "/App/BhUser/addressAdd.html",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({
			// user_id: 10128,
			a_id: id,
			accept_name: accept_name,
			mobile: mobile,
			province: province,
			city: city,
			county: county,
			addr: addr
		}),  
		success: function(ret) {
//			console.log(ret.data)
			//           	var item_click
			if(ret.status == 200) {
				timedMsg()
			} else {
				alert(ret.msg);
			}
		},
		error: function(ret) {}
	});
	layer.msg('保存成功');
}

//			编辑地址
function turn_down(data, id) {
	//       	alert(id)
	console.log(data)
	$('#all').fadeToggle({
		"duration": 600,
	})
	$('.build-a').click(function() {
		$(".build").css({
			"display": "flex"
		});
		event.stopPropagation()
	})
	$('#all').on("click", function() {
		$('#all').fadeOut({
			"duration": 600,
		})
	})

	$("#accept_name").val(data.accept_name)
	$("#mobile").val(data.mobile)
	//			省
	$("#province_name").text(data.province_name).attr('data-id', data.province_id);
	$("#province").val(data.province_id)
	//			市
	$("#city").val(data.city_id)
	$("#city_name").text(data.city_name).attr('data-id', data.city_id);
	//			县
	$("#county").val(data.county_id)
	$("#county_name").text(data.county_name).attr('data-id', data.county_id);
	$("#addr").val(data.addr)
	//       收货地址添加&编辑	
	$(".yes").click(function() {
		ccc(id)
	})
	//			}

}

//      删除订单
function dele_Add(id) {
	$.ajax({
		url: platform.https + "/App/BhUser/addressDel.html",
		type: 'POST',
		dataType: 'JSON',
		data: JSON.stringify({
			a_id: id,
			// user_id: 10128
		}),
		success: function(ret) {
			var deale = ""
			if(ret.status == 200) {
				timedMsg()
			} else {
				alert(网络出错)
			}
		}
	})
	layer.msg('地址已删除');
}
//      $('.sect_right').click(function(){
//  	 		
//  	 	})
//三级联动
$.ajax({
	url: platform.https + "/App/BhUser/area.html",
	type: 'POST',
	dataType: 'json',
	data: JSON.stringify({
		"province": "",
		"city": "",
	}),
	success: function(ret) {
		console.log(ret.data)
		if(ret.status == 200) {

		} else {
			// 请求失败 状态退回
			$('.collect').removeClass('active-collect');
			alert("网络有问题");
		}
	}
});