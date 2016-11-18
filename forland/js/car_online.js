/**
 * Created by user on 2016/10/13.*/
 this.foton = this.foton || {};
this.$mcBaseUrl = "/webback";
(function(){
    var CarOnline = function(){
        this.init();
    }
    var p = CarOnline.prototype;
    p.init = function(){
        this.initBg();
        this.initLable();
        if(!$baseUrl){
            throw  new Error("请先引入headerAndFooter.js.");
        }
        else{
            this.baseUrl = $baseUrl.config;
        }
        this.initMember();
        this.initOptions();
        this.initInput();
        this.initRadio();
        this.initJudge();
    }
    p.imgSwitch = function(num){
        var lis =  $(".imageMask li");
        var halfHeight = $("li.car_shidai").children().eq(0).height();
        var $shidai = $("li.car_shidai");
        var $ruiwo = $("li.car_ruiwo");
        if(num=="0" && parseInt($(".newsNavContainer .barBg").css("left"))!="0"){
            var shouIndex = 0;
            
            $ruiwo.css({"display":"block"}).children().each(function(){
                var top = -halfHeight;
                var $cur = $(this);
                $cur.delay(shouIndex).animate({
                    "top": top*2,
                    "opacity": 0
                },700,function(){
                    $cur.css({"top":0});
                });
                shouIndex += 80;
            });
            $shidai.children().each(function(){
                var top = -halfHeight;
                    var $cur = $(this);
                    $cur.delay(shouIndex).animate({
                        "top": 0,
                        "opacity": 1
                    },700);
                    shouIndex += 80;
            });

        }
        if(num=="1" && parseInt($(".newsNavContainer .barBg").css("left"))=="0"){
            var shouIndex = 0;
            $shidai.children().each(function(){
                var top = -halfHeight;
                    var $cur = $(this);
                    $cur.delay(shouIndex).animate({
                        "top": top,
                        "opacity": 0
                    },700,function(){
                        $cur.css({"top":-top});
                    });
                    shouIndex += 80;
            });


            $ruiwo.css({"display":"block"}).children().each(function(){
                var top = -halfHeight;
                var $cur = $(this);
                $cur.delay(shouIndex).animate({
                    "top": top,
                    "opacity": 1
                },700,function(){

                });
                shouIndex += 80;
            });
        }
    }
    p.initBg = function(){
        var cur = this;
        $("li.subNav").click(function(){
            var num = $(this).index();
            cur.imgSwitch(num);
            $("li.subNav").removeClass("subNav_click");
            $(this).addClass("subNav_click");
            $(".online_car .barBg").stop().animate({"left":num*100},50);
        })
    }
    p.initLable = function(){
        $("label").click(function(){
            $("label").css({"background-position":"0px 4px","color":"#404040"});
            $("input:checked").parent().css({"color":"#0066b3","background-position":"0px -13px"});
        })
    }

    p.initMember = function(){
        var cur = this;
        $.ajax({
            type:"get",
            dataType:"json",
            url:$mcBaseUrl + "login/getstatus",
            success:function(data){
                if(data.status != "0"){
                    if(confirm("登录后预约试驾可以累加积分，是否登录？")){
                        window.location.href = $mcBaseUrl + "bottom/login";
                    };
                }
            }
        });
    };
    /* 下拉框选项初始化 */
    p.initOptions = function(){
        this.getProvince();
    };

    p.getProvince = function(){
        var cur = this;
        $.ajax({
            type: "get",
            dataType: "json",
            url: cur.baseUrl + "dmp/getProvinceCity",
            success: function(json){
                cur.initprovince(json);
            }
        })
    };

    p.initprovince = function(data){
        var cur = this;
        $("#province div.dropOptions").empty();
        $.each(data,function(i,val){
            var id = i.split(",")[0].split("=")[1];
            var name = i.split("=")[2];
            $option = $('<p class="item">'+name+'</p>').data({"id":id,"callback": true});
            $option.bind("callback",function(){
                cur.initCity(val);
            })
            $("#province div.dropOptions").append($option);
        })
    };

    p.initCity = function(data){
        var cur = this;
        $("#city div.dropOptions").empty();
        $("#city span").text("市");
        $("#city input").val("-1");
        $("#county div.dropOptions").empty();
        $("#county span").text("区/县");
        $("#county input").val("");
        $("#Dealer div.dropOptions").empty();
        $("#Dealer span").text("请选择经销商");
        $("#Dealer input").val("-1");
        $.each(data,function(i,val){
            var $option = $('<p>'+val.cityName+'</p>').data({"id":val.id,"callback": true});
            $option.bind("callback",function(){
                cur.getDealer();
            })
            $("#city div.dropOptions").append($option);

        })
    };

    p.getDealer = function(){
        var cur = this;
        var data = {
            brandId: parseInt($("#brand input").val()),
            seriesId: parseInt($("#carSeries input").val()),
            provinceId: parseInt($("#province input").val()),
            cityId: parseInt($("#city input").val()),
            areaId: parseInt($("#county input").val()),
            isdmp: 1
        };
        $.ajax({
            type: "get",
            dataType: "json",
            data: data,
            url: cur.baseUrl + "dmp/getDealer",
            success: function(json){
                cur.initDealer(json);
            }
        })
    };
    p.initJudge = function(){
        // //判断含有下拉菜单的栏
        var $allTabBox = $(".inputBox .dropDefault span");
        var $allTabButton = $(".inputBox .dropDefault");
        var $allDrop;
        $allTabButton.click(function(){
            $allDrop = $(".inputBox .dropOptions p");
            $allDrop.click(function(){
                $(this).parent().siblings("p.warning").text("")
            })
        })
        $(".remark").blur(function(){
            if(!$(this).val()==""){
                $(".remark").next().text("");
            }
        })
    }
    p.initDealer = function(data){
        var cur = this;
        $("#Dealer div.dropOptions").empty();
        $("#Dealer span").text("请选择经销商");
        $("#Dealer input").val("-1");
        $.each(data,function(i,val){
            var $option = $('<p title='+val.dealerName+'>'+val.dealerName+'</p>').data({"id":val.id,"callback": true});
            $option.bind("callback",function(){
                $(this).parents("div.dropItem").find("span").attr("title",val.dealerName);
            })
            $("#Dealer div.dropOptions").append($option);
        })
    };

    /* 输入框事件 */
    p.initInput = function(){
        var cur = this;
        $(".remark").blur(function(){
            if(!$(this).val()==""){
                $(".remark").next().text("");
            }else{
                $(".remark").next().text("必填项不能为空！");
            }
        })
        $(".secondInput").focus(function(){
            if($(this).val()==$(this).attr("defaultValue")){
                $(this).val("");
            }
        }).blur(function(){
            var val = $(this).val();

            if($(this).parent().attr("id")=="phone_tel"){
                if(($.trim($('#phone').val())=="" || $('#phone').val()==$('#phone').attr("defaultValue"))&&($.trim($('#tel_1').val())=="" || $('#tel_1').val()==$('#tel_1').attr("defaultValue"))&&($.trim($('#tel_2').val())=="" || $('#tel_2').val()==$('#tel_2').attr("defaultValue"))){
                    var defaults = $(this).attr("defaultValue");
                    $(this).val(defaults);
                    $("#phone_tel p.warning").text("手机号或者固定电话必填一项！");
                }else{
                    var pattern_1 = /^(0|86|17951)?(1[3-8])[0-9]{9}$/;
                    var flag_1 = pattern_1.test($("#phone").val());

                    var tel = $("#tel_1").val()+'-'+$("#tel_2").val();
                    var pattern_2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
                    var flag_2 = pattern_2.test(tel);
                    if(flag_1){
                        $("#phone_tel input.realPhone").val($("#phone").val());
                        $("#phone_tel p.warning").text("");
                    }
                    else if(flag_2){
                        $("#phone_tel input.realPhone").val(tel);
                        $("#phone_tel p.warning").text("");
                    }
                    else{
                        $("#phone_tel p.warning").text("请输入正确的手机号或者固定电话！");
                        $("#phone_tel input.realPhone").val("-1");
                    }
                }
            }
            else if($(this).attr("id")=="name"){
                if($.trim(val)=="" || val==$(this).attr("defaultValue")){
                    $(this).next().text("必填项不能为空！");
                    var defaults = $(this).attr("defaultValue");
                    $(this).val(defaults).data("value","-1");
                }
                else{
                    $(this).next().text("");
                    $(this).data("value",val);
                }
            }
            else if($.trim(val)=="" || val==$(this).attr("defaultValue")){
                var defaults = $(this).attr("defaultValue");
                $(this).val(defaults).data("value","-1");
            }
            else{
                $(this).data("value",val);
            }
        })
        $("#submit").click(function(){
            $(".secondInput").trigger("blur");
            $("div.dropItem input").each(function(){
                if($(this).val() == -1){
                    $(this).next().text("必选项不能为空！");
                }
                else{
                    $(this).next().text("");
                }
            })
            if($(".remark").val()==""){
                $(".remark").next().text("必填项不能为空！");
            }
            var next = true;
            $("p.warning").each(function(){
                if($(this).text()!==""){
                    next = false;
                }
            })
            if(next){
                var data = {
                    brandId: parseInt($("#brand input").val()),
                    seriesId: parseInt($("#carSeries input").val()),
                    provinceId: parseInt($("#province input").val()),
                    cityId: parseInt($("#city input").val()),
                    areaId: parseInt($("#county input").val()),
                    dealerId: parseInt($("#Dealer input").val()),
                    type: "预约试驾",
                    name: $("input.name").data("value"),
                    tel: $("input.realPhone").val(),
                    qq: $("input.QQ").data("value"),
                    weixin: $("input.weixin").data("value"),
                    remark: $(".remark").data("value"),
                    testDriveTime: $("p.testDriveTime input:checked").length ? $("p.testDriveTime input:checked").val() : -1,
                    buyTime: $("p.buyTime input:checked").length ? $("p.buyTime input:checked").val() : -1
                };
                $.ajax({
                    type: "post",
                    data: data,
                    url: cur.baseUrl + "clue/testDrive",
                    success: function(json){
                        if(json){
                            $.ajax({
                                url:$mcBaseUrl + "MemberCenter/deal",
                                type:"get",
                                data:{"brand":1,"action":3},
                                dataType:"json",
                                success:function(data){
                                    alert("信息提交成功！");
                                    window.history.go(-1);
                                }
                            })
                        }
                    }
                })
            }
        })
    };

    /* 单选框 */
    p.initRadio = function(){
        $("label").click(function(){
            $("label").css({"background-position": "0px 4px", "color": "#959595"});
            $("input:checked").parent().css({ "background-position":"0px -13px", "color": "#0066b3" });
        })
        //返回
        $("a.formBtn").attr("onclick","javascript :history.back(-1)");
    };
    foton.CarOnline = CarOnline;
})();
