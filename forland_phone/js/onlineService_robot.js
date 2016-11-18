this.foton = this.foton || {};
(function(){
    var online = function(){
        this.init();
    }
    var p = online.prototype;
    p.init = function(){
    	this.initDom();
        this.chatting();
        this.worktime();
        this.offwork();
    };
    p.initDom = function(){
    	var cur = this;
    	this.$chatbox = $("div.chatbox");
    	this.$send = $("a.send");
    	this.$typewriting = $("input.typewriting");
    	this.$manpower = $("a.manpower");
    	this.$servicetime = $("div.servicetime");
    };
    p.chatting = function(){
    	var cur = this;
    	cur.$send.click(function(){
    		var word = cur.$typewriting.val();
    		var launch = '<div class="right">'+
							'<img src="images/investment/kefu2.jpg">'+
							'<p class="right_zi">'+ word +'</p>'
						'</div>';
			if( $.trim(word)){
				cur.$chatbox.append(launch);
				$.ajax({
					type:"post",
//					url:"http://192.168.1.60:8080/fotonpts/robot/zndh",
					url:"js/new_file.txt",
//					data : {questionVal:mes,userIdVal:userId},
					async : false,
					success:function(data){
						if (data != null) {
							var dataArr = data.split("@");
							// 如果小i机器人回复的是ZRG，则显示转人工链接
							if(dataArr[0].trim() == "ZRG" || dataArr[0].trim() == "" || dataArr[0].trim() == "ZRG<br/>"){
								// 拼接答案
								cur.$chatbox.append(
									'<div class="left">'+
										'<img src="images/investment/kefu1.jpg">'+
										'<p class="left_zi">'+ '<a href="onlineService_hieghtService.html">转高级客服</a>' +'</p>'+
									'</div>'
								);
							}else{
								// 当问答接口中返回的type=1（表示用户触发到了标准问）时，才可进行评价(点赞或踩)
								if(dataArr[1] == "1"){
									// 拼接答案
									cur.$chatbox.append(
										'<div class="left">'+
											'<img src="images/investment/kefu1.jpg">'+
											'<p class="left_zi">'+ dataArr[0] +
												'<span class="evaluate">'+
													'<a href="#" onclick="showPJ(this)">【赞】</a>&nbsp;&nbsp;&nbsp;'+
													'<a href="#" onclick="showPJ(this)">【踩】</a>'+
												'</span>'+
											'</p>'+
										'</div>'
									);
									// 给答案节点赋值
									irobot_nodeId = dataArr[2];
								}else{
									// 拼接答案
									cur.$chatbox.append(
										'<div class="left">'+
											'<img src="images/investment/kefu1.jpg">'+
											'<p class="left_zi">'+ dataArr[0] +'</p>'+
										'</div>'
									);
								}
							}
						}
					}
				});
				//对话框内容始终在最底部
				cur.$chatbox.scrollTop(cur.$chatbox[0].scrollHeight);
				cur.$typewriting.val('').focus().attr("placeholder","请输入您想问的问题");
			}else{
				cur.$typewriting.attr("placeholder","输入框内容不能为空");
			}
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
				url : "http://192.168.1.60:8080/fotonpts/robot/phonetime",
				async : false,
				success : function(data) {
					if (data != null) {
						h = data;
						if(begintime>h || h>=endtime){
							cur.$servicetime.fadeIn();
							return false;
						}else{
							var $iframeBox = $(
								'<iframe name="zrgIframe" src="http://foton--tst1.custhelp.com/app/mobile/chat/chat_landing_Foton_Mobile_App" scrolling="no" class="kfiframe"></iframe>'
								);
							$("div.listcon .row").append($iframeBox);
							$("iframe.framebox .writeback").css("width","auto");
//							$("div.zspan").text("福田公司高级客服");
//							$("div.zspan2").text("竭诚为您服务");
							$("div.titlezh").hide();
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
									console.log("智能对话历史记录,系统请求出错！");
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
		$("span.sureok").click(function(){
			cur.$servicetime.fadeOut();
		});
	};
    
    foton.online = online;
})();
