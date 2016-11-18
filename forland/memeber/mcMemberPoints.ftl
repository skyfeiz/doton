<#include "../cfg.ftl" parse=true encoding="utf-8">
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>积分交易查询</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcMemberPoints.css" rel="stylesheet" type="text/css"/>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/lib/laypage/laypage.js"></script>
    <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcMemberPoints.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
            new foton.mcCommon();
            new foton.memberPoints();
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
                    <a class="navTab" href="${basePath}memberreview/passwordmodify"><i class="nav_icon3"></i><span>登录密码修改</span></a>
                    <a class="navTab" href="${basePath}memberreview/phonemodify"><i class="nav_icon4"></i><span>手机号码修改</span></a>
                    <a class="navTab click_states" href="${basePath}memberreview/points"><i class="nav_icon5"></i><span>会员积分查询</span></a>
                    <a class="navTab" target="_blank" href="http://www.365autogo.com/category?vc=1000000006"><i class="nav_icon6"></i><span>积分商城</span></a>
                </div>
            </div>
            <div class="main_right" id="page-content">
                <div class="signInTitle">
                    <span>会员积分查询</span>
                    <input type="hidden" id="userId" value="${user.id }"/>
                </div>
                <div class="detail_content">
                    <div class="member_status">
                        <p class="member_grade clearfix"><i></i><span class="grade_con">会员等级</span><span class="fill_part"></span>
                        </p>
                        <p class="member_score clearfix"><i></i><span class="grade_con">会员当前积分</span><span
                            class="fill_part"></span></p>
                        </div>
                        <div class="member_table">
                            <div class="table_title">
                                <span>近三个月的积分记录</span>
                                <a target="_blank" href="http://www.365autogo.com/category?vc=1000000006">积分商城</a>
                            </div>
                            <table class="table" cellspacing="0" border="0"></table>

                            <div class="main_page">
                                <div class="page">
                                </div>
                            </div>
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



