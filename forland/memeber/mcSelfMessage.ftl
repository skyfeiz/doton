<#include "../cfg.ftl" parse=true encoding="utf-8">
	<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>会员中心-个人信息</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcSelfMessage.css" rel="stylesheet" type="text/css"/>
   <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcSelfMessage.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
            new foton.mcCommon();
            new foton.selfMessage();
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
                    <a class="navTab  click_states" href="${basePath}memberreview/selfmessage"><i class="nav_icon2"></i><span>个人资料</span></a>
                    <a class="navTab" href="${basePath}memberreview/passwordmodify"><i class="nav_icon3"></i><span>登录密码修改</span></a>
                    <a class="navTab" href="${basePath}memberreview/phonemodify"><i class="nav_icon4"></i><span>手机号码修改</span></a>
                    <a class="navTab" href="${basePath}memberreview/points"><i class="nav_icon5"></i><span>会员积分查询</span></a>
                    <a class="navTab" target="_blank" href="http://www.365autogo.com/category?vc=1000000006"><i class="nav_icon6"></i><span>积分商城</span></a>
                </div>
        </div>
        <div class="main_right" id="page-content">
            <div class="signInTitle">
                <span>个人资料</span>
                <input type="hidden" id="userId" value="${user.id }"/>
            </div>
            <div class="self_message">
                <div class="self_num">
                    <span>会员号：</span><span class="needFill"></span>
                </div>
                <div class="self_phone">
                    <span>手机号码：</span><span class="needFill"></span><a href="${basePath}memberreview/phonemodify">修改</a>
                </div>
                <div class="self_grade">
                    <span>会员等级：</span><span class="needFill"></span>
                </div>
                <div class="self_score">
                    <span>会员积分：</span><span class="needFill"></span><a href="${basePath}memberreview/points">查看详情</a>
                </div>
                <div class="self_action clearfix">
                    <span>权益：</span>
                    <table>
                    </table>
                </div>
            </div>
            <div class="base_message">
                <div class="all_message clearfix">
                    <div class="baseMessageTitle">
                        <span>基本信息</span>
                    </div>
                    <div class="message_left fl">
                        <div class="item">
                            <span class="label">姓名：</span>
                            <div class="fl">
                                <span class="name"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">性别：</span>
                            <div class="fl">
                                <span class="sex"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">证件类型：</span>
                            <div class="fl">
                                <span class="certificateType"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">所在省市：</span>
                            <div class="fl">
                                <span class="place"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">详细地址：</span>
                            <div class="fl">
                                <span class="address"></span>
                            </div>
                        </div>
                    </div>
                    <div class="message_right fr">
                        <div class="item">
                            <span class="label">民族：</span>
                            <div class="fl">
                                <span class="nation"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">邮箱：</span>
                            <div class="fl">
                                <span class="mcEmail"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">证件号码：</span>
                            <div class="fl">
                                <span class="certificateType_num"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">邮编：</span>
                            <div class="fl">
                                <span class="postcode"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="otherNeedMessage">
                    <div class="all_message clearfix">
                        <div class="baseMessageTitle">
                            <span>完善信息</span>
                        </div>
                        <div class="message_left fl">
                            <div class="item">
                                <span class="label">婚否：</span>
                                <div class="fl">
                                    <span class="if_marriage"></span>
                                </div>
                            </div>
                        <div class="item">
                            <span class="label">爱好：</span>
                            <div class="fl">
                                <span class="hobby"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">从事行业：</span>
                            <div class="fl">
                                <span class="profession"></span>
                            </div>
                        </div>
                        </div>
                    <div class="message_right fr">
                        <div class="item">
                            <span class="label">出生日期：</span>
                            <div class="fl">
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">结婚纪念日：</span>
                            <div class="fl">
                                <span class="memorial_day"></span>
                            </div>
                        </div>
                        <div class="item">
                            <span class="label">家庭年收入：</span>
                            <div class="fl">
                                <span class="getMoney"></span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                    </div>
                <div class="modification">
                    <a href="${basePath}memberreview/selfmessagemodify" class="modefy trans">修改</a>
                </div>
            </div>
        </div>
    </div>
</div>

	<div>
    <#include "../bottom.ftl" parse=true encoding="utf-8">
    </div>
</body>
</html>



