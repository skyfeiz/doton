<#include "../cfg.ftl" parse=true encoding="utf-8">
	<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>会员中心-个人信息修改</title>
    <meta name="description" content="福田汽车 具体内容由福田提供"/>
    <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
    <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcCommon.css" rel="stylesheet" type="text/css"/>
    <link href="${staticPath}/css/mcSelfMessageModify.css" rel="stylesheet" type="text/css"/>
 <script src="http://pv.sohu.com/cityjson"></script>
    <script src="${staticPath}/lib/jquery-1.11.3.min.js"></script>
    <script src="${staticPath}/lib/calendar/laydate.dev.js"></script>
    <script src="${staticPath}/lib/layer/layer.js"></script>
    <script src="${staticPath}/lib/jquery.cookie.js"></script>
    <script src="${staticPath}/lib/jquery_scrollBar.js"></script>
    <script src="${staticPath}/js/headerAndFooter.js"></script>
    <script src="${staticPath}/js/mcCommon.js"></script>
    <script src="${staticPath}/js/mcSelfMessageModify.js"></script>
    <script src="${staticPath}/js/mcHandlePCCA.js"></script>
    <script src="${staticPath}/lib/share.js"></script>
    <script>
        $(document).ready(function () {
            new foton.HeaderAndFooter();
             new foton.mcCommon();
            new foton.selfMessageModify();
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
                        <div class="message_left fl clearfix">
                            <div class="item">
                                <span class="label">姓名：</span>
                                <div class="fl">
                                    <input class="name" name="name" autocomplete="off">
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">性别：</span>
                                <div class="fl">
                                    <div class="radioBox radio_sex">
                                        <label for="sexMan">
                                            <input type="radio" autocomplete="off" id="sexMan" value="Male" name="type" autocomplete="off">
                                            男
                                        </label>
                                        <label for="sexWommen">
                                            <input type="radio" autocomplete="off" id="sexWommen" value="Female" name="type" autocomplete="off">
                                            女
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">证件类型：</span>
                                <div class="fl">
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
                            <div class="item proviceCity">
                                <span class="label">所在省市：</span>
                                <div class="fl clearfix">
                                    <div class="dropItem provice">
                                        <p class="dropDefault clearfix"><span id="datespan">省</span>
                                            <button class=""></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>省</p>
                                        </div>
                                        <input autocomplete="off" type="hidden" name="provinceId" value="" autocomplete="off">
                                    </div>
                                    <div class="dropItem city">
                                        <p class="dropDefault clearfix"><span id="datespan">市</span>
                                            <button class=""></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>市</p>
                                        </div>
                                        <input autocomplete="off" type="hidden" name="cityId" value="" autocomplete="off">
                                    </div>
                                    <div class="dropItem country">
                                        <p class="dropDefault clearfix"><span id="datespan">县/区</span>
                                            <button class=""></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>县</p>
                                        </div>
                                        <input autocomplete="off" type="hidden" name="areaId" value="" autocomplete="off">
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">详细地址：</span>
                                <div class="fl">
                                    <input class="address" name="address" autocomplete="off">
                                </div>
                            </div>
                        </div>
                        <div class="message_right fr">
                            <div class="item">
                                <span class="label">民族：</span>
                                <div class="fl">
                                    <div class="dropItem nation">
                                        <p class="dropDefault clearfix"><span id="datespan">请选择</span>
                                            <button></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>请选择</p>
                                            <p>汉族</p>
                                            <p>壮族</p>
                                            <p>满族</p>
                                            <p>回族</p>
                                            <p>苗族</p>
                                            <p>土家族</p>
                                            <p>彝族</p>
                                            <p>蒙古族</p>
                                            <p>藏族</p>
                                            <p>布依族</p>
                                            <p>侗族</p>
                                            <p>瑶族</p>
                                            <p>朝鲜族</p>
                                            <p>白族</p>
                                            <p>哈尼族</p>
                                            <p>哈萨克族</p>
                                            <p>黎族</p>
                                            <p>傣族</p>
                                            <p>畲族</p>
                                            <p>傈僳族</p>
                                            <p>仡佬族</p>
                                            <p>东乡族</p>
                                            <p>高山族</p>
                                            <p>拉祜族</p>
                                            <p>水族</p>
                                            <p>纳西族</p>
                                            <p>羌族</p>
                                            <p>土族</p>
                                            <p>仫佬族</p>
                                            <p>锡伯族</p>
                                            <p>柯尔克孜族</p>
                                            <p>达斡尔族</p>
                                            <p>景颇族</p>
                                            <p>毛南族</p>
                                            <p>撒拉族</p>
                                            <p>布朗族</p>
                                            <p>塔吉克族</p>
                                            <p>阿昌族</p>
                                            <p>普米族</p>
                                            <p>鄂温克族</p>
                                            <p>怒族</p>
                                            <p>京族</p>
                                            <p>基诺族</p>
                                            <p>德昂族</p>
                                            <p>保安族</p>
                                            <p>俄罗斯族</p>
                                            <p>裕固族</p>
                                            <p>乌孜别克族</p>
                                            <p>门巴族</p>
                                            <p>鄂伦春族</p>
                                            <p>独龙族</p>
                                            <p>塔塔尔族</p>
                                            <p>赫哲族</p>
                                            <p>珞巴族</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item mcEmail">
                                <span class="label">邮箱：</span>
                                <div class="fl">
                                    <input class="mcEmail" name="mcEmail" autocomplete="off">
                                    <div class="error_warn">
                                        <i class="error_icon"></i>
                                        <p class="warn">请输入正确的邮箱格式</p>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">证件号码：</span>
                                <div class="fl">
                                    <input class="certificateType_num" name="certificateTypeNum" autocomplete="off">
                                    <div class="error_warn">
                                        <i class="error_icon"></i>
                                        <p class="warn">请输入证件号码</p>
                                    </div>
                                </div>
                            </div>
                            <div class="item mc_postcode">
                                <span class="label">邮编：</span>
                                <div class="fl">
                                    <input class="postcode" name="postcode" autocomplete="off">
                                    <div class="error_warn">
                                        <i class="error_icon"></i>
                                        <p class="warn">请输入6位数字</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="otherNeedMessage">
                        <div class="all_message clearfix">
                        <div class="otherMessageLine"></div>
                        <div class="baseMessageTitle">
                            <span>完善信息</span>
                        </div>
                        <div class="message_left fl clearfix">
                            <div class="item">
                                <span class="label">婚否：</span>
                                <div class="fl">
                                    <div class="radioBox radio_marriage">
                                        <label for="marriageSure">
                                            <input type="radio" autocomplete="off" id="marriageSure" value="Married" name="ifOrNo">
                                            是
                                        </label>
                                        <label for="marriageNot">
                                            <input type="radio" autocomplete="off" id="marriageNot" value="Unmarried" name="ifOrNo">
                                            否
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">爱好：</span>
                                <div class="fl">
                                    <input class="hobby" name="hobby" autocomplete="off">
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">从事行业：</span>
                                <div class="fl">
                                    <div class="dropItem profession">
                                        <p class="dropDefault clearfix"><span>请选择</span>
                                            <button class=""></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>请选择</p>
                                            <p>交通/运输/物流</p>
                                            <p>批发和零售</p>
                                            <p>建筑/设计/装潢</p>
                                            <p>采掘业/冶炼</p>
                                            <p>制造（机械/设备）</p>
                                            <p>非盈利机构/政府</p>
                                            <p>农业/渔业/林业</p>
                                            <p>汽车及零配件</p>
                                            <p>耐用消费品（服装、纺织、家具、家电、工艺品）</p>
                                            <p>快速消费品（食品、饮料、化妆品）</p>
                                            <p>服务业</p>
                                            <p>酒店/餐饮/旅游</p>
                                            <p>房地产</p>
                                            <p>化工/能源</p>
                                            <p>印刷/包装</p>
                                            <p>生物/制药/保健/医药</p>
                                            <p>贸易</p>
                                            <p>广告/公关/会展</p>
                                            <p>媒体/出版</p>
                                            <p>咨询业</p>
                                            <p>法律</p>
                                            <p>中介服务</p>
                                            <p>通讯/电信</p>
                                            <p>互联网/电子商务</p>
                                            <p>电子技术</p>
                                            <p>计算机</p>
                                            <p>金融/保险/证券</p>
                                            <p>教育/培训</p>
                                            <p>娱乐/体育</p>
                                            <p>学术/科研/艺术</p>
                                            <p>其它行业</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="message_right fr">
                            <div class="item birth">
                                <span class="label">出生日期：</span>
                                <div class="fl">
                                    <div class="dropItem">
                                        <p id="birthDays" class="dropDefault clearfix"><span id="birthDate"></span>
                                            <button class=""></button>
                                        </p>

                                        <div class="error_warn">
                                            <i class="error_icon"></i>
                                            <p class="warn"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="item marrageDay">
                                <span class="label">结婚纪念日：</span>
                                <div class="fl">
                                    <div class="dropItem">
                                        <p id="marriage" class="dropDefault clearfix"><span id="marriageSpan"></span>
                                            <button class=""></button>
                                        </p>

                                        <div class="error_warn">
                                            <i class="error_icon"></i>
                                            <p class="warn"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <span class="label">收入：</span>
                                <div class="fl">
                                    <div class="dropItem getMoney">
                                        <p class="dropDefault clearfix"><span>请选择</span>
                                            <button class=""></button>
                                        </p>
                                        <div class="dropOptions" style="display: none;">
                                            <p>请选择</p>
                                            <p>35万以上</p>
                                            <p>30-35万</p>
                                            <p>25-30万</p>
                                            <p>20-25万</p>
                                            <p>15-20万</p>
                                            <p>10-15万</p>
                                            <p>5-10万</p>
                                            <p>5万以下</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
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
    </body>
    </html>



