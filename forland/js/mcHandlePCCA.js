this.foton = this.foton || {};
(function(){
  var mcHandlePCCA = function(){
    this.init();
  }
  var p = mcHandlePCCA.prototype;
  p.init = function(){
  }
  //省市县处理
  p.getProvince = function(){
    var cur = this;
    $.ajax({
      type: "get",
      dataType: "json",
      url: $mcBaseUrl+"dmp/getProvinceCity",
      success: function(json){
        cur.initprovince(json);
      }
    })
  };

  p.initprovince = function(data){
    var cur = this;
    $(".provice div.dropOptions").empty();
    $.each(data,function(i,val){
      var id = i.split(",")[0].split("=")[1];
      var name = i.split("=")[2];
      $option = $('<p class="item">'+name+'</p>').data({"id":id,"callback": true});
      $option.bind("callback",function(){

        cur.initCity(val);
      })
      $(".provice div.dropOptions").append($option);
    })
  };

  p.initCity = function(data){
    var cur = this;
    $(".city div.dropOptions").empty();
    $(".city span").text("市");
    $(".city input").val("-1");
    $("#county div.dropOptions").empty();
    $(".country span").text("区/县");
    $(".country input").val("");
    $.each(data,function(i,val){
      var $option = $('<p>'+val.cityName+'</p>').data({"id":val.id,"callback": true});
      $option.bind("callback",function(){
        cur.getCounty(val.id,val.provinceId);
      });
      $(".city div.dropOptions").append($option);
    });
  };

  p.getCounty = function(cityId, provinceId){
    var cur = this;
    $.ajax({
      type: "get",
      dataType: "json",
      data: {
        cityId: cityId,
        provinceId: provinceId
      },
      url:  $mcBaseUrl + "dmp/getArea",
      success: function(json){
        cur.initCounty(json);
      }
    })
  };

  p.initCounty = function(data){
    var cur = this;
    $(".country div.dropOptions").empty();
    //$(".country span").text("区/县");
    //$(".country input").val("");
    $("#Dealer div.dropOptions").empty();
    $.each(data,function(i,val){
      var $option = $('<p>'+val.areaName+'</p>').data({"id":val.id});
      $(".country div.dropOptions").append($option);
    })
  };


  //处理民族的方法
  p.initNation = function(name){
    if(name==undefined || name==""){
      return;
    }
    var allNation = [
    "Han-汉族",
    "Zhuang-壮族",
    "Manchu-满族",
    "Hui-回族",
    "Miao-苗族",
    "Uygur-维吾尔族",
    "Tujia-土家族",
    "Yi-彝族",
    "Mongolian-蒙古族",
    "Tibetan-藏族",
    "Buyi-布依族",
    "Dong-侗族",
    "Yao-瑶族",
    "Korean-朝鲜族",
    "Bai-白族",
    "Hani-哈尼族",
    "Kazak-哈萨克族",
    "Li-黎族",
    "Dai-傣族",
    "The She Ethnic Group-畲族",
    "Lisu-傈僳族",
    "Gelao-仡佬族",
    "Dongxiang Nationality-东乡族",
    "Gaoshan-高山族",
    "The Lahu Family-拉祜族",
    "Aquarium-水族",
    "Wa-佤族",
    "Naxi Minority-纳西族",
    "Qiang-羌族",
    "Tu-土族",
    "Molao-仫佬族",
    "Siberia-锡伯族",
    "Kirgiz-柯尔克孜族",
    "Daur-达斡尔族",
    "Jinpo-景颇族",
    "Maonan Ethnic Group-毛南族",
    "Salar-撒拉族",
    "The Brown Family-布朗族",
    "Tajik-塔吉克族",
    "Achang-阿昌族",
    "Pumi-普米族",
    "Ewenki-鄂温克族",
    "Nu-怒族",
    "Jing-京族",
    "The Jinuo-基诺族",
    "De Angzu-德昂族",
    "Baoan-保安族",
    "Russian-俄罗斯族",
    "Yugur-裕固族",
    "Uzbek Buick-乌孜别克族",
    "Menbacou-门巴族",
    "Oroqen-鄂伦春族",
    "Derung-独龙族",
    "Tatar-塔塔尔族",
    "Hezhe-赫哲族",
    "Lhoba People-珞巴族"
    ];
    var arrCon = [];
    $.each(allNation,function(i,val){
      if(val.indexOf(name)!="-1"){
        if(isChina(name)){
          arrCon.push(val.split("-")[0])
        }else{
          arrCon.push(val.split("-")[1]);
        }
      }
    })
    if(name=="请选择"){
      return "";
    }else if(arrCon[0]!=""){
      return arrCon[0];
    }
  }

  //证件处理
  p.initCertificate = function(name){
    if(name==undefined || name ==""){
      return;
    }
    var allCerti = ["Identity Card- 居民身份证","Organization Code- 组织机构代码证","Credit Code- 统一社会信用代码","Passport- 护照","Militery Certificate- 军官证","Other- 其他"];
    if(Number(name) == Number(name)){
      var index = parseInt(name);
      return allCerti[index-1];
    }
   var arrCon = [];
    $.each(allCerti,function(i,val){
      if(val.indexOf(name)!="-1"){
          arrCon.push(val.split("-")[0])
      }
    })
    if(name=="请选择"){
      return "";
    }else if(arrCon[0]!=""){
      return arrCon[0];
    }else if(arrCon[0] == 0){
      return arrCon[0];
    }
  }
  //证件校验
  p.initTestCerti = function(){
    var getNum = new foton.mcHandlePCCA().initCertificate($(".certificateType span").text());
    if(getNum == ""){
      return true;
    }
    //身份证校验
    var textNum = $(".certificateType_num").val();
    var selfCardAndDrive = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    var otherText = /^[A-Za-z0-9]+$/;
    //"Credit Code- 统一社会信用代码"--验证
    var selfCommonCode = /[0-9A-Z]{2}[0-9]{6}[0-9A-Z]{10}/;
    var selfExpAbc = /[IOZSV]/;
    if(textNum == ""){
      $(".certificateType_num").next().show().find("p").text("请输入证件号");
    }else if(getNum == "Identity Card"){
      var result =  selfCardAndDrive.test(textNum);
      if(result&&textNum.length==18){
      	var carnums = textNum.split("");
      	var sumnums = 0;
      	var numindex = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
      	var endnumber = 11;
      	for(var i=0;i<carnums.length;i++){
      		if(i<carnums.length-1){
      			sumnums = sumnums + carnums[i]*numindex[i];
      		}else{
      			endnumber = carnums[i];
      		}
      	}
       var endmap = new Array(1,0,'X',9,8,7,6,5,4,3,2);
       var ss = 	sumnums % 11;
       if(endmap[ss]==endnumber){
       	return result;
       }else{
       	return false;
       }
       
      }else{
      	return result;
      }
    }else if(getNum == "Credit Code"){
        var result = selfCommonCode.test(textNum) == true && selfExpAbc.test(textNum)==false ? true : false;
        return result;
      }else{
      return otherText.test(textNum);
    }
  }
  //处理性别
  p.initSex = function(name){
    if(name==undefined || name ==""){
      return;
    }
    var arrCon = [];
    var sexArr = ["Male-男","Female-女"];
    $.each(sexArr,function(i,val){
      if(val.indexOf(name)!="-1"){
          arrCon.push(i);
      }
    });
    if(arrCon[0]!=""){
      return arrCon[0];
    }else if(arrCon[0] == 0){
      return arrCon[0];
    }
  }

  //处理婚姻
  p.initMarriage = function(name){
    if(name==undefined || name ==""){
      return;
    }
    var arrCon = [];
    var sexArr = ["Married-已婚","Unmarried-未婚"];
    $.each(sexArr,function(i,val){
      if(val.indexOf(name)!="-1"){
        arrCon.push(i);
      }
    });
    if(arrCon[0]!=""){
      return arrCon[0];
    }else if(arrCon[0] == 0){
      return arrCon[0];
    }
  }

  //邮箱
  p.initTestMail = function(name){
    var testMail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if($.trim(name)==""){
      return true;
    }else{
      return testMail.test(name);
    }
  }

  //判断时间与当前的时间
  p.dateJudge = function(time){
    if(time==undefined || time ==""){
      return;
    }
    var nowTime = + new Date();
    var oldTime = new Date(time).getTime();
    if(nowTime > oldTime){
      return true;
    }else{
      return false;
    }
  }
  //收入
  p.initIncome = function(name){
     if(name==undefined || name == ""){
      return;
     }
    var allNation = [
      "More Than 350000-35万以上",
      "300000 to 350000-30-35万",
      "250000 to 300000-25-30万",
      "250000 to 300000-20-25万",
      "150000 to 200000-15-20万",
      "100000 to 150000-10-15万",
      "50000 to 100000-5-10万",
      "Under 50000-5万以下"
    ];
    var arrCon = [];
    $.each(allNation,function(i,val){
      if(val.indexOf(name)!="-1"){
          arrCon.push(val.split("-")[0])
      }
    })
    if(name=="请选择"){
      return "";
    }else if(arrCon[0]!=""){
      return arrCon[0];
    }else if(arrCon[0] == 0){
      return arrCon[0];
    }
  }
  //从事行业
  p.initProfess = function(name){
    if(name==undefined || name==""){
      return;
    }
    var allNation = [
      "Transportation Logistics- 交通/运输/物流",
      "Wholesale And Retail- 批发和零售",
      "Construction Decoration- 建筑/设计/装潢",
      "Mining Smelting- 采掘业/冶炼",
      "Manufacturing- 制造（机械/设备）",
      "Non Profit- 非盈利机构/政府",
      "Agriculture- 农业/渔业/林业",
      "Automobile- 汽车及零配件",
      "Consumer Durable Goods  - 耐用消费品（服装、纺织、家具、家电、工艺品）",
      "Fmcg-快速消费品（食品、饮料、化妆品）",
      "Service Industry- 服务业",
      "Hotel Restaurant Travel- 酒店/餐饮/旅游",
      "Real Estate- 房地产",
      "Chemical Energy- 化工/能源",
      "Printing Packaging- 印刷/包装",
      "Biological- 生物/制药/保健/医药",
      "Trade- 贸易",
      "Advertising Pr Exhibition- 广告/公关/会展",
      "Media Publishing- 媒体/出版",
      "Consulting- 咨询业",
      "Law- 法律",
      "Intermediary Service- 中介服务",
      "Communications Telecom- 通讯/电信",
      "Internet E-Commerce- 互联网/电子商务",
      "Electronic Technique- 电子技术",
      "Computer- 计算机",
      "Financial Insurance- 金融/保险/证券",
      "Naxi Minority-纳西族",
      "Education/Training- 教育/培训",
      "Entertainment Sports- 娱乐/体育",
      "The Academic Research Art- 学术/科研/艺术",
      "Other Industry- 其它行业"
    ];
    var arrCon = [];
    $.each(allNation,function(i,val){
      if(val.indexOf(name)!="-1"){
          arrCon.push(val.split("-")[0])
      }
    })
    if(name=="请选择"){
      return "";
    }else if(arrCon[0]!=""){
      return arrCon[0];
    }else if(arrCon[0] == 0){
      return arrCon[0];
    }
}
  //省市转化成自动填充
  p.initFillTab = function(proviceName,cityName,cityCounty){
    if(!proviceName){
      //alert(11);
      return false;
    };
    var timer = null;
    var timerCountry = null;
    timer=setInterval(function(){
      if($(".provice .dropOptions p").length > 1 ){
        clearInterval(timer);
        timerCountry = setInterval(function(){
          if($(".country .dropOptions p").length > 1){
            clearInterval(timerCountry);
            handleAddress($(".country .dropOptions p"),cityCounty);
          }
        },100);
        handleAddress($(".provice .dropOptions p"),proviceName);
        handleAddress($(".city .dropOptions p"),cityName);
      }
    },100);
    function handleAddress(dom,name){
      dom.each(function(i){
        var textName = dom.eq(i);
        var textCon = dom.eq(i).text();
        if(name==textCon ){
         textName.trigger("click");
       }
     });
    }
  }
  foton.mcHandlePCCA = mcHandlePCCA;
})();


