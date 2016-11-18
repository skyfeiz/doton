var irobot_commonUrl = "/fotonpts/";// 小机器人后台请求路径
var irobot_pageNum = 1;// 当前页数
var irobot_totalCount = 9;// 数据条数
var irobot_pageCount = 1;// 总页数
var irobot_answer = "";// 用于存储咨询小i机器人的问题
var irobot_nodeId = "";// 用于存储咨询小i机器人回复答案的nodeId
this.foton = this.foton || {};
var $baseUrl = window.$baseUrl || {};
var ip = returnCitySN["cip"];
$baseUrl.config = 'http://' + document.location.host + '/pickup/';
//会员中心接口
var $mcBaseUrl = window.$mcBaseUrl || {};
$mcBaseUrl = 'http://' + document.location.host + '/webback/';
//$mcBaseUrl = 'http://172.24.222.8:8080/webback/';
(function() {
	var HeaderAndFooter = function(i) {
		new foton.Header();
		this.footer = new foton.Footer();
		this.initScroll();
		new foton.irobot();
		new foton.links(i);
		new foton.vistNum();
	};
	var p = HeaderAndFooter.prototype;
	p.initScroll = function() {
		var cur = this;
		$(window).bind("scroll", function() {
			var top = $(document).scrollTop();
			var temp = top + $(window).innerHeight();
		});
	};

	foton.HeaderAndFooter = HeaderAndFooter;
})();

(function() {
	var Header = function() {
		this.initDom();
		this.initNav();
		this.initCar();
		this.initSearch();
		this.initTool();
		this.judgeLoad();
		this.initSearchOut();
	};
	var p = Header.prototype;
	p.initDom = function() {
		this.$nav = $(".header .navPanel a");
		this.$subNavMask = $(".subNavMask");
		this.$subNavScrollPanel = $(".subNavMask .subNavScrollPanel");
		this.$subNavGroup = $(".subNavMask .subNavScrollPanel .subNavGroup");
		//
		this.$carNavPanel = $(".header .carNavPanel");
		this.$carNav = $(".header .carNavPanel .carNav");
		this.$carMask = $(".header .carMask");
		this.$carScrollPanel = $(".header .carMask .carScrollPanel");

		this.carNav_index = $("a.carNav").prevAll().length;
		//
		this.$rightPanel = $(".header .rightPanel");
		this.$searchIcon = $(".header .searchIcon");
		this.$searchPanel = $(".header .searchPanel");
		this.$searchInput = $(".header .searchPanel .searchInput");
		this.$searchBtn = $(".header .searchPanel .searchBtn");
		this.$searchClose = $(".header .searchPanel .searchClose");
		//
		this.$codeIcon = $(".toolPanel .toolGroup .codeIcon");
		this.$codePanel = $(".toolPanel .codePanel");
		// 修改
		this.$searchInout = $("div.header input.searchInput");
	};
	// 修改
	p.initSearchOut = function() {
		this.$searchInout.focus(function() {

			if ($(this).val() == "search") {
				$(this).val("");
			}
		}).blur(function() {
			if ($.trim($(this).val()) == "") {
				$(this).val("search");
			}
		});
	};

	p.initNav = function() {
		var cur = this;
		this.$nav.mouseenter(function() {
			cur.cancelClose();
			var id = cur.$nav.index(this);
			if ((id == 0)) {
				cur.$subNavMask.css({
					"height" : 0
				});
			} else {
				var targetX = $(this).position().left;
				if (id == cur.carNav_index) {
					targetX = $(this).position().left - 250;
				}
				cur.$subNavMask.css({
					"left" : targetX
				});
				cur.subNavScrollPanelMove(id);
			}
		});
		this.$nav.mouseleave(function() {
			cur.subNavClose();
		});
		this.$subNavMask.mouseenter(function() {
			cur.cancelClose();
		});
		this.$subNavMask.mouseleave(function() {
			cur.subNavClose();
		});
	};
	p.subNavScrollPanelMove = function(id) {
		var cur = this;
		var targetX = -this.$subNavGroup.eq(id).position().left;
		var targetW = this.$subNavGroup.eq(id).width();
		var targetH = this.$subNavGroup.eq(id).children(".subNav").length * 41;
		if (id == cur.carNav_index) {
			targetH = 300;
		}
		this.$subNavScrollPanel.css({
			"left" : targetX
		});
		this.$subNavMask.css({
			"width" : targetW,
			"height" : targetH
		});
	};

	p.subNavClose = function() {
		var cur = this;
		this.closeTimer = setTimeout(function() {
			cur.subNavCloseFun();
		}, 300);
	};

	p.cancelClose = function() {
		if (this.closeTimer) {
			clearTimeout(this.closeTimer);
		}
	};

	p.subNavCloseFun = function() {
		this.$subNavMask.css({
			"height" : 0
		});
	};
	//
	p.initCar = function() {
		var cur = this;
		this.$carNav.click(function() {
			var id = cur.$carNav.index(this);
			var targetY = -id * cur.$carMask.height();
			cur.$carScrollPanel.stop(true, false).animate({
				"top" : targetY
			}, 0);
			//
			$(this).addClass("carNav_click");
			cur.$carNav.not(this).removeClass("carNav_click");

		});
	};
	//
	p.initSearch = function() {
		var cur = this;
		this.$searchIcon.click(function() {
			cur.openSearch();
		});
		this.$searchClose.click(function() {
			cur.closeSearch();
		});
	};

	p.openSearch = function() {
		this.$searchPanel.fadeIn();
		this.$rightPanel.fadeOut();
	};
	p.closeSearch = function() {
		this.$searchPanel.fadeOut();
		this.$rightPanel.fadeIn();
	};
	//
	p.initTool = function() {
		var cur = this;
		this.$codeIcon.mouseenter(function() {
			cur.$codePanel.show();
			cur.$codePanel.stop(true, false).animate({
				"right" : 50,
				"opacity" : 1
			}, 300);
		});
		this.$codeIcon.mouseleave(function() {
			cur.$codePanel.stop(true, false).animate({
				"right" : 150,
				"opacity" : 0
			}, 300, function() {
				cur.$codePanel.hide();
			});
		});
	};

	p.judgeLoad = function(){
		var cur = this;
		if(!$(".loginPanel").length){
			cur.initAllDom();
		}
		$.ajax({
			url: $mcBaseUrl + "login/getstatus",
			type:"get",
			dataType:"json",
			success:function(data){
				if(data.status == "0"){
					if(!$(".mcuser").length){
						//生成结构
						cur.initDomUser(data);
					}
				}else if(data.status == "1"){
					//window.location.href ="/webback/bottom/login"
				}
			}
		});
	};
	p.initDomUser = function(data){
		$(".loginPanel").children().remove();
		var $loginPanelChildren = $('<div class="mcuser"><p class="userName">'+data.data+'</p></div><div class="line"></div>'
			+ '<div class="title"><a href="javascript:mcLogout()">退出登录</a></div>'
			+ '<div class="line"></div>'
			+ '<div class="title"><a class="onlineservice">在线客服</a></div>'
		);
		$(".loginPanel").append($loginPanelChildren);
		$(".mcuser").find("p.userName").bind("click",function(e) {
			window.location.href = "/webback/memberreview/selfmessage"
		});
	}
	p.initAllDom = function(){
		var $loginPanel = $('<div class="loginPanel">'
			+ '<div class="title"><a href="/webback/bottom/regist">注册</a></div>'
			+ '<div class="line"></div>'
			+ '<div class="title"><a href="/webback/bottom/login">登录</a></div>'
			+ '<div class="line"></div>'
			+ '<div class="title"><a class="onlineservice">在线客服</a></div>'
			+ '</div>'
		);
		$(".header").append($loginPanel);
	};

	foton.Header = Header;
})();

