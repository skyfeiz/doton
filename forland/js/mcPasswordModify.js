this.foton = this.foton || {};
(function(){
  var mcPasswordModify = function(){
    this.init();
  };
  var p = mcPasswordModify.prototype;
  p.init = function(){
    this.initEvent();
    this.initDom();
    this.initPassword();
    //密码强度
    this.passWordStrong();
  };
  p.initDom = function(){
    this.$oldPass = $(".input_oldpass input");
    this.$pass = $(".input_pass input");
    this.$passResert = $(".input_surePass input");
  };
  p.initEvent = function(){
    //按钮处理
    var cur = this,isOk = true;
    $("a.message_qure").on("click",function(){

     layer.open({
      title: [
      '提示',
      'background-color: #0065b3;color: #fff;font-size: 16px;'
      ],
      content: '点击确认后，清空所填写的内容，请慎重操作',
      btn: ['确认','取消'],
      yes:function(){
          //晴空所有的内容
          isOk=true;
          $(".main_part input").val("");
          $(".input_pass i.error_icon").removeClass("passlow passhigh passcenter").siblings("p").text("请输入密码").css({"color":"#e22"});
          $(".input_box .i-status").hide();
          $(".input_box .error_warn").hide();
          layer.closeAll();
        }
      });
   });
    //点击保存
    $("a.message_save").on("click",function(){
      cur.$oldPass.trigger("blur");
      if(cur.$oldPass.siblings(".error_warn").css("display")!=="none"){
        return false;
      }
      cur.$pass.trigger("blur");
      if(cur.$pass.siblings(".i-status").css("display")=="none"){
        return false;
      };
      //cur.$passResert.trigger("keyup");
      cur.$passResert.trigger("keyup");
      if(cur.$passResert.next().css("display")=="block"){
        return false;
      };
      if(isOk){
        isOk = false;
      }else{
        return false;
      };
        //加载遮罩层
        new foton.LayerWinUse().load();
        $.ajax({
          url:$mcBaseUrl+"MemberCenter/modifyPwd",
          type:"post",
          data:{"oldPassword":cur.$oldPass.val(),"newPassword":$("#newPass").val()},
          success:function(data){
            if(data.status == 0){
            	isOk=false;
            	new foton.LayerWinUse().alerts("修改成功","reload");
           }else{
        	   isOk=true;
        	   new foton.LayerWinUse().alerts(data.data);
           };
         },
         error:function(){
	      	 isOk=true;
        	 new foton.LayerWinUse().alerts("提交失败");
         }
       });
    });
  };
  //密码处理
  p.initPassword = function(){
    var cur = this;
    //原密码处理验证的时机、验证长度，
    var arrLen = [];
    cur.$oldPass.blur(function(){
      var markVal = cur.$oldPass.val();
      if(cur.$oldPass.val()==""){
        cur.$oldPass.next().show().find("p").text("请输旧入密码");
      }else if(cur.$oldPass.val().length < 6){
        cur.$oldPass.next().show().find("p").text("长度只能在6-20个字符之间");
      }else if(cur.$oldPass.val().length > 20){
        cur.$oldPass.next().show().find("p").text("长度只能在6-20个字符之间");
        cur.$oldPass.siblings(".i-status").hide();
      }else{
        cur.$oldPass.next().hide();
        passVal[0] = cur.$oldPass.val();
      }
      //验证

      if(cur.$oldPass.next().css("display") == "none"){
        if(arrLen[0] != ""){
          if(arrLen.length){
            if(arrLen[0] == markVal){
              return;
            }else{
              arrLen[0]=markVal;
            }
          }
        }
        arrLen.push(markVal);
      }
    });


    //验证密码长度，只要长度大于6并且随意字符丢可以
    var cur = this;
    var passVal = [];
    cur.$pass.blur(function(){
      if(cur.$pass.val()==""){
        cur.$pass.next().show().find("p").text("请输入密码");
      }else if(cur.$pass.val().length < 6){
        cur.$pass.next().show().find("p").text("长度只能在6-20个字符之间");
      }else if(cur.$pass.val().length > 20){
        cur.$pass.next().show().find("p").text("长度只能在6-20个字符之间");
        cur.$pass.siblings(".i-status").hide();
      }else{
        passVal[0] = cur.$pass.val();
      }
    });

    cur.$passResert.blur(function(){
      if(cur.$pass.val()==""){
        cur.$pass.next().show().find("p").text("请输入密码");
        cur.$passResert.siblings(".i-status").hide();
      }else if(cur.$passResert.val()==""){
        cur.$passResert.next().show().find("p").text("请再次输入密码");
        cur.$passResert.siblings(".i-status").hide();
      }
    });
    cur.$passResert.keyup(function(){
      if(cur.$passResert.val()==""){
        cur.$passResert.next().show().find("p").text("请再次输入密码");
        cur.$passResert.siblings(".i-status").hide();
      }
      if(cur.$passResert.val()==passVal){
        cur.$passResert.next().hide();
        cur.$passResert.siblings(".i-status").show();
      }else if(cur.$passResert.val()!=passVal){
        cur.$passResert.next().show().find("p").text("两次密码输入不一致");
        cur.$passResert.siblings(".i-status").hide();
      }
    });
  };
  //密码强度验证
  p.passWordStrong = function(){
    $("#newPass").keydown(function(e){
      var e = e || window.event;
      var k = e.keyCode || e.which;
    });
    $("#newPass").keyup(function(e){
      var e = e || window.event;
      var k = e.keyCode || e.which;
      if(k!==16){
        var passVal = $(this).val();
        passwordStrong(passVal);
      }
    });
    function passwordStrong(passVal){
      var arrLen = [];
      var $err_icon = $(".input_pass i.error_icon");
      if(passVal.length >= 6){
      //判断是否有小写字母
      var haveNum = /[0-9]/.test(passVal);
      var haveBig = /[a-z]/.test(passVal);
      var haveSml = /[A-Z]/.test(passVal);
      var haveSpe = /[`~!@#$^&*()_.=|{}':;',\\[\\]/.test(passVal);
      if(haveNum){
        arrLen.push(1);
      }if(haveBig){
        arrLen.push(2);
      }if(haveSml){
        arrLen.push(3);
      }if(haveSpe){
        arrLen.push(4);
      }
      $(".input_pass input").next().show();
      $(".input_pass input").siblings(".i-status").show();
      $err_icon.siblings("p").css({"color":"#c5c5c5"});
      var le = arrLen.length;
      switch(le){
        case 1:
        $err_icon.removeClass(" passcenter passhigh").addClass("passlow").siblings("p").text("有被盗风险,建议使用字母、数字和符号两种及以上组合");
        break;
        case 2:
        $err_icon.removeClass("passlow  passhigh").addClass("passcenter").siblings("p").text("安全强度适中，可以使用三种以上的组合来提高安全强度");
        break;
        case 3:
        case 4:
        $err_icon.removeClass("passlow passcenter ").addClass("passhigh").siblings("p").text("你的密码很安全");
        break;
        default:
        $err_icon.removeClass("passlow passhigh passcenter");
      }
    }else{
      $(".input_pass input").siblings(".i-status").hide();
      $err_icon.removeClass("passlow passhigh passcenter").siblings("p").text("长度只能在6-20个字符之间").css({"color":"#e22"});
    }
  }
};
foton.mcPasswordModify = mcPasswordModify;
})();
