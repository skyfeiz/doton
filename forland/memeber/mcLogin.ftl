<#include "../cfg.ftl" parse=true encoding="utf-8">
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>登陆</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcLogin.css" rel="stylesheet" type="text/css"/>
    <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/layer/layer.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcLogin.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script src="../lib/jquery.placeholder.min.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
            new foton.mcCommon();
            new foton.mcLogin();
            new foton.share();
        });
    </script>
</head>
<body>

 <div>
    	<#include "../header.ftl" parse=true encoding="utf-8">
    </div>
<div>
    <div class="content clearfix">
        <div class="content_leftImg">
            <a href="#">
                <img src="${staticPath}/images/mCLogin/mC_login_img.jpg" alt="">
            </a>
        </div>
        <div class="content_right">
            <h2><span class="h2_en">SIGN IN</span><span class="h2_cn">登录</span></h2>
            <form id="formData" action="">
                <div class="userN">
                    <label for="username">账号 :</label>
                    <div class="input_box">
                        <input id="username" type="username" name="memberid" placeholder="手机号/会员号" autocomplete="off">
                        <span class="icon_u"></span>
                        <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入用户名</p></div>
                    </div>
                </div>
                <div class="passW">
                    <label for="password">密码 :</label>
                    <div class="input_box">
                        <input id="password" type="password" name="password" placeholder="登录密码"  autocomplete="off">
                        <span class="icon_p"></span>
                        <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入用密码</p></div>
                    </div>
                </div>
                <div class="remStatus">
                    <label for="rember">
                        <input id="rember" type="checkbox" autocomplete="off"  autocomplete="off">记住登陆状态
                    </label>
                    <a href="${basePath}bottom/regist">注册</a>
                    <a href="${basePath}bottom/passwordmodify">忘记密码?</a>
                </div>
            </form>
            <div class="loginPart">
                <a class="login_in trans">登录</a>
            </div>
        </div>
    </div>
</div>
  	<div>  
    <#include "../bottom.ftl" parse=true encoding="utf-8">  
    </div>

</body>
</html>


