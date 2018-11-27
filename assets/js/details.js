
		$('.returns').click(function(){
			history.go(-1);
		})
		var level= sessionStorage.getItem('level');
//		alert(level)
		var goods_id = sessionStorage.getItem('id');
		var id_info= window.location.href.split("?")[1].substring(3);
//		alert(id_info)
		var attention = 0;
//		-------详情列表-------


//success: function (res) {
//      if (res.code === 0) {
//          res.list = res.list || [];
//          var str = '';
//          for (var i = 0, len = res.list.length; i < len; i++) {
//              str += '<div class="swiper-slide"><a href="' + res.list[i].link + '" target="_blank">< img src="' + res.list[i].img + '" alt="' + res.list[i].name + '" title="' + res.list[i].name + '"></a ></div>'
//          }
//          $('#swiper-item-box').html(str);
//          // 开启轮播
//          var mySwiper = new Swiper('.swiper-container', {
//              loop: true,
//              autoplay: 5000,//可选选项，自动滑动
//              pagination: '.pagination',
//              paginationClickable: true,
//              createPagination: true
//          });
//          $('#swipePrev').click(function () {
//              mySwiper.swipePrev();
//          });
//          $('#swipeNext').click(function () {
//              mySwiper.swipeNext();
//          })
//      }
//  },
//  error: function (err) {
//  }


		$.ajax({
             url:platform.https+"/App/BhShop/goods_detail.html",
             type: 'POST',
             dataType: 'json',
             data: JSON.stringify({
               "goods_id":id_info,
               "user_id":8712
             }),
             success: function(ret){
                 if(ret.status == 200){
                 	if(level==10){
                 		$("#pay_for_sp").text(ret.data.price10);
                 	}else if(level==300) {
                 		$("#pay_for_sp").text(ret.data.price300);
                 	}else if(level==400) {
                 		$("#pay_for_sp").text(ret.data.price400);
                 	}else if(level==500) {
                 		$("#pay_for_sp").text(ret.data.price500);
                 	}else if(level==0) {
                        $("#pay_for_sp").text(ret.data.market_price);
                    }
                 	var pic = ''
					 for(var i = 0, len = ret.data.banner.length; i < len; i++){
                 		pic+='<div class="swiper-slide" style="background:url('+ret.data.banner[i]+');background-size:cover";></div>'
//               		pic += '<div class="swiper-slide"><a href="' + ret.data.banner[i]+ '" target="_blank">< img src="' + ret.data.banner[i]+ '" ></a ></div>'
//						pic+='<div class="swiper-slide">122222222</div>'								
					 }
                    $("#swiper-item-box").html(pic)
                      		var swiper = new Swiper('.swiper-container', {
					autoplay: true,
					pagination: {
						el: '.swiper-pagination',
						loop: true,
						delay: 1000,
		    				stopOnLastSlide: false,
		    				disableOnInteraction: true,
					},
				});
                 	$("#pay_in_sp").text(ret.data.market_price);
                 	$(".datails").html(ret.data.content);
                 	$("#tit_name").text(ret.data.name);
					if(ret.data.attention==0){
						$('#iii').addClass('active-collect');
						}else if(ret.data.attention==1){
						$('#iii').removeClass('active-collect');	
						}
					attention = ret.data.attention;
					$('#iii').click(function(){
						if(attention){
                 			likeSuccess()
						}else{
							likeCancel()
						}
					})			
                 }else{
                  alert("网络有问题");
                 }
             },
             error: function(ret) {
             }
         });	
//       -------商品评价-------
        $.ajax({
             url:platform.https+"/App/BhShop/goods_review.html",
             type: 'POST',
             dataType: 'json',
             data: JSON.stringify({
               "goods_id":id_info,
               // "user_id":8712
             }),
             success: function(ret){
             	// console.log(ret.data)
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
         function next_goto(){
			window.location.href="../html/evaluate.html?id="+id_info+""
			console.log(id_info)
			//alert(goods_id)
		}
         getUserRole()
//      --------精品推荐--------
        $.ajax({
            url:platform.https+"/App/BhShop/history_look.html",
            type: 'POST',
            dataType: 'json',
            data:JSON.stringify({
                user_id:8712,
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
        //立即购买
		function toPay() {
			window.location.href = "../html/pay_Oreder.html?id="+id_info+""
//			alert(id_info)
//			alert(userRolePrice())
//	        alert(item_click2)
		}
//       --------加入收藏------

		function likeSuccess(){
		$('#iii').addClass('active-collect'); // 发送请求之前先加样式
	 	$.ajax({
				url:platform.https+"/App/BhShop/add_attention.html",
	            type: 'POST',
	            dataType:'json',
	            data:JSON.stringify({
	              "goods_id":id_info,
			       // user_id:8712,
			    }),
				success:function(ret){
					if(ret.status == 200){
						attention =0;
						layer.msg('加入收藏');
						}else{
							// 请求失败 状态退回
						$('.collect').removeClass('active-collect');
                  		alert("网络有问题");
                 	}
				}
			});
		}
//		------取消收藏-------
		function  likeCancel(){
			$('#iii').removeClass('active-collect'); // 发送请求之前先移除样式
			$.ajax({
				url:platform.https+"/App/BhShop/cancle_attention.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
	             "goods_id":id_info,
			       // user_id:8712,
			    }),
				success:function(ret){
					if(ret.status == 200){
						attention = 1;
						layer.msg('取消收藏');
						}else{
                  		alert("网络有问题");
                  		$('.collect').addClass('active-collect'); // 失败回退
                 	}
				}
			});
		}

			
