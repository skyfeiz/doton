this.foton = this.foton || {};
(function(){
	var buysup = function(){
		this.init();
		new foton.brandActivity();
		new foton.dealerPanel();
	};
	
	var p = buysup.prototype;
	
	p.init = function(){
		
	};
	
	foton.buysup = buysup;
	
})();
//品牌活动
(function(){
	var brandActivity = function(){
		this.init();
	};
	
	var p = brandActivity.prototype;
	
	p.init = function(){
		this.initDom();
		this.initArrange();
		this.initArrow();
	};
	
	p.initDom = function(){
		this.$former = $("div.cont div.leftbth");
		this.$next = $("div.cont div.rightbth");
		this.$shiftBarsBox = $("div.column").data("index",0);
		
		this.top = 315;
		this.left = 408;
		this.row = 2;
		this.col = 3;
	};
	
	p.initArrange = function(){
		var cur = this;
		this.$shiftBarsBox.each(function(i){
			$(this).children().each(function(j){
				if(Math.floor(j/cur.col)<cur.row){
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: Math.floor(j/cur.col)*cur.top,
						zIndex: 100
					})
				}
				else{
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: (Math.floor(j/cur.col)%cur.row+1)*cur.top,
						zIndex: 0,
						opacity: 0
					})
				}
			})
		})
	};
	
	p.initArrow = function(){
		var cur = this;
		this.$former.click(function(){
			var index = cur.$shiftBarsBox.data("index");
			if(index){
				cur.$next.removeClass('rightDisabled');
				cur.shifting(-1);
			}
		})
		this.$next.click(function(){
			var index = cur.$shiftBarsBox.data("index");
			var limit = Math.floor((cur.$shiftBarsBox.children().length-1)/(cur.col*cur.row));
			if(index<limit){
				cur.$former.removeClass('leftDisabled');
				cur.shifting(1);
			}
		})
	};
	
	p.shifting = function(x){
		var cur = this;
		var index = cur.$shiftBarsBox.data("index");
		var limit = Math.floor((cur.$shiftBarsBox.children().length-1)/(cur.col*cur.row));
		
		if(!(index+x)){
			cur.$former.addClass('leftDisabled');
		}
		if((index+x)==limit){
			cur.$next.addClass('rightDisabled');
		}
		cur.$shiftBarsBox.children().each(function(j){
			var delay_index = j%(cur.col*cur.row);
			if(Math.floor(j/cur.col/cur.row) == index){
				$(this).delay(delay_index*100).animate({
					top: (Math.floor(j/cur.col)%cur.row-1)*cur.top,
					opacity: 0,
					zIndex: 0
				},600)
			}
			if(Math.floor(j/cur.col/cur.row) == index+x){
				$(this).css({
					top: (Math.floor(j/cur.col)%cur.row+1)*cur.top,
					opacity: 0,
					zIndex: 0
				}).delay(delay_index*100+80).animate({
					top: (Math.floor(j/cur.col)%cur.row)*cur.top,
					opacity: 1,
					zIndex: 100
				},600,function(){
					cur.$shiftBarsBox.data("index",index+x);
				})
			}
		})
	};
	
	foton.brandActivity = brandActivity;
})();