(function() {
	var Footer = function() {
		this.isAppear = false;
		this.initDom();
		this.initCode();
		this.initSearchInput();
		this.initlinkGroup();

		$("div.linkGroup").buildScrollBar();

	};
	var p = Footer.prototype;

	p.initDom = function() {
		this.$dom = $(".footer");
		this.$codePanel = $(".footer .codePanel");
		this.$codeIcon = $(".footer .codeIcon");
		this.$codeIcon.data("isOpen", 0);
		this.$searchInput = $("div.footer input.searchInput");
		this.$link = $("div.footer div.linkPanel");
		this.$linkTitle = $("div.footer div.linkTitle");
		this.$linkGroupdom = $("div.footer div.linkGroup");
	};

	p.initSearchInput = function() {
		this.$searchInput.focus(function() {
			if ($(this).val() == "SEARCH") {
				$(this).val("");
			}
		}).blur(function() {
			if ($.trim($(this).val()) == "") {
				$(this).val("SEARCH");
			}
		})
	};

	p.initCode = function() {
		var cur = this;
		this.$codeIcon.mouseenter(function() {
			if ($(this).data("isOpen") == 0) {
				$(this).removeClass("codeIcon_out").addClass("codeIcon_over");
			}
		});
		this.$codeIcon.mouseleave(function() {
			if ($(this).data("isOpen") == 0) {
				$(this).removeClass("codeIcon_over").addClass("codeIcon_out");
			}
		});
		this.$codeIcon.click(function() {
			if ($(this).data("isOpen") == 0) {
				$(this).data("isOpen", 1);
				$(this).removeClass("codeIcon_out")
						.removeClass("codeIcon_over")
						.addClass("codeIcon_click");
				cur.$codePanel.removeClass("codePanelClose").addClass(
						"codePanelOpen");
			} else if ($(this).data("isOpen") == 1) {
				$(this).data("isOpen", 0);
				cur.$codePanel.removeClass("codePanelOpen").addClass(
						"codePanelClose");
				$(this).removeClass("codeIcon_out").removeClass(
						"codeIcon_click").addClass("codeIcon_over");
			}
		});
	};

	p.initlinkGroup = function() {
		var cur = this;
		cur.$linkTitle.click(function(e) {
			e.stopPropagation();
			cur.$linkGroupdom.addClass("linkGroupHover");
		});
		$(document).mousedown(function(e) {
			if ($.inArray(cur.$linkGroupdom[0],$(e.target).parents())==-1) {
				cur.$linkGroupdom.removeClass("linkGroupHover");
			}
		})
	};

	foton.Footer = Footer;
})();

//function logout() {
//	//先删除cookie在调后端的退出方法
//	$.cookie('foton_access_token','',{path: '/',expires:-1});
//	$.ajax({
//		url : "/pickup/user/logout",
//		type : "get",
//		success : function(data) {
//			window.location.href = "/pickup/index";
//		}
//	});
//}
//退出登录的方法
function mcLogout(){
	//先删除cookie在调后端的退出方法
	$.cookie('foton_access_token','',{path: '/',expires:-1});
	$.ajax({
		url : $mcBaseUrl+ "MemberCenter/logout",
		type : "get",
		success : function(data) {
			window.location.href = "/webback/bottom/login";
		}
	});
}


// 读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return (arr[2]);
	else
		return null;
}
//链接

