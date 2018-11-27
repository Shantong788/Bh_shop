$('.returns').click(function() {
	history.go(-1);
})
//		//切換同步
		$(".order_item").click(function() {
			orderList($(this).index())
//			alert($(this).index())
//			console.log($(this).index())
		})
		var type_info = window.location.href.split("?")[1].substring(5);
//		alert(type_info)
//		全部订单接口
		// 调用获取角色权限
		getUserRole()
		// 进入页面调用订单接口
		orderList(type_info)
//		全部订单列表
		var aaa=''
		function orderList(type) {
//			alert(type)
			$.ajax({
				url: platform.https + "/App/BhUser/orderList.html",
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify({
					"type": type,
					"user_id": 10128
				}),
				success: function(ret) {
					var item_click
//					var aaa = ret.data;
//					console.log(aaa)
					if(ret.status == 200) {
						if(ret.data== ''){
							console.log(123)
				        $('.moment').css("display","flex");
                        }
                        else {
                            $('.moment').css("display", "none");
						}
						var html = '';
						for(var i = 0, length = ret.data.length; i < length; i++) {
							item_click1 = ret.data[i]['goods_id'];
							item_click2 = ret.data[i]['order_id'];
							item_click3 = ret.data[i]['order_amount'];
							img = ret.data[i]['goods_img'];
							// console.log(img)
							var houdle = '';
							if(ret.data[i]['status'] == 1) {
								status_info = "待付款"
								houdle = '<span onclick=celPay(' + item_click2 + ')>取消订单</span><span onclick=toPay(' + item_click2 +','+item_click3+')>立即付款</span>';
							}else if(ret.data[i]['status'] == 2) {
								status_info = "待发货"
								houdle='<span onclick=turn_down(' + item_click2 + ')>详情</span>'
							}else if(ret.data[i]['status'] == 3) {
								status_info = "待收货"
								houdle = '<span onclick=see_Address(' + item_click2 + ')>查看物流</span><span onclick=toYes(' + item_click2 + ')>确认收货</span><span onclick=turn_down(' + item_click2 + ')>详情</span>';
							}else if(ret.data[i]['status'] == 4) {
								status_info = "待评价"
								houdle = '<span onclick=toDisap(' + item_click2 + ')>删除订单</span><span onclick=pingJia('+ item_click1 +','+ item_click2 +')>评价</span><span onclick=turn_down(' + item_click2 + ')>详情</span>';
							}else if(ret.data[i]['status'] == 5) {
								status_info = "已评价"
							}else if(ret.data[i]['status'] == 6) {
								status_info = "已取消"
							}  
							html +='<div class="message cnt">' +
								'<div class="message_info cnt">' +
								'<li class="msg_rgt" style="background-image:url('+img+');background-size:cover";></li>'+
								'<div class="msg_left">' +
								'<div class="msg_top"><p>' + ret.data[i]['goods_name'] + '</p></div>' +
								// '<p>' + ret.data[i]['goods_spec'] + '：<span>' + ret.data[i]['goods_spec_info'] + '</span> &nbsp;数量：' + ret.data[i]['goods_num'] + '</p>' +
                                '<p>数量：' + ret.data[i]['goods_num'] + '</p>' +
								'<div class="msg_btom cnt"><span>￥' + ret.data[i]['goods_price'] + '</span><span class="cnt">&nbsp;' + status_info + '</span></div>' +
								'</div>' +
								'</div>' +
								'<div class="number"><p>共<span>' + ret.data[i]['goods_num'] + '</span>件商品 合计￥' + ret.data[i]['order_amount'] + '<span>(含运费￥<span>' + ret.data[i]['freight'] + '</span>)</span></p></div>' +
								'<div class="number_in"><p>' + houdle + '</p</div>' +
								'</div>'+
								'</div>'
							//);
							//console.log(item_click);
						}
						$(".list").html(html);
		
					} else {
						alert(ret.msg);
					}
				},
				error: function(ret) {}
			});
		}
		//查看订单详情
		 function turn_down(item_click2){
		 	window.location.href = "../html/Order-list.html?order_id=" + item_click2;
		 }
		//	去评价
		function pingJia(item_click1, item_click2) {
			window.location.href = "../html/Publish.html?order_id=" + item_click2 + "&goods_id=" + item_click1;
		}
		//查看物流
		function see_Address(item_click2){
			window.location.href = "../html/logistics.html?order_id=" + item_click2;
		}
		//确认收货
		function toYes(item_click2){
			$.ajax({
				url:platform.https+"/App/BhUser/overOrder.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
	              "order_id":item_click2,
			       // user_id:10128,
			    }),
				success:function(ret){
					if(ret.status == 200){
						layer.msg('已确认');
					}else{
                  		alert("网络有问题");
                 	}
				}
			});
            timedMsg()
		}
		//取消订单
		function celPay(item_click2) {
			// alert(item_click2)
			$.ajax({
				url:platform.https+"/App/BhUser/clearOrder.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
	              "order_id":item_click2,
			       // user_id:10128,
			    }),
				success:function(ret){
					if(ret.status == 200){
                        layer.msg('取消成功');
					}else{
                  		alert("网络有问题");
                 	}
				}
			});
            timedMsg()
		}
		//删除订单
		function toDisap(item_click2) {
			$.ajax({
				url:platform.https+"App/BhUser/deleteOrder.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
	              "order_id":item_click2,
			       // user_id:10128,
			    }),
				success:function(ret){
					if(ret.status == 200){
						layer.msg('已删除订单');
					}else{
                  		alert("网络有问题");
                 	}
				}
			});
		}
		
		//立即支付
		function toPay(item_click2,item_click3) {
			$('#all').fadeToggle({ "duration": 600,}) 
			$('.build').click(function(){
			$(".banner").css({"display":"flex"});
			event.stopPropagation();
			})
			$('#all').on("click",function(){
			$('#all').fadeOut({ "duration":600,})	    
		 	})
			$("#pay_for").text(item_click3)
//			console.log(aaa.order_amount)
			$("#pay_for").click(function(){
						// alert(item_click3)
				$.ajax({
			    url:platform.https+"/App/BhPay/pay.html",
			    type: 'POST',
			    dataType: 'json',
			    data:JSON.stringify({
			        // "user_id":10128,
					"order_id":item_click2,
	//				"order_amount":item_click3
			    }),
			    success: function(ret){
			    	// alert(1111)
			    console.log(ret)
			        if(ret.status == 200){
			         location.href=ret.data;
			        }else{
			            alert(ret.msg);
			        }
			    }
			});
				})

			}
		
//       精品推荐	
$.ajax({
    url:platform.https+"/App/BhShop/history_look.html",
    type: 'POST',
    dataType: 'json',
    data:JSON.stringify({

    }),
    success: function(ret){
        var item_click
        if(ret.status == 200){
            for(var i in ret.data){
                item_click2=ret.data[i]['id'];
                $("#list_info").append(
                    '<div class="list_logo cnt"onclick=deta2('+item_click2+')>'
                    +'<div class="logo_info">'
                    +'<ul class="logo_top" style="background:url('+ret.data[i]['img']+');background-size: cover"></ul>'
                    +'<div class="lo_bor">'
                    +'<p class="tit">'+ret.data[i]['name']+'</p>'
                    +'<li class="logo_btm cnt"><span>￥'+ret.data[i][userRolePrice()]+'</span> <span>市场指导价:'+ret.data[i]['market_price']+'</span></li>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                );
//				    		console.log(item_click);
            }
        }else{
            alert(ret.msg);
        }
    },
    error: function(ret) {
    }
});

function deta2(id) {
	window.location.href = "../html/details.html?id=" + id + ""
}

