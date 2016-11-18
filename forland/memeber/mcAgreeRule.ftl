<#include "../cfg.ftl" parse=true encoding="utf-8">
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>会员中心-个人信息</title>
        <meta name="description" content="福田汽车 具体内容由福田提供"/>
        <meta name="keywords" content="福田汽车 具体内容由福田提供"/>
        <link href="${staticPath}/css/common.css" rel="stylesheet" type="text/css"/>
        <link href="${staticPath}/css/mcAgreeRule.css" rel="stylesheet" type="text/css"/>
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
                $(".word_part").buildScrollBar();
                new foton.HeaderAndFooter();
                new foton.mcCommon();
                new foton.share();
                $(".agree_part a").on("click",function(event){
                    new foton.CloseCurrWin();
                })
            });
        </script>
    </head>
    <body>

    <div>
        <#include "../header.ftl" parse=true encoding="utf-8">
    </div>

    <div>
        <div class="main_part clearfix">
            <h2 class="main_title">福田会员章程及入会协议</h2>
            <div class="word_part">
                <div class="mc_regulations">
                    <h3 class="mcr_title">一 福田会员章程</h3>
                    <p class="mcr_introduce">福田会员简介</p>
                    <p class="indent_content">福田会员是北汽福田股份有限公司（简称：北汽福田）发起，依托北汽福田股份有限公司强大的线上、线下管理体系，以会员制形式向福田会员提供全方位契约化汽车服务的组织，是北汽福田汽车股份有限公司唯一官方会员组织。福田会员，力求为会员带来专享优惠，旨在提供全方位、高品质、专业化的优质服务，积极推进汽车文化发展，努力实现汽车服务理念<strong>“全程无忧”</strong>延续和提升！</p>
                    <p class="next_floor_title"><span></span>第一条   总则</p>
                    <p class="detail_content">
                       1.	福田会员是由北汽福田股份有限公司（以下简称"福田公司"）发起并创建，服务于会员的非法人组织。福田会员包括钻石卡会员、金卡会员、银卡会员和普通会员（以下将四者统称为“福田会员”）。
                    </p>
                    <p class="detail_content">
                        2.	福田会员内部实体机构由北汽福田统一管理，不以营利为目的，可自愿参加也可自愿退出。
                    </p>
                    <p class="detail_content">
                        3.	福田会员严格按照本会员章程规定为会员提供服务，同时会员入会即代表已经认同本会员章程的相关所有规定
                    </p>
                    <p class="next_floor_title"><span> </span> 第二条 福田会员宗旨</p>
                    <p class="indent_content">福田会员以福田官网、福田微客服、福田e家、随车行、整车电商及福田汽车授权经销商/服务商为载体，搭建起车主与车主、北汽福田与车主之间的沟通交流互动平台，并为会员提供会员相关服务，组织开展相关活动；同时，给广大会员车主提供更多优惠服务，形成北汽福田特有的品牌文化。</p>
                    <p class="next_floor_title"><span></span>第三条 服务范围</p>
                    <p class="detail_content">
                        1.	北汽福田面向社会接纳会员，所有会员遵循自愿入会原则，申请加入福田汽车会员前须仔细阅读《福田汽车会员章程及入会协议》，充分了解加入福田会员后应有的权益和应尽的义务。
                    </p>
                    <p class="detail_content">
                        2.	开展全国性与区域性相结合的福田会员活动，给会员提供更多的参与机会。
                    </p>
                    <p class="detail_content">
                        3.	以福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商为载体，为会员提供更多的优惠信息。
                    </p>
                    <p class="detail_content">
                        4.	福田会员面向自然人进行招募，客户注册即成为福田会员。福田会员涉及品牌：奥铃全系车型、风景全系车型、蒙派克全系车型、图雅诺全系车型、拓陆者全系车型、萨普全系车型、萨瓦纳全系车型、欧马可全系车型、福田戴姆勒全系车型、福田时代全系车型、福田伽途全系车型、福田迷迪全系车型、福田瑞沃全系车型。
                    </p>
                    <p class="detail_content">
                        5.	通过随车行、积分商城向福田会员提供专享的福田币兑换配件、礼品的政策。
                    </p>
                    <p class="detail_content">
                        6.	通过授权服务商向福田会员提供专享的福田币兑换服务。
                    </p>
                    <p class="detail_content">
                        7.	根据福田会员等级，提供差异化的会员权益。
                    </p>
                    <p class="detail_content">
                        8.	我们将确保在使用所有会员（包含非车主）的个人信息时遵守国家规定的隐私政策及其他适当的保密和安全措施
                    </p>
                    <p class="detail_content">
                        注：福田会员只面向自然人进行招募，如以公司或集团名义注册，均与个人客户享受权益一致。
                    </p>
                    <p class="next_floor_title"><span></span>第四条  入会流程</p>
                    <p class="son_title">1.	车主入会流程：（福田授权经销商/服务商）</p>
                    <p class="detail_content">
                        1)  车主进店；
                    </p>
                    <p class="detail_content">
                        2)	填写福田汽车入会申请表（电子版或纸质）；
                    </p>
                    <p class="detail_content">
                        3)	提报常用手机号码，短信验证通过；
                    </p>
                    <p class="detail_content">
                        4)  店内核实并提交申请信息；
                    </p>
                    <p class="detail_content">
                        5)	系统验证通过后，车主收到入会成功短信并获知会员卡号及初始密码信息；
                    </p>
                    <p class="detail_content">
                        6)	入会成功后，至福田官网、福田微客服、福田e家、随车行、整车电商线上平台修改初始密码。
                    </p>

                    <p class="son_title">2.	车主入会流程：（福田官网、福田微客服、福田e家、随车行、整车电商）</p>
                    <p class="detail_content">
                        1)	车主使用常用手机登录福田官网、福田微客服、福田e家、随车行、整车电商平台；
                    </p>
                    <p class="detail_content">
                        2)	通过线上填写注册信息及登录密码；
                    </p>
                    <p class="detail_content">
                        3)	系统验证通过后，登录的系统会提示会员注册成功，并系统自动显示会员号。
                    </p>
                    <p class="next_floor_title"><span> </span> 第五条 会员积分</p>
                    <p class="indent_content">福田会员可通过购买福田指定车辆、到福田授权服务商自费进行维修/保养、随车行电商购买配件，获取兑换积分（兑换积分下文统称福田币），同时可累积定级积分，会员等级通过定级积分进行划分。通过福田官网、福田微客服、福田e家、随车行、福田整车电商进行注册等互动活动获取行福田币，但不累积定级积分。在不同渠道获取积分的标准详见《福田汽车会员积分细则》。