(function(){
	var links = function(i){
		this.init(i);
	}
	var p = links.prototype;
	
	p.init = function(i){
		this.initDom();
		this.linkch(i);
	}
	p.initDom = function(){
		this.$navPanel = $("div.navPanel a");
	};
	p.linkch = function(i){
		var cur = this;
		cur.$li.eq(i).addClass("present");
	};
})();
//小i机器人
(function(){
	var irobot = function(){
		this.init();
	};
	
	var p = irobot.prototype;
	
	p.init = function(){
		//生成Dom结构
		this.onlineDom();
		//点击在线服务
		this.online();

	};
	p.onlineDom = function(){
		this.$onlineservice = $("div.loginPanel a.onlineservice , div.toolGroup a.onlineservice , p a.onlineservice");
	};
	
	p.online = function(){
		var cur = this;
		this.$onlineservice.click(function(){
			// 如果弹出框隐藏了，再次点击时，则把隐藏的显示，否则重新创建弹出框
			if($("div.entirety").length > 0){
				$("div.entirety").fadeIn();
				$("#robotDialogBox").fadeIn().removeClass("rgkhIndex");
				$("#rgDialogBox").addClass("rgkhIndex");
			}else{
				cur.generate();
			}
			//alert("功能暂时不开放");
		});
	};
	
	p.generate = function(){
		var cur = this;
		var $entirety = $('<div class="entirety"></div>');//整体盒子
		var $dialogbox = $('<div class="dialogbox" id="robotDialogBox"></div>');//对话框盒子
		var $dialogue = $('<div class="dialogue" id="rgDialogBox"></div>');
		var $iframebox = $('<iframe name="zrgIframe" src="http://foton.custhelp.com/app/mobile/chat/chat_landing_home" width="500" height="540" class="framebox" scrolling="no"></iframe>');
		var $topcon = $('<div class="topcon" id="robotbox">'+
			    			'<img src="/webback/static/images/robot/machine.png" width="64" height="96" class="machine"/>'+
			    			'<div class="motivational">'+
			    				'<span class="smalli">福田小 i 机器人</span>'+
			    				'<span class="allday">24小时竭诚为您服务</span>'+
			    			'</div>'+
			    			'<div class="closed"></div>'+
			    		'</div>');//标题
		var $topcontwo = $('<div class="topcon" id="dialoguespeak">'+
    			'<img src="/webback/static/images/robot/machine.png" width="64" height="96" class="machine"/>'+
    			'<div class="motivational">'+
    				'<span class="smalli">福田公司人工客服</span>'+
    				'<span class="allday">竭诚为您服务</span>'+
    			'</div>'+
    			'<div class="frameclosed"></div>'+
    		'</div>');//标题
		var $dialogueleft = $('<div class="dialogueleft"></div>');//左边内容大盒子
		var $chatting = $('<div class="chatting"></div>');//聊天记录
		var $incontent = $('<div class="incontent">'+
			    				'<div class="typeface clearfix">'+
			    					'<div class="typepic"></div>'+
			    					'<select id="selectsnum">'+
										'<option value="12">12</option>'+
										'<option value="13">13</option>'+
										'<option value="14">14</option>'+
										'<option value="15">15</option>'+
										'<option value="16">16</option>'+
										'<option value="17">17</option>'+
										'<option value="18">18</option>'+
									'</select>'+
									'<a href="#" class="manpower">转人工客服</a>'+
									'<form action="" method="" class="field">'+
										'<textarea name="" id="enterContent"></textarea>'+
										'<input type="button" name="" id="sendmessage" value="发送信息" title="点击发送"/>'+
										'<input type="button" name="" id="quit" value="关闭" title="点击关闭"/>'+
										'<div class="searchcase">'+
											'<ul class="warning">'+
												
											'</ul>'+
										'</div>'+
									'</form>'+
			    				'</div>'+
			    				'<div class="reminder">'+
			    					'<span class="keyword">发送内容不能为空,请重新输入.</span>'+
			    				'</div>'+
			    			'</div>');//聊天输入框
		var $morecon = $('<div class="morecon"></div>');//右边内容大盒子
		var $query = $('<ul class="query clearfix">'+
		    				'<li class="checked options"><a>首页</a></li>'+
		    				'<li class="options"><a>热点问题</a></li>'+
		    				'<li class="options"><a>在线留言</a></li>'+
		    				'<li><a href="http://foton.custhelp.com/ci/documents/detail/5/26/12/f9943fada86975bbd5fc99adb71121beb1e57cc3" target="_blank">问卷调查</a></li>'+
		    			'</ul>');	//导航栏
		var $homepage = $('<div class="switchbox homepage clearfix">'+
			    				'<div class="smallbanner">'+
				    				'<div class="smallbannerbox"></div>'+
				    				'<ul class="dotamount clearfix"></ul>'+
				    			'</div>'+
			    				'<div class="maintain clearfix">'+
				    				'<a class="subscribe" href="/webback/bottom/testDrive" target="_blank">'+
				    					'<img src="/webback/static/images/robot/kefu1.jpg" width="120" height="80"/>'+
				    					'<span>预约试驾</span>'+
				    				'</a>'+
				    				'<a class="subscribe" href="/webback/customer/customerService" target="_blank">'+
				    					'<img src="/webback/static/images/robot/kefu2.jpg" width="120" height="80"/>'+
				    					'<span>维修保养</span>'+
				    				'</a>'+
				    				'<a class="subscribe" href="/webback/customer#serviceProviders" target="_blank">'+
				    					'<img src="/webback/static/images/robot/kefu3.jpg" width="120" height="80"/>'+
				    					'<span>服务站/经销商查询</span>'+
				    				'</a>'+
			    				'</div>'+
			    			'</div>'); //首页
		var $correlation = $('<div class="switchbox correlation clearfix">'+
			    				'<ul class="hotpints"></ul>'+
				    			'<ul class="pagenum clearfix"></ul>'+
			    			'</div>'); //热点问题
		var $survey = $('<div class="switchbox survey clearfix">'+
						'<iframe src="http://foton.custhelp.com/app/Fotonhome_ask/" width="400" height="430" frameborder="0"></iframe>'+
					    '</div>');
		var $servicetime = $('<div class="servicetime">'+
				    			'<div class="umbrbox"></div>'+
				    			'<div class="timewicket">'+
				    				'<div class="wickettitle"><div class="colse"></div></div>'+
				    				'<p class="presentation">很抱歉，暂时无法转接人工客服<br />人工客服的服务时间为：上午 '+
				    					'<span class="clock">8：30</span> -- 下午<span class="clock">21：00</span>'+
				    				'</p>'+
				    				'<button class="sureok">确定</button>'+
				    			'</div>'+
				    		'</div>');//客服工作时间窗口
		$("body").append($entirety);
		$entirety.append($dialogbox).fadeIn();
		$entirety.append($dialogue);
		$dialogbox.append($topcon,$dialogueleft,$morecon,$servicetime);
		$dialogue.append($topcontwo,$iframebox);
		$dialogueleft.append($chatting,$incontent);
		$morecon.append($query,$homepage,$correlation,$survey);
		cur.initmove();
		$(document).on("click",function(){
			cur.moverot();
		});
	};
	
	p.moverot = function(){
		var cur = this;
		//获取拖拽的对象
		var boxDom=document.getElementById("robotbox");
 		var robotDialogBox = document.getElementById("robotDialogBox");
 		var boxtDom=document.getElementById("dialoguespeak");
 		var rgDialogBox = document.getElementById("rgDialogBox");
 		//点击切换层级
 		$(".topcon").on("click",function(){
			$(this).parent().addClass("rgkhIndex").siblings().removeClass("rgkhIndex");
		});
		//绑定拖拽事件
		boxDom.onmousedown=function(e){
			//获取元素的坐标
			var x =e.clientX - robotDialogBox.offsetLeft - 450;
			var y = e.clientY - robotDialogBox.offsetTop; 
			var maxW = window.innerWidth - robotDialogBox.offsetWidth + 430;
			var maxH = window.innerHeight - robotDialogBox.offsetHeight;
			//拖到
			document.onmousemove=function(e){
				var left = e.clientX -x;
				var top  = e.clientY -y;
			    //如果left值小于等于0的时候就让他等于0；
			    if(left<=450){left=450;}
				//如果top值小于等于0的时候就让他等于0；
			    if(top<=35){top=35}
			    //如果left值大于等于浏览器当前最大的宽度的时候就让他等于宽度；
				if(left >=maxW){left = maxW};
				//如果left值大于等于浏览器当前最大的高度的时候就让他等于当前高度；
				if(top>=maxH){top=maxH};
				robotDialogBox.style.left = left + "px";
				robotDialogBox.style.top = top + "px";
			};
		 };
		 boxtDom.onmousedown=function(e){
				//获取元素的坐标
				var x =e.clientX - rgDialogBox.offsetLeft - 450;
				var y = e.clientY - rgDialogBox.offsetTop; 
				var maxW = window.innerWidth - rgDialogBox.offsetWidth + 430;
				var maxH = window.innerHeight - rgDialogBox.offsetHeight;
				
				//拖到
				document.onmousemove=function(e){
					var left = e.clientX -x;
					var top  = e.clientY -y;
				    //如果left值小于等于0的时候就让他等于0；
				    if(left<=450){left=450;}
					//如果top值小于等于0的时候就让他等于0；
				    if(top<=35){top=35}
				    //如果left值大于等于浏览器当前最大的宽度的时候就让他等于宽度；
					if(left >=maxW){left = maxW};
					//如果left值大于等于浏览器当前最大的高度的时候就让他等于当前高度；
					if(top>=maxH){top=maxH};
					rgDialogBox.style.left = left + "px";
					rgDialogBox.style.top = top + "px";
				};
			
			 };
		 //松开鼠标解绑
		 document.onmouseup=function(){
			document.onmousemove = null;
			document.onmousedown = null;
		 };
	};
	
	p.initmove = function(){
		new foton.Bannerlittle();
		this.initDom();
		this.closed();
		this.sonclosed();
		this.switchover();
		this.fontsize();
		this.clearcon();
		this.sendmes();
		this.worktime();	
		this.offwork();
		new foton.Keyword();
	};
	
	
/*------------------生成后效果----------------------*/
	p.initDom = function(){
		
		this.$entirety = $("div.entirety");
		this.$dialogbox = $("div.dialogbox");
		this.$closed = $("div.closed , #quit");
		this.$frameclosed = $("div.dialogue div.frameclosed");
		this.$options = $("ul.query li.options");
		this.$switchbox = $("div.switchbox");
		this.$sizenum = $(".select option");
		this.$entercontent = $("#enterContent");
		this.$sendmessage = $("#sendmessage");
		this.$chatting = $("div.chatting");
		this.$reminder = $("div.reminder");
		this.$offclose = $("div.wickettitle div.colse , button.sureok");
		this.$servicetime = $("div.servicetime");
		this.$manpower = $("a.manpower");
		this.$searchbox = $("div.searchcase");
	};
	
	/*关闭*/
	p.closed = function(){
		var cur = this;
		this.$closed.click(function(){
			cur.$dialogbox.fadeOut(500,function(){
				cur.$entirety.fadeOut();
			});
			
		});
	};
	
	/*人工客服关闭窗口*/
	p.sonclosed = function(){
		var cur = this;
		$("div.frameclosed").click(function(){
			$("#rgDialogBox").remove();
		});
	};
	
	/*选项切换*/
	p.switchover = function(){
		var cur = this;
		this.$options.click(function(){
			$(this).addClass("checked").siblings().removeClass("checked");
			var index = $(this).index();
			cur.$switchbox.eq(index).fadeIn(800).siblings("div.switchbox").hide();
			if(index == 1){// 下标1代表切换到热点问题
				// 热点问题
				$.ajax({
					type : "POST",
					url : irobot_commonUrl+"robot/rdwt",
					data : {pageNum:irobot_pageNum,countStr:1},
					async : false,
					success : function(dataH) {
						if (dataH != null) {
							var dataHArr = dataH.split(",");
							if(dataHArr.length > 0){
								var pageHtml = "<li class='prevPage' onclick='changePage(this)'>上一页</li>";
								irobot_pageCount = parseInt(dataHArr[dataHArr.length - 2]);
								irobot_totalCount = parseInt(dataHArr[dataHArr.length - 1]);
								if(irobot_pageCount > 6){
									var sl_count = 0;
									// 循环得到页码
									for(var j = 0;j < irobot_pageCount;j++){
										if(j == 0){
											pageHtml += "<li class='rock' onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
										}else if(2 < j && j < irobot_pageCount - 2){
											sl_count += 1;
											if(sl_count == 1){
												pageHtml += "<li class='apostrophe'>...</li>";
											}
										}else{
											pageHtml += "<li onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
										}
									}
								}else{
									// 循环得到页码
									for(var j = 0;j < irobot_pageCount;j++){
										if(j == 0){
											pageHtml += "<li class='rock' onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
										}else{
											pageHtml += "<li onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
										}
									}
								}
								pageHtml += "<li class='nextPage' onclick='changePage(this)'>下一页</li>";
								$("ul[class='pagenum clearfix']").html(pageHtml);
								var hotQHtml = "";
								for(var i = 0;i < dataHArr.length - 2;i++){
									hotQHtml += "<li><a href='#' onclick='showQ(this)'>"+dataHArr[i]+"</a></li>";
								}
								if(dataHArr.length < 11){
									for(var j = 0;j < (11 - dataHArr.length);j++){
										hotQHtml += "<li><a href='#'></a></li>";
									}
								}
								$(".hotpints").html(hotQHtml);
							}
						}
					},
					error : function(e){
						alert("系统请求出错！");
						return false;
					}
				});
			}
		});
	};
	
/*---------------banner--------------------------*/
	(function(){
		var Bannerlittle = function(){
			this.init();
		}
		var p = Bannerlittle.prototype;
		
		p.init = function(){
			this.dot();
			this.initDom();
			this.bannerbth();
			this.autoid = 0;
			this.autochange(this.autoid);
		}
		
		/*生成圆点*/
		p.dot = function(){
			var cur = this;
			// 生成圆点
			$.ajax({
				url : "/webback/iRobot/getCarousel",
				async : false,
				success : function(data) {
					if (data != null) {
						var imgnum = data.length;
						var i = 0;
						for(i=0 ; i < imgnum ; i++){
							$("ul.dotamount").append('<li class="banneryd"></li>');
						}
					}
				},
				error : function(e){
					alert("系统请求出错！");
					return false;
				}
			});
		};
		
		p.initDom = function(){
			//圆点
			this.$banneryd = $("ul.dotamount li.banneryd");
			//大盒子
			this.$smallbannerbox = $("div.smallbannerbox");
			// 拼接轮播图
			$.ajax({
				url : "/webback/iRobot/getCarousel",
				async : false,
				success : function(data) {
					if (data != null) {
						var htmlVal = "";
						for(var i = 0;i < data.length;i++){
							htmlVal += '<a href="'+data[i].anchorUrl+'" target="_blank"><div class="smallbanners">'+
    						'<img src="'+data[i].image+'" height="260" width="400"/>'+
    						'<div class="shade">'+
    						'<div class="shadows"></div>'+
    						'<span class="shadeword">'+data[i].title+'</span>'+
    						'</div>'+
    						'</div></a>';
						}
						$(".smallbannerbox").html(htmlVal);
					}
				},
				error : function(e){
					alert("系统请求出错！");
					return false;
				}
			});
		};
		
		p.bannerbth = function(){
			var cur = this;
			
			this.$banneryd.click(function(){
				//停止自动播放
				cur.stoptime();
				var id = cur.$banneryd.index(this);
				cur.autoid = id;
				cur.autochange(id);
			});
		};
		
		p.autochange = function(id){
			var cur = this;
			var move = -id*400;
			
			this.$smallbannerbox.stop(true,true).animate({"left":move},800);
			this.$banneryd.eq(id).addClass("pick").siblings().removeClass("pick");
			//自动播放
			this.startime();
		}
		
		p.startime = function(){
			var cur = this;
			var imgnum = $("div.smallbanners").children("img").length;
			
			this.timer = setTimeout(function(){
				if(cur.autoid < imgnum-1){
					cur.autoid++;
				}else{
					cur.autoid = 0;
				}
				cur.autochange(cur.autoid);
			},3000);
		};
		
		p.stoptime = function(){
			if(this.timer) clearTimeout(this.timer);
		};
		
		foton.Bannerlittle = Bannerlittle;
	})();
	
	/*切换字体大小*/
	p.fontsize = function(){
		var cur = this;
		$("#selectsnum").change(function(){
			var sizenum = $(this).val();
			$("#enterContent").css("font-size", parseInt(sizenum));
		});
	};
	
	/*聊天对话框焦点事件*/
	p.clearcon = function(){
		/*var cur = this;
		this.$entercontent.focus(function(){
			$(this).text("");
		});
		this.$entercontent.blur(function(){
			if(cur.$entercontent.text()==''){
				$(this).text("福田汽车：公司看点已经发生重大变化");
			}
			
		});*/
	};
	
	/*点击发送聊天消息*/
	p.sendmes = function(){
		var cur = this;
		$(document).keydown(function(event){ 
			if(event.keyCode == 13){ //绑定回车 
				event.preventDefault();
				cur.$sendmessage.trigger("click");
			} 
		});
		this.$sendmessage.click(function(){
			var mes = cur.$entercontent.val();
			var sizenum = $("#selectsnum").val();
			
			if(!(mes == "")){
				irobot_answer = mes;// 给咨询小i机器人的问题变量赋值
				var userId = "";
				// 获取当前登录用户
				$.ajax({
					url : "/webback/user/getOne",
					type : "get",
					async : false,
					success : function(data) {
						if (data.data == null) {
							userId = "";
							return;
						} else {
							userId = data.data.id;
						}
					}
				});
				// 进行智能对话
				$.ajax({
					type : "POST",
					url : irobot_commonUrl+"robot/zndh",
					data : {questionVal:mes,userIdVal:userId},
					async : false,
					success : function(data) {
						if (data != null) {
							var dataArr = data.split("@");
							// 如果小i机器人回复的是ZRG，则显示转人工链接
							if(dataArr[0].trim() == "ZRG" || dataArr[0].trim() == "" || dataArr[0].trim() == "ZRG<br/>"){
								// 拼接问题
								cur.$chatting.append('<div class="putquestion clearfix">'+
										'<img src="/webback/static/images/robot/user.jpg" alt="" width="50" height="50" class="raisepic">'+
										'<p class="raise" style="font-size: '+sizenum+'px;">'+mes+'</p></div>');
								// 拼接答案
								cur.$chatting.append('<div class="writeback clearfix">'+
										'<img src="/webback/static/images/robot/iii.jpg" alt="" width="50" height="50" class="robotpic">'+
										'<p class="response" style="font-size: '+sizenum+'px;"><a href="#" class="manpower">转人工客服</a></p></div>');
							}else{
								// 拼接问题
								cur.$chatting.append('<div class="putquestion clearfix">'+
										'<img src="/webback/static/images/robot/user.jpg" alt="" width="50" height="50" class="raisepic">'+
										'<p class="raise" style="font-size: '+sizenum+'px;">'+mes+'</p></div>');
								// 当问答接口中返回的type=1（表示用户触发到了标准问）时，才可进行评价(点赞或踩)
								if(dataArr[1] == "1"){
									// 拼接答案
									cur.$chatting.append('<div class="writeback clearfix">'+
											'<img src="/webback/static/images/robot/iii.jpg" alt="" width="50" height="50" class="robotpic">'+
											'<p class="response" style="font-size: '+sizenum+'px;">'+dataArr[0]+
											'<br/><span><a href="#" onclick="showPJ(this)">【赞】</a>&nbsp;&nbsp;&nbsp;'+
											'<a href="#" onclick="showPJ(this)">【踩】</a>'+
											'</span></p></div>');
									// 给答案节点赋值
									irobot_nodeId = dataArr[2];
								}else{
									// 拼接答案
									cur.$chatting.append('<div class="writeback clearfix">'+
											'<img src="/webback/static/images/robot/iii.jpg" alt="" width="50" height="50" class="robotpic">'+
											'<p class="response" style="font-size: '+sizenum+'px;">'+dataArr[0]+'</p></div>');
								}
							}
						}
					},
					error : function(e){
						alert("系统请求出错！");
						return false;
					}
				});
			}else{
				cur.$reminder.stop(true,false).fadeIn().delay(1000).fadeOut();
				
			}
			cur.$entercontent.val("");
			cur.$entercontent.focus();// 光标回填
			cur.$chatting.scrollTop($("div.chatting")[0].scrollHeight);
			cur.$searchbox.hide();
		});
		
	};
	
	/*工作时间转人工，非工作时间弹出窗口*/
	p.worktime = function(){
		var cur = this;
		var begintime = 830;
		var endtime = 2100;
		var d = new Date();
		var h = d.getHours();
		$(document).on('click','a.manpower',function(){
			// 获取当前服务器时间
			$.ajax({
				url : irobot_commonUrl+"robot/nowTime",
				async : false,
				success : function(data) {
					if (data != null) {
						h = data;
						if(begintime>h || h>=endtime){
							cur.$servicetime.fadeIn();
							return false;
						}else{
							if($(".dialogue").length == 0){
							    var $topcontwo = $('<div class="topcon" id="dialoguespeak">'+
						    			'<img src="/webback/static/images/robot/machine.png" width="64" height="96" class="machine"/>'+
						    			'<div class="motivational">'+
						    				'<span class="smalli">福田公司人工客服</span>'+
						    				'<span class="allday">竭诚为您服务</span>'+
						    			'</div>'+
						    			'<div class="frameclosed"></div>'+
						    		'</div>');//标题
								var $iframeBox = $('<iframe name="zrgIframe" src="http://foton.custhelp.com/app/mobile/chat/chat_landing_home" width="500" height="540" class="framebox" scrolling="no"></iframe>');
								var $rgkhBox = $('<div class="dialogue" id="rgDialogBox"></div>');
								$("div.entirety").append($rgkhBox);
								$rgkhBox.append($topcontwo,$iframeBox);
								cur.sonclosed();
							}
							var userId = "";
							// 获取当前登录用户
							$.ajax({
								url : "/webback/user/getOne",
								type : "get",
								async : false,
								success : function(data) {
									if (data.data == null) {
										userId = "";
										return;
									} else {
										userId = data.data.id;
									}
								}
							});
							// 智能对话历史记录
							$.ajax({
								type : "POST",
								url : irobot_commonUrl+"robot/zndhHistory",
								data : {questionVal:"再见",userIdVal:userId},
								async : false,
								success : function(dataHistory) {
									if (dataHistory != null) {
										dataHistory = dataHistory.substring(0,dataHistory.lastIndexOf("客户"));
										var robot_url = "http://foton.custhelp.com/app/mobile/chat/chat_landing_home";
										cur.openlabour();// 弹出转人工弹出框
										var form1 = document.createElement("form");  
				                           form1.id = "form1";  
				                           form1.name = "form1"; 
				                           // 添加到 body 中  
				                           document.body.appendChild(form1);
				                           var input = document.createElement("input");  
				                           input.type = "text";  
				                           input.name = "Contact.Name.First";  
				                           input.value = "";
				                           var input1 = document.createElement("input");  
				                           input1.type = "text";  
				                           input1.name = "Incident.CustomFields.c.phonnum";  
				                           input1.value = "";
				                           var textarea = document.createElement("textarea");  
				                           textarea.name = "Incident.CustomFields.c.chathis_xiaoi";  
				                           textarea.textContent = dataHistory;
				                           var input3 = document.createElement("input");  
				                           input3.type = "text";  
				                           input3.name = "Incident.CustomFields.c.sr_acceptchannel";  
				                           input3.value = "26";
				                           form1.appendChild(input); 
				                           form1.appendChild(input1);
				                           form1.appendChild(textarea);
				                           form1.appendChild(input3);
				                           form1.method = "POST";
				                           form1.target="zrgIframe";
				                           form1.action = robot_url;
				                           form1.submit();   
				                           document.body.removeChild(form1);
									}
								},
								error : function(e){
									alert("系统请求出错！");
									return false;
								}
							});
						}
					}
				}
			});
		});
	};
	
	/*关闭（提示下班窗口）*/
	p.offwork = function(){
		var cur = this;
		this.$offclose.click(function(){
			cur.$servicetime.fadeOut();
		});
	};
	
	/*连接呼叫中心*/
	p.openlabour =function(){
		var cur = this;
//		$("#robotDialogBox").fadeOut();
		$("#rgDialogBox").fadeIn();
	};	
/*------------输入关键字出联想框-----------*/
	(function(){
		var Keyword = function(){
			this.init();
		}
		var p = Keyword.prototype;
		var ularray = [];
		p.init = function(){
			this.initDom();
			//点击选项
			this.onclick();
			//绑定keyup事件
			this.call();
		};
		
		p.initDom = function(){
			this.$ul = $("div.searchcase ul.warning");
			this.$enterContent = $("#enterContent");
			this.$searchbox = $("div.searchcase");
		};
		
		p.keyup = function(flag){
			var cur = this;
			var textcon = cur.$enterContent.val();
			var searchbox = cur.$searchbox.html();
			var array = [];
			var zhongwenStr = /[\u4e00-\u9fa5]/;
			var daxieStr = /^[A-Z]+$/;
			// 如果是中文或大写字母，则进行智能提示
			if(zhongwenStr.test(textcon) || daxieStr.test(textcon)){
				// 进行智能提示
				$.ajax({
					type : "POST",
					url : irobot_commonUrl+"robot/znts",
					data : {inputVal:textcon},
					async : false,
					success : function(dataVal) {
						if (dataVal != null && dataVal != "") {
							ularray = [];
							var data = [];
							var dataArr = dataVal.split(",");
							for(var i = 0;i < dataArr.length;i++){
								var dataObj = {i:dataArr[i]};
								data.push(dataObj);
							}
							$.each(data, function(index,item) {
								 var li = $("<li title=''></li>");
								 $.each(item, function(name,value) {
								 	var con = li.html(value); 
								 	var til = li.attr("title",value);
									ularray.push(value); 
								 });
								cur.$ul.append(li);
							});
							
							//排序 
							ularray.sort();
						}
					},
					error : function(e){
						alert("系统请求出错！");
						return false;
					}
				});
			}
			
			with(searchbox){
				var ulHTML=searchbox.match(/<[^>]*>/)[0];//拿到开始标签 
				var val = ularray + "";
				var i = 0;
				
				for(i=0; i<ularray.length; i++){
					//分割成字符串数组 
					if(val.split(",")[i].indexOf(textcon)!==-1 || flag){
						array[array.length]="<li title='"+ularray[i]+"'>"+ularray[i]+"</li>"; 
					}
				}//把新得到的集合放入数组 
				var liHtml = ""; 
				$.each(array,function(item,val){ 
					liHtml += val; 
				});//去掉数组间逗号 
				
				var divObj=ulHTML+liHtml+"</ul>"; 
				this.$ul.html(divObj); 
				cur.onclick(); //让新得到的数组拥有点击功能 
				
				//判断是否有匹配条目如有显示框体
				if(cur.$enterContent.val() === "" && cur.$ul.find("li").length > 0){
					cur.$searchbox.hide();
				}else if(cur.$ul.find("li").length === 0){
					cur.$searchbox.hide();
				}else{
					cur.$searchbox.show();
				}
			};
		};
		
		p.onclick = function(){
			var cur = this;
			 $("ul.warning li").click(function(){
				var keytext = $(this).html(); 
				cur.$enterContent.empty().val(keytext); 
				cur.$searchbox.hide();
			 });
		};
		
		p.call = function(){
			var cur = this;
			this.$enterContent.bind("keyup",function(){
				cur.keyup(0);
			})
		};
		
		foton.Keyword = Keyword;
	})();
	
	foton.irobot = irobot;
})();

