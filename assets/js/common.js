! function () {
    /* 使 apiready 更优雅. */
    window.apiready = function(){
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("apiready", false, false);

        document.dispatchEvent(evt);
        window.dispatchEvent(evt);
    }

    /* 使事件机制更加优雅. */
    window.addEventListener("apiready", function(){
        var apicloudEvents = ["pause", "resume", "online", "offline", "batterylow", "batterystatus", "scrolltobottom",
            "viewappear", "viewdisappear", "keyback", "keymenu", "tap", "swipeleft", "swiperight", "swipeup",
            "swipedown", "shake"];

        for(var idx in apicloudEvents){
            var apicloudEventName = apicloudEvents[idx];

            ! function(eventName){
                api.addEventListener({
                    name: eventName
                }, function(ret, err){
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent(eventName, false, false);

                    for(var prop in ret){
                        evt[prop] = ret[prop];
                    }

                    document.dispatchEvent(evt);
                    window.dispatchEvent(evt);
                });
            }(apicloudEventName);
        }
    });


    window.addEventListener("apiready", function(){
        /* 重写 alert 方法. */
        window.alert = function(msg){
            api.alert({
                title: "提示",
                msg: msg,
                buttons: ["确定"]
            });
        }

        /* 一个获取导航栏高度的方法. */
        window.getNavHeight = function () {
            var h = 44;

            if("ios" == api.systemType && parseInt(api.systemVersion) >= 7){
                h = 64;
            }

            return h;
        }
        /* 一个关闭窗口,返回上一级页面的优雅实现. */
        window.closeWin= function(winName) {
           var winName = winName || api.winName

            var animationType = "ripple"; // iOS 使用 滴水效果动画
            var subType = "none";
            var duration = 1000;

            if("ios" != api.systemType){
                animationType = "movein"; // Android
                subType = "from_left";
                duration = 300;
            }

            api.closeWin({
                name: winName,
                animation: {
                    type: animationType,
                    subType: subType,
                    duration: duration
                }
            });
        }
    });

}();


function openRemoteUrl(url) {
    api.openApp({
        androidPkg : 'android.intent.action.VIEW',
        mimeType : 'text/html',
        uri : url
    }, function(ret, err) {

    });
}

/**
 * 打开窗口
 * @param {Object} name
 */
function openWin(name){
    var delay = 10;
    if(api.systemType != 'ios'){
        delay = 300;
    }

	api.openWin({
        name: ''+name+'',
        url: ''+name+'.html',
        vScrollBarEnabled:false,/*垂直滚动条*/
        hScrollBarEnabled:false,/*水平滚动条*/
        scaleEnabled:false,/*窗口是否可缩放*/
        delay:delay,
        reload:true,
        softInputMode:'resize'//当键盘弹出时，输入框被盖住时，当前页面的调整方式
    });
}

function openCheckWin(name){
	if(nologin ()){
		var delay = 10;
	    if(api.systemType != 'ios'){
	        delay = 300;
	    }

		api.openWin({
	        name: ''+name+'',
	        url: ''+name+'.html',
	        vScrollBarEnabled:false,/*垂直滚动条*/
	        hScrollBarEnabled:false,/*水平滚动条*/
	        scaleEnabled:false,/*窗口是否可缩放*/
	        delay:delay,
	        reload:false,
	        softInputMode:'resize'//当键盘弹出时，输入框被盖住时，当前页面的调整方式
	    });
	}
}
/**
 * 打开窗口
 * @param {Object} name
 * @param {Object} param
 * @example
 * 		var name = 'project_detail_win';
 * 	    var param = {pid: project_id};
 * 	    openWinWithParam(name,param);
 */
function openWinWithParam(name,param){
    var delay = 10;
    if(api.systemType != 'ios'){
        delay = 300;
    }

	api.openWin({
        name: ''+name+'',
        url: ''+name+'.html',
        pageParam: param,
        vScrollBarEnabled:false,/*垂直滚动条*/
        hScrollBarEnabled:false,/*水平滚动条*/
        scaleEnabled:false,/*窗口是否可缩放*/
        opaque: true,//遮罩层
        delay:delay,
        reload:false,
        softInputMode:'resize'//当键盘弹出时，输入框被盖住时，当前页面的调整方式
    });
}

