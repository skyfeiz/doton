this.foton = this.foton || {};
(function(){
	var testdrive = function(){
		new foton.testDrive();
	};
	
	var p = testdrive.prototype;
	
	foton.testdrive = testdrive;
	
})();

(function(){
	var testDrive = function(){
		this.init();
	};
	
	var p = testDrive.prototype;
	p.init = function(){
		if(!$baseUrl){
			throw  new Error("请先引入headerAndFooter.js.");
		}
		else{
			this.baseUrl = $baseUrl.config;
		}
		
		this.initOptions();
		this.initInput();
		this.initRadio();
		this.initJudge();
	};
	
	/* 下拉框选项初始化 */
	p.initOptions = function(){
		this.getBrand();
		this.getProvince();
	};
	
	/* 获取品牌信息 */
	p.getBrand = function(){
		var cur = this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: cur.baseUrl + "dmp/getBrandSeries",
			success: function(json){
				cur.initBrand(json);
			}
		});
	};
	
	/* 创建品牌选项 */
	p.initBrand = function(data){
		var cur = this;
		$("#brand div.dropOptions").empty();
		$.each(data,function(i,val){
			var $option = $('<p>'+val.brandName+'</p>').data({"id":val.brandId,"callback":true});
			$option.bind("callback",function(){
				cur.initCar(val.seriersList);
			});
			$("#brand div.dropOptions").append($option);
		});
	};
	
	/* 品牌选项点击回调，创建品牌下车系 */
	p.initCar = function(data){
		var cur = this;
		$("#carSeries div.dropOptions").empty();
		$("#carSeries input").val("-1");
		$("#carSeries span").text("车系");
		$.each(data,function(i,val){
			var $option = $('<p>'+val.carSeriesName+'</p>').data({"id":val.id});
			$("#carSeries div.dropOptions").append($option);
		});
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
		});
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
			});
			$("#province div.dropOptions").append($option);
		});
	};
	
	p.initCity = function(data){
		var cur = this;
		$("#city div.dropOptions").empty();
		$("#city span").text("市");
		$("#city input").val("-1");
		$("#county div.dropOptions").empty();
		$("#county span").text("区/县");
		$("#county input").val("-1");
		$("#Dealer div.dropOptions").empty();
		$("#Dealer span").text("请选择经销商");
		$("#Dealer input").val("-1");
		$.each(data,function(i,val){
			var $option = $('<p>'+val.cityName+'</p>').data({"id":val.id,"callback": true});
			$option.bind("callback",function(){
					cur.getCounty(val.id,val.provinceId);
					var data = {
							brandId: parseInt($("#brand input").val()),
							seriesId: parseInt($("#carSeries input").val()),
							provinceId: parseInt($("#province input").val()),
							cityId: parseInt($("#city input").val()),
							areaId: parseInt($("#county input").val()),
							type: 1
						};
						cur.getDealer(data);
			});
			$("#city div.dropOptions").append($option);
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
			url: cur.baseUrl + "dmp/getArea",
			success: function(json){
				cur.initCounty(json);
			}
		});
	};
	
	p.initCounty = function(data){
		var cur = this;
		$("#county div.dropOptions").empty();
		$("#county span").text("区/县");
		$("#county input").val("");
		$("#Dealer div.dropOptions").empty();
		$("#Dealer span").text("请选择经销商");
		$("#Dealer input").val("-1");
		$.each(data,function(i,val){
			var $option = $('<p>'+val.areaName+'</p>').data({"id":val.id,"callback": true});
			$option.bind("callback",function(){
				var data = {
					brandId: parseInt($("#brand input").val()),
					seriesId: parseInt($("#carSeries input").val()),
					provinceId: parseInt($("#province input").val()),
					cityId: parseInt($("#city input").val()),
					areaId: parseInt($("#county input").val()),
					type: 4
				};
				cur.getDealer(data);
			});
			$("#county div.dropOptions").append($option);
		});
	};
	
	p.getDealer = function(data){
		var cur = this;
		$.ajax({
			type: "get",
			dataType: "json",
			data: data,
			url: cur.baseUrl + "dmp/getDealer",
			success: function(json){
				cur.initDealer(json);
			}
		});
	};
	
	p.initDealer = function(data){
		var cur = this;
		$("#Dealer div.dropOptions").empty();
		$("#Dealer span").text("请选择经销商");
		$("#Dealer input").val("-1");
		$.each(data,function(i,val){
			var $option = $('<p title='+val.dealerName+'>'+val.dealerName+'</p>').data({"id":val.id,"callback": true});
			$option.bind("callback",function(){
				$(this).parents("div.dropItem").find("span").attr("title",val.dealerName);
			});
			$("#Dealer div.dropOptions").append($option);
		});
	};
	
	p.initJudge = function(){
		// //判断含有下拉菜单的栏
		var $allTabBox = $(".inputBox .dropDefault span");
		var $allTabButton = $(".inputBox .dropDefault");
		var $allDrop;
		$allTabButton.click(function(){
			$allDrop = $(".inputBox .dropOptions p");
			$allDrop.click(function(){
				$(this).parent().siblings("p.warning").text("");
			});
		});
		$(".remark").blur(function(){
			if(!$(this).val()==""){
				$(".remark").next().text("");
			}
		});
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
		});
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
					var pattern_1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
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
		});
		
		/*$("#phone_tel input").keydown(function(){
			if($(this).attr("id")=="phone"){
				$(this).siblings("input").each(function(){
					var defaultV = $(this).attr('defaultValue');
					$(this).val(defaultV);
				})
			}
			else{
				var defaultV = $("#phone").attr('defaultValue');
				$("#phone").val(defaultV);
			}
		})*/
		
		$("#submit").click(function(){
			$(".secondInput").trigger("blur");
			$("div.dropItem input").each(function(){
				if($(this).val() == -1){
					$(this).next().text("必选项不能为空！");
				}
				else{
					$(this).next().text("");
				}
			});
			var next = true;
			$("p.warning").each(function(){
				if($(this).text()!==""){
					next = false;
				}
			});
			if($(".remark").val()==""){
				$(".remark").next().text("必填项不能为空！");
			}
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
						if(json!=0){
							alert("信息提交成功");
							window.location.reload();
						}else{
							alert("提交信息错误，请联系客服");
						}
					}
				});
			}
		});
	};
	
	/* 单选框 */
	p.initRadio = function(){
		$("label").click(function(){
			$("label").css({"background-position": "0px 0px", "color": "#959595"});
			$("input:checked").parent().css({ "background-position":"0px -17px", "color": "#0066b3" });
		});
		//返回
		$("a.formBtn").attr("onclick","javascript :history.back(-1)");
	};
	
	foton.testDrive = testDrive;
})();