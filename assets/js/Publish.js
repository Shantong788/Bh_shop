$('.returns').click(function(){
	history.go(-1);
})			
			getSearch().goods_id  //只需要在函数后面加名字
			getSearch().order_id
			function getSearch() {
			    var arr = location.search.slice(1).split('&'),
			        arr3 = null, arr4 = null, arr5 = {};
			    for (var i = 0; i < arr.length; i++) {
			        arr3 = arr[i];
			        arr4 = arr3.split('=');
			        arr5[arr4[0]] = arr4[1];
			    }
			    return arr5;
			    //es6语法
			    /*    let result = {};
			    let groups = location.search.slice(1).split('&');
			    for (let item of groups) {
			        let [key, value] = item.split('=');
			        result[key] = value
			    }
			    return result;*/
			 	}
//				alert(getSearch().goods_id)
//				alert(getSearch().order_id)
		$(".bttn").click(function(){
			var content = $('#txt').val();
			if(content == ''){
			layer.alert('评论不能为空')
			return;
			}
		$.ajax({
             url:platform.https+"/App/BhUser/reviewAdd.html",
             type: 'POST',
             dataType: 'json',
			 data:JSON.stringify({
				// user_id:10128,
				content:content,
				goods_id:getSearch().goods_id,
			  }),
             success:function(ret){
                 if(ret.status == 200){
                 	layer.msg('评价成功');
                 }else{
                  alert(ret.msg);
                 }
             },
             error: function(ret) {
             }
         });
            window.location.href=''
		})
		
		$.ajax({
			url:platform.https+"/App/BhUser/review.html",
			type:"POST",
			dataType:'JSON',
			data:JSON.stringify({
				// user_id:10128,
				order_id:getSearch().order_id,
			}),
			success:function(ret){
				if(ret.status == 200){
				$("#goods_name").text(ret.data.goods_name)
				// $(".goods_img").attr('src',ret.data.goods_img)
                $(".pic").attr('style',"background:url("+ret.data.goods_img+");background-size:cover")
				}
			}
		});
