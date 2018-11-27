		$(".index_2").click(function(){
			window.location.href="index_2.html"
		})
		$(".index_3").click(function(){
			window.location.href="index_3.html"
		})
		$(".index_1").click(function(){
			window.location.href="index.html"
		})	
		$('.returns').click(function(){
				history.go(-1);
		})
		
		$(".list_logo").click(function(){
			window.location.href="details.html"
		})
		$(".dingdan").click(function(){
			window.location.href="Order.html?type=0"
		})
		$(".save").click(function(){
			window.location.href="address.html"
		})		
		$(".shop").click(function(){
			var type = $(this).index()+1;
			 window.location.href="Order.html?type="+type+""
		})		
		$(".collect").click(function(){
			window.location.href="mine_like.html"
		})
		$(".his_tory").click(function(){
			window.location.href="history.html"
		})
		$(".money").click(function(){
			window.location.href="shouyi.html"
		})
//		用户接口
		$.ajax({
             url:platform.https+"/App/BhUser/index.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({

			  }),
             success:function(ret){
             	// console.log(ret.data)
//           	var item_click
                 if(ret.status == 200){
                 	$("#name").text(ret.data.user_name)
                 	$("#money_nb").text(ret.data.fr_money)
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });	
//       收藏数量
		$.ajax({
             url:platform.https+"/App/BhShop/attention_goods_list.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({
				user_id:8712,
			  }),
             success:function(ret){
                 // alert(ret.count)
                 if(ret.status == 200){
                 	$("#collect_nb").text(ret.count)
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });	
         //       历史浏览
		$.ajax({
             url:platform.https+"/App/BhShop/history_look.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({
				user_id:8712,
			  }),
             success:function(ret){
             	// alert(ret.count)
                 if(ret.status == 200){
                 	$("#his_nb").text(ret.count)
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });
         
         
//       精品推荐
		getUserRole()
        $.ajax({
            url:platform.https+"/App/BhShop/history_look.html",
            type: 'POST',
            dataType: 'json',
            data:JSON.stringify({

            }),
            success: function(ret){
//		        console.log(id)
//                 console.log(ret.goods)
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