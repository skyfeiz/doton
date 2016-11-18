this.foton = this.foton||{};
(function(){
	var mcLogin = function(){
		this.init();
	};
	var p = mcLogin.prototype;
	p.init = function(){
		this.initRadio();
		this.initLoad();
		this.initName();
	};
	p.initName = function(){
		$('#username , #password').placeholder();
		var $cookieName = $.cookie("cookie_loginIn_name");
		if($cookieName){
			$(".userN input").val($cookieName);
		}
	};
	p.initRadio = function(){
		$("label").click(function(){
			$("label").css({"background-position": "0px -18px"});
			$("input:checked").parent().css({ "background-position":"0px 2px" });
		});
	};
	//处理cookie
	p.initHandleCookie = function(){
			var $inputState = $(".remStatus label input:checked");
			var $name = $(".userN input").val();
			if($inputState.length){
				$.cookie('cookie_loginIn_name', $name, { expires: 7 });
			}else{
				$.cookie('cookie_loginIn_name', "", { expires: 7 });
			}
	};
	p.initLoad = function(){
		var cur = this;
		//获得焦点变色
		$("#username,#password").focus(function(){
			$("#username,#password").removeClass("border_color");
			$(this).addClass("border_color");
		});
		//鼠标移出是判断内容
		$("#username").blur(function(i){
			$("#username").removeClass("border_color");
			if($.trim($(this).val())==""){
				$(".userN .error_warn").show().find("p").text("请输入用户名");
				$(this).val("");
			}else{
				$(this).siblings(".error_warn").hide();
			}
		});

		$("#password").blur(function(i){
			$("#password").removeClass("border_color");
			if($.trim($(this).val())==""){
				$(".passW .error_warn").show().find("p").text("请输入密码");
				$(this).val("");
			}else{
				$(this).siblings(".error_warn").hide();
			}
		});
		//登录
		var ifLogin = true;
		$("a.login_in").click(function(){
				$("#username,#password").trigger("blur");
				if($.trim($("#username").val())!=="" && $.trim($("#password").val())!==""){
					if(ifLogin){
						ifLogin = false;
					}else{
						return false;
					}
					$.ajax({
						url:$mcBaseUrl + "login/login",
						type:"post",
						data:$("#formData").serialize(),
						success:function(data){
							if(data.status==0){
								//cur.initHandleCookie();
								window.location.href="/webback/memberreview/signin";
							}
							else{
								ifLogin = true;
								$(".userN .error_warn").show().find("p").text("用户名或密码错误");
					            //new foton.LayerWinUse().alerts(data.data);
							}
						},
						error:function(){
							ifLogin = true;
							$(".userN .error_warn").show().find("p").text("提交失败");
				            //new foton.LayerWinUse().alerts("登录失败");
						}
					})
				}
		})
	};

	foton.mcLogin = mcLogin;
})();
