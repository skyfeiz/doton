this.foton = this.foton||{};
(function(){
	var Support = function(){
		this.init();
	};
	
	var p = Support.prototype;
	p.init = function(){	
		this.initDom();
		// this.initECharts();
//		new foton.dealerPanel();
		new foton.alliance();
	};
	
	p.initDom = function(){
		this.$boxcont = $(".noworrybox .boxleft .boxcont");
		this.$showyizhan = $(".noworrybox .boxleft .showyizhan");
		this.$catalogue = $(".accessories .catalogue");
		this.$inquire = $(".accessories .inquire");
	};
	
	foton.Support = Support;
})();

(function(){
    var dealerPanel = function()
    {
        this.init();
    };
    var p = dealerPanel.prototype;
    p.init = function()
    {
		this.isProOrFirst =true;
        this.initDom();
		this.initDropItems();
		this.initEvent();
		this.updateForm();
		this.getEChartsData();
		this.initCountryVal();
    };

    p.initDom = function()
    {
        $("#type li").eq(0).data("id",1);
        $("#type li").eq(1).data("id",2);
        $("#band li").eq(0).data("id",9);
        $("#band li").eq(1).data("id",4);
        $("#band li").eq(2).data("id",3);
		if(!$baseUrl){
			throw  new Error("请先引入headerAndFooter.js.");
		}
		else{
			this.baseUrl = $baseUrl.config;
		}
    };
    
    p.initCountryVal = function(){
    	var country_liObj = $('<li class="item">--请选择--</li>').data("id","-1");
    	$("#county ul").append(country_liObj);
    	$("#county li.item").eq(0).trigger("click");
    };
	
	p.getEChartsData = function(){
		var cur = this;
		$.ajax({
			type: "get",
			url: cur.baseUrl + "dmp/countDealer",
			success: function(data){
				cur.dataTransform(data);
			}
		})
	};
	
	p.dataTransform = function(data){
		var cur = this;
		
		this.option = [
			{
				tooltip : {
					trigger: 'item'
				},
				series : [
					{
						name: '经销商',
						type: 'map',
						mapType: 'china',
						roam: false,
						itemStyle:{
							normal:{label:{show:false},areaStyle:{color:'#0066b3'},borderColor:'#fff' },
							emphasis:{label:{show:true,textStyle:{color: '#000'}},areaStyle:{color:'#00c9ff'}}
						},
						data:[]
					}
				]
			},
			{
				tooltip : {
					trigger: 'item'
				},
				series : [
					{
						name: '服务商',
						type: 'map',
						mapType: 'china',
						roam: false,
						itemStyle:{
							normal:{label:{show:false},areaStyle:{color:'#0066b3'},borderColor:'#fff' },
							emphasis:{label:{show:true,textStyle:{color: '#000'}},areaStyle:{color:'#00c9ff'}}
						},
						data:[]
					}
				]
			}
		];
		$.each(data,function(i,val){
			var index = parseInt(i)-1;
			if(index<2){
				$.each(val,function(j,subVal){
					cur.option[index].series[0].data.push({
						name: j.replace(/省|市|特|回|维|自|壮/g,""),
						value: subVal
					});
				})
			}
		})
		cur.initECharts(1);
	};
	
	p.initECharts = function(i){
		var cur = this;
		$("#mapBox").empty();
		var myChart = echarts.init(document.getElementById('mapBox')); 
		myChart.setOption(cur.option[i-1]);      
	};
	
	/* 初始化下拉框 */
	p.initDropItems = function(){
		// this.getbrand();
		this.getprovince();
	};
	/* 初始化品牌 */
	p.getbrand = function(){
		var cur = this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: cur.baseUrl + "dmp/getBrandSeries",
			success: function(json){
				cur.initbrand(json);
			}
		})
	};
	
	p.initbrand = function(data){
		$("#band ul").empty();
		$("#band span.value").text(data[0].brandName);
		$.each(data,function(i,val){
			$li = $('<li class="item">'+val.brandName+'</li>').data("id",val.brandId);
			$("#band ul").append($li);
		})
	};
	
	p.getprovince = function(){
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
	
	p.getCounty = function(){
		var cur = this;
		var provinceId = $('#province input').val();
		var cityId = $('#city input').val();
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
	
	p.initCity = function(data){
		$("#city span.value").text("--请选择--");
		$("#city ul").empty();
		// 初始化第一个为"--请选择--"
		$li = $('<li class="item">--请选择--</li>').data("id","-1");
		$("#city ul").append($li);
		$.each(data,function(i,val){
			$li = $('<li class="item">'+val.cityName+'</li>').data("id",val.id);
			$("#city ul").append($li);
		})
		$("#city li.item").eq(0).trigger("click");
	};
	
	p.initCounty = function(json){
		$("#county span.value").text("--请选择--");
		//$("#county span.value").text(json[0].areaName);
		if(json != null && json.length > 0){
			$('#county input').val(json[0].id);
		}
		this.getProvidersInfor();
		$("#county ul").empty();
		$.each(json, function(i,val) {
			$li = $('<li class="item">'+val.areaName+'</li>').data("id",val.id);
			$("#county ul").append($li);
		});
	};
	
	p.initprovince = function(data){
		$("#province ul").empty();
		// $("#province span.value").text(data[])
		$.each(data,function(i,val){
			var id = i.split(",")[0].split("=")[1];
			var name = i.split("=")[2];
			$li = $('<li class="item">'+name+'</li>').data({"id":id,"city":val});
			$("#province ul").append($li);
			if(id==3){
				$li.trigger("click");
			}
		})
		
		$("#province li.item").eq(2).trigger("click");
	};
	
	p.getProvidersInfor = function(){
		var cur = this;
		var dataOrigin = $("form.selectBox").serialize();
		var data;
		//==========================change========================
		if(cur.isProOrFirst){
			data = dataOrigin.slice(0,dataOrigin.indexOf("&cityId"));
		}else{
			data = $("form.selectBox").serialize();
		}
		$.ajax({
			type: "get",
			dataType: "json",
			data: data,
			url: cur.baseUrl + "dmp/getDealer",
			success: function(json){
				cur.initProvidersInfor(json);
			}
		})
	};
	
	p.initProvidersInfor = function(data){
		$("div.contentBox").empty();
		$("div.dealerPanel div.barBox").remove();
		if(data.length){
			$.each(data,function(i,val){
				var dealerTel = val.dealerTel ? val.dealerTel : '';
				var dealerAddress = val.dealerAddress ? val.dealerAddress : '';
				$title = $('<p class="title">'+val.dealerName+'</p><p>地址：'+dealerAddress+'</p>'+
					'<p>电话：'+dealerTel+'</p>'+
					'<div class="blueLine"></div>');
				$("div.contentBox").append($title);
			});
			$("div.scrollBox").unbind().buildScrollBar();
		}
		else{
			$("div.contentBox").append('<p class="noResult">暂无查找信息！</p>');
		}
	};
	
	 p.initEvent = function()
    {
		var cur = this;
        $('.allthem').bind('click',function(e){
        	
			e.stopPropagation();
			
			var obj = $(this);
			obj.next().stop().slideToggle();
			obj.parent('li').siblings().children('.list:visible').slideUp();
		})
		//=====
		$("#city .selectBtn").click(function(){
			cur.isProOrFirst = false;
		})
		//=======
		$(document).on('click','.item',function(e){
			var obj = $(this);
			var value = obj.text();
			obj.parents('li').find('.value').text(value);
			obj.parent().next().val(obj.data("id"));
			if($.inArray($("#province")[0],obj.parents())!==-1){
				cur.isProOrFirst = true;
				cur.initCity(obj.data("city"));
				cur.getProvidersInfor();
			}
			if($.inArray($("#city")[0],obj.parents())!==-1){
				//cur.getProvidersInfor();

				if($("#county").css('display')!=='none'){
					//cur.isProOrFirst = false;
					cur.getCounty();
				}
				else{
					$("#county input").val('');
					cur.getProvidersInfor();
				}
			}
			if($.inArray($("#county")[0],obj.parents())!==-1 || $.inArray($("#band")[0],obj.parents())!==-1){
				cur.getProvidersInfor();
			}
			if($.inArray($("#type")[0],obj.parents())!==-1){
				cur.initECharts(obj.data("id"));
				if(!$(this).index()){
					$("#county").hide();
					$('#county input').val('');
					cur.getProvidersInfor();
				}
				else{
					$("#county").show();
					cur.getCounty();
				}
			}
		})
		$(document).click(function(e){
			if($(e.target).attr("class") !== "selectBtns" ){
				$('ul.list').slideUp();
			}
			if($.inArray($('div.noworrybox')[0],$(e.target).parents())==-1){
				$('div.serviceDetaile').fadeOut();
			}
		})
    };
	 p.appear = function(tp)
    {
        if(!this.isAppear)
        {
			 if(tp > this.$dom.position().top-400)
			 {
				this.isAppear = true;
				var i=0;
			   $(".dealerStartPos").each(function(){
				   $(this).delay(i).animate({marginTop:"0px",opacity:1},800);
				   i+=100;
			   })
			 }
        }
    };
	//新加入的方法，根据地图跟新表单，并且发送请求-----------------------------------
	p.updateForm = function(){
		var i = 0;
		var arr = [];
		var cur = this;
		$("#mapBox").on("mousemove",function(){
			var $mapMes = $("#mapBox .echarts-tooltip");
			var isOrNo = $mapMes.hasClass("echarts-tooltip")
			if(isOrNo){
				i++;
				var contextText = $mapMes.text();
				var $arr = contextText.split(" ");
				var getName = $arr[1] == ":" ? $arr[0] : $arr[1];
				arr.push(getName);
				if(i >= 2){
					if(arr[i-1] != arr[i-2]){
						console.log(getName);
						cur.baseNameHandle(getName);
					}
				}else if(i ==1){
					cur.baseNameHandle(getName);
				}
			}else{
				return;
			}
		})
	}
	p.baseNameHandle = function(getName){
		var cur = this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: cur.baseUrl + "dmp/getProvinceCity",
			success: function(json){
				//$("#province ul").empty();
				$.each(json,function(i,val){
					var id = i.split(",")[0].split("=")[1];
					var name = i.split("=")[2];
					if(name.indexOf(getName) != "-1"){
						$.each($("#province .list .item"),function(i){
							if($(this).text().indexOf(getName) != "-1" ){
								$(".zr-element").click(function(){
									$("#province li.item").eq(i).trigger("click");
								})
							}
						})
					}
				})
			}
		})
	}

	//-----------------------------方法
    foton.dealerPanel = dealerPanel;
})();

(function(){
	var alliance = function(){
		this.num = 0;
		this.oneci = 3;
		this.boxlength = $("div.specific").length;
		this.allclick();
	};
	
	var p = alliance.prototype;
	
	p.allclick = function(){
		var cur = this;
		$("div.nextBtn").click(function(){
			if(cur.num < cur.boxlength - cur.oneci){
				cur.num ++;
				$("div.prevBtn").removeClass("prevDisabled");
				var targetX = -cur.num*(385+20);
				$("div.scrollPanel").stop(true,true).animate({"left": targetX+"px"},300,function(){
					if(cur.num == cur.boxlength - cur.oneci){
						$("div.nextBtn").addClass("nextDisabled");
					}
				})
			}
		});
		
		$("div.prevBtn").click(function(){
			if(cur.num > 0){
				cur.num --;
				$("div.nextBtn").removeClass("nextDisabled");
				var targetX = -cur.num*(385+20);
				$("div.scrollPanel").stop(true,true).animate({"left": targetX+"px"},300,function(){
					if(cur.num == 0){
						$("div.prevBtn").addClass("prevDisabled");
					}
				})
			}
		});
	};
	
	foton.alliance = alliance;
})();
