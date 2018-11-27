

		$(".index_2").click(function(){
			window.location.href="index_2.html"
		})
		$(".index_1").click(function(){
			window.location.href="index.html"
		})
		$(".index_4").click(function(){
			window.location.href="index_4.html"
		})
		$('.returns').click(function(){
			history.go(-1);
		})
		$('#zhx_title').on('touchend','p',function(){
			$('#zhx_title p').removeClass('zhx_act');
			$(this).addClass('zhx_act')
		})
		Recommend(true)
			     function Recommend(isfir){
			     	$.ajax({
			             url:platform.https+"/App/BhShop/get_nav_tab.html",
			             type: 'POST',
			             dataType: 'json',
			             data:JSON.stringify({
			             // user_id:8712,
			             }),
			             success: function(ret){
			             	console.log(ret.data)
			                 if(ret.status == 200){
			                 	for(var i in ret.data){
			                 		var class_style = 'random';
			                 		if(ret.data[i]['id'] == 10) {
									if(isfir) {
										class_style = 'zhx_act';
									}
								} else {
								}
			                 	$(".lft").append(
	//	  								 ret.data[i]['key']	
										'<p class=' + class_style + ' onclick=cik('+ret.data[i]['id']+')>'+ret.data[i]['name']+'</p>'
				    				 );	
			                 	}
			                 	cik(ret.data[0]['id'])
			                 }else{
			                  alert(ret.msg);
			                 }
			             },
			             error: function(ret) {
			             }
			         });
			     }
			function cik(id){
//		   	window.location.href="../html/details.html"
//商品列表
		   	$.ajax({
		             url:platform.https+"/App/BhShop/get_search_type_goods.htm",
		             type: 'POST',
		             dataType: 'json',
//		             data:'type_id='+id,
					 data:JSON.stringify({
						"type_id":id		             
//						"type_id":2
					  }),
		             success:function(ret){
		             	console.log(ret.goods)
		             	var item_click
		                 if(ret.status == 200){
		                 	if(ret.goods== ''){
                                $('.moment').css("display", "block");
                            }else {
                                $('.moment').css("display", "none");
                            }
		                 	var html = ''
		                 	for(var i in ret.goods){
		                 	item_click=ret.goods[i]['id'];
		                 	html+='<div class="shop"onclick=change11('+item_click+')>'+
							       		'<li style="background:url('+ret.goods[i]['img']+');background-size: cover"></li>'+
							       		'<span>'+ret.goods[i]["name"]+'</span>'+
							       	'</div>'
		                 	}
		                 	$(".clothe").html(html);
		                 }else{
		                  alert(ret.msg);
		                 }
		             },
		             error: function(ret) {
		             }
		         });
		  	}
		   function change11(id){
			window.location.href="../html/fond2.html?id="+id+""
//			alert(id)
	  	}
		   getUserRole()
// 		首先 请求得到用户身份     
		var userRole = ''; // 声明一个变量接收此用户身份
		// 调用请求
//		getUserRole()
		function getUserRole(){
			// 请求
			$.ajax({
				url:platform.https+"/App/BhShop/get_user_info.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
			       // user_id:8712,
			    }),
				success:function(status){
					sessionStorage.setItem('level', status.data.level);
//					console.log(ret.level)
					// 请求成功后将变量赋值
					userRole = status.data.level 
                    cik()
				}
			});
		}    
    	　	