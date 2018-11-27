		$('.returns').click(function(){
			history.go(-1);
		});
		// var aaaa;
        var fare_a=''
		var price_money=''
		var address_id=''
			$("#result").val('1')
			var level= sessionStorage.getItem('level');
			var goods_id = sessionStorage.getItem('id');
			var id_info= window.location.href.split("?")[1].substring(3);
//			alert(id_info)
			$.ajax({
			    url:platform.https+"/App/BhPay/index.html",
			    type: 'POST',
			    dataType: 'json',
			    data:JSON.stringify({
			        "goods_id":id_info,
			        "user_id":10128,
			    }),
			    success: function(ret){
//			        console.log(ret.data);
			        aaa = ret.data;
			        var data = ret.data;
			        var bbb=data.address_id;
                    address_id=data.address_id;
//			        alert(ret.data.market_price)
			        if(ret.status == 200){
			            $("#order_addr").append(
			                '<p style="display: none">'+data.address_id+'</p>'+
			                '<p style="color: #333;"><span>'+data.accept_name+'</span><span>'+data.mobile+'</span></p>' +
			                '<p>'+data.address+'</p>'
			            );
                        if (!bbb){
                            $('#order_addr').css("display","none");
                            $('#ad_ress').css("display","block");
                            $('#shode').css("display","block");
                        }
			            if(level==10){
	                 		$("#pay_for").val(ret.data.goods_price10);
	                 		$("#all_price").val(ret.data.goods_price10+parseFloat(ret.data.fare));
	                 		price_money=ret.data.goods_price10
	                 	}else if(level==300) {
	                 		$("#pay_for").val(ret.data.goods_price300);
	                 		$("#all_price").val(ret.data.goods_price300+parseFloat(ret.data.fare));
	                 		price_money=ret.data.goods_price300
	                 	}else if(level==400) {
	                 		$("#pay_for").val(ret.data.goods_price400);
	                 		$("#all_price").val(ret.data.goods_price400+parseFloat(ret.data.fare));
	                 		price_moneuv=ret.data.goods_price400
	                 	}else if(level==500) {
	                 		$("#pay_for").val(ret.data.goods_price500);
	                 		$("#all_price").val(ret.data.goods_price500+parseFloat(ret.data.fare));
	                 		price_money=ret.data.goods_price500
	                 	}
			         $(".msg_rgt").attr('style',"background:url("+ret.data.goods_img+");background-size:cover");
                 	 $("#goods_name").html(ret.data.goods_name);
                 	 $("#goods_spec").text(ret.data.goods_spec);
                 	 $("#goods_spec_info").text(ret.data.goods_spec_info);
                 	 $("#goods_spec").text(ret.data.goods_spec);
					 $("#market_price").text(ret.data.market_price)
                     $("#fare").html(ret.data.fare)
						fare_a=ret.data.fare;
			        }else{
			            alert(ret.msg);
			        }
			    },
			    error: function(ret) {			    	
			    }

			});

//			购买数量 、、价格、、同步
				$(document).ready(function (){					
					order_price(1); //页面执行完 加载一件商品价格
				});
			　	$('#plus').click(function(){				
					var result =  $('#result').val();
					var new_result = ++result;
					$('#num_in').val(new_result);
					$('#result').val(new_result);
					order_price(new_result);
//					alert(result)
console.log(result)
			    })
			
				$('#reduce').click(function(){
					var result =  $('#result').val();
					if(result <= 1	) {
						layer.open({
						title: '提示'
						,content: '购买商品不能为负'
					}); 
					return;
					}
					var new_result = --result;
					$('#result').val(new_result);
					$('#num_in').val(new_result);
					order_price(new_result);
				})
					function order_price(num){
					var pay_for = $('#pay_for').val();
//						alert(pay_for);
					var new_all_price = price_money*num;
                    var new_all_price1 = price_money*num+parseFloat(fare_a);
					new_all_price = new_all_price.toFixed(2);
					$("#all_price").val(new_all_price1);
					$("#pay_for").val(new_all_price);
				}
//		修改地址
				$("#address").click(function(){
					window.location.href='address.html'
				})
			
//			timedMsg()
//alert(123)
//		立即支付
			var new_result = $('#result').val();
			$("#pay_away").click(function(){
// 				alert($('#result').val())
//				alert(id_info)
//				alert(aaa.address_id)
//				alert(aaa.product_id)
				$.ajax({
			    url:platform.https+"/App/BhPay/pay.html",
			    type: 'POST',
			    dataType: 'json',
			    data:JSON.stringify({
			        "goods_id":id_info,
			        // "user_id":10128,
					"order_id":"",
					"addr_id":aaa.address_id,
					"payment":1,
					"product_id":aaa.product_id,
			        "goods_num":$('#result').val(),
			    }),
			    success: function(ret){
			        console.log(ret.data);
			        if(ret.status == 200){
			        	console.log(ret.data)
			         	location.href=ret.data;
			        }else{
			            alert(ret.msg);
			        }
			    },
			    error: function(ret) {
			    }
			});	
			// var index = layer.load({time: 1000}, {shade: false});
		})

        //			3秒后出现弹窗
			// function timedMsg()
			// {
			//  var t=setTimeout($('#all').fadeToggle({ "duration": 600,}) ,5000)
			// }
			
			

			
			