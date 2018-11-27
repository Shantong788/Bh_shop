$('.returns').click(function(){
	history.go(-1);
})

			getUserRole()
			$.ajax({
		             url:platform.https+"/App/BhShop/history_look.html",
		             type: 'POST',
		             dataType: 'json',
					 data:JSON.stringify({
                         user_id:8712,
					  }),
		             success: function(ret){
//		             	console.log(id)
		             	console.log(ret.data)
		             	var item_click
		                 if(ret.status == 200){
                             // alert(ret.data[0]['name'])
		                 	if(ret.data== ''){
				                $('.main').css("background-image","url(http://p8fswj9xi.bkt.clouddn.com/328c0b91467ca72e82bb160c571c96f7)");
				                $(".main").css("background-size","100% 100%");
				              }else{
				              	$(".main").css("background","#f2f2f2");
				              }
		                 	for(var i in ret.data){
		                 		var star =""
		                 		item_click=ret.data[i]['id'];
			                 	$("#list_info").append(

                                '<div class="message cnt">'
                                    +'<div class="message_info cnt" onclick=change11(' + item_click + ')>'
                                    +'<li class="msg_rgt"style="background:url('+ret.data[i]['img']+');background-size: cover"></li>'
                                    +'<div class="msg_left">'
                                    +'<div class="msg_top"><p>'+ret.data[i]['name']+'</p></div>'
                                    +'<div class="msg_btom cnt"><span style="color:#d82b2b;font-size: .3rem;">￥'+ret.data[i][userRolePrice()]+'</span><span class="cnt">&nbsp;市场指:￥'+ret.data[i]['market_price']+'</span></div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
				    				 );
//				    				 console.log(item_click);
		                 	 }
		                 }else{
		                  alert(ret.msg);
		                 }
		             },
		             error: function(ret) {
		             }
		         });
		         function change11(id){
					window.location.href="../html/details.html?id="+id+""
//					alert(id)
				  	}
		         
		         $(".delete").click(function(even){
		         	even.stopPropagation()
//		         	event.preventDefault(); 
//		         	return false;
		         })
//		      删除历史记录
		$(".save").click(function(){
			 $.ajax({
		             url:platform.https+"/App/BhShop/del_history.html",
		             type: 'POST',
		             dataType: 'json',
					 data:JSON.stringify({
						// "user_id":8712
					  }),
		             success: function(ret){
		                 if(ret.status == 200){
		                 	timedMsg()
		                 	layer.msg('历史已清空');
		                 }else{
		                  alert(ret.msg);
		                 }
		             },
				})
			 
        		 });
		         
		         
		      
		         

				