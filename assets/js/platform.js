function p(s) {
	    return s < 10 ? '0' + s: s;
	}
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 
		var h=myDate.getHours();       //获取当前小时数(0-23)
		var m=myDate.getMinutes();     //获取当前分钟数(0-59)
		var s=myDate.getSeconds();  
		var now=year+p(month)+p(date);
//==	====	=========================================
//		首先 请求得到用户身份     
		var userRole = ''; // 声明一个变量接收此用户身份
		// 调用请求
//		getUserRole()
		function getUserRole(){
			// 请求
			$.ajax({
				url:platform.https+"/App/BhShop/get_user_info.html",
	            type: 'POST',
	            dataType: 'json',
	            data:JSON.stringify({
			       // user_id:8712,
			    }),
				success:function(status){
                    console.log(status)
					sessionStorage.setItem('level', status.data.level); //
					//console.log(status.data.level)
					// 请求成功后将变量赋值
					userRole = status.data.level
				}
			});
		}    
//		      根据用户身份分别返回不同价格    
			    function userRolePrice(){
			    	var html ='';
			    	switch(userRole){
			    		case 10:
		    			html = 'price10';
		    			break;
		    			case 300:
		    			html = 'price300';
		    			break;
		    			case 400:
		    			html = 'price400';
		    			break;
		    			case 500:
		    			html = 'price500';
		    			break;
						default:
						html = '';
                        break;
                        // break;
		    			// default :break;
			    	}
			    	return html;
			    }
//			 半秒后页面刷新
			function timedMsg(){
			 var t=setTimeout("window.location = ''",500)
			}
			

var platform={
		https:"https://api.baihuazhongchuang.com",
//	-------获取并返回access_token值-------
	
//		ace_token:function(){
//		var ms5=hex_md5('qjh_VB.1.0.0' +now + 'SaY1_XXgdfdfl2V|gfZp{8`;jzR~68678g');	
//		return ms5;
//		},
//	-------获取并返回access_token值-------
//		user_token:function(){
//			var user_token = sessionStorage.getItem('token');
//			return user_token;
//		},
//		id:function(){
//			var id = sessionStorage.getItem('id');
//			return id;
//		},
//		balance:function(){
//			var balance = sessionStorage.getItem('balance');
//			return balance;
//		},
//		account:function(){
//			var account = sessionStorage.getItem('account');
//			return account;
//		},


	time:function(time, cFormat) {
			if (arguments.length === 0) {
			  return null
			}
			var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
			var date
			if (typeof time === 'object') {
			  date = time
			} else {
			  if (('' + time).length === 10) time = parseInt(time) * 1000
			  date = new Date(time)
			}
			var formatObj = {
			  y: date.getFullYear(),
			  m: date.getMonth() + 1,
			  d: date.getDate(),
			  h: date.getHours(),
			  i: date.getMinutes(),
			  s: date.getSeconds(),
			  a: date.getDay()
			}
			var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			  let value = formatObj[key]
			  if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
			  if (result.length > 0 && value < 10) {
				value = '0' + value
			  }
			  return value || 0
			})
			return time_str
		 },
		
	}
