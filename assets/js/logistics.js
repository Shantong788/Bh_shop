$('.returns').click(function(){
	history.go(-1);
})
	function getfir(e){
		var e=e||window.event;
		e.preventDefault()
		$('#order_no').select();
		document.execCommand("Copy");
			layer.msg('复制成功');
	};
		var order_id = sessionStorage.getItem('id');
		var order_info= window.location.href.split("?")[1].substring(9);
//		alert(order_info)
		
		$.ajax({
				url:platform.https+"/App/BhUser/express.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
//	              "order_id":order_info,
				  "order_id":1,
			       // user_id:10128,
			    }),
				success:function(ret){
					console.log(ret)
					if(ret.status == 200){
//					if(ret.data.order.status == 3) {
//					status_info = "已发货"
//					}else(ret.data.order.status == 5){
//					status_info = "已签收"
//					}
						var order = ret.data.order;
						$("#details").append(
			                '<div class="over cnt" style="width: 100%;">'+
			        			'<li class="over_lft"><img src="'+order.goods_img+'"/></li>'+
			        			'<div class="over_rgt">'+
			        				'<p style="color:#333">已发货</p>'+
			        				'<p>'+order.express_no+': <input type="tel" name="" id="order_no" value="'+order.express_compan+'" />'+
			        				'<span onclick=getfir() id="copy_btn">复制</span>'+
			        				'</p>'+
			        				'<p>官方电话：<span>'+order.phone+'</span></p>'+
			        			'</div>'+
			        		'</div>'
			        		);
			        		$("#address").text(order.address);
			        		for(var i in ret.data.express.data){
                 		var data = ret.data.express.data;
	                 	$("#wuliu_dete").append(
						 '<li class="layui-timeline-item">'
						    +'<i class="layui-icon layui-timeline-axis">&#xe63f;</i>'
						    +'<div class="layui-timeline-content layui-text">'
						      +'<h3 class="layui-timeline-title">'+data[i]['time']+'</h3>'
						      +'<ul>'
						       + '<li>'+data[i]['context']+'</li>'
						      +'</ul>'
						    +'</div>'
						  +'</li>'
		    				 );	
				    		console.log(data);
                 	 }
					}else{
                  		alert("网络有问题");
                 	}
				}
			});
			//      --------精品推荐--------
			getUserRole()
			$.ajax({
				url:platform.https+"/App/BhShop/history_look.html",
				type: 'POST',
				dataType: 'json',
				data:JSON.stringify({

				}),
				success: function(ret){
			//		        console.log(id)
					console.log(ret.goods)
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
			function deta2(id){
				window.location.href="../html/details.html?id="+id+""
			}