</p>
<p class="indent_content">
    2016年10月1日-12月31日是福田会员试运营，积分大放送阶段， 2017年1月起各类赠送积分标准将进行调整。
</p>
                    <p class="son_title"><span>1.	累积积分方式：</span></p>
                    <p class="detail_content">
                        a)	通过福田授权经销商购买福田指定车辆；
                    </p>
                    <p class="detail_content">
                        b)	通过福田授权服务商自费进行维修、保养、外出救援，在福田授权服务商处单独购买配件无法累积福田币；
                    </p>
                    <p class="detail_content">
                        c)	通过随车行配件商城购买配件累积福田币；
                    </p>
                    <p class="detail_content">
                        d)	通过福田官网、福田微客服、福田e家、随车行、福田整车电商进行注册或参与指定活动累积福田币。
                    </p>

                    <p class="son_title"><span>2.	兑换福田币方式：</span></p>
                    <p class="detail_content">
                        a)	通过福田授权服务商自费进行维修、保养、外出救援可使用福田币抵扣费用，在福田授权服务商处单独购买配件无法使用福田币抵扣费用；
                    </p>
                    <p class="detail_content">
                        b)	通过随车行配件商城购买配件可使用福田币抵扣费用；
                    </p>
                    <p class="detail_content">
                        c)	通过积分商城使用福田币或福田币+现金的形式兑换礼品。
                    </p>
                    <p class="detail_content">
                        d)	通过福田官网、福田微客服、福田e家、随车行、福田整车电商等福田公司指定平台参与“福田币兑换抽奖次数”的活动。
                    </p>

                    <p class="next_floor_title"><span></span>第六条 会员分级</p>
                    <p class="son_title"><span>1.会员升级标准：</span>
                  会员消费行为将带来定级积分的累积，定级积分与获取的福田币等值，通过福田官网、福田微客服、福田e家、随车行、福田整车电商进行注册、签到等行为活动无法获取定级积分。当定级积分超过更高级别基线时，会员将升级至更高级别，                    </p>
                    <p class="detail_content">
                       a)	普卡会员：通过福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商等官方渠道注册的客户即可成为普通会员，普通会员身份终身有效。                    </p>
                    <p class="detail_content">
                        b)	银卡会员：定级积分总额达到10000分-19999分
                    </p>
                    <p class="detail_content">
                        c)	金卡会员：定级积分总额达到20000分-44999分
                    </p>
                    <p class="detail_content">
                        d)	钻石卡会员：定级积分总额达到45000分及以上
                    </p>


                    <p class="son_title"><span>2.会员保级标准：</span>会员定级后当前级别有效期限为两年，两年内会员需要达到保级标准可以使当前等级有效期延长两年。</p>
                    <p class="detail_content">
                        a)	金卡会员：保级消费金额：15,000元/2年或保级返场*频次：4次/2年
                    </p>
                    <p class="detail_content">
                        b)	钻石卡会员：保级消费金额：20,000元/2年或保级返场频次：6次/2年
                    </p>
                    <p class="detail_content">
                        *保级返场：在规定时间内到福田授权服务商进行保内或保外的维修、保养外出救援。
                    </p>

                    <p class="son_title"><span>3.会员降级标准：</span>保级期限过后，滚动对定级积分和消费次数进行审核，若两项数值都低于该级别保级积分基线，会员将按顺序降低一级。如：原钻石卡会员，二年内保级消费金额少于20,000元或返场次数少于6次，则降一级到金卡。会员降级最低级别为银卡，银卡无保级要求，不再下降。</p>
                    <p class="son_title"><span>4.会员合并标准：</span>会员可通过拨打会员服务热线：4008177199申请合并帐号，一但申请，被合并的帐号将失效，无法使用，被合并帐号的福田币及等级将转到所合并的帐号，以两个帐号相对高的级别定级，福田币进行累加处理。</p>
                    <p class="son_title"><span>5.会员资格取消及终止</span>会员具有下列行为之一的，北汽福田有权取消其会员资格，会员资格将在系统中进行作出取消操作后终止：</p>
                    <p class="detail_content">
                        a)	煽动分裂国家、破坏国家统一。
                    </p>
                    <p class="detail_content">
                        b)	捏造或者歪曲事实，散布谣言，扰乱社会秩序。
                    </p>
                    <p class="detail_content">
                        c)	宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪。
                    </p>
                    <p class="detail_content">
                        d)	公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击。
                    </p>
                    <p class="detail_content">
                        e)	有其他违反法律法规或有悖于社会公序良俗的行为的。
                    </p>
                    <p class="detail_content">
                        f)	违反福田会员相关规章制度或活动规定，给北汽福田信誉或经济造成影响或损失。
                    </p>
                    <p class="detail_content">
                        g)	恶意在会员互动平台传播有损福田汽车及旗下产品形象、福田品牌形象之言论。
                    </p>
                    <p class="detail_content">
                        h)	恶意使用非正当手段套取会员积分及会员权益。
                    </p>
                    <p class="detail_content">
                        i)	有其它损害福田会员和福田汽车及旗下品牌形象的行为的。
                    </p>

                    <p class="indent_content">福田会员取消资格，将不享有福田会员所有权益及升级机会，取消资格的会员等级转为普卡会员，如不愿转为普卡会员可以拨打会员热线4008177199申请退会。
                        会员资格终止后，将不再享有福田汽车为会员提供的任何服务，且会员账号内原有福田币、会员权益将清零，并取消会员级别，不再予以恢复。
                    </p>


                    <p class="next_floor_title"><span></span>第七条  会员退会</p>
                    <p class="son_title"><span>1.	会员有自由退会的权益，车主会员退会时原有福田币、会员权益将清零，并取消会员等级，不再予以恢复。</span>
                    </p>
                    <p class="son_title"><span>2.	会员退会后，将不再享有北汽福田为会员提供的任何服务，亦不得参与福田会员组织的各项活动。</span>
                    </p>
                    <p class="next_floor_title"><span></span>第八条  会员权益</p>
                    <table class="mc_right" cellspacing="0" border="0">
                        <tr class="list table_title">
                            <td>权益分类</td>
                            <td class="table_Remarks">持卡人权益</td>
                            <td>普卡</td>
                            <td>银卡</td>
                            <td>金卡</td>
                            <td>钻石卡</td>
                        </tr>
                        <tr class="list">
                            <td rowspan="6">便利服务</td>
                            <td class="table_Remarks">终身车辆免费检测服务</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">全国24小时紧急道路救援服务</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">车务提醒小秘书（车主日常、季节保养资讯、安全提醒）</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">会员专属客户服务热线</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">维修保养绿色通道</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">车辆维修完工后免费驾驶室内清洁服务</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>

                        <tr class="list">
                            <td rowspan="8">实惠体验</td>
                            <td class="table_Remarks">会员商城积分兑换礼品</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">福田币抵扣维修、保养费用</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">精品配件消费送福田币</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">维修保养消费送福田币</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">会员生日当月维修保养工时折扣
