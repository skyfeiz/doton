this.foton = this.foton || {};
(function(){
	var HandF = function(){
		this.add();
	};
	var p = HandF.prototype;
	p.add = function(){
		var cur = this;
		var header = '<div class="header w1200-1400">'+
						'<a href="index.html" class="logo">'+
							'<img src="images/index/2oyearslogo.png" />'+
						'</a>'+
						'<div class="navPanel">'+
							'<a id="index" href="index.html">首页</a>'+
							'<a id="models" href="car_model.html">车型介绍</a>'+
							'<a id="support" href="buy_support.html">购买支持</a>'+
							'<a id="customer" href="client_support.html">客户支持</a>'+
							'<a id="activities" href="activity_brand.html">品牌活动</a>'+
							'<a id="newscenter" href="news_information.html">新闻中心</a>'+
							'<a id="aboutbrand" href="about_brand.html">关于品牌</a>'+
							'<a id="walkinto" href="http://www.foton.com.cn/webback/about" target="_blank">走进福田</a>'+
						'</div>'+
						'<div class="rightPanel">'+
							'<a class="languageIcon" href="http://www.foton-global.com/" target="_blank"></a>'+
							'<div class="line"></div>'+
							'<div class="searchIcon"></div>'+
						'</div>'+
						'<form class="searchPanel" action="/pickup/bottom/search">'+
							'<button class="searchBtn"></button>'+
							'<input class="searchInput" type="text" name="title" value="search">'+
							'<div class="searchClose"></div>'+
						'</form>'+
						'<div class="loginPanel">'+
							'<div class="title">'+
								'<a href="">注册</a>'+
							'</div>'+
							'<div class="line"></div>'+
							'<div class="title">'+
								'<a href="">登录</a>'+
							'</div>'+
							'<div class="line"></div>'+
							'<div class="title">'+
								'<a class="onlineservice">在线客服</a>'+
							'</div>'+
						'</div>'+
						'<div class="subNavMask">'+
							'<div class="subNavScrollPanel">'+
								'<div class="subNavGroup"></div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="car_modelDetail.html">时代驭菱</a>'+
									'<a class="subNav" href="car_modelDetail.html">小卡之星</a>'+
									'<a class="subNav" href="car_modelDetail.html">时代领航</a>'+
									'<a class="subNav" href="car_modelDetail.html">时代康瑞</a>'+
									'<a class="subNav" href="car_modelDetail.html">瑞沃中卡平板</a>'+
									'<a class="subNav" href="car_modelDetail.html">瑞沃中重型自卸</a>'+
									'<a class="subNav" href="car_modelDetail.html">金刚系列</a>'+
									'<a class="subNav" href="car_modelDetail.html">骁运系列</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="buy_support.html#youhuiline">优惠活动</a>'+
									'<a class="subNav" href="buy_support.html#jingxiaoline">经销商查询</a>'+
									'<a class="subNav" href="buy_testDrive.html">预约试驾</a>'+
									'<a class="subNav" href="car_online.html">在线预订</a>'+
									'<a class="subNav" href="buy_boutique.html">精品配饰</a>'+
									'<a class="subNav" href="http://car.bitauto.com/chexingduibi/?carIDs=111459#CarHotCompareList&showdiff&vantage">贷款计算</a>'+
									'<a class="subNav" href="http://beijing.taoche.com/shidaiyuling/">二手车交易</a>'+
									'<a class="subNav" href="">APP下载</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="client_support.html#fuwuline">服务政策</a>'+
									'<a class="subNav" href="client_support.html#jingxiaoline">服务商查询</a>'+
									'<a class="subNav" href="client_customerService.html">维修与保养</a>'+
									'<a class="subNav onlineservice" href="#">在线客服</a>'+
									'<a class="subNav" href="">会员中心</a>'+
									'<a class="subNav" href="">论坛</a>'+
									'<a class="subNav" href="client_support.html#yiyeline">异业联盟</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="activity_brand.html">瑞沃卡车挑战赛</a>'+
									'<a class="subNav" href="activity_brand.html?id=1">品质体验之旅</a>'+
									'<a class="subNav" href="activity_brand.html?id=2">专题活动</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="news_information.html">新闻资讯</a>'+
									'<a class="subNav" href="news_medium.html">媒体评测</a>'+
									'<a class="subNav" href="news_industry.html">行业新闻</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a href="about_brand.html#pinpailine" class="subNav">品牌介绍</a>'+
									'<a href="about_brand.html#rongyuline" class="subNav">品牌荣誉</a>'+
									'<a href="about_brand.html#lichengline" class="subNav">品牌历程</a>'+
									'<a href="about_brand.html#jishuline" class="subNav">技术研发</a>'+
									'<a href="" class="subNav">终端现场管理</a>'+
									'<a href="about_data.html" class="subNav">下载中心</a>'+
									'<a href="about_join.html" class="subNav">招商加盟</a>'+
									'<a href="about_contact.html" class="subNav">联系我们</a>'+
								'</div>'+
								'<div class="subNavGroup">'+
									'<a class="subNav" href="http://www.foton.com.cn/webback/about#enterprise" target="_blank">走进福田</a>'+
									'<a class="subNav" href="http://www.foton.com.cn/webback/news" target="_blank">新闻中心</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
		
		var tool = '<div class="toolPanel w1200-1400">'+
						'<div class="toolGroup">'+
							'<div class="icon phoneIcon" href="buy_testDrive.html">'+
								'<div class="title">'+
									'<a href="">预约试驾</a>'+
								'</div>'+
							'</div>'+
							'<a class="icon driveIcon">'+
								'<div class="title">4008-988-977贵宾专线</div>'+
							'</a>'+
							'<div class="icon codeIcon">'+
				                '<div class="innerIcon"></div>'+
				                '<div class="arrow"></div>'+
				            '</div>'+
							'<div class="icon zxydIcon" href="car_online.html">'+
								'<div class="title">'+
									'<a href="">在线预订</a>'+
								'</div>'+
							'</div>'+
							 '<a class="icon tmallIcon_jqr onlineservice" href="" target="_blank"></a>'+
							'<a class="icon tmallIcon" href="https://foton.tmall.com/search.htm" target="_blank"></a>'+
						'</div>'+
						'<ul class="codePanel">'+
							'<li>'+
								'<div class="codeTitle">官方微信</div>'+
								'<img src="images/index/code4.jpg" width="84" height="84">'+
							'</li>'+
							'<li>'+
								'<div class="codeTitle">官方微博</div>'+
								'<img src="images/index/code2.jpg" width="84" height="84">'+
							'</li>'+
							'<li>'+
								'<div class="codeTitle">移动官网</div>'+
								'<img src="images/index/code3.jpg" width="84" height="84">'+
							'</li>'+
							'<li>'+
								'<div class="codeTitle">天猫旗舰店</div>'+
								'<img src="images/index/code1.jpg" width="84" height="84">'+
							'</li>'+
						'</ul>'+
					'</div>';
		
		var foot = '<div class="footer w1200-1400">'+
						'<div class="innerPanel w1200">'+
							'<div class="col col1">'+
								'<div class="otherNavPanel">'+
									'<a href="about_contact.html">联系我们</a>'+
									'<div class="line"></div>'+
									'<a href="siteMap.html">网站地图</a>'+
									'<div class="line"></div>'+
									'<a href="promise.html">隐私承诺</a>'+
									'<div class="line"></div>'+
									'<a href="links.html">友情链接</a>'+
									'<div class="line"></div>'+
									'<a href="buy_support.html#jingxiaoline">经销商查询</a>'+
								'</div>'+
								'<div class="searchTitle">探索福田汽车官网</div>'+
								'<form class="searchPanel" action="/pickup/bottom/search">'+
									'<input class="searchInput" type="text" value="SEARCH" name="title">'+
									'<input type="submit" class="searchBtn trans" value="">'+
								'</form>'+
							'</div>'+
							'<div class="footLine"></div>'+
							'<div class="col2 col">'+
								'<div class="phoneTitle">24小时贵宾热线：</div>'+
								'<div class="phone">4008-988-977</div>'+
								'<ul class="sharePanel">'+
									'<li class="weibo" id="sina"></li>'+
									'<li class="qqkongjian" id="qzone"></li>'+
									'<li class="qq" id="qqfd"></li>'+
								'</ul>'+
							'</div>'+
							'<div class="footLine"></div>'+
							'<div class="col col3">'+
								'<div class="codeContainer">'+
									'<div class="codeIcon">'+
									'</div>'+
									'<ul class="codePanel codePanelClose trans">'+
										'<li>'+
											'<div class="codeTitle">瑞沃公众号</div>'+
											'<img src="images/index/code4.jpg" width="84" height="84">'+
										'</li>'+
										'<li>'+
											'<div class="codeTitle">时代订阅号</div>'+
											'<img src="images/index/code2.jpg" width="84" height="84">'+
										'</li>'+
										'<li>'+
											'<div class="codeTitle">时代公众号</div>'+
											'<img src="images/index/code3.jpg" width="84" height="84">'+
										'</li>'+
										'<li>'+
											'<div class="codeTitle">福田之家APP</div>'+
											'<img src="images/index/code1.jpg" width="84" height="84">'+
										'</li>'+
									'</ul>'+
								'</div>'+
								'<p>点击 +扫一扫<br>关注FOTON官方公众平台</p>'+
							'</div>'+
							'<div class="footLine"></div>'+
							'<div class="col4 col">'+
								'<p>福田汽车旗下产品品牌</p>'+
								'<div class="linkPanel">'+
									'<div class="linkTitle">福田汽车家族网站</div>'+
									'<div class="linkGroup trans" style="padding-right: 2.5px;">'+
										'<div class="linkBox" style="position: relative; top: 0px; left: 0px;">'+
											'<a href="http://www.foton.com.cn" target="_blank" class="linkBtn">福田汽车集团官网</a>'+
											'<a href="http://www.aumantruck.com/" target="_blank" class="linkBtn">欧曼官方网站</a>'+
											'<a href="http://auv.foton.com.cn/" target="_blank" class="linkBtn">欧辉客车官方网站</a>'+
											'<a href="http://aumark.foton.com.cn/" target="_blank" class="linkBtn">欧马可官方网站</a>'+
											'<a href="http://ollin.foton.com.cn/" target="_blank" class="linkBtn">奥铃官方网站</a>'+
											'<a href="http://van.foton.com.cn" target="_blank" class="linkBtn">商务汽车官方网站</a>'+
											'<a href="http://www.gratourauto.com/" target="_blank" class="linkBtn">北京福田伽途官方网站</a>'+
											'<a href="http://tunland.foton.com.cn/" target="_blank" class="linkBtn">拓陆者/萨瓦纳官方网站</a>'+
											'<a href="http://forland.foton.com.cn/" target="_blank" class="linkBtn">时代汽车官方网站</a>'+
											'<a href="http://rowor.foton.com.cn" target="_blank" class="linkBtn">瑞沃品牌官方网站</a>'+
											'<a href="http://www.fotonloxa.com/" target="_blank" class="linkBtn">雷萨重机官方网站</a>'+
											'<a href="http://www.bfcec.com.cn/" target="_blank" class="linkBtn">福田康明斯官方网站</a>'+
											'<a href="http://pbms.foton.com.cn" target="_blank" class="linkBtn">供应商门户网站</a>'+
										'</div>'+
										'<div class="barBox">'+
											'<div class="barItem" style="height: 99.6923076923077px;"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="copyright w1200-1400">'+
						'<div class="innerPanel w1200">'+
							'© 北汽福田汽车股份有限公司版权所有 &nbsp;&nbsp; 京ICP备12004550号 &nbsp;&nbsp;京公网安备 &nbsp;&nbsp;110401000095号 &nbsp;&nbsp; &nbsp;&nbsp; 地址：北京市昌平区沙河镇沙阳路 &nbsp;&nbsp;24小时监督热线：010-80722999'+
						'</div>'+
					'</div>';			
					
		$("#header").append(header,tool);
		$("#footer").append(foot);
	};
	
	
	
	foton.HandF = HandF;
	
})();