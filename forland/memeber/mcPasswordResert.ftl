<#include "../cfg.ftl" parse=true encoding="utf-8">
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>密码重置</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcPasswordResert.css" rel="stylesheet" type="text/css"/>
    <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/layer/layer.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcPasswordResert.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
            new foton.mcCommon();
            new foton.passwordResert();
            new foton.share();
        });
    </script>
</head>
<body>

     <div>
    	<#include "../header.ftl" parse=true encoding="utf-8">
    </div>

    <div>
        <div id="main" class="content clearfix">
            <h2><span class="h2_en">PASSWORD RESET</span><span class="h2_cn">密码重置</span></h2>
            <div class="main_part">
                <form id="resetMessage">
                    <p class="mark_des"><span>*</span> 为必填选项</p>
                    <div class="input_box input_phone">
                        <label for="phoneNum">手机号 :</label>
                        <div class="input_part">
                            <input id="mtel" type="text" name="mtel" maxlength="11" autocomplete="off">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入手机号</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_mark">
                        <label for="nameMark">验证码* :</label>
                        <div class="input_part">
                            <input id="nameMark" type="text" autocomplete="off">
                            <span class="sendMark">发送验证码</span>
                            <div class="error_warn"><i class="error_icon"></i><p class="warn"></p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_pass">
                        <label for="newPass">新密码* :</label>
                        <div class="input_part">
                            <input id="newPass" type="password" name="password" maxlength="20" autocomplete="off">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">请输入密码</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_surePass">
                        <label for="surePass">确认密码* :</label>
                        <div class="input_part">
                            <input id="surePass" type="password" name="confirmPassword" maxlength="20" autocomplete="off">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">密码输入不正确</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                </form>
                <div class="formHandle">
                    <a class="message_qure trans">取消</a>
                    <a class="message_save trans">保存</a>
                </div>
            </div>
        </div>
    </div>

    	<div>
    <#include "../bottom.ftl" parse=true encoding="utf-8">
    </div>
    </body>
    </html>