/**
 * 打开窗口新方法
 * @param {Object} name
 * @param {Object} param
 * @example
 * 		var name = 'project_detail_win';
 * 	    var param = {pid: project_id};
 * 	    openWinWithParam(name,param);
 */
function openWinWithParamNew(name,param){
    var delay = 10;
    if(api.systemType != 'ios'){
        delay = 300;
    }

	api.openWin({
        name: ''+name+'',
        url: ''+name+'',
        pageParam: param,
        vScrollBarEnabled:false,/*垂直滚动条*/
        hScrollBarEnabled:false,/*水平滚动条*/
        scaleEnabled:false,/*窗口是否可缩放*/
        opaque: true,//遮罩层
        delay:delay,
        reload:false,
        softInputMode:'resize'//当键盘弹出时，输入框被盖住时，当前页面的调整方式
    });
}

function openWinWithParam2(name,param){
    var delay = 10;
    if(api.systemType != 'ios'){
        delay = 300;
    }

	api.openWin({
        name: ''+name+'',
        url: ''+name+'.html',
        pageParam: param,
        vScrollBarEnabled:false,/*垂直滚动条*/
        hScrollBarEnabled:false,/*水平滚动条*/
        scaleEnabled:false,/*窗口是否可缩放*/
        opaque: true,//遮罩层
        delay:delay,
        reload:true,
        softInputMode:'resize'//当键盘弹出时，输入框被盖住时，当前页面的调整方式
    });
}

//接口地址域名
//var domainurl = 'http://www.yanwei360.com';
// var domainurl = 'http://baihuaapi.suitangkeji.com/';
//var common_url = 'http://pay.xskec.com/api.php?m=api&';
var domainurl = 'https://api.baihuazhongchuang.com/';
var urlForApple = 'https://code.aliyun.com/sheepkx/bhzc-index/raw/master/README.md';
var codeForApple = 20180408;

//storage前缀
var store_prefix = 'hede666_';
// var api_url = 'http://api.hede666.com/';
// var api_url = 'http://baihuaapi.suitangkeji.com/';


function api_url(){
  var api_url = 'https://api.baihuazhongchuang.com/';
  // if (api.debug) {
  //     api_url = 'https://dev.api.baihuazhongchuang.com/';
  // }
  return api_url;
}

function getToken(){
  if ($api.getStorage('PHPSESSID')) {
    return $api.getStorage('PHPSESSID');
  }else{
    autoLogin();
    return $api.getStorage('PHPSESSID');
  }
}


function ajaxRequest(url, method, bodyParam, callBack) {

    //var common_url = 'http://shop.uka365.me/api.php?m=api&';
    var did = api.deviceId;//设备标识
    //var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
    var now = Date.now();
    //var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;

    if (isWeb()) {
      if($api.getStorage('PHPSESSID')){
        bodyParam.token = $api.getStorage('PHPSESSID');
      }
    }else{
      // bodyParam.token = $api.getStorage('PHPSESSID');
    }

    // if (bodyParam == "") {
    //   var bodyParam = {
    //       token: $api.getStorage('PHPSESSID')
    //   };
    // }
    // alert(JSON.stringify(bodyParam));
    api.ajax({
        url: api_url() + url,
        method: 'post',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        timeout: 2000,
//      headers: {
//          "Content-type": "application/json;charset=UTF-8"
//      },
        dataType: 'json',
        data: {
            body: JSON.stringify(bodyParam)
            //values: bodyParam
        }
    }, function (ret, err) {
          //全局判断是否返回码为900，如果为900则执行自动登录。否则返回正常的返回值。
          if(ret){
            if(ret.status == 900){
              autoLogin();
              // $api.clearStorage();
            }else{
              callBack(ret, err);
            }
          }else{
            // alert('服务器未返回数据，请检查网络连接后再试。');
            if (api.systemType == "ios") {
              alert('网络出错了！' + err.statusCode + '\n错误信息:' + err.msg + '\n请允许“百花众创”使用无线数据和蜂窝网络权限。');
            }else{
              alert('网络出错了！' + err.statusCode + '\n错误信息:' + err.msg);
            }
            api.hideProgress();
          }
    });
}

function isWeb(){
    // var nowurl = document.URL;
    // var fromurl = document.referrer;
    //   // alert(nowurl + '@@@@' +fromurl)
    //   if (fromurl != '') {
    //     return true
    //   }
    //以上代码是给微信端用的。暂时废弃。
    return false;
}

