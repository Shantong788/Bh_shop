$('.returns').click(function(){
	history.go(-1);
})

		getUserRole()
		$.ajax({
             url:platform.https+"/App/BhShop/attention_goods_list.html",
             type: 'POST',
             dataType: 'json',
             data:JSON.stringify({
             user_id:8712,
             }),
             success: function(ret){
		     console.log(ret.data)
                 if(ret.status == 200){
                 	if(ret.data== ''){
				        $('.main').css("background-image","url(http://p8fswj9xi.bkt.clouddn.com/bd2c81ab34d6a7d2c9c7ac12c0ad2cf5)");
				        $(".main").css("background-size","100% 100%");
		              }else{
		              	$(".main").css("background","#f2f2f2");
		              }
                     // alert(ret.data[0]['name'])
                 	for(var i in ret.data){
                 	item_click2=ret.data[i]['id'];
                 	$("#list").append(

                 	    '<div class="message cnt">'
                            +'<div class="message_info cnt" onclick=deta2(' + item_click2 + ')>'
                                +'<li class="msg_rgt"style="background:url('+ret.data[i]['img']+');background-size: cover"></li>'
                                    +'<div class="msg_left">'
                                        +'<div class="msg_top"><p>'+ret.data[i]['name']+'</p></div>'
                                        +'<div class="msg_btom cnt"><span style="color:#d82b2b;font-size: .3rem;">￥'+ret.data[i][userRolePrice()]+'</span><span class="cnt">&nbsp;市场指:￥'+ret.data[i]['market_price']+'</span></div>'
                                    +'<li><i class="icon iconfont" id="iii">&#xe602;</i></li>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
	    				 );	
                 	}
//				 console.log(i,":",ret.data[i]['name']);
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