//服务商与经销商查询
(function(){
    var dealerPanel = function()
    {
        this.init();
    };
    var p = dealerPanel.prototype;
    p.init = function()
    {
        this.initDom();
		this.initDropItems();
		this.initEvent();
		this.getEChartsData();
		this.getProvidersInfor();
		this.updateForm();
		this.initCityVal();// 初始化城市
    };
    
    // 初始化城市为北京市下面的城市
    p.initCityVal = function(){
    	var dataArr = [{"cityName":"北京市","id":"18"},{"cityName":"北京市(县)","id":"19"},{"cityName":"其他","id":"0"}];
    	$("#city span.value").text("--请选择--");
    	$("#city ul").empty();
    	$("#county span.value").text("--请选择--");
    	$("#county ul").empty();
    	
    	// 初始化city第一个为"--请选择--"
    	var city_liObj = $('<li class="item">--请选择--</li>').data("id","-1");
    	$("#city ul").append(city_liObj);
    	$.each(dataArr,function(i,val){
    		city_liObj = $('<li class="item">'+val.cityName+'</li>').data("id",val.id);
    		$("#city ul").append(city_liObj);
    	});
    	
    	// 初始化country第一个为"--请选择--"
    	var country_liObj = $('<li class="item">--请选择--</li>').data("id","-1");
    	$("#county ul").append(country_liObj);
    	/*$.each(dataArr,function(i,val){
    		country_liObj = $('<li class="item">'+val.countyName+'</li>').data("id",val.id);
    		$("#county ul").append(country_liObj);
    	});*/
    	
    	$("#city li.item").eq(0).trigger("click");
    	$("#county li.item").eq(0).trigger("click");
    	
    };

    p.initDom = function()
    {
        $("#type li").eq(0).data("id",1);
        $("#type li").eq(1).data("id",2);
//		if(!$baseUrl){
//			throw  new Error("请先引入headerAndFooter.js.");
//		}
//		else{
//			this.baseUrl = $baseUrl.config;
//		}
this.baseUrl = "http://192.168.1.132:9080/webback/";
		
		this.isAppear = false;
        this.$dom = $('.dealerPanel');
		//自定义滚动条
		this.power = false;
		this.h = 0;//可视区域高度
		this.H = 0;//实际内容高度
		this.step = 0;//滑块与内容的滑动步数比率
		this.slideBarH = 0;//计算出的滑块高度
		this.minTop = 0;//最小top值
		this.maxTop = 0;//最大top值
		this.startY = 0;//鼠标点下起始位置
		this.top = 0;//鼠标点下时滑块的top值
		this.slideBar = $('.slideBar');
		this.contentBox = $('.contentBox');
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
		this.getbrand();
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
		$("#county span.value").text("--请选择--");
		$("#county ul").empty();
		// 初始化第一个为"--请选择--"
		var city_liObj = $('<li class="item">--请选择--</li>').data("id","-1");
		$("#city ul").append(city_liObj);
		$.each(data,function(i,val){
			city_liObj = $('<li class="item">'+val.cityName+'</li>').data("id",val.id);
			$("#city ul").append(city_liObj);
		})
		$("#city li.item").eq(0).trigger("click");
		
		var country_liObj = $('<li class="item">--请选择--</li>').data("id","-1");
		$("#county ul").append(country_liObj);
		/*$.each(data,function(i,val){
			country_liObj = $('<li class="item">'+val.countyName+'</li>').data("id",val.id);
			$("#county ul").append(country_liObj);
		})*/
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
		})
		
		//$("#province li.item").eq(16).trigger("click");
	};
	
	p.getProvidersInfor = function(){
		var cur = this;
		var data = $("form.selectBox").serialize();
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
			obj.parent('li').siblings().children('.list:visible').slideToggle();
		})
		$(document).on('click','.item',function(e){
			var obj = $(this);
			var value = obj.text();
			obj.parents('li').find('.value').text(value);
			obj.parent().next().val(obj.data("id"));
			if($.inArray($("#province")[0],obj.parents())!==-1){
				cur.getProvidersInfor();
				cur.initCity(obj.data("city"));
			}
			if($.inArray($("#city")[0],obj.parents())!==-1){
				//cur.getProvidersInfor();
				if($("#county").css('display')!=='none'){
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
				// cur.getProvidersInfor();
				if(!$(this).index()){
					$("#county").hide();
					$('#county input').val('');
					cur.getProvidersInfor();
				}
				else{
					$("#county").show();
					$("#county span.value").text("--请选择--");
					cur.getCounty();
				}
			}
		})
		$(document).click(function(e){
			if($(e.target).attr("class") !== "selectBtns" ){
				$('ul.list').slideUp();
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
  //地图鼠标经过就查询该省的经销商服务商
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
		var cur=this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: cur.baseUrl + "dmp/getProvinceCity",
			success: function(json){
				$.each(json,function(i,val){
					var id = i.split(",")[0].split("=")[1];
					var name = i.split("=")[2];
					if(name.indexOf(getName)!=-1){
						$("#province .list .item").each(function(i){
							console.log($(this).text());
							if($(this).text().indexOf(getName) !=-1){
								$(".zr-element").click(function(){
									$("#province li.item").eq(i).trigger("click");
									cur.getProvidersInfor();
								})
							}
						})
					}
				})
			}
		})
	}
	
    foton.dealerPanel = dealerPanel;
})();