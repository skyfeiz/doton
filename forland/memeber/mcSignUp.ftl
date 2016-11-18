<#include "../cfg.ftl" parse=true encoding="utf-8">
	<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>注册</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcSignUp.css" rel="stylesheet" type="text/css"/>
   <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/layer/layer.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcHandlePCCA.js"></script>
    <script src="${staticPath}/js/mcSignUp.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
           new foton.mcCommon();
            new foton.mcSignUp();
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
            <h2><span class="h2_en">SIGN UP</span><span class="h2_cn">注册</span></h2>
            <div class="main_part">
                <!--必须填写的部分-->
                <form id="resetMessage">
                    <p class="mark_des"><span>*</span> 为必填选项</p>
                    <div class="input_box input_phone">
                        <label for="phoneNum">手机号* :</label>
                        <div class="input_part">
                            <input id="phoneNum" type="text" name="phone" maxlength="11" autocomplete="off">
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
                    <div class="input_box input_car">
                        <div class="input_part">
                            <div class="radio_part">
                                <span>*</span>
                                <label for="hasCar">
                                    <input type="radio" id="hasCar" value="02" name="type" autocomplete="off">
                                   车主
                                </label>
                                <label for="noCar">
                                    <input type="radio" id="noCar" value="01" name="type" autocomplete="off">
                                    非车主
                                </label>
                            </div>
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">请选择</p></div>
                        </div>
                    </div>
                </form>
                <!--选填部分-->
                <div class="select_part">
                    <div class="input_box input_mcName">
                        <label for="mName">姓名 :</label>
                        <div class="input_part">
                            <input id="mName" type="text" name="name" maxlength="20" autocomplete="off">
                        </div>
                    </div>
                    <div class="input_box input_certificate">
                        <label for="mSeri">证件类型 :</label>
                        <div class="input_part">
                            <div class="dropItem certificateType">
                                <p class="dropDefault clearfix"><span id="datespan">请选择</span>
                                    <button class=""></button>
                                </p>
                                <div class="dropOptions" style="display: none;">
                                    <p>请选择</p>
                                    <p>居民身份证</p>
                                    <p>组织机构代码证</p>
                                    <p>统一社会信用代码</p>
                                    <p>护照</p>
                                    <p>军官证</p>
                                    <p>其他</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input_box input_certificateNum">
                        <label for="mSeriNum">证件号码 :</label>
                        <div class="input_part">
                            <input id="mSeri" type="text" class="certificateType_num" name="certificateNum" maxlength="20" autocomplete="off">
                            <div class="error_warn"><i class="text"></i><p class="warn">证件号格式不正确</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                    <div class="input_box input_mail">
                        <label for="mPost">邮箱 :</label>
                        <div class="input_part">
                            <input id="surePass" type="text" name="mail" maxlength="20" autocomplete="off">
                            <div class="error_warn"><i class="error_icon"></i><p class="warn">邮箱格式错误</p></div>
                            <i class="i-status"></i>
                        </div>
                    </div>
                </div>
                <div class="agreeRequest">
                    <label for="rember">
                        <input id="rember" name="checkboxs" type="checkbox" autocomplete="off" autocomplete="off">
                    </label>
                    <a  target="_blank"  href="${basePath}bottom/agreeRule">同意“会员章程、用户须知和隐私政策”</a>
                    <div class="error_warn"><i class="error_icon"></i><p class="warn">请选择</p></div>
                </div>
                <div class="formHandle">
                    <a class="mcSign_up trans">注册</a>
                </div>
            </div>
        </div>
    </div>

    	<div>
    <#include "../bottom.ftl" parse=true encoding="utf-8">
    </div>
    </body>
    </html>



