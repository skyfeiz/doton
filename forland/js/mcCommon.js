
this.foton = this.foton || {};

//var $mcBaseUrl = window.$mcBaseUrl || {};
//$mcBaseUrl = 'http://' + document.location.host + '/webback/';
//$mcBaseUrl = 'http://172.24.222.8:8080/webback/';
(function(){
  var mcCommon = function(){
    this.init();
  };
  var p = mcCommon.prototype;
  p.init = function(){
    this.judgeLoad();
  };
  //判断登录状态

  p.judgeLoad = function() {
    var cur = this;
    if(!$(".loginPanel").length){
      cur.initAllDom();
    }
    $.ajax({
      url: $mcBaseUrl + "login/getstatus",
      type:"get",
      dataType:"json",
      success:function(data){
        if(data.status == "0"){
         if(!$(".mcuser").length){
             //生成结构
             cur.initDomUser(data);
           }
         }else if(data.status == "1"){
          //window.location.href ="/webback/bottom/login"
        }
      }
    });
  };
  p.initDomUser = function(data){
    $(".loginPanel").children().remove();
    var $loginPanelChildren = $('<div class="mcuser"><p class="userName">'+data.data+'</p></div><div class="line"></div>'
      + '<div class="title"><a href="javascript:mcLogout()">退出登录</a></div>'
      + '<div class="line"></div>'
      + '<div class="title"><a class="onlineservice">在线客服</a></div>'
      );
    $(".loginPanel").append($loginPanelChildren);
    $(".mcuser").find("p.userName").bind("click",function(e) {
      window.location.href = "/webback/memberreview/selfmessage"
    });
  }
  p.initAllDom = function(){
    var $loginPanel = $('<div class="loginPanel">'
      + '<div class="title"><a href="/webback/bottom/regist">注册</a></div>'
      + '<div class="line"></div>'
      + '<div class="title"><a href="/webback/bottom/login">登录</a></div>'
      + '<div class="line"></div>'
      + '<div class="title"><a class="onlineservice">在线客服</a></div>'
      + '</div>'
      );
    $(".header").append($loginPanel);
  }
  foton.mcCommon = mcCommon;
})();

    //退出登录的方法
    function mcLogout(){
        //先删除cookie在调后端的退出方法
        $.cookie('foton_access_token','',{path: '/',expires:-1});
        $.ajax({
          url : $mcBaseUrl+ "MemberCenter/logout",
          type : "get",
          success : function(data) {
            window.location.href = "/webback/bottom/login";
          }
        });
      }

  //关闭当前窗口方法
  (function(){
    var CloseCurrWin = function(){
      this.init();
    }
    var p = CloseCurrWin.prototype;
    p.init = function(){
      this.initEvent();
    }
    p.initEvent = function(){
     if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
       window.opener = null;
       window.close();
     } else {
       window.open('', '_top');
       window.top.close();
     }
   }
   else if (navigator.userAgent.indexOf("Firefox") > 0) {
    window.location.href = 'about:blank ';
    window.open('','_parent','');
    window.close();
  } else {
    window.opener = null;
    window.open('', '_self', '');
    window.close();
  }
}
foton.CloseCurrWin = CloseCurrWin;
})();



  //打开窗口的方法
  (function(){
    var LayerWinUse = function(){
    }
    var p  = LayerWinUse.prototype;
    p.load = function(){
      if("undefined" != typeof layer){
        layer.load(1, {
            shade: [0.4,'#000000'] //0.1透明度的白色背景
          });
      };
    }
    p.alerts = function(content,boolValue){
      if("undefined" != typeof layer){
       layer.open({
         title:[
         '提示',
         'background-color: #0065b3;color: #fff;font-size: 16px;'
         ],
         closeBtn: 0, //不显示关闭按钮
         content: content,
         yes:function(){
          layer.closeAll();
          if(boolValue=="reload"){
           window.location.reload();
         }else if(boolValue){
          if(typeof boolValue != "string"){
            window.location.href = boolValue.url;
          }
         }
       }
     });
     }else{
      alert(content);
    }
  }
  foton.LayerWinUse = LayerWinUse;
})();
