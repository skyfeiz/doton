this.foton = this.foton || {};
(function(){
  var mcPhoneModify = function(){
    this.init();
  };
  var p = mcPhoneModify.prototype;
  p.init = function(){
    this.initEvent();
    this.initDom();
    this.initPhoneNum();
    this.MessageJudge();
  };
  p.initDom = function(){
    this.$inMark = $(".input_mark input");
    this.$phone = $(".input_phone input");
    this.$mark = $(".input_mark span");
    this.mobilePattern = /^(0|86|17951)?(1[3-8])[0-9]{9}$/;
    this.ifSure = false;
  };
  p.initEvent = function(){
    //按钮处理
    var cur = this;
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
    	          $(".input_phone .message_part").show();
    	          isOk=true;
    	          layer.closeAll();
    	        }
    	      });
    });
    //点击保存
    var isOk = true;
    $("a.message_save").on("click",function(){
      cur.$phone.trigger("blur");
      if(cur.$phone.siblings(".i-status").css("display")=="none"){
        $(document).find("html,body").animate({scrollTop: "0px"},800);
        return false;
      };
      if(cur.ifSure == false){
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
      if(isOk){
        isOk = false;
      }else{
        return false;
      }
        //加载遮罩层
        new foton.LayerWinUse().load();
      $.ajax({
        url:$mcBaseUrl + "MemberCenter/modifyTel",
        type:"post",
        data:{"mtel":cur.$phone.val(),"usercode":cur.$inMark.val()},
        success:function(data){
          if(data.status=="0"){
            isOk = false;
            new foton.LayerWinUse().alerts("修改成功","reload");
          }else{
            isOk = true;
            new foton.LayerWinUse().alerts(data.data);
          };
        },
        error:function(){
          isOk = true;
          new foton.LayerWinUse().alerts("信息提交失败");
        }
      });
    });
  };

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
        $(".input_phone .message_part").hide();
        $(".input_phone .error_warn").show().find("p").text("手机号格式错误");
        cur.$phone.siblings(".i-status").hide();
      }else{
        arrLen.push(phoneVal);
        $(".input_phone .error_warn").hide();
          //验证手机号码是否已经注册过
          $.ajax({
            url: $mcBaseUrl + "login/verifymtel",
            type:"post",
            data:{"mtel":phoneVal},
            success:function(data){
              if(data.status == "0"){
                cur.$phone.siblings(".i-status").show();
                cur.ifSure = true;
              }else{
                  $(".input_phone .message_part").hide();
              $(".input_phone .error_warn").show().find("p").text(data.data);
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
  });

};
  foton.mcPhoneModify = mcPhoneModify;
})();
