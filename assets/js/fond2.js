

		
		$('.returns').click(function(){
			history.go(-1);
		})
		var type_id = sessionStorage.getItem('id');
		var id_info= window.location.href.split("?")[1].substring(3);
		getUserRole()		
		$.ajax({
             url:platform.https+"/App/BhShop/get_category_goods.htm",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({
				"type_id":id_info,
			  }),
             success: function(ret){
                 if(ret.status == 200){
                     if(ret.goods == '') {
                         $('.main').css("background-image", "url(http://p8fswj9xi.bkt.clouddn.com/328c0b91467ca72e82bb160c571c96f7)");
                         $(".main").css("background-size", "100% 100%");
                     } else {
                         $(".rgt").css("background", "#f9f8f8");
                     }
                 	for(var i in ret.goods){
                 		item_click2=ret.goods[i]['id'];
	                 	$("#list_info").append(
							 '<div class="list_logo cnt"onclick=deta2('+item_click2+')>'
								+'<div class="logo_info">'
//								+'<ul class="logo_top"> <img src="'+ret.goods[i]['img']+'"/></ul>'
									+'<ul class="logo_top" style="background:url('+ret.goods[i]['img']+');background-size:cover"></ul>'
									+'<div class="lo_bor">'
									+'<p>'+ret.goods[i]['name']+'</p>'
									+'<li class="logo_btm cnt"><span>￥'+ret.goods[i][userRolePrice()]+'</span> <span>市场指导价:'+ret.goods[i]['market_price']+'</span></li>'	
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
//			alert(id)
	  	}
//       搜索商品
// 	$.ajax({
//              url:platform.https+"/App/BhShop/goods_search.html",
//              type: 'POST',
//              dataType: 'json',
// 			 data:JSON.stringify({
// 				key:key,
// 				// user_id:8712
// 			  }),
//              success:function(ret){
//
//              	console.log(ret.goods)
//              	var item_click
//                  if(ret.status == 200){
//                  	var star =""
//                  	for(var i in ret.data){
// //	                 	$(".huo_dog").append(
// 						 star+='<span>'+ret.data[i]+'</span>';
// //		    				 );
// //				    		console.log(item_click);
//                  	};
//                  	$(".huo_dog").html(star);
//                  }else{
//                   alert(ret.msg);
//                  }
//              },
//              error: function(ret) {
//              }
//          });
    	　	