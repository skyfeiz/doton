this.foton = this.foton || {};
(function(){
  var passwordResert = function(){
    this.init();
  };
  var p = passwordResert.prototype;
  p.init = function(){
    this.initEvent();
    this.initDom();
    this.initPhoneNum();
    this.initPassword();
    this.MessageJudge();
    //密码强度
    this.passWordStrong();
  };
  p.initDom = function(){
    this.$inMark = $(".input_mark input");
    this.$phone = $(".input_phone input");
    this.$pass = $(".input_pass input");
    this.$passResert = $(".input_surePass input");
    this.$mark = $(".input_mark span");
    this.mobilePattern = /^(0|86|17951)?(1[3-8])[0-9]{9}$/;
    this.ifSure = false;
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
          cur.$phone.prop("disabled",false);
          $(".main_part input").val("");
          $(".input_pass i.error_icon").removeClass("passlow passhigh passcenter").siblings("p").text("请输入密码").css({"color":"#e22"});
          $(".input_box .i-status").hide();
          $(".input_box .error_warn").hide();
          isOk=true;
          layer.closeAll();
        }
      });
   });
    //点击保存
    $("a.message_save").on("click",function(){
      cur.$phone.trigger("blur");
      if(cur.$phone.siblings(".i-status").css("display")=="none"){
        $(document).find("html,body").animate({scrollTop: "0px"},800);
        return false;
      };

     //验证码验证
     if(cur.$mark.siblings(".error_warn").css("display") != "none"){
       $(document).find("html,body").animate({scrollTop: "60px"},800);
       return false;
     }else if($.trim(cur.$inMark.val())==""){
       $(document).find("html,body").animate({scrollTop: "60px"},800);
       cur.$mark.siblings(".error_warn").show().find("p").text("请输入验证码");
       return false;
     }

      //密码验证
      cur.$pass.trigger("blur");
      if(cur.$pass.siblings(".i-status").css("display")=="none"){
        $(document).find("html,body").animate({scrollTop: "120px"},800);
        return false;
      };

      //重置密码验证
      //cur.$passResert.trigger("keyup");
      cur.$passResert.trigger("keyup");
      if(cur.$passResert.next().css("display")=="block"){
        $(document).find("html,body").animate({scrollTop: "120px"},800);
        return false;
      };
      if(isOk){
        isOk = false;
      }else{
        return false;
      };

			var mtel =  $("#mtel").val();
			var psw = $("#newPass").val();
        //加载遮罩层
        new foton.LayerWinUse().load();
      $.ajax({
        url:$mcBaseUrl + "login/resetPwd",
        type:"post",
        data:{"mtel":mtel,"password":psw},
        success:function(data){
          if(data.status=="0"){
            isOk =false;
            var newUrl = "/webback/bottom/login";
            new foton.LayerWinUse().alerts("密码重置成功",{"url":newUrl});
          }else if(data.status=="1002"){
              isOk = true;
              new foton.LayerWinUse().alerts("用户不存在");
              $(".input_phone .i-status").hide();
              $(".input_mark .i-status").hide();
              $("#nameMark").val("");
          }
          else{
            isOk = true;
            new foton.LayerWinUse().alerts("密码重置失败");
          }
        },
        error:function(){
        	isOk = true;
            new foton.LayerWinUse().alerts("提交失败");
        }
      });
    });
  };
  p.layerAlert = function(title){
      layer.open({
        title:[
            '提示',
            'background-color: #0065b3;color: #fff;font-size: 16px;'
            ],
        closeBtn: 0, //不显示关闭按钮
        shadeClose: true, //开启遮罩关闭
        content: title
      });
  }
  //手机号验证/只验证一次
  p.initPhoneNum = function(){
   var cur = this;
    //手机号码输入超过11位截掉
    cur.$phone.keydown(function(){
     if($(this).val().length >11) {
       var leaveLen = $(this).val().substring(0,11);
       $(this).val(leaveLen);
     }
   });
    var arrLen = [];
    cur.$phone.blur(function(){
      var phoneVal = $.trim(cur.$phone.val());
      if(arrLen[0] !=""){
        if(arrLen.length){
          if(arrLen[0] == phoneVal){
            return;
          }else{
            arrLen[0]=phoneVal;
          }
        }
      }
   if(cur.mobilePattern.test(phoneVal)==false){
        $(".input_phone .error_warn").show().find("p").text("手机号格式错误");
        cur.$phone.siblings(".i-status").hide();
      }else{
          cur.$phone.siblings(".i-status").show();
        arrLen.push(phoneVal);
        $(".input_phone .error_warn").hide();
        //验证手机号码是否已经注册过
        $.ajax({
          url: $mcBaseUrl + "login/verifymtel",
          type:"post",
          data:{"mtel":phoneVal},
          success:function(data){
            if(data.status == "1"){
              cur.$phone.siblings(".i-status").show();
              cur.ifSure = true;
            }else{
              $(".input_phone .error_warn").show().find("p").text("该用户不存在");
              cur.$phone.siblings(".i-status").hide();
              cur.ifSure = false;
            }
          }
        });
        }
      });
  };
  //密码处理
  p.initPassword = function(){
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
//短信验证
  p.MessageJudge = function(){
    var cur = this;
    cur.$mark.on("click",function(){
      var phoneVal = $.trim(cur.$phone.val());
      if(phoneVal == ""){
        cur.$phone.next().show();
      }
      if($(this).attr("disabled")=="disabled"){
       return false;
     }
     if($(".input_phone .i-status").css("display")!=="none"){
       var num=60;
       cur.$mark.attr("disabled","disabled");
       cur.$mark.attr("isClick","ok");
       cur.$mark.addClass("btn-code-disable");
       cur.$mark.text(num+"s后重新获取");
       num--;
       timeCount(cur,num);
     }else{
      return false;
    }
    $.ajax({
        url: $mcBaseUrl + "login/sendCode",
        type:"post",
        data:{"mtel":phoneVal,"x":1},
      dataType:"json",
      success:function(data){
       if(data.status == 0){
        cur.$phone.prop("disabled",true);
       }else{
         cur.$mark.siblings(".i-status").hide();
         cur.$mark.siblings(".error_warn").show().find("p").text(data.data);
       }
     }
   });
  });
    //倒计时方法
    function timeCount(cur,num){
      if(num<0){
       cur.$mark.removeAttr("disabled","");
       cur.$mark.removeClass("btn-code-disable");
       cur.$mark.text("获取验证码");
       return;
     }
     setTimeout(function(){
      cur.$mark.text(num+"s后重新获取");
      num--;
      timeCount(cur,num--);
    },1000);
   }
   this.initMessageBlur();
  };
  p.initMessageBlur = function(){
    var cur = this;
    var arrLen = [];
    $(".input_mark input").blur(function(){
      if($.trim(cur.$phone.val())==""){
            cur.$mark.siblings(".error_warn").show().find("p").text("请输入手机号");
            return false;
        }else if($.trim(cur.$inMark.val()) =="" ){
            cur.$mark.siblings(".error_warn").show().find("p").text("请输入验证码");
            return false;
        }else if(!/^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test($.trim(cur.$inMark.val()))){
          cur.$mark.siblings(".error_warn").show().find("p").text("请输入数字");
          return false;
        }else if($.trim(cur.$inMark.val()).length != 6){
          cur.$mark.siblings(".error_warn").show().find("p").text("请输入6位数字");
          return false;
        }else{
          cur.$mark.siblings(".error_warn").hide();
        };
        var markVal = $.trim(cur.$inMark.val());
        if(arrLen.length){
          if(arrLen[0] == markVal){
            return;
          }else{
            arrLen[0]=markVal;
          };
        };
        arrLen.push(markVal);
        var markCon = $(".input_mark input").val();
        var phoneNum = $(".input_phone input").val();
        if($.trim(markCon) == ""){
          return false;
        }
        $.ajax({
            url:$mcBaseUrl +"login/verifyCode",
            type:"post",
            data:{"usercode":markCon,"mtel":phoneNum},
            dataType:"json",
          success:function(data){
            if(data.status == "0"){
              cur.$mark.siblings(".i-status").show();
              cur.$mark.siblings(".error_warn").hide();
            }else{
              cur.$mark.siblings(".i-status").hide();
              cur.$mark.siblings(".error_warn").show().find("p").text(data.data);
            };
          }
        });
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
}
foton.passwordResert = passwordResert;
})();
