this.foton = this.foton || {};
(function(){
  var selfMessageModify = function(){
    this.init();
  }
  var p = selfMessageModify.prototype;

  p.init = function(){
    this.initCont();
    this.initDate();
    this.initRadio();
    this.initBtn();
    new foton.mcHandlePCCA().getProvince();
    new foton.dropItems();
  }
  p.initCont = function(){
	  var cur = this;
    //var data.FTSTATE + " "+data.FTCITY + " "+data.FTDISTRICT
    //console.log(new foton.mcHandlePCCA().initCertificate("身份证"));
    $.ajax({
    	url:$mcBaseUrl + "MemberCenter/getUserInfo",
        type:"get",
        success:function(data){
    	  if(data.status == 0){
    		  var data = data.data;
    		    $(".self_num span.needFill").text(data.MEMBERNUMBER);

            if(data.FTCELLPHONE && data.FTCELLPHONE !== undefined){
              var $hideFourPos = data.FTCELLPHONE.substring(0,3)+"****"+ data.FTCELLPHONE.substring(8);
              $(".self_phone span.needFill").text($hideFourPos);
            }
    	        $(".self_grade span.needFill").text(data.TIER);
    	        $(".self_score span.needFill").text(data.POINTVALUE);
              //姓名
              if(typeof data.CHILD_TABLE_LIST !=="string"){
                cur.initTable(data.CHILD_TABLE_LIST);
              }

              $(".item input.name").val(data.NAME);
              //单选框
              var sexCn = new foton.mcHandlePCCA().initSex(data.MF);
              $(".radio_sex label").eq(sexCn).trigger("click");
              //证件
              var certificateTypeCont = data.FTIDTYPE == "" ? "请选择" :data.FTIDTYPE;
              $(".item .certificateType span").text(certificateTypeCont);
              $(".item input.certificateType_num").val(data.IDNUM);
              //省市县
              new foton.mcHandlePCCA().initFillTab(data.FTSTATE,data.FTCITY,data.FTDISTRICT)
              //$(".item span.place").text(data.FTSTATE + " "+data.FTCITY + " "+data.FTDISTRICT );
              //地址、邮件
              $(".item input.address").val(data.FTSTREADDR);
              $(".item input.postcode").val(data.FTPOSTAL);
              //邮箱
              $(".item input.mcEmail").val(data.EMAILADDRESS);
              //民族\
             var nationCont = data.FTNATIONAL == "" ? "请选择" :data.FTNATIONAL;
              $(".item .nation span").text(nationCont);
              //生日
              $(".item #birthDate").text(data.BIRTHDATE);
              //婚否
              //$(".item span.if_marriage").text(data.MARITALSTA);
              var marriageStatus = new foton.mcHandlePCCA().initMarriage(data.MARITALSTA);
              $(".radio_marriage label").eq(parseInt(marriageStatus)).trigger("click");
              //直接填充
              $(".item #marriageSpan").text(data.FTWEDATE);
              var getMoneyCont = data.FTINCOME == "" ? "请选择" :data.FTINCOME;
              $(".item .getMoney span").text(getMoneyCont);
              var professionCont = data.FTINDUSTRY == "" ? "请选择" :data.FTINDUSTRY;
              $(".item .profession span").text(professionCont);
              $(".item input.hobby").val(data.HOBBY);
    	  };
      }
    });
  }
  //按钮处理
  p.initBtn = function(){
    //调用弹窗插件
    $("a.message_qure").on("click",function(){
      layer.open({
        title: [
        '提示',
        'background-color: #0065b3;color: #fff;font-size: 16px;'
        ],
        content: '点击确认后，页面数如的内容不能提交',
        btn: ['确认','取消'],
        yes:function(){
        	window.location.href="/webback/memberreview/selfmessage";
          var isSure = true;
          layer.closeAll();
        }
      });
    });
    var isSure = true;
    $("a.message_save").on("click",function(){

      //邮箱验证
      var $mail = $("input.mcEmail").val();
      if(new foton.mcHandlePCCA().initTestMail($mail)){
        $("input.mcEmail").siblings(".error_warn").hide();
      }else{
        $("input.mcEmail").siblings(".error_warn").show();
        $(document).find("html,body").animate({scrollTop: "250px"},800);
        return false;
      }
      //证件号验证
      if(new foton.mcHandlePCCA().initTestCerti()){
        $(".certificateType_num").next().hide();
      }else{
        $(".certificateType_num").next().show().find("p").text("证件号格式错误");
        $(document).find("html,body").animate({scrollTop: "300px"},800);
        return false;
      }

      if($(".certificateType span").text() == "请选择" && $("input.certificateType_num").val() !="" ){
        $(".certificateType_num").next().show().find("p").text("请选择证件类型");
        $(document).find("html,body").animate({scrollTop: "300px"},800);
        return false;
      }else{
        var $certificateNum = $(".certificateType span").text() == "请选择" ? "" : $("input.certificateType_num").val();
        $(".certificateType_num").next().hide();
      }

      //邮编验证
      if($(".postcode").val()!="" && /^[0-9]\d{5}$/.test($(".postcode").val())==false ){
        $(".postcode").next().show();
        $(document).find("html,body").animate({scrollTop: "350px"},800);
        return false;
      }else{
        $(".postcode").next().hide();
      }
      //婚姻必须先结婚才能选择年月
      if($("#marriage span").text() !="" &&  ($(".radio_marriage label input:checked").val() == undefined || $(".radio_marriage label input:checked").val() == "Unmarried")){
        $("#marriage").next().show().find("p").text("只有已婚才可以选择");
        return false;
      }else{
        $("#marriage").next().hide();
      }

      //日期处理
      var birthDateVal = $("#birthDays span").text();
      var marriageDateVal = $("#marriage span").text();
      var birthDate = new foton.mcHandlePCCA().dateJudge(birthDateVal);
      if(birthDateVal){
        if(!birthDate){
          $(".birth .error_warn").show().find("p").text("请选择正确的日期");
          return false;
        }else{
          $(".birth .error_warn").hide();
        }
      }

      var marriageDate = new foton.mcHandlePCCA().dateJudge(marriageDateVal);
      if(marriageDateVal){
        if(!marriageDate){
          $(".marrageDay .error_warn").show().find("p").text("请选择正确的日期");
          return false;
        }else{
          $(".marrageDay .error_warn").hide();
        }
      }
      if(isSure){
        isSure = false;
      }else{
        return;
      }
      var $checkSex = $(".radio_sex label input:checked").val();
      $checkSex = $checkSex !== undefined ?  $checkSex : "";
      var $checkMarriage = $(".radio_marriage label input:checked").val();
      $checkMarriage = $checkMarriage !== undefined ? $checkMarriage : "";
      var $provice =  $(".provice input").val() == "" ? "":  $(".provice input").val();
      var $city =  $(".city input").val() == "" ? "":  $(".city input").val();
      var $country =  $(".country input").val() == "" ? "":  $(".country input").val();
      var data = {
        name: $(".item input.name").val(),
        sex:  $checkSex,
        documenttype: new foton.mcHandlePCCA().initCertificate($(".certificateType span").text()),
        documentnumber: $certificateNum,
        province: $provice,
        city: $city,
        area: $country,
        address: $("input.address").val(),
        postcode: $("input.postcode").val(),
        nation: new foton.mcHandlePCCA().initNation($(".nation span").text()),
        birthday: $("#birthDays span").text(),
        marriage: $checkMarriage,
        wedday: $("#marriage span").text(),
        income: new foton.mcHandlePCCA().initIncome($(".getMoney span").text()) ,
        profession: new foton.mcHandlePCCA().initProfess($(".profession span").text()),
        hobby: $("input.hobby").val(),
        email: $("input.mcEmail").val()
     };
        //遮罩层
      new foton.LayerWinUse().load();
     $.ajax({
      url:$mcBaseUrl + "MemberCenter/updateUser",
      type:"post",
      data:data,
      success:function(data){
       if(data.status == 0){
          var newUrl = "/webback/memberreview/selfmessage";
           new foton.LayerWinUse().alerts("提交成功",{"url":newUrl});
       }else{
    	   isSure = true;
           new foton.LayerWinUse().alerts(data.data);
       }
     },
     error:function(){
    	 isSure = true;
         new foton.LayerWinUse().alerts("提交失败");
     }
   });
   });
  };
  //单选框
  p.initRadio = function(){
    $(".radio_marriage label").on("click",function(){
      $(".radio_marriage label").removeClass("radio_click");
      $(this).addClass("radio_click");
    })
    $(".radio_sex label").on("click",function(){
      $(".radio_sex label").removeClass("radio_click");
      $(this).addClass("radio_click");
    })
  }
  //日期处理、插件
  p.initDate = function(){
    $("#birthDays").on("click",function(){
      laydate({
        elem: '#birthDate'
      });
    })
    $("#marriage").on("click",function(){
      laydate({
        elem: '#marriageSpan'
      });
    })
  }
  //下拉框处理
  p.initTable = function(data){
    var cur = this;
    var keyArr = [{"key":"ta_content","value":"优惠项目"},
                  {"key":"ta_youhui","value":"优惠"},
    {"key":"ta_order","value":"剩余次数"},
    {"key":"ta_time","value":"到期时间"}];
    var $tr = $("<tr class='table_n'></tr>");
    $.each(keyArr,function(i,val){
      $tr.append("<th class="+ val.key +">"+ val.value +"</th>")
    });
    $(" .self_action table").append($tr);

    if(data.length ==undefined){
      $(".self_action table").append(cur.initBuildBody(data,keyArr))
    }else{
      $.each(data,function(i,val){
        $(".self_action table").append(cur.initBuildBody(val,keyArr));
      });
    }

    $.each($(".list td"),function(i,val){
      if($(".list td").eq(i).text()==""){
        $(".list td").eq(i).text("--");
      }
    });
    }
    p.initBuildBody = function(val,keyArr){
      var cur = this;
      var $tr = $("<tr class='list'></tr>");
      $.each(keyArr,function(j,valArr){
        switch(valArr.key){
        case  "ta_content":
        $tr.append("<td class="+valArr.key+">"+ val.PRODUCTNAME +"</td>")
        break;
        case  "ta_youhui":
            $tr.append("<td class="+valArr.key+">"+ val.YOUHUI +"</td>")
            break;
        case  "ta_order":
        $tr.append("<td class="+valArr.key+">"+ val.REMAINNUM +"</td>")
        break;
        case  "ta_time":
        $tr.append("<td class="+valArr.key+">"+ val.ENDDATE +"</td>")
        break;
      }
    });
      return $tr;
    }
  foton.selfMessageModify = selfMessageModify;
})();