（限一次/年，以身份证号码为准*）
</td>
                            <td>/</td>
                            <td>5折</td>
                            <td>5折</td>
                            <td>5折</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">会员购买延保产品折扣</td>
                            <td>/</td>
                            <td>9折</td>
                            <td>8.5折</td>
                            <td>8折</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">维修/保养工时折扣</td>
                            <td>/</td>
                            <td>9折</td>
                            <td>8.5折</td>
                            <td>8折</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">福田汽车举办的其他送福田币活动</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>

                        <tr class="list">
                            <td rowspan="5">尊贵礼遇</td>
                            <td class="table_Remarks">优先邀请参与各项车主活动</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">会员生日当月消费积分多倍赠送
（以身份证号码为准*）
</td>
                            <td>/</td>
                            <td>2倍</td>
                            <td>3倍</td>
                            <td>3倍</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">20公里内免费送客服务（须车在维修中）</td>
                            <td>/</td>
                            <td>/</td>
                            <td>1次/年</td>
                            <td>2次/年</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">参与福田汽车会员主题活动抽奖</td>
                            <td>/</td>
                            <td>●</td>
                            <td>●</td>
                            <td>●</td>
                        </tr>
                        <tr class="list">
                            <td class="table_Remarks">保修期外免费道路救援</td>
                            <td>/</td>
                            <td>/</td>
                            <td>1次/年</td>
                            <td>3次/年</td>
                        </tr>
                    </table>
                    <p class="table_introduce">所有会员权益不得与北汽福田其他非会员优惠活动同时享用。具体权益内容详见《福田会员权益细则》</p>
                    <p class="table_introduce"> *备注：会员生日权益均以身份证上出生日期为准，会员可在注册时填写身份证号码或通过福田微客服、福田e家、福田官网、随车行、整车电商、福田授权经销商、服务商补全信息。</p>

                    <p class="next_floor_title"><span> </span>第九条 会员义务</p>
                    <p class="detail_content">
                       1.	会员应向福田汽车提供真实、完整、有效的个人资料。会员联络方式或地址等信息有变动时，可直接登录福田官网、福田微客服、福田e家、随车行、整车电商进行修改。因会员提交个人资料不实或未及时将变动信息通知福田汽车所导致的一切后果，福田汽车不承担任何责任。
                    </p>
                    <p class="detail_content">
                       2.	会员参加福田组织的活动（含会员自发组织的活动及官方活动）即视为会员承诺遵守该活动通知的所有要求，应按活动章程规定及有关通知有序参加活动。
                    </p>
                    <p class="detail_content">
                        3.	会员在参加由会员自发组织的活动时，应注意确保人身和财产安全，切实做好防范措施。
                    </p>
                    <p class="detail_content">
                        4.	会员对福田汽车会员的决议、文件、资料和信息等相关内容应严格保密。
                    </p>
                    <p class="detail_content">
                        5.	会员应遵守中华人民共和国法律法规，遵守福田汽车会员章程及入会协议，响应福田汽车会员号召，积极参加福田汽车会员举办的各种活动，及时反映各方面的问题。
                    </p>
                    <p class="detail_content">
                        6.	会员应关注福田汽车会员的发展，自觉维护福田会员的公众形象和声誉，不做有损福田会员利益的事。
                    </p>
                    <p class="detail_content">
                        7.	会员有义务向社会各界宣传福田会员文化理念和宗旨，并积极推荐和发展新会员。
                    </p>
                    <p class="detail_content">
                        8.	未经福田汽车同意，会员不得以福田会员的名义组织和参加其他活动。
                    </p>
                    <p class="detail_content">
                        9.	会员同意福田会员通过短信、电子邮件等方式向其提供有关活动通知或其他与福田汽车股份有限公司相关的信息，如会员不愿意接受，届时可联系会员热线4008177199申请退订。
                    </p>

                    <p class="next_floor_title"><span></span>第十条 重要声明</p>
                    <p class="detail_content">
                        1. 在福田会员组织的活动、培训、服务等过程中，因会员自身原因引起的任何损失（包括自身损失、福田汽车损失、他人损失）或因其自身过错引起的任何侵权责任，应由会员自行承担相应的法律责任。
                    </p>
                    <p class="detail_content">
                        2. 会员在福田汽车相关网站上发表文章、图片、摄影等作品时如侵犯第三方的知识产权或其他合法权利的，福田汽车有权自行删除或应权利方的要求予以删除；会员应自行承担因此 导致的一切责任和后果。俱乐部如因会员的前述行为承担责任或遭受损失的，有权向会员追偿损失。
                    </p>
                    <p class="detail_content">
                        3. 由福田会员自发组织的活动，福田汽车公司不承担任何责任。
                    </p>
                    <p class="detail_content">
                        4. 因不可抗力因素造成俱乐部不能按照本章程规定履行承诺时，福田汽车不承担责任。
                    </p>
                    <p class="detail_content">
                        5. 会员如违反本章程的规定给福田汽车造成损失的，应向福田汽车承担相应的赔偿责任。
                    </p>
                    <p class="detail_content">
                        6、如果福田公司监测到您将福田会员的服务或相关信息用于欺诈或非法目的，福田公司将采取相应措施，包括但不限于暂停或终止您的会员资格。
                    </p>


                    <p class="next_floor_title"><span> </span>第十一条  附则</p>
                    <p class="detail_content">
                        1. 会员本着自由结合、自愿参加、风险自担、责任自负的原则加入福田会员。会员在申请入会时，须仔细阅读本章程。提交注册申请即视为已经阅读且同意遵守本章程的规定，并充分了解了加入福田汽车会员应有的权益和应尽的义务。
                    </p>
                    <p class="detail_content">
                        2. 福田汽车会员有权另行制定本章程的相关实施细则，有权制定福田汽车会员的相关规章制度及活动规定，有权视具体情况对本章程在必要时予以修订。会员加入本会员体系后即视为同意遵守福田会员另行制定的相关实施细则和福田汽车会员的相关规章制度及活动规定及随时修订后的章程。福田汽会员在制定或修订相关规定、章程后，将在福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商进行公示。会员不同意本章程相关实施细则、相关规章制度、活动规定或本章程修订内容的，可申请退会。
                    </p>
                    <p class="detail_content">
                       3. 本章程自颁布之日起实施。
                    </p>
                    <p class="detail_content">
                        4. 对本章程、相关实施细则和相关规章制度及活动规定有任何问题的，可向福田汽车会员中心咨询，会员热线4008177199。
                    </p>
                    <p class="detail_content_notice">
                        随着会员服务的进一步提升，《福田会员章程》、《福田会员积分细则》及《福田会员权益细则》等内容会根据实际运营情况随时进行更新，更新后会通过福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商予以公布，公布后即有效代替原来的政策规则。我们鼓励您定期查看相关内容以便及时了解最新规则。
                    </p>
                    <!--附件部分-->
                    <p class="next_floor_title">附件1：《福田会员积分细则》</p>
                    <p class="son_title"><span>1积分累积规则</span></p>
                    <p class="detail_content">
                        a)	购买赠送积分规则：
                       会员到福田授权经销商购买指定车型，将获得相应的积分奖励，积分奖励在交易后1-2个工作日可到达会员帐号内。
                    </p>
                    <div class="table_brand">
                        <table  class="brand_ser brand_type" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">类型</th>
                                <th colspan="2" class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="12">通用类</td>
                                <td rowspan="2" class="type_two">EST-A</td>
                                <td class="type_two">牵引车</td>
                                <td rowspan="2" class="strand_three">4500</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">平板车</td>
                            </tr>

                            <tr class="brand">
                                <td rowspan="3" class="type_two">EST</td>
                                <td class="type_two">牵引车</td>
                                <td rowspan="3" class="strand_three">4000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">平板车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">自卸车</td>
                            </tr>
                            <tr class="brand">
                                <td rowspan="3" class="type_two">GTL</td>
                                <td class="type_two">牵引车</td>
                                <td rowspan="3" class="strand_three">3500</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">平板车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">自卸车</td>
                            </tr>
                            <tr class="brand">
                                <td rowspan="4" class="type_two">ETX</td>
                                <td class="type_two">牵引车</td>
                                <td rowspan="4" class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">平板车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">3系平板</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">自卸车</td>
                            </tr>


                            <tr class="brand">
                                <td  rowspan="12">专用类</td>
                                <td rowspan="4" class="type_two">EST</td>
                                <td class="type_two">油罐车</td>
                                <td rowspan="4" class="strand_three">4500</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">环卫车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">搅拌车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">其他</td>
                            </tr>

                            <tr class="brand">
                                <td rowspan="4" class="type_two">GTL</td>
                                <td class="type_two">油罐车</td>
                                <td rowspan="4" class="strand_three">4000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">环卫车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">搅拌车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">其他</td>
                            </tr>
                            <tr class="brand">
                                <td rowspan="4" class="type_two">ETX</td>
                                <td class="type_two">油罐车</td>
                                <td rowspan="4" class="strand_three">3500</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">散装罐</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">搅拌车</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">其他</td>
                            </tr>
                        </table>

                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送积分标准</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="21">瑞沃</td>
                                <td class="type_two">瑞沃-中卡</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-中卡</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-中型运输型工程车</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-重型工程车  </td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-重型运输型工程车</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-准中卡 </td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 瑞沃-瑞沃环卫车 </td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-瑞沃搅拌车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-瑞沃其它</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-瑞沃随车吊</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代罐式运输车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代环卫车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代搅拌车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代其它</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代汽车起重机</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代随车吊</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-时代骁运</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-轻型工程车机</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-轻型工程车（多小）</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">瑞沃-轻型运输型工程车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">以上未说明车型</td>
                                <td class="strand_three">10000</td>
                            </tr>
                        </table>
                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="7">伽途</td>
                                <td class="type_two">伽途T3</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 伽途V3 </td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">伽途V5</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">伽途ix5</td>
                                <td class="strand_three">12000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">伽途ix7</td>
                                <td class="strand_three">15000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">迷迪</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">以上未说明车型</td>
                                <td class="strand_three">10000</td>
                            </tr>
                        </table>
                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="4">奥铃</td>
                                <td class="type_two">奥铃CTX</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 奥铃TX </td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">奥铃捷运</td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">以上未说明车型</td>
                                <td class="strand_three">5000</td>
                            </tr>
                        </table>
                        <!--<table  class="brand_ser" cellspacing="0" border="0">-->
                            <!--<tr class="brand">-->
                                <!--<th class="brand_one">品牌</th>-->
                                <!--<th class="type_two">类型</th>-->
                                <!--<th class="strand_three">赠送福田币标准（单位/分）</th>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td  rowspan="14">福田戴姆勒</td>-->
                                <!--<td class="type_two">欧曼-牵引车-EST </td>-->
                                <!--<td class="strand_three">20000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two"> 欧曼-牵引车-GTL </td>-->
                                <!--<td class="strand_three">17000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-牵引车-ETX </td>-->
                                <!--<td class="strand_three">15000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-平板车-GTL</td>-->
                                <!--<td class="strand_three">17000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-平板车-ETX </td>-->
                                <!--<td class="strand_three">20000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two"> 欧曼-骑兵 </td>-->
                                <!--<td class="strand_three">10000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-自卸车-GTL</td>-->
                                <!--<td class="strand_three">17000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-自卸车-ETX </td>-->
                                <!--<td class="strand_three">15000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-矿用自卸</td>-->
                                <!--<td class="strand_three">20000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-搅拌车</td>-->
                                <!--<td class="strand_three">15000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-散装车</td>-->
                                <!--<td class="strand_three">17000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-油罐车</td>-->
                                <!--<td class="strand_three">15000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">欧曼-环卫车</td>-->
                                <!--<td class="strand_three">15000</td>-->
                            <!--</tr>-->
                            <!--<tr class="brand">-->
                                <!--<td class="type_two">以上未说明车型</td>-->
                                <!--<td class="strand_three">10000</td>-->
                            <!--</tr>-->
                        <!--</table>-->

                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="8">时代轻卡</td>
                                <td class="type_two">H系列</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> K系列 </td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">时代领航</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">小卡之星</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">驭菱柴油</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">驭菱汽油</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">整车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">以上未说明车型</td>
                                <td class="strand_three">10000</td>
                            </tr>
                        </table>


                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="7">欧马可</td>
                                <td class="type_two">电动车</td>
                                <td class="strand_three">45000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 欧马可1系 </td>
                                <td class="strand_three">15000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">欧马可3系</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">欧马可5系</td>
                                <td class="strand_three">25000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">欧马可A</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">整车</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">以上未说明车型</td>
                                <td class="strand_three">10000</td>
                            </tr>
                        </table>
                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="5">萨普</td>
                                <td class="type_two">萨普T</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 萨普V </td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">萨普Z</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">萨普Z6</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">萨普Z8</td>
                                <td class="strand_three">10000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="2">萨瓦纳</td>
                                <td class="type_two">萨瓦纳VX3</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">拓陆者E5系列</td>
                                <td class="strand_three">20000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="1">P201</td>
                                <td class="type_two">拓陆者E5系列</td>
                                <td class="strand_three">15000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="2">拓陆者</td>
                                <td class="type_two">拓陆者E5系列</td>
                                <td class="strand_three">15000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">拓陆者S系列</td>
                                <td class="strand_three">15000</td>
                            </tr>
                            <tr class="brand">
                                <td  colspan="2">以上未说明车型</td>
                                <td class="strand_three">10000</td>
                            </tr>
                        </table>


                        <table  class="brand_ser" cellspacing="0" border="0">
                            <tr class="brand">
                                <th class="brand_one">品牌</th>
                                <th class="type_two">类型</th>
                                <th class="strand_three">赠送福田币标准（单位/分）</th>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="3">风景</td>
                                <td class="type_two">风景</td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two"> 快捷(T)  </td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">快运(K) </td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="3">风景G7</td>
                                <td class="type_two">G7标准型</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">G7经济型</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">经济型半包内饰</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="3">风景G9</td>
                                <td class="type_two">财富快车(S)</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">风景G9</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">新干线(S) </td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="3">蒙派克E</td>
                                <td class="type_two">财富快车(E)</td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">蒙派克E</td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">商务舱(E)</td>
                                <td class="strand_three">3000</td>
                            </tr>
                            <tr class="brand">
                                <td  rowspan="2">图雅诺</td>
                                <td class="type_two">E系列-图雅诺</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td class="type_two">S系列-图雅诺</td>
                                <td class="strand_three">5000</td>
                            </tr>
                            <tr class="brand">
                                <td  colspan="2">以上未说明车型</td>
                                <td class="strand_three">5000</td>
                            </tr>
                        </table>
                    </div>

                    <p class="detail_content">
                        b)	福田授权服务商自费进行维修、保养、外出救援获取福田币：
                        会员到福田授权服务商自费维修、保养、外出救援时实际产生费用合计（交纳现金部分）赠送福田币。赠送福田币标准如下：
                    </p>

                    <table  class="brand_ser" cellspacing="0" border="0">
                        <tr class="harf_brand">
                            <td>品牌</td>
                            <td>获取积分标准</td>
                        </tr>
                        <tr class="harf_brand">
                            <td>奥铃、风景、蒙派克、图雅诺、拓陆者、萨普、萨瓦纳、P201、瑞沃、伽途、时代、欧马可</td>
                            <td>按服务站提供的客户实际付费金额1%回馈福田币.如客户实际付费100元，赠送100福田币</td>
                        </tr>
                        <tr class="harf_brand">
                            <td>福田戴姆勒</td>
                            <td>按服务站提供的客户实际付费金额0.2%回馈福田币.如客户实际付费100元，赠送20福田币。</td>
                        </tr>
                    </table>
                    <p class="detail_content">
                        c)	随车行配件商城购买配件
                    </p>

                    <p class="detail_next">
                        1）	客户登录随车行，并进行注册，成为福田会员，将获得500福田币的奖励；</p>
                    <p class="detail_next">2）	会员到随车行购买配件赠送福田币标准如下：</p>
                    <table  class="brand_ser" cellspacing="0" border="0">
                        <tr class="harf_brand">
                            <td>品牌</td>
                            <td>获取积分标准</td>
                        </tr>
                        <tr class="harf_brand">
                            <td>随车行</td>
                            <td>按照实际支付金额1%给予回馈福田币，如客户实际支付100元，赠送100福田币。福田币不可抵扣运费，且运费不累积福田币。</td>
                        </tr>
                    </table>
                    <p class="detail_content">
                        d)	通过福田官网、福田微客服、福田e家（APP）、随车行、福田整车电商进行注册或参与指定活动获取积分。积分获取标准如下：
                    </p>


                    <table class="getPointAndNum">
                        <tr>
                            <td>获取积分行为</td>
                            <td>获取福田币数量（分）</td>
                            <td>次数限制</td>
                        </tr>
                        <tr>
                            <td>会员注册</td>
                            <td>500</td>
                            <td>限1次</td>
                        </tr>
                        <tr>
                            <td>完整会员信息补充</td>
                            <td>100</td>
                            <td>限1次</td>
                        </tr>
                        <tr>
                            <td>预约试驾</td>
                            <td>100</td>
                            <td>1次/周</td>
                        </tr>
                        <tr>
                            <td>救援报修</td>
                            <td>100</td>
                            <td>不限</td>
                        </tr>
                        <tr>
                            <td>服务评价（限福田e家）</td>
                            <td>100</td>
                            <td>不限</td>
                        </tr>
                        <tr>
                            <td>每日签到</td>
                            <td>10</td>
                            <td>1次/天</td>
                        </tr>
                        <tr>
                            <td>APP下载链接分享</td>
                            <td>100</td>
                            <td>1次/天</td>
                        </tr>
                    </table>



                    <p class="son_title"><span>3.	福田币兑换细则：</span></p>
                    <p class="detail_content">
                    a) 会员到福田授权服务商自费进行维修、保养、外出救援现金部分可使用福田币抵扣费用100福田币=1元，抵扣标准为实际产生费用的50%可使用福田币抵扣现金，如：客户到服务站维修生产100元费用，其中50元可使5000福田币进行抵扣，若福田币余额若未达到抵扣标准，可抵扣直至余额清零；
                   </p>
                    <p class="detail_content">
                    b) 会员登录随车行配件商城购买配件可使用福田币抵扣配件费用，如配件价格为100元，会员最多可使用1000积分抵扣现金，若福田币余额若未达到抵扣标准，可抵扣直至余额清零，福田币不可抵扣运费，且运费部分不赠送福田币；
                    </p>
                    <p class="detail_content">
                      c) 会员可通过积分商城使用福田币或福田币+现金的形式兑换礼品；
                    </p>
                    <p class="detail_content">
                    d) 会员可在福田官网、福田微客服、福田e家、随车行、福田整车电商使用福田币兑换抽奖次数，或福田汽车会员组织的其他使用福田币兑换的活动。

                    </p>

                    <p class="next_floor_title">附件2：《福田会员权益细则》</p>
                    <p class="son_title"><span>1.   普卡会员：</span></p>
                    <p class="detail_content">
                        a)	通过福田官网、福田微客服、福田e家、随车行及授权经销商/服务商等官方渠道注册或定级积分在10000分以下的客户即为普通会员，普通会员身份终身有效；
                    </p>
                    <p class="detail_content">
                        b)	普卡会员终身车辆免费检测服务，检测内容包括：
                    </p>
                    <p class="detail_content">
                         免费为客户检查发动机机油的使用情况，必要时告知客户添加
                    </p>
                    <p class="detail_content">
                        	免费为客户检查、调整各传动皮带松紧度
                    </p>
                    <p class="detail_content">
                        	免费为客户检查灯光系统、音响系统、指示系统及各报警器工作情况
                    </p>
                    <p class="detail_content">
                        	免费为客户检查蓄电池液面高度、制动液、动力转向液、离合器传动液、水箱冷却液等汽车工作液体的消耗情况，必要时告知客户补充
                    </p>
                    <p class="detail_content">
                        	免费为客户检查、补充轮胎气压
                    </p>
                    <p class="detail_content">
                        	免费为客户检查空气滤清器、燃油滤清器、机油滤清器的清洁情况并免费为客户进行空气滤清器清洁，必要时告知客户更换“三滤”
                    </p>
                    <p class="detail_content">
                        	免费为客户检查、紧固轮胎螺栓
                    </p>
                    <p class="detail_content">
                        	免费为客户检查雨刮器的工作情况
                    </p>
                    <p class="detail_content">
                        c)	普卡会员全国24小时紧急道路救援服务，福田会员可拨打全国会员服务热线：4008177199提出救援，根据会员所使用车辆的政策为会员提供无偿或有偿救援服务；
                    </p>
                    <p class="detail_content">
                        d)	普卡会员可以享受到车务提醒小秘书服务，主要提供天气、路况及保养等相关提醒；
                    </p>
                    <p class="detail_content">
                        e)	普卡会员可使用福田币到积分商城兑换礼品；
                    </p>
                    <p class="detail_content">
                        f)	普卡会员到福田授权服务商现金维修/保养车辆时可使用福田币抵扣维修/保养费用；
                    </p>
                    <p class="detail_content">
                        g)	普卡会员到随车行购买精品配件时可使用福田币抵扣配件费用；
                    </p>
                    <p class="detail_content">
                        h)	普卡会员到福田授权服务商现金维修/保养车辆时可获取福田币。
                    </p>
                    <p class="detail_content">
                        i)	普卡会员可享有福田公司举办的其他送福田币的活动。
                    </p>
                    <p class="son_title"><span>2.  银卡会员：</span></p>
                    <p class="detail_content">
                        a)	会员定级积分达到10000分-19999分为银卡会员；
                    </p>
                    <p class="detail_content">
                        b)	银卡会员可享受普卡会员所有权益；
                    </p>
                    <p class="detail_content">
                        c)	银卡会员可享有会员专属客户服务热线服务；
                    </p>
                    <p class="detail_content">
                        d)	银卡会员可享有维修保养绿色通道服务；
                    </p>
                    <p class="detail_content">
                        e)	银卡会员可享有会员生日当天维修保养工时5折服务；
                    </p>
                    <p class="detail_content">
                        f)	银卡会员可享有购买延保产品9折服务；
                    </p>
                    <p class="detail_content">
                        g)	银卡会员可享有维修/保养工时折扣9折服务；
                    </p>
                    <p class="detail_content">
                        h)	银卡会员可享有优先邀请参与各项车主活动；
                    </p>
                    <p class="detail_content">
                        i)	银卡会员生日当月在福田授权经销商、服务商消费福田币2倍赠送；
                    </p>
                    <p class="detail_content">
                        j)	银卡会员可享有参与福田汽车会员主题活动抽奖
                    </p>


                    <p class="son_title"><span>3.  金卡会员：</span></p>
                    <p class="detail_content">
                        a)	会员定级积分达到20000分-44999分为金卡会员；
                    </p>
                    <p class="detail_content">
                       b)	金卡会员可享受普卡会员所有权益；
                    </p>
                    <p class="detail_content">
                        c)	金卡会员可享有会员专属客户服务热线服务；
                    </p>
                    <p class="detail_content">
                        d)	金卡会员可享有维修保养绿色通道服务；
                    </p>
                    <p class="detail_content">
                       e)	金卡会员可享有会员生日当有维修保养工时5折服务（限一次/年）；
                    </p>
                    <p class="detail_content">
                       f)	金卡会员可享有购买延保产品8.5折服务；
                    </p>
                    <p class="detail_content">
                        g)	金卡会员可享有维修/保养工时折扣8.5折服务；
                    </p>
                    <p class="detail_content">
                        h)	金卡会员可享有优先邀请参与各项车主活动
                    </p>
                    <p class="detail_content">
                       i)	金卡会员生日当月在福田授权经销商、服务商消费福田币3倍赠送；
                    </p>
                    <p class="detail_content">
                       j)	金卡会员可享有参与福田汽车会员主题活动抽奖
                    </p>
                    <p class="detail_content">
                        k)	金卡会员可享有1次/年20公里内免费送客服务（须车在维修中）服务；
                    </p>
                    <p class="detail_content">
                        l)	金卡会员可享有1次/年保修期外免费道路救援服务
                    </p>

                    <p class="son_title"><span>4.	钻石卡会员：</span></p>
                    <p class="detail_content">
                        a)	会员定级积分达到45000分及以上为钻石卡会员；
                    </p>
                    <p class="detail_content">
                        b)	钻石卡会员可享受普卡会员所有权益；
                    </p>
                    <p class="detail_content">
                        c)	钻石卡会员可享有会员专属客户服务热线服务；
                    </p>
                    <p class="detail_content">
                        d)	钻石卡会员可享有维修保养绿色通道服务；
                    </p>
                    <p class="detail_content">
                        e)	钻石卡会员可享有会员生日当有维修保养工时5折服务（限一次/年）；
                    </p>
                    <p class="detail_content">
                        f)	钻石卡会员可享有购买延保产品8.0折服务；
                    </p>
                    <p class="detail_content">
                        g)	钻石卡会员可享有维修/保养工时折扣8.0折服务；
                    </p>
                    <p class="detail_content">
                        h)	钻石卡会员可享有优先邀请参与各项车主活动
                    </p>
                    <p class="detail_content">
                        i)	钻石卡会员生日当月在福田授权经销商、服务商消费福田币3倍赠送；
                    </p>
                    <p class="detail_content">
                        j)	钻石卡会员可享有参与福田汽车会员主题活动抽奖
                    </p>
                    <p class="detail_content">
                        k)	钻石卡会员可享有2次/年20公里内免费送客服务（须车在维修中）服务；
                    </p>
                    <p class="detail_content">
                        l)	钻石卡会员可享有3次/年保修期外免费道路救援服务
                    </p>

                    <div class="Membership_agreement">
                        <h3 class="mcr_title">二、福田汽车会员入会协议</h3>
                        <p class="indent_content">非常感谢您对我们的关注，在您注册成为福田汽车会员，请您充分阅读、理解并接受本协议的全部内容，一旦您使用福田会员服务，即表示您同意遵循本协议之所有约定。</p>
                        <p class="next_floor_title"><span></span>第一条： 注册及会员资料</p>
                        <p class="indent_content">在您同意接受本协议，并申请成为福田会员时，您已符合福田会员条件，并表示您已同意福田公司通过福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商来收集、使用、共享和保护您的个人信息，若不具备前述条件，您应立即终止注册或停止使用本服务（福田会员条件详情请查阅会员章程）。</p>
                        <p class="indent_content">您授权福田公司向您收集的个人信息是能够单独或者与其他信息结合识别您的个人身份的信息，包括但不限于您的姓名、性别、年龄、出生日期、身份证号、住址、联系方式、爱好、职业、等个人信息。您应当填写正确而详实的个人资料并确保其真实合法有效。若有资料填写不实，本公司有权随时终止您所申请的服务。由此产生的纠纷，由您自行承担相应后果，对有意违背《福田会员章程》、本协议或提出恶意要求的，福田公司有权拒绝您的申请或取消您的会员资格。</p>
                        <p class="indent_content">福田会员网站的会员帐号和密码由您自行设定或由福田汽车公司提供初始密码，您可自行进行修改。设定完毕后，您负有妥善保管和保密的义务。本公司将以您最终所设定的使用者帐号和密码来认证您的身份，您必须为经由此使用者帐号和密码所进行的所有行为负责。  </p>
                        <p class="next_floor_title"><span></span>第二条：个人信息使用和披露 </p>
                        <p class="detail_content">
                            1)福田公司可以向分支机构、关联公司、福田汽车品牌授权经销商和福田公司品牌授权服务商等（以下简称“福田公司相关实体”）对个人信息进行使用和披露（包含对于个人信息的存储和处理）。 
                        </p>
                        <p class="detail_content">
                           2)福田公司和福田公司相关实体可能定期或不定期向您发送有关产品和服务的信息以及福田汽车相关活动信息，您同意接收上述信息。
                        </p>
                        <p class="detail_content">
                           3) 经过您的特别授权，在下列情况下或为下列目的之一，福田公司可能将个人信息提供给前述相关实体以外的第三方：
                        </p>
                        <p class="detail_next">
                            a)	满足相关法律规定或满足政府机关（包括司法机关）的强制性要求； 
                        </p>
                        <p class="detail_next">
                            b)	执行适用的服务条款（包括调查可能存在的违规情况）；
                        </p>
                        <p class="detail_next">
                           c)	查找、预防或处理欺诈、安全或技术方面的问题；
                        </p>
                        <p class="detail_next">
                           d)	在法律要求或允许的范围内，保护用户或公众的权利、财产或安全免遭损害；
                        </p>
                        <p class="detail_next">
                           e)	在紧急情况下，向您的紧急联系人披露并由其使用。 
                        </p>
                        <p class="detail_content">
                           4) 福田公司将严格保护您的个人信息安全。并采用适当制度、安全技术和程序等措施来保护您的个人信息不被未经授权的访问、使用或泄漏。但请您注意，任何安全系统都存在可能的及未知的风险。虽然福田公司将与可能接触到您的个人信息的相关实体经销商、服务商或第三方签署保密协议并尽合理的督促其履行保密义务，但福田公司无法保证相关实体经销商、服务商或第三方一定会按照福田公司的要求采取保密措施，福田公司亦不对相关实体经销商、服务商或第三方及后果承担任何责任。福田公司亦将促使本法律声明所述各接收和使用方尽力保护和不予泄露您的个人信息。 
                        </p>

                        <p class="next_floor_title"><span></span>第三条： 注销须知 </p>
                        <p class="indent_content">
                         在需要终止使用本服务时,您可以申请注销您的福田会员帐户,您同意: 
                        </p>
                        <p class="detail_content">
                          1) 您所申请注销的福田会员帐户应当是您依照本声明的约定注册并由福田公司提供给您本人的帐户。您应当依照福田公司规定的程序进行帐户注销。 
                        </p>
                        <p class="detail_content">
                          2) 注销福田会员帐户，福田公司将终止您的服务，同时该帐户下福田币、权益、级别等都将作废；如您不愿将该福田币、权益、级别等消耗掉或将其作废，则不建议您申请注销福田会员帐户。 
                        </p>
                        <p class="detail_content">
                          3) 您可以拨打全国会员服务热线4008177199，通过人工的方式申请注销福田汽车会员帐户。 
                        </p>
                        <p class="detail_content">
                           4) 如果您申请注销的福田会员账户一旦注销成功，将不再予以恢复。 
                        </p>

                        <p class="next_floor_title"><span></span>第四条：变更声明  </p>
                        <p class="indent_content">
                        北汽福田股份有限公司有权随时对本声明内容进行单方面的变更，并在调整后会通过福田官网、福田微客服、福田e家、随车行、整车电商及授权经销商/服务商予以公布，建议您经常登陆网站浏览本声明以掌握最新信息；若您在本声明内容变更后继续使用本服务，表示您已充分阅读、理解并接受修改后的声明内容，也将遵循修改后的声明内容使用本服务；若您不同意修改后的声明内容，您应停止使用本服务，如果您对本声明有任何疑问或建议，欢迎随时告知我们。
                        </p>
                        <p class="next_floor_title"><span> </span>第五条：免责条款   </p>
                        <p class="indent_content">
                            凡福田公司和福田公司相关实体收到会员提交的入会申请，均认定为车主知晓并授权会员申请的行为，福田汽车和福田汽车相关实体将不承担相关的法律纠纷。
                        </p>
                        <p class="next_floor_title"><span> </span>第六条：适用法律  </p>
                        <p class="indent_content">
                            本声明适用中华人民共和国法律。
                        </p>
                        <p class="next_floor_title"><span></span>第七条： 其他  </p>
                        <p class="indent_content">
                            因本声明的履行或本声明引起的任何争议双方应通过友好协商方式解决，如无法通过协商方式解决的，双方一致同意通过北汽福田股份有限公司住所地人民法院以诉讼方式解决。
                        </p>
                    </div>
                </div>
            </div>
            <div class="agree_part">
                <a href="${basePath}bottom/regist">本人已阅读并同意签署</a>
            </div>
        </div>
    </div>
    <div>
        <#include "../bottom.ftl" parse=true encoding="utf-8">
    </div>
    </body>
    </html>



