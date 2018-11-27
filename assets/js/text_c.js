
$('.returns').click(function(){
	history.go(-1);
})

function getfir(e){
	var e=e||window.event;
	e.preventDefault()
	$('#test1').select();
	document.execCommand("Copy");
		layer.msg('复制成功');
	
	//document.selection.empty();
	clearSlct()	
	};
	var id = sessionStorage.getItem('id');
	var id_info= window.location.href.split("?")[1].substring(3);
	$.ajax({
			type: "post",
			url: platform.https +"api/article/article_info",
			data: {
				"requestUrl": platform.ReqUrl,
				"access_token": platform.ace_token(),
				"user_token":'67ff329ac0eec7e42735323d0a3ce70a',
	//			"user_token":platform.user_token(),
				"id":id_info,
			},		
			success: function(data) {
				data = JSON.parse(data)
				console.log(data)
	//			console.log(data.data.list.id)
				if(data.code == 200) {
					$("#name").html(data.data.ext.name);
					$("#content").html(data.data.ext.content);
					$("#test1").val(data.data.ext.low_url);
					$("#update_time").html(platform.time(data.data.ext.update_time));
//					alert("提交成功");
					//alert(data.list.user_token)
				} else {
					alert("网络有问题")
				}
			}
		});