(function(){
  var dropItems = function(){
    this.init();
  }
  var p = dropItems.prototype;
  p.init = function(){
    this.initDom();
    this.initEvent();
  }
  p.initDom = function(){
    this.$box = $("div.dropItem");
  };
  p.initEvent = function(){
    var cur = this;
    this.$box.each(function(){
      var $dropDefault = $(this).find("p.dropDefault");
      var $dropOptions = $(this).find("div.dropOptions");
      var $options = $(this).find("div.dropOptions p");
      $dropDefault.click(function(e){
        e.stopPropagation();
        cur.dropAuto();
        if( $dropOptions.css( "display" ) == "none" ){
          $(this).find("button").addClass("click_color");
          $dropOptions.slideDown( 300 );
        }
        else{
          $(this).find("button").removeClass("click_color");
          $dropOptions.slideUp( 300 );
        }
      });
    });

      $(document).on("click","div.dropOptions p",function(e){
        var value = $(this).text();
        var id = $(this).data("id");
        e.stopPropagation();
        cur.dropAuto();
        $(this).parents("div.dropItem").find("span").text( value );
        $(this).parent().next().val(value);
        /* 点击回调函数 */
        if($(this).data("callback")){
          $(this).trigger("callback");
        }
      });
    $(document).click(function(e){
      $("div.dropItem").each(function(){
        var dropItem = this;
        if($.inArray( dropItem, $(e.target).parents() ) == -1){
          cur.dropAuto();
        };
      })
    });
  };
  p.dropAuto = function(){
    $("div.dropOptions").slideUp( 300 );
    $("p.dropDefault button").removeClass("click_color");
  };
  foton.dropItems = dropItems;
})();


    //判断是否为中文
    function isChina(s){
      var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
      if(!patrn.exec(s)){
        return false;
      }else{
        return true;
      }
    }