//链接
(function(){
	var links = function(i){
		this.initDom();
		this.initlinks(i);
	};
	var p = links.prototype;
	p.initDom = function(){
		this.$navPanel = $("div.navPanel a");
	}
	p.initlinks = function(i){
		var cur = this;
		cur.$navPanel.eq(i).addClass("present");
	};
	foton.links = links;
})();

/* 访问统计 */
(function(){
	var vistNum = function(){
		this.init();
	};
	
	var p = vistNum.prototype;
	p.init = function(){
		this.openTime = this.now = new Date().getTime();
		this.cookieset = false;
		this.initUnload();
	};
	
	p.initUnload = function(){
		var cur = this;
		window.onbeforeunload =function() {
			var cookies = document.cookie;
			var uuid=null;
			var cookielist=cookies.split(";");
			for(var i=0;i<cookielist.length;i++){
				var c=cookielist[i];
				if(cur.startstr(c,'fotonuuid')){
					cur.cookieset=true;
				}
			}
			if(cur.cookieset==false){
				//有cookie向其中写入值
				uuid=cur.guid();
			}
			else{
				uuid = $.cookie('fotonuuid');
				cur.vistUpData(uuid);
			}
		};
		$(window).focus(function(){
			cur.openTime = new Date().getTime();
		});
		$(window).blur(function(){
			cur.stopTime();
		});
	};
	
	p.stopTime = function(){
		if(!isNaN(this.residenceTime)){
			this.residenceTime += (new Date().getTime() - this.openTime);
		}
		else{
			this.residenceTime = 0;
			this.residenceTime += (new Date().getTime() - this.openTime);
		}
	};
	
	p.vistUpData = function(uuid){
		var cur = this;
		this.stopTime();
		
		var ipAddr = ip;
		if(ip.length<=0){
			return;
		}
		var location = window.location.href;
		var referrer = document.referrer;
		var lastTime = new Date().getTime();
		var residenceTime = this.residenceTime;
		var requesttime=cur.now;
		
		var date = new Date();
		var shiqu = 0-date.getTimezoneOffset()/60;
		var tz = "";
		if(shiqu>0){
			tz = '%2B'+String(shiqu);
		}
		var fenbianlvW = window.screen.width;
		var fenbianlvH = window.screen.height;
		var fenbianlv = fenbianlvW+'X'+fenbianlvH;
		
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		{
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			}
			else{
			}
		}
		xmlhttp.open("POST","/pickup/statistics/close",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var message='ip='+ipAddr+'&location='+location+'&referrer='+referrer+'&residenceTime='+residenceTime+'&requesttime='+cur.now+'&uuid='+uuid+'&shiqu='+tz+'&fenbianlv='+fenbianlv;
		xmlhttp.send(message);
	};
	
	p.guid = function() {
		var cur = this;
		$.ajax({
			type : 'get',
			url : '/pickup/statistics/getUUID',
			dataType : 'text',
			success : function(data) {
				cur.setCookie("fotonuuid",data,24*12 );
				cur.vistUpData(data);
			},
			error : function(data) {
				var sss = cur.S4() + cur.S4() + cur.S4() + cur.S4() + cur.S4() + cur.S4() + cur.S4() + cur.S4();
				cur.setCookie("fotonuuid",sss,24*12 );
				cur.vistUpData(sss);
			}
		});
	};
	p.S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	p.startstr = function(str,uuid){
		if(uuid==null||uuid==""||str.length==0||uuid.length>str.length)
			return false;
		var s=uuid.length;
		var subr=str.substr(0,s);
			if(subr==uuid){
				return true;
			}else{
				return false;
			}
	}
	
	p.setCookie = function(name, value, seconds) {
		seconds = seconds || 0; // seconds有值就直接赋值，没有为0，这个根php不一样。
		var expires = "";
		if (seconds != 0) { // 设置cookie生存时间
			var date = new Date();
			date.setTime(date.getTime() + (seconds * 1000 * 60 * 60));
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = name + "=" + escape(value) + expires + "; path=/"; // 转码并赋值
	}

	foton.vistNum = vistNum;
})();


// 把问题展示在输入框中
function showQ(obj){
	$("#enterContent").empty().val(obj.text);
}

// 评价服务
function showPJ(obj){
	if(obj.text == "【赞】"){
		var userId = "";
		// 获取当前登录用户
		$.ajax({
			url : "/webback/user/getOne",
			type : "get",
			async : false,
			success : function(data) {
				if (data.data == null) {
					userId = "";
					return;
				} else {
					userId = data.data.id;
				}
			}
		});
		// 进行赞或踩
		$.ajax({
			type : "POST",
			url : irobot_commonUrl+"robot/zhc",
			data : {questionVal:irobot_answer,userIdVal:userId,actionVal:1,nodeIdVal:irobot_nodeId},
			async : false,
			success : function(data) {
				if (data != null) {
					var dataArr = data.split(":");
					if(dataArr[0] == 0){
						$(obj).parent().empty().text("【你已点了赞】");
					}else{
						alert(dataArr[1]+"评价失败！");
						return false;
					}
				}
			},
			error : function(e){
				alert("系统请求出错！");
				return false;
			}
		});
	}
	if(obj.text == "【踩】"){
		var userId = "";
		// 获取当前登录用户
		$.ajax({
			url : "/webback/user/getOne",
			type : "get",
			async : false,
			success : function(data) {
				if (data.data == null) {
					userId = "";
					return;
				} else {
					userId = data.data.id;
				}
			}
		});
		// 进行赞或踩
		$.ajax({
			type : "POST",
			url : irobot_commonUrl+"robot/zhc",
			data : {questionVal:irobot_answer,userIdVal:userId,actionVal:2,nodeIdVal:irobot_nodeId},
			async : false,
			success : function(data) {
				if (data != null) {
					var dataArr = data.split(":");
					if(dataArr[0] == 0){
						$(obj).parent().empty().text("【你已点了踩】");
					}else{
						alert(dataArr[1]+"评价失败！");
						return false;
					}
				}
			},
			error : function(e){
				alert("系统请求出错！");
				return false;
			}
		});
	}
}

// 点击分页
function changePage(obj){
	
	if(obj.textContent == "上一页"){
		if(irobot_pageNum == 1){
			alert("已经是第一页");
		}else{
			
			irobot_pageNum = parseInt(irobot_pageNum) - 1;
			if(irobot_pageCount > 6){
				if(parseInt(irobot_pageNum) % 3 == 0 && parseInt(irobot_pageNum) < irobot_pageCount - 3){
					var pageHtml = "<li class='prevPage' onclick='changePage(this)'>上一页</li>";
					var sl_count = 0;
					// 循环得到页码
					for(var j = parseInt(irobot_pageNum) - 3;j < irobot_pageCount;j++){
						if(j == parseInt(irobot_pageNum) - 1){
							pageHtml += "<li class='rock' onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
						}else if(parseInt(irobot_pageNum) - 2 < j && j < irobot_pageCount - 2){
							sl_count += 1;
							if(sl_count == 1){
								pageHtml += "<li class='apostrophe'>...</li>";
							}
						}else{
							pageHtml += "<li onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
						}
					}
					pageHtml += "<li class='nextPage' onclick='changePage(this)'>下一页</li>";
					$("ul[class='pagenum clearfix']").html(pageHtml);
				}
			}
		}
	}else if(obj.textContent == "下一页"){
		if(irobot_totalCount < parseInt(irobot_pageNum) * 9){
			alert("已经是最后一页");
		}else{
			if(irobot_pageCount > 6){
				if(parseInt(irobot_pageNum) % 3 == 0 && parseInt(irobot_pageNum) < irobot_pageCount - 3){
					var pageHtml = "<li class='prevPage' onclick='changePage(this)'>上一页</li>";
					var sl_count = 0;
					// 循环得到页码
					for(var j = parseInt(irobot_pageNum);j < irobot_pageCount;j++){
						if(j == parseInt(irobot_pageNum)){
							pageHtml += "<li class='rock' onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
						}else if(parseInt(irobot_pageNum) + 2 < j && j < irobot_pageCount - 2){
							sl_count += 1;
							if(sl_count == 1){
								pageHtml += "<li class='apostrophe'>...</li>";
							}
						}else{
							pageHtml += "<li onclick='changePage(this)'>"+(parseInt(j)+1)+"</li>";
						}
					}
					pageHtml += "<li class='nextPage' onclick='changePage(this)'>下一页</li>";
					$("ul[class='pagenum clearfix']").html(pageHtml);
				}
			}
			irobot_pageNum = parseInt(irobot_pageNum) + 1;
		}
	}else{
		irobot_pageNum = obj.textContent;
	}
	// 移除选中样式
	$("ul[class='pagenum clearfix']").find("li").css({
		background : "#FFFFFF",
	    color : "#000000"
	});
	// 热点问题
	$.ajax({
		type : "POST",
		url : irobot_commonUrl+"robot/rdwt",
		data : {pageNum:irobot_pageNum,countStr:2},
		async : false,
		success : function(dataH) {
			if (dataH != null) {
				var dataHArr = dataH.split(",");
				if(dataHArr.length > 0){
					var hotQHtml = "";
					for(var i = 0;i < dataHArr.length;i++){
						hotQHtml += "<li><a href='#' onclick='showQ(this)'>"+dataHArr[i]+"</a></li>";
					}
					if(dataHArr.length < 9){
						for(var j = 0;j < (9 - dataHArr.length);j++){
							hotQHtml += "<li><a href='#'></a></li>";
						}
					}
					$(".hotpints").html(hotQHtml);
					var pageObj = $("ul[class='pagenum clearfix']").find("li");
					for(var i = 0; i < pageObj.text().length; i++){
						if(pageObj.eq(i).text() == irobot_pageNum){
							// 设置选中样式
							pageObj.eq(i).css({
								background : "#0065b3",
							    color : "#fff"
							});
						}
					}
				}
			}
		},
		error : function(e){
			alert("系统请求出错！");
			return false;
		}
	});
}