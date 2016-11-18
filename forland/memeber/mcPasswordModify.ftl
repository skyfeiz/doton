<#include "../cfg.ftl" parse=true encoding="utf-8">
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>会员中心-登录密码修改</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcPasswordModify.css" rel="stylesheet" type="text/css"/>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/layer/layer.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcPasswordModify.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
            new foton.mcCommon();
            new foton.mcPasswordModify();
            new foton.share();
        });
    </script>
</head>
<body>

 <div>
    	<#include "../header.ftl" parse=true encoding="utf-8">
    </div>

<div>
    <div class="main_part clearfix">
        <div class="main_left">
            <div class="main_title">
                个人中心
            </div>
          <div class="nav_main">
                    <a class="navTab" href="${basePath}memberreview/signin"><i class="nav_icon1"></i><span>签到</span></a>
                    <a class="navTab" href="${basePath}memberreview/selfmessage"><i class="nav_icon2"></i><span>个人资料</span></a>
                    <a class="navTab  click_states" href="${basePath}memberreview/passwordmodify"><i class="nav_icon3"></i><span>登录密码修改</span></a>
                    <a class="navTab" href="${basePath}memberreview/phonemodify"><i class="nav_icon4"></i><span>手机号码修改</span></a>
                    <a class="navTab" href="${basePath}memberreview/points"><i class="nav_icon5"></i><span>会员积分查询</span></a>
                    <a class="navTab" target="_blank" href="http://www.365autogo.com/category?vc=1000000006"><i class="nav_icon6"></i><span>积分商城</span></a>
                </div>
        </div>
        <div class="main_right" id="page-content">
            <div class="signInTitle">
                <span>登录密码修改</span>
                <input type="hidden" id="userId" value="${user.id }"/>
            </div>
            <div class="content_part">

                <form id="resetMessage">
                    <div class="input_box input_oldpass">
                        <label for="oldPass">旧密码* :</label>
                        <div class="input_part">
                            <input id="oldPass" type="password" maxlength="20">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入原密码</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_pass">
                        <label for="newPass">新密码* :</label>
                        <div class="input_part">
                            <input id="newPass" type="password" name="password" maxlength="20">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入密码</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_surePass">
                        <label for="surePass">确认密码* :</label>
                        <div class="input_part">
                            <input id="surePass" type="password" name="confirmPassword" maxlength="20">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">密码输入不正确</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                </form>
                <div class="base_message">
                    <div class="modification">
                        <a class="message_qure trans">取消</a>
                        <a class="message_save trans">保存</a>
                    </div>
                </div>
        </div>
    </div>
</div>

	<div>  
    <#include "../bottom.ftl" parse=true encoding="utf-8">  
    </div>
</div>
</body>
</html>