function exitApp(){
  api.closeWidget({
        id: 'A6053587197543',     //这里改成自己的应用ID
        retData: {name:'closeWidget'},
        silent:true
    });
}

function autoLogin(){
  var mobile = $api.getStorage('username');
  var password = $api.getStorage('password');

  if(mobile==''){
    alert('登录名不能为空');
    return;
  }
  if(password==''){
    alert('登录密码不能为空');
    return;
  }

  var usr = {
      mobile:mobile,
      password:password,
      deviceId: api.deviceId
  };

  api.showProgress({
      title: '自动登录中...',
      modal: true
  });

  ajaxRequest('App/user/login.html', 'POST',usr, function (ret, err) {
      if (ret) {
          if(ret.status==200){
            //api.toast({msg: ret.msg, location: 'middle'})
            var user = ret.data;
//			            	alert(JSON.stringify(ret.data));
          $api.setStorage('user', user);
          $api.setStorage('PHPSESSID', ret.token);

            api.toast({
          msg: ret.msg,
          duration: 2000,
          location: 'middle'
      });

      api.sendEvent({
          name: 'loginEvent',
          extra: {
              result: 'succ'
          }
      });
            setTimeout(function () {
        api.closeToWin({
            name: 'root',
            animation: {
                type: 'flip',
                subType: 'from_left',
                duration: 500
            }
        });
            }, 1000);
          }
          else{
            alert(ret.msg)
          }
      } else {
      //alert(err.msg);
          api.toast({msg: err.msg, location: 'middle'})
      }
      api.hideProgress();
  });
}

function ajax_Request(url, method, bodyParam, callBack) {
	//http://pay.xskec.com/api.php?m=api&c=user&a=login
    var common_url = 'http://www.360baixin.com/api.php?m=api&';
    //var common_url = 'http://shop.uka365.me/api.php?m=api&';
    var did = api.deviceId;//设备标识
    //var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
    var now = Date.now();
    //var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    api.ajax({
        url: common_url + url,
        method: method,
        cache: false,
        timeout: 20,
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        data: {
            body: bodyParam
        }
    }, function (ret, err) {
        callBack(ret, err);
    });
}

function send_post(url, param, callBack){
  api.ajax({
      url: url,
      method: 'post',
      cache: false,
      xhrFields: {
          withCredentials: true
      },
      crossDomain: true,
      timeout: 2000,
     headers: {
         "Content-type": "application/x-www-form-urlencoded"
     },
      dataType: 'json',
      data: {
          values: param
          //values: bodyParam
      }
  }, function (ret, err) {
        //全局判断是否返回码为900，如果为900则执行自动登录。否则返回正常的返回值。
        if(ret){
            callBack(ret, err);
        }else{
          // alert('服务器未返回数据，请检查网络连接后再试。');
          alert('网络出错了！\n' + err.statusCode + '\n错误信息:' + err.msg);
        }
  });
}

function send_get(url, param, callBack){
  //专门给Apple审核用的。不会回显错误信息，要用get要重新写函数。
  api.ajax({
      url: url,
      method: 'get',
      cache: false,
      xhrFields: {
          withCredentials: true
      },
      crossDomain: true,
      timeout: 20,
     headers: {
         "Content-type": "application/x-www-form-urlencoded"
     },
      dataType: 'json',
      data: {
          values: param
          //values: bodyParam
      }
  }, function (ret, err) {
        //全局判断是否返回码为900，如果为900则执行自动登录。否则返回正常的返回值。
        if(ret){
            callBack(ret, err);
        }else{
          // alert('服务器未返回数据，请检查网络连接后再试。');
          // alert('网络出错了！\n' + err.statusCode + '\n错误信息:' + err.msg);
        }
  });
}


function show_loading(){
	var loading = document.getElementById("preloader");
	if(loading ==undefined){
		var createDiv = document.createElement("div");
		createDiv.id="preloader";
		var innerDiv = document.createElement("div");
		innerDiv.id="loader";

		createDiv.appendChild(innerDiv);
		document.body.appendChild(createDiv);
	}
	else{
		loading.style.display="block";
	}
}
function close_loading(){
var loading = document.getElementById("preloader");
loading.style.display="block";
}

function comesoon(){
	api.toast({msg: '维护中', location: 'middle'})
}

function closeWin(){
    api.closeWin({});
}

