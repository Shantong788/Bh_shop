$('.returns').click(function(){
	history.go(-1);
})
 
 		var goods_id = sessionStorage.getItem('id_info');
		var id_info= window.location.href.split("?")[1].substring(3);
 	$.ajax({
             url:platform.https+"/App/BhShop/goods_review.html",
             type: 'POST',
             dataType: 'json',
             data: JSON.stringify({
               "goods_id":id_info,
               // "user_id":8712
             }),
             success: function(ret){
             	console.log(ret.data)
                 if(ret.status == 200){
                 	for(var i in ret.data){
	                 	$(".val_list").append(
//							 ret.data[i]['key']
				        		'<div class="val">'
//					        		+'<li class="head"><img src="'+ret.data[i]['img']+'"/></li>'
								+'<li class="head"><img src="http://p8fswj9xi.bkt.clouddn.com/7d65c93f336451951201b5951b3263d9"/></li>'
					        		+'<span>'+ret.data[i]['user_name']+'</span>'
					        		+'<span>'+ret.data[i]['created_at']+'</span>'
				        		+'</div>'
				        		+'<p style="color: #999;">'+ret.data[i]['content']+'</p>'
		    				 );	
	                 	}
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });	