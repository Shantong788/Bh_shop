		$.ajax({
             url:platform.https+"/App/BhUser/myProfit.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({

			  }),
             success:function(ret){
                 if(ret.status == 200){
                 	$(".money1").text(ret.data.money);
                 	if(ret.data.money== '0'){
						$(".none").css("display","block")
				        }else{
				        
                 	var html =''
                 	for(var i in ret.data.money_log){                 		
	                 	html +='<div class="cnt big">'+
					          	'<div class="fore_info_b">'+
					          		'<p>'+ret.data.money_log[i]['desc']+'</p>'+
					          		'<p class="time">'+ret.data.money_log[i]['created_at']+'</p>'+
					          		'<span class="aaa">+'+ret.data.money_log[i]['money']+'元</span>'+
					          	'</div>'+
					          '</div>'
	                 	}
                 	$("#xunhuan").html(html)
                 }
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });	