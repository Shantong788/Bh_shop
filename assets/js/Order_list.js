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

// 点击进详情
$(".orde_inin").click(function(){
	window.location.href='address.html'
})

		
		var order_id = sessionStorage.getItem('id');
		var order_info= window.location.href.split("?")[1].substring(9);
//		alert(order_info)
		$.ajax({
				url:platform.https+"/App/BhUser/orderInfo.html",
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
						var data = ret.data;
						$(".order_in").append(
				        	 		'<p><span>'+data.address+'</span></p>'+
				        	 		'<p>'+data.send_time+'</p>'
			        		);
			        		$(".order_fo").append(
			        			'<p style="color: #333;"><span>'+data.accept_name+'</span><span>'+data.mobile+'</span></p>'+
				        	 	'<p>'+data.address+'</p>'
			        		);
			        		$(".message_info").append(
			        	 		'<li class="msg_rgt"><img src="'+data.goods_img+'"/></li>'+
							'<div class="msg_left">'	 +
								'<div class="msg_top"><p>'+data.goods_name+'</p></div>' +
								'<p>'+data.goods_spec+':<span>'+data.goods_spec_info+'</span> &nbsp;数量：<span>'+data.goods_num+'</span></p>'+
								'<div class="msg_btom cnt"><span>￥99</span>'+
									'<span class="cnt">实付:<span style="color:#D82B2B;">&nbsp;￥'+data.goods_price+'00</span>(含运费)</span>'+
								'</div>'+
							'</div>'
			        		);
			        		$("#invoice_no").text(data.invoice_no);
			        		$("#pay_time").text(data.pay_time);
			        		$("#send_time").text(data.send_time);
			        		$("#express_no").text(data.express_no);
			        		$("#order_no").val(data.order_no);
			        		$("#invoice_no").text(data.invoice_no);
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