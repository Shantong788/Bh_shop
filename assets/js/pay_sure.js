		
		
		
//		https://api.baihuazhongchuang.com/bh_story/assets/html/pay_sure.html?no='.$no
		var order_no= window.location.href.split("?")[1].substring(3);
		$("#yeSss").click(function(){
//		alert(order_no)
		$.ajax({
				url:platform.https+"/App/BhPay/wxQuery.html",
				type:'POST',
				dataType:'JSON',
				data:JSON.stringify({
				"order_no":order_no
				}),
				success:function(ret){
					if(ret.status == 200){
					var index = layer.load(0, {shade: false});
					}else{
						alert(网络出错)
					}
				}
			})
		location.href='Order.html?type=0'
		
		})
//		重新支付
		$("#rePay").click(function(){
			window.location.href='Order.html?type=1'
		})
		