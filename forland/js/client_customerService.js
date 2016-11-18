this.foton = this.foton||{};
(function(){
	var customerService = function(){
		this.init();
		this.initcut();
	};
	
	var p = customerService.prototype;
	p.init = function(){
		if(!$baseUrl){
			throw  new Error("请先引入headerAndFooter.js.");
		}
		else{
			this.baseUrl = $baseUrl.config;
		}
		
		this.initInput();
		this.initRadio();
		this.initOptions();
		this.initSubmit();
		this.getDay();
		this.initJudge();
	};
	
	p.initInput = function(){
		$("div.inputBox input").data("value","").focus(function(){
			if($(this).val() == $(this).attr("defaults")){
				$(this).val("");
			}
		}).blur(function(){
			if($(this).val() == $(this).attr("defaults") || $.trim($(this).val()) == ""){
				var defaults = $(this).attr("defaults");
				$(this).val(defaults).data("value","");
				if($(this).attr('id')==='realName'){
					var title = $(this).attr('defaults');
					$(this).next().text(title+'不能为空！');
				}
			}
			else if($(this).attr("class")=="carNum"){
				var val = $(this).val();
				$("#carNum_1").data("value",val);
			}
			else{
				var val = $(this).val();
				$(this).data("value",val);
				if($(this).attr('id')==='realName'){
					$(this).next().text('');
				}
			}
			
			if($(this).attr("id")=="phone"){
				var val = $(this).val();
				var pattern_1 = /^(0|86|17951)?(1[3-8])[0-9]{9}$/;
				var flag_1 = pattern_1.test(val);
				if(flag_1){
					$("#phone").data("value",val);
					$(this).next().text("");
				}
				else if($(this).val() == $(this).attr("defaults")){
					$(this).next().text("");
				}
				else{
					$("#phone").data("value","");
					$(this).next().text("手机格式错误！");
				}
			}
			if($(this).attr("id")=="tel_1"){
				$("#tel_2").trigger("focus");
			}
			if($(this).attr("id")=="tel_2"){
				var tel = $("#tel_1").val()+'-'+$("#tel_2").val();
				var pattern_2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
				var flag_2 = pattern_2.test(tel);
				if(flag_2 || tel=='区号-号码'){
					if($("#phone").val() == ""){
						$("#phone").data("value",tel);
					}
					$(this).next().text("");
				}
				else{
					$("#phone").data("value","");
					$(this).next().text("电话格式错误！");
				}
			}
		});
		
		$(".phone_tel").each(function(i){
			$(this).keydown(function(){
				if($(this).attr("id")=="phone"){
					var t1 = $("#tel_1").attr("defaults");
					var t2 = $("#tel_2").attr("defaults");
					/*$("#tel_1").val(t1);
					$("#tel_2").val(t2);*/
					$("#tel_2").next().text("");
				}
				else{
					var t = $("#phone").attr("defaults");
					/*$("#phone").val(t);*/
					$("#phone").next().text("");
				}
			})
		})
		$(".carNum").each(function(i){
			$(this).keydown(function(){
				if($(this).attr("id")=="carNum_1"){
					var t1 = $("#carNum_2").attr("defaults");
					/*$("#carNum_2").val(t1);*/
					$("#carNum_2").next().text("");
				}
				else{
					var t = $("#carNum_1").attr("defaults");
					/*$("#carNum_1").val(t);*/
					$("#carNum_1").next().text("");
				}
			})
		})
	};
	
	p.initRadio = function(){
		$("label").click(function(){
			$("label").css("background-position","0px 4px");
			$("input:checked").parent().css("background-position","0px -13px");
		})
	};
	
	p.initcut = function(){
		var cur = this;
		$("#types p.wxby").click(function(){
			var index = $(this).index();
			if(index){
				$('#type_style').val('保养');
			}
			else{
				$('#type_style').val('维修');
			}

			})

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
		})
	};
	
	/* 创建品牌选项 */
	p.initBrand = function(data){
		var cur = this;
		$("#brand div.dropOptions").empty();
		$.each(data,function(i,val){
			if(val.brandId==9 || val.brandId==3 || val.brandId==4){
				var $option = $('<p>'+val.brandName+'</p>').data({"id":val.brandId,"callback":true});
				$option.bind("callback",function(){
					cur.initCar(val.seriersList);
				})
				$("#brand div.dropOptions").append($option);
			}
		})
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
		})
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
				cur.getCounty(val.id,val.provinceId);
			})
			$("#city div.dropOptions").append($option);
		})
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
		})
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
			$("#county div.dropOptions").append($option);
		})
	};
	
	p.getDay = function(){  
		   var cur = this;
		     var today = new Date();
		     var i = 1;
			   var $op = $("#datechoose .dropOptions p");
		     for(i=1; i<8; i++){
		     	   var change = today.getTime() + 1000*60*60*24;          
			       today.setTime(change); //注意，这行是关键代码    
			       var tYear = today.getFullYear();  
			       var tMonth = today.getMonth()+1;  
			       var tDate = today.getDate();  
			       var order = tYear+"-"+tMonth+"-"+tDate;  
					$op.eq(i-1).html(order);
		     };
		     
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
			$("#remark").blur(function(){
				if(!$(this).val()==""){
					$("#remark").next().text("");
				}else{
					$("#remark").next().text("必填项不能为空！");
				}
			})

		}
	p.initSubmit = function(){
		var cur = this;
		$("#submit").click(function(){
			var Required = true;
			$("div.dropItem input").each(function(){
				if($(this).val() == -1){
					$(this).next().text("必选项不能为空！");
				}
				else{
					$(this).next().text("");
				}
			})
			if($("#realName").val()=="姓名"){
				$("#realName").next().text("必填项不能为空！");
			}
			else{
				$("#realName").next().text("");
			}
			if(!$("label input:checked").length){
				$("div.radioBox p.warning").text("请选择报修或者保养！");
			}
			else{
				$("div.radioBox p.warning").text("");
			}
			//判断
			if($("#datespan").text() == "年/月/日"){
				$("#datechoose p.warning").text("必填项不能为空！");
			}else{
				$("#datechoose p.warning").text("");
			}
			if($("#timespan").text() == "时间"){
				$("#timechoose p.warning").text("必填项不能为空！");
			}else{
				$("#timechoose p.warning").text("");
			}
			if($("#remark").val()==""){
				$("#remark").next().text("必填项不能为空！");
			}

			
			if($("#phone").val() == "手机号" && ($("#tel_1").val() == "区号" || $("#tel_2").val() == "号码")){
				$(".inputBox.county.clearfix").find("p.warning").eq(1).text("手机号或者固定电话必填一项！");
			}else{
				$(".inputBox.county.clearfix").find("p.warning").eq(1).text("");
			}
			
			$("p.warning").each(function(){
				if($(this).text()!==""){
					Required = false;
				}
			})
			if(Required){
				var data = {
					type: $("#type").val(),
					brandId: $("#brandId").val(),
					carNum: $("#carNum_1").data("value"),
					provinceId: $("#provinceId").val(),
					cityId: $("#cityId").val(),
					areaId: $("#areaId").val(),
					name: $("#realName").data("value"),
					tel: $("#phone").data("value"),
					weixin: $("#weixin").data("value"),
					qq: $("#QQ").data("value"),
					remark: $("#remark").val(),
					bookTime: $("#datespan").text() + " " + $("#timespan").text()
				};
				$.ajax({
					type: "post",
					url: cur.baseUrl + "clue/reapirMaintain",
					data: data,
					success: function(json){
						if(json>0){
							var src = cur.baseUrl + 'static/images/success.jpg';
							var text = '信息提交成功';
						}
						else{
							var src = cur.baseUrl + 'static/images/fail.jpg';
							var text = '信息提交失败';
						}
						var $alertBox = $('<div class="formAlert"><img src="'+src+'" alt=""/><p>'+text+'</p></div>');
						$('body').append($alertBox);
						$alertBox.animate({
							opacity: 1,
							marginTop: -180
						},300).delay(1200).animate({
							opacity: 0,
							marginTop: -270
						},300,function(){
							window.location.reload();
						});
					}
				})
			}
		})
	};
	
	foton.customerService = customerService;
})();