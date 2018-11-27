			
			$(".index_1").click(function() {
				window.location.href = "index.html"
			})
			$(".index_3").click(function() {
				window.location.href = "index_3.html"
			})
			$(".index_4").click(function() {
				window.location.href = "index_4.html"
			})
			$(".message").click(function() {
				window.location.href = "text_content.html"
			})
			$('.returns').click(function(){
				history.go(-1);
			})
			$('#zhx_title').on('touchend','span',function(){
				$('#zhx_title span').removeClass('zhx_act');
				$(this).addClass('zhx_act')
			})	
			var idInfo;
//			短链接提取
		function getfir2(e){
//				ii++;
//				console.log('复制成功前');
				var text=''
				for(var i=0;i<$('.nenirong p').length;i++){
					text+=$('.nenirong p').eq(i).text();
				}
				$('#test3').val(text)
				$('#test3').select();
				document.execCommand("Copy");	
				layer.msg('复制成功');
				//clearSlct()
		}
		getUserRole()		
		$.ajax({
             url:platform.https+"/App/BhShop/recommend_goods.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({
					             
			  }),
             success: function(ret){
//		        console.log(id)
             	console.log(ret.goods)
             	var item_click
                 if(ret.status == 200){

                 	for(var i in ret.goods){
                 		item_click2=ret.goods[i]['id'];
	                 	$("#list_info").append(
							 '<div class="list_logo cnt"onclick=deta2('+item_click2+')>'
								+'<div class="logo_info">'
                           	 		+'<ul class="logo_top" style="background:url('+ret.goods[i]['img']+');background-size: cover"></ul>'
									+'<div class="lo_bor">'
									+'<p class="tit">'+ret.goods[i]['name']+'</p>'
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
	  	}
		
		
			