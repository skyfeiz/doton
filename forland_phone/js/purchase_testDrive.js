/**
 * Created by user on 2016/10/25.
 */
this.foton = this.foton || {};
(function(){
    var TestDriver = function(){
        this.init();
    };
    var p = TestDriver.prototype;
    p.init = function(){
        this.latVal=null;
        this.lngVal=null;
        this.initDom();
        this.baseUrl = "/webback/";
        this.initDataBack();
        this.initMember();
        this.getBrand();
        this.getProvince();
        this.initEvent();
        this.initRadio();
        //验证
        this.initVerification();
        //提交
        this.initSubmit();
    };
    //从经销商服务商回填
    p.initDataBack = function(){
        var cur = this;
        var locations = window.location.href;
        if(/provinceId/.test(locations)){
            var last = locations.split("?")[1];
            var provinceId = last.split("&")[0].split("=")[1];
            var cityId = last.split("&")[1].split("=")[1];
            var areaId = last.split("&")[2].split("=")[1];
            var dealerName = last.split("&")[3].split("=")[1];
            cur.latVal = last.split("&")[4].split("=")[1];
            cur.lngVal = last.split("&")[5].split("=")[1];
            cur.dealerName = decodeURI(dealerName);
            cur.id = last.split("&")[6].split("=")[1];
            cur.initFillTab(provinceId,cityId,decodeURI(dealerName));
        }else{
            cur.initPosition();
        }
    };
    //登录与未登录处理
    p.initMember = function(){
        var cur = this;
        $.ajax({
            type:"get",
            dataType:"json",
            url:"/webback/login/getstatus",
            success:function(data){
                if(data.status != "0"){
                    //cur.initPosition();
                    if(confirm("登录后预约试驾可以累加积分，是否登录？")){
                        window.location.href = "/webback/bottom/login";
                    };
                }else{
                    //cur.initFillFromMc();
                }
            }
        });
    };
    //省市转化成自动填充
    p.initFillTab = function(proviceName,cityName,dealerName){
        if(!proviceName){
            return false;
        };
        var timer = null;
        var timerCountry = null;
        var timerServer = null;
        timer=setInterval(function(){
            if($(".provice select option").length > 1 ){
                clearInterval(timer);
                timerServer = setInterval(function(){
                    if($(".distributor select option").length > 1){
                        clearInterval(timerServer);
                        handleAddress($(".distributor select option"),dealerName);
                    }
                },100);
                handleAddress($(".provice select option"),proviceName);
                handleAddress($(".city select option"),cityName);
            }
        },100);
        function handleAddress(dom,name){
            dom.each(function(i){
                var textName = dom.eq(i);
                var textCon = dom.eq(i).text();
                var textVal = dom.eq(i).val();
                if(!isNaN(parseInt(name))){
                    if(name==textVal ){
                        textName.trigger("click");
                        textName.prop("selected",true);
                        textName.parent().trigger("change");
                    }
                }else{
                    if(name==textCon ){
                        textName.trigger("click");
                        textName.prop("selected",true);
                        textName.parent().attr("num",2);
                        textName.parent().trigger("change");

                    }
                }
            });
        }
    };
    //登录状态
    p.initFillFromMc = function(){
        var cur = this;
        $.ajax({
            url:"/webback/MemberCenter/getUserInfo",
            type:"get",
            success:function(data){
                if(data.status == "0"){
                    var data = data.data;
                    //省市縣
                    if(data.FTSTATE){
                        cur.initFillTab(data.FTSTATE,data.FTCITY,data.FTDISTRICT)
                    }
                    //手機號
                    if(data.FTCELLPHONE){
                        $(".phone input").val(data.FTCELLPHONE);
                    }
                    //姓名
                    if(data.NAME){
                        $(".name input").val(data.NAME);
                    }
                }else{
                    return "";
                }
            }
        });
    };
    //未登陆
    p.initPosition = function(){
        //浏览器定位
        var cur = this;
        var timeServer = null;
        var map = new BMap.Map("maps");    // 创建Map实例
        var point = new BMap.Point(116.3640600000, 39.9961000000);
        map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.enableScrollWheelZoom(true);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                var latVal = r.point.lat;
                var lngVal = r.point.lng;
                cur.latVal = latVal;
                cur.lngVal = lngVal;
                map.addOverlay(mk);
                map.panTo(r.point);
                var locations = window.location.href;
                if(/provinceId/.test(locations)){
                    var last = locations.split("?")[1];
                    var provinceId = last.split("&")[0].split("=")[1];
                    var cityId = last.split("&")[1].split("=")[1];
                    var areaId = last.split("&")[2].split("=")[1];
                    var dealerName = last.split("&")[3].split("=")[1];
                    cur.initFillTab(provinceId,cityId,areaId,decodeURI(dealerName));
                    return;
                }
                //获取详细地址
                $.ajax({
                    url:"http://api.map.baidu.com/geocoder/v2/?ak=qucwKSrbi7Ghmy1WKZe3tl18vhsBmXGn&callback=renderReverse&location="+latVal+","+lngVal+"&output=json&pois=1",
                    type:"get",
                    dataType:"jsonp",
                    callabck:"callback",
                    success:function(json){
                        if(json.status=="0"){
                            var data = json.result.addressComponent;
                            //cur.initFillTab(data.province,data.city,data.district,"");
                        }
                    }
                });
                $.ajax({
                    url:"/webback/dmp/mobileNearestDealer",
                    data:{"lon":lngVal,"lat":latVal,"type":"4"},
                    type:"get",
                    success:function(data){
                        //var name =json.dealerName;
                        cur.initFillTab(data.provinceId,data.cityId,'','');
                        /*timeServer = setInterval(function(){
                         if($(".distributor select option").length > 1){
                         clearInterval(timeServer);
                         var dom = $(".distributor select option");
                         dom.each(function(i){
                         var textName = dom.eq(i);
                         var textCon = dom.eq(i).text();
                         if(name==textCon ){
                         textName.trigger("click");
                         textName.prop("selected",true);
                         textName.parent().trigger("change");
                         }
                         });
                         }
                         },100);*/
                    }
                });
            }
        }, {enableHighAccuracy: true});
    };
    //单选
    p.initDom = function(){
        this.$radio = $(".choice_time label");
        this.$radioTest = $(".test_time label");
    };
    p.initRadio = function(){
        this.handleRadio(this.$radio);
        this.handleRadio(this.$radioTest);
    };
    p.handleRadio =function(dom){
        var cur = this;
        dom.bind("click",function(){
            var isOrno = $(this).children("input:checked");
            if(isOrno){
                $(this).children("input").prop("disabled",false);
                dom.removeClass("click_bg");
                $(this).addClass("click_bg");
            }else{
                $(this).children("input").prop("disabled",true);
                $(this).removeClass("click_bg");
            };
        });
    };
    /* //回填方法
     p.initDataBack = function(){
     //测试回填方法
     setTimeout(function(){
     $(".provice select option").each(function(i,val){
     if($(".provice select option").eq(i).text()=="北京市"){
     $(".provice select option").eq(i).prop("selected",true);
     $(this).parent().trigger("change");
     }
     });
     $(".city select option").each(function(i,val){
     if($(".city select option").eq(i).text()=="北京市"){
     $(".city select option").eq(i).prop("selected",true);
     $(this).parent().trigger("change");
     }
     });
     },2000);
     setTimeout(function(){
     $(".country select option").each(function(i,val){
     if($(".country select option").eq(i).text()=="朝阳区"){
     $(".country select option").eq(i).prop("selected",true);
     $(this).parent().trigger("change");
     }
     });
     },2600);
     };*/
    //事件
    p.initEvent = function(){
        //change事件
        $("select").change(function(){
            var $optSelected = $(this).find("option:selected").text();
            if($(this).find("option:selected").data("callback")){
                $(this).find("option:selected").trigger("callback");
            }
            //清空数据
            if($optSelected=="省"){
                $(".city select").empty();
                $(".city select").append($('<option>市</option>').val("-1").data({"callback":true}));
                $(".distributor select").empty();
                $(".distributor span").text("请选择经销商");
                $(".distributor input").val("-1");
            }else if($optSelected=="市"){
                $(".distributor select").empty();
                $(".distributor span").text("请选择经销商");
                $(".distributor input").val("-1");
            }else if($optSelected=="请选择品牌"){
                $(".car_type select").empty();
                $(".car_type select").append($('<option>请选择车系</option>').val("-1").data({"callback":true}));
            }

            if($(this).parents(".provice").length){
                $(".country select").empty();
                $(".country select").append($('<option>区/县</option>').val("-1").data({"callback":true}));
                $(".distributor select").empty();
                $(".distributor span").text("请选择经销商");
                $(".distributor input").val("-1");
            }
        });
    };
    //获取品牌信息
    p.getBrand = function(){
        var cur = this;
        $.ajax({
            type: "get",
            dataType: "json",
            url: cur.baseUrl + "dmp/getBrandSeries",
            //url: "testJson/pinpai.json",
            success: function(json){
                cur.initBrand(json);
            }
        });
    };
    /* 创建品牌/ */
    p.initBrand= function(data){
        var cur = this;
        $(".car_brand select").empty();
        $(".car_brand select").append($('<option>请选择品牌</option>').val("-1").data({"callback":true}));
        $.each(data,function(i,val){
            var $option = $('<option>'+val.brandName+'</option>').val(val.brandId).data({"callback":true});
            $option.bind("callback",function(){
                cur.initCar(val.seriersList);
                if($(".city select option selected").val()!="-1"){
//                    var data = {
//                        brandId: parseInt($(".car_brand select option:selected").val()),
//                        seriesId: parseInt($(".car_type select option:selected").val()),
//                        provinceId: parseInt($(".provice select option:selected").val()),
//                        cityId: parseInt($(".city select option:selected").val()),
//                        areaId: parseInt($(".country select option:selected").val()),
//                        type: 4
//                    };
//                    cur.getDealer(data);
                }
            });
            $(".car_brand select").append($option);
        });
    };
    p.initCar = function(data){
        var cur = this;
        $(".car_type select").empty();
        $(".car_type select").append($('<option>请选择车系</option>').val("-1").data({"callback":true}));
        $.each(data,function(i,val){
            var $option = $('<option>'+val.carSeriesName+'</option>').val(val.id);
            $(".car_type select").append($option);
        });
    };
    //省市县
    p.getProvince = function(){
        var cur = this;
        $.ajax({
            type: "get",
            dataType: "json",
            url: cur.baseUrl + "dmp/getProvinceCity",
            //url: "testJson/city.json",
            success: function(json){
                cur.initprovince(json);
            }
        });
    };
    p.initprovince = function(data){
        var cur = this;
        $(".provice select").empty();
        $(".provice select").append($('<option>省</option>').val("-1").data({"callback":true}));
        $.each(data,function(i,val){
            var id = i.split(",")[0].split("=")[1];
            var name = i.split("=")[2];
            $option = $('<option class="item">'+name+'</option>').val(id).data({"callback": true});
            $option.bind("callback",function(){
                cur.initCity(val);
            });
            $(".provice select").append($option);
        });
    };

    p.initCity = function(data){
        var cur = this;
        $(".city select").empty();
        $(".city select").append($('<option>市</option>').val("-1").data({"callback":true}));
        $.each(data,function(i,val){
            var $option = $('<option>'+val.cityName+'</option>').val(val.id).data({"callback": true});
            $option.bind("callback",function(){
                //cur.getCounty(val.id,val.provinceId);
                /* var data = {
                 brandId: parseInt($(".car_brand select option:selected").val()),
                 seriesId: parseInt($(".car_type select option:selected").val()),
                 provinceId: parseInt($(".provice select option:selected").val()),
                 cityId: parseInt($(".city select option:selected").val()),
                 areaId: -1,
                 type: 4
                 };*/
                cur.getDealer();
            });
            $(".city select").append($option);
        });
    };

    /* p.getCounty = function(cityId, provinceId){
     var cur = this;
     $.ajax({
     type: "get",
     dataType: "json",
     data: {
     cityId: cityId,
     provinceId: provinceId
     },
     url: cur.baseUrl + "dmp/getArea",
     //url: "testJson/county.json",
     success: function(json){
     cur.initCounty(json);
     }
     });
     };

     p.initCounty = function(data){
     var cur = this;
     $(".country select").empty();
     $(".country select").append($('<option>区/县</option>').val("-1").data({"callback":true}));
     $.each(data,function(i,val){
     var $option = $('<option>'+val.areaName+'</option>').val(val.id).data({"callback": true});
     $option.bind("callback",function(){
     cur.getDealer();
     });
     $(".country select").append($option);
     });
     };*/

    p.getDealer = function(){
        var cur = this;
        var data = {
            brandId: parseInt($(".car_brand select option:selected").val()),
            seriesId: parseInt($(".car_type select option:selected").val()),
            provinceId: parseInt($(".provice select option:selected").val()),
            cityId: parseInt($(".city select option:selected").val()),
            lon:cur.lngVal,
            lat:cur.latVal,
            type: 1
        };
        $.ajax({
            type: "get",
            dataType: "json",
            data: data,
            url: cur.baseUrl + "dmp/mobileFindDealer",
            //url: "testJson/jingxiaoshang.json",
            success: function(json){
                var isFirst = true;
                if(isFirst){
                    $(".distributor span").text(cur.dealerName);
                    $(".distributor input").val(cur.id);
                    isFirst = false;
                }else{
                    $(".distributor span").text("请选择经销商");
                    $(".distributor input").val("-1");
                }
                cur.initAlert(json);
                //cur.initDealer(json);
            }
        });
    };
    p.initDealer = function(data){
        if($(".distributor select").attr("num")){
            $(".distributor select").attr("num","");
            return;
        };
        var cur = this;
        $(".distributor select").empty();
        $(".distributor select").append($('<option>请选择经销商</option>').val("-1").data({"callback":true}));
        $.each(data,function(i,val){
            var $option = $('<option title='+val.dealerName+'>'+val.dealerName+'</option>').val(val.id).data({"callback": true});
            $option.bind("callback",function(){
                //$(this).parents("div.dropItem").find("span").attr("title",val.dealerName);
            });
            $(".distributor select").append($option);
        });
    };

    p.initAlert = function(json){
        $("ul.drop_list").empty();
        if(json.length){
            $.each(json,function(i,val){

                var distances = parseInt(parseInt(val.distance)/100)/10+"公里";
                var options = $('<li class="slectx-option">'
                    +'      <span class="span_title" href="javascript:;">'+val.dealerName+'</span>'
                    +'      <span class="after"></span>'
                    +'      <div class="option_con">'
                    +'      <div class="drop_content">'
                    +'      <p><strong>经销商名称：</strong><span class="drop_fullname">'+val.dealerName+'</span></p>'
                    +'      <p><strong>地址：</strong><span class="drop_address">'+val.dealerAddress+'</span></p>'
                    +'  <p><strong>距离：</strong><span class="drop_fullname">'+distances+'</span></p>'
//              +'      <p><strong>服务电话：</strong><a class="drop_phone" href="tel:'+val.dealerTel+'">'+val.dealerTel+'</a></p>'
                    +'      <div class="drop_location">'
                    +'      <a class="drop_btn" data-id="'+val.id+'" data-select="'+val.dealerName+'">选择</a>'
                    +'      </div>'
                    +'      </div>'
                    +'      </div>'
                    +'      </li>')
                $("ul.drop_list").append(options);
            });

            $("span.span_title").click(function(event){
                event.preventDefault();
                event.stopPropagation();
                console.log($(this));
                $(this).parent().siblings().find(".option_con").slideUp(100);
                if($(this).siblings(".option_con").css("display")=="none"){
                    $(this).siblings(".option_con").slideDown();
                }else{
                    $(this).siblings(".option_con").slideUp();
                }
            });

        }else{

        };

        $(".distributor span").click(function(e){
            $(".areaId_container").show();
            simpScroller(document.querySelector(".areaId_details"));

            $(".drop_btn").click(function(e){
                $(".distributor input").val($(this).attr("data-id"));
                $("span.dealer_span").text($(this).attr("data-select"));
                $(".option_con").stop().slideUp(100);
                $(".areaId_container").hide();
            });
        });
        //关闭按钮
        $(".areaId_close").click(function(e){
            $(".areaId_container").hide();
        });
    };
    //验证
    p.initVerification = function(){
        var cur = this;
        $("#getForm select").change(function(){
            if($(this).parents(".car_brand").length){
                cur.initSelectJe($(".car_brand"),"请选择品牌","请选择品牌");
            }
            if($(this).parents(".car_type").length){
                cur.initSelectJe($(".car_type"),"请选择车系","请选择车系");
            }
            if($(this).parents(".provice").length){
                cur.initSelectJe($(".provice"),"请选择省份");
            }
            if($(this).parents(".city").length){
                cur.initSelectJe($(".city"),"请选择城市");
            }
        });

        $(".name input, .phone input, .your_need textarea").bind("blur",function(e){
            if(!$.trim($(this).val())==""){
                $(this).parent().find("p.warnning").remove();
            }
        });
    };
    //提交
    p.initSubmit = function(){
        var cur = this;
        $(".button_up a.sign_up").on("click",function(e){
            console.log($(e.target));
            if($(e.target).hasClass("up_load")){
                return;
            }
            var data = $("#getForm").serialize();
            var $phonePatten = /^(0|86|17951)?(1[3-8])[0-9]{9}$/;
            var $phoneNum = $(".phone input").val();
            e.stopPropagation();

            //品牌
            if(cur.initSelectJe($(".car_brand"),"请选择品牌","请选择品牌")){
                return;
            }
            //车系
            if(cur.initSelectJe($(".car_type"),"请选择车系","请选择车系")){
                return;
            };
            //省
            if(cur.initSelectJe($(".provice"),"省","请选择省份")){
                return;
            };
            //市
            if(cur.initSelectJe($(".city"),"市","请选择市")){
                return;
            };
            //姓名
            if($.trim($(".name input").val())==""){
                cur.initWarn($(".name"),"请输入姓名");
                return;
            }else{
                cur.initWarn($(".name"),"请输入姓名","dele");
            }
            //手机
            if($.trim($(".phone input").val())==""){
                cur.initWarn($(".phone"),"请输入手机号");
                return;
            }else if(!$phonePatten.test($phoneNum)){
                cur.initWarn($(".phone"),"请输入正确的格式");
                return;
            }else{
                cur.initWarn($(".phone"),"请输入手机号","dele");
            }
            //需求
            if($.trim($(".your_need textarea").val())==""){
                cur.initWarn($(".your_need"),"请输入需求");
                return;
            }else{
                cur.initWarn($(".your_need"),"请输入需求","dele");
            }
            $.ajax({
                url: cur.baseUrl + "clue/testDrive",
                type: "post",
                data: data,
                beforeSend:function(){
                    $(".button_up a").append($("<div class='up_load'></div>"));
                    $(".button_up a").addClass("click_status");
                },
                success: function(data){
                    if(data){
                        cur.initLayerMsg("提交成功");
                        // $.ajax({
                        //     url:cur.baseUrl + "MemberCenter/deal",
                        //     type:"get",
                        //     data:{"brand":1,"action":3},
                        //     dataType:"json",
                        //     success:function(data){
                        //
                        //     }
                        // });
                        window.location.reload();
                    }else{
                        cur.initLayerMsg("提交失败");
                    }
                },
                error:function(){
                    $(".button_up .up_load").remove();
                    $(".button_up a").removeClass("click_status");
                    cur.initLayerMsg("提交失败");
                }
            });
        });
    };

    p.initLayerMsg = function(text){
        var $layerMsg =  $('<div class="layui-layer-msg">'
            +'  <div id="" class="layui-layer-content">'+text+'</div>'
            +'  <span class="layui-layer-setwin"></span>'
            +'</div>');
        $(".main_part").append($layerMsg);
        setTimeout(function(){
            $(".layui-layer-msg").remove();
        },4000);
    };

    p.initSelectJe = function(dom,text,warnText){
        var cur = this,isTrue = false;
        if(dom.find("select option:selected").text()==text){
            cur.initWarn(dom,warnText);
            isTrue = true;
        }else{
            cur.initWarn(dom,warnText,"dele");
        }
        return isTrue;
    };
    p.initWarn = function(dom,warnText,deletes){
        if(deletes){
            dom.find("p.warnning").remove();
            return;
        }
        if(dom.find("p.warnning").length){
            $("p.warnning").text(warnText);
            var topH = $("p.warnning").offset().top - 200;
            $(document).find("html,body").scrollTop(topH);
            return;
        }
        var $warn = $('<p class="warnning">'+warnText+'</p>');
        dom.append($warn);
        var toph = $("p.warnning").offset().top - 200;
        $(document).find("html,body").scrollTop(toph);
    };
    foton.TestDriver  = TestDriver;
})();