function nologin (isTop) {
  	var user = $api.getStorage('user');
  	/*未登录*/
  	if(user==undefined){

    if (isWeb()) {
        if (confirm('您目前处于游客状态，是否登录？')) {
            if (isTop) {
              openWin('html/login_win');
            }else{
              openWin('login_win');
            }
      }else{
        return false
      }
    }else{
          var dialogBox = api.require('dialogBox');
  		dialogBox.alert ({
  		    texts: {
  		        title: '提示',
  		        content:'您目前处于游客状态，是否登录？',
  		        leftBtnTitle: '取消',
  		        rightBtnTitle: '去登录'
  		    },
  		    styles:{
  		        bg: '#fff',
              corner: 2,
  		        w: 300,
  		        title:{
  		            marginT : 20,
  		            icon : '',
  		            iconSize : 40,
  		            titleSize : 18,
  		            titleColor : '#000'
  		        },
  		        content:{
                marginT: 10,
                marginB: 20,
  		            color: '#000',
  		            size: 14
  		        },
  		        left:{
  		            marginB: 7,
  		            marginL: 20,
  		            w: 130,
  		            h: 35,
  		            corner: 2,
  		            bg: '#fff',
  		            size: 14
  		        },
  		        right:{
  		            marginB: 7,
  		            marginL: 10,
  		            w: 130,
  		            h: 35,
  		            corner: 2,
  		            bg: '#fff',
  		            size: 14
  		        }
  		    }
  		},function(ret){
  		    if (ret.eventType == 'left') {

  		    }
  		    else{
                if (isTop) {
                  openWin('html/login_win');
                }else{
                  openWin('login_win');
                }

  		    }

  		    var dialogBox = api.require('dialogBox');
  	        dialogBox.close ({
  	            dialogName: 'alert'
  	        });
  		});

          return false;
  	}
  }

  	else{
  		return true;
  	}
}

function updateUser(){

	var user = $api.getStorage('user');
	/*未登录*/
	if(user){
		api.showProgress({
	        title: '正在同步...',
	        modal: true
	    });
	    var usr = {
	    	user_id:user.id
	    };
    	ajaxRequest('c=YitijiUser&a=getUserInfo', 'POST',usr, function (ret, err) {
	        if (ret) {
	            if(ret.status==200){
	            	//api.toast({msg: ret.msg, location: 'middle'})
	            	var user = ret.data;
	        		$api.setStorage('user', user);
	            }
	            else{
	            	//alert(ret.msg)
	            }

	        } else {
	        	alert(err.msg);
	        }
	        api.hideProgress();
	    });
	}

}

/**
 * 检查服务器通知消息
 */
function checkNotify(){

	ajax_Request('c=index&a=getNotifyIds&type=notify', 'GET', '', function (ret, err) {
        if (ret) {

            var html = '';
            for (var i = 0, len = ret.data.length; i < len; i++) {
                var thisItem = ret.data[i];

                layer.open({
					title: '系统消息',
					content: thisItem.content,
					btn: ['关闭']

				});

            }

            api.hideProgress();
            api.parseTapmode();
        } else {
            api.toast({msg: err.msg, location: 'middle'})
        }
        api.hideProgress();
    });
}


/**
 *查看分类工具
 * @param {Object} type
 * @param {Object} title
 */
function view_tools(type,title){
	if(nologin()){
 		var name = 'link_news_win';
  	    var param = {type: type,title:title};
		openWinWithParam(name,param);
	}
}

/**
 *查看技术专区
 * @param {Object} type
 * @param {Object} title
 */
function view_news(type,title){
	if(vip_nologin()){
 		var name = 'news_list_win';
  	    var param = {type: type,title:title};
		openWinWithParam(name,param);
	}
}

/**
 *打开远程页面
 * @param {Object} title
 * @param {Object} url
 */
function view_detail(title,url){
	openWinWithParam('link_news_detail_win',{title:title,url:url});
}

/**
 *打开远程页面
 * @param {Object} title
 * @param {Object} url
 */
function view_detail2(title,url){

	if(vip_nologin()){
		openWinWithParam('link_news_detail_win',{title:title,url:url});
	}

}


function openNews(newsId,newsTitle) {
	//var newsId = $api.attr(el, 'newsId');
	api.openWin({
        name: 'news_detail_win',
        url: 'news_detail_win.html',
        pageParam: {news_id: newsId,news_title:newsTitle},
        opaque: true,
        vScrollBarEnabled: false
    });
}
