this.foton = this.foton || {};
(function(){
  var mcSignIn = function(){
    this.init();
  };
  var p = mcSignIn.prototype;
  p.init = function(){
    this.initEvent();
    this.initSigIn();
  };
  p.initEvent = function(){
    //点击签到的方法
    var isTrue = true;
    var cur = this;
    $(".btn_span").on("click",function(){
      if($(this).attr("isExist") == "true"){
        isTrue = false;
        return;
      }
      if(isTrue){
        isTrue = false;
      }else{
        return false;
      }
        //遮罩层
      new foton.LayerWinUse().load();
      $.ajax({
         url:$mcBaseUrl + "MemberCenter/deal",
        type:"get",
        data:{"brand":1,"action":6},
        dataType:"json",
        success:function(data){
          var todayTime = new Date(data.data).getDate();
          if(data.status == 0){

            new foton.LayerWinUse().alerts("签到成功");
            cur.initSigIn();
            $("tr td").each(function(i){
              if($("tr td").eq(i).text()==todayTime){
                $("tr td").eq(i).addClass("onSign").css({"background":"#ccc"});
              }
            });
          }else{
              new foton.LayerWinUse().alerts(data.data);
            isTrue = true;
          }
        }
      });
    });
  };
  p.initSigIn = function(){
    var calUtil = {
      getDaysInmonth : function(iMonth, iYear){
        var dPrevDate = new Date(iYear, iMonth, 0);
        return dPrevDate.getDate();
      },
      bulidCal : function(iYear, iMonth) {
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        aMonth[6] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1);
        var iDayOfFirst = dCalDate.getDay();
        var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
        var iVarDate = 1;
        var d, w;
        aMonth[0][0] = "SUN";
        aMonth[0][1] = "MON";
        aMonth[0][2] = "TUE";
        aMonth[0][3] = "WED";
        aMonth[0][4] = "THU";
        aMonth[0][5] = "FRI";
        aMonth[0][6] = "SAT";
        for (d = iDayOfFirst; d < 7; d++) {
          aMonth[1][d] = iVarDate;
          iVarDate++;
        }
        for (w = 2; w < 7; w++) {
          for (d = 0; d < 7; d++) {
            if (iVarDate <= iDaysInMonth) {
              aMonth[w][d] = iVarDate;
              iVarDate++;
            }
          }
        }
        return aMonth;
      },
      ifHasSigned : function(signList,day){
        var signed = false;
        $.each(signList,function(index,item){
          var date = new Date(item);
          if(date.getDate() == day) {
            signed = true;
            return false;
          }
        });
        return signed ;
      },
      drawCal : function(iYear, iMonth, iDay ,signList) {
        var currentYearMonth = iYear+"年"+iMonth+"月";
        var myMonth = calUtil.bulidCal(iYear, iMonth);
        var enWeek = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var htmls = new Array();
        htmls.push("<div class='sign_main' id='sign_layer'>");
        htmls.push("<div class='sign_title'>");
        htmls.push("<span class='calendar_month'>"+enWeek[iMonth-1]+"</span>");
        htmls.push("<span class='calendar_day'>"+iDay+"</span>");
        htmls.push("</div>");
        htmls.push("<div class='sign' id='sign_cal'>");
        htmls.push("<table class='table'>");
        htmls.push("<tr class='week_day'>");
        htmls.push("<th>" + myMonth[0][0] + "</th>");
        htmls.push("<th>" + myMonth[0][1] + "</th>");
        htmls.push("<th>" + myMonth[0][2] + "</th>");
        htmls.push("<th>" + myMonth[0][3] + "</th>");
        htmls.push("<th>" + myMonth[0][4] + "</th>");
        htmls.push("<th>" + myMonth[0][5] + "</th>");
        htmls.push("<th>" + myMonth[0][6] + "</th>");
        htmls.push("</tr>");
        var d, w;
        for (w = 1; w < 7; w++) {
          htmls.push("<tr>");
          for (d = 0; d < 7; d++) {
            var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
            if(ifHasSigned){
              htmls.push("<td class='onSign'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
            } else {
              htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
            }
          }
          htmls.push("</tr>");
        }
        htmls.push("</table>");
        htmls.push("</div>");
        htmls.push("</div>");
        return htmls.join('');
      }
    };


    //签到
    $.ajax({
      url:$mcBaseUrl + "MemberCenter/qd",
      type:"post",
      data:{
        "brand":1
      },
      success:function(data){
        var nowTime = new Date();
        $.each(data,function(i){
          var times = new Date(data[i]).getDate();
          console.log(times);
        });
        var str = calUtil.drawCal(nowTime.getFullYear(),nowTime.getMonth() + 1,nowTime.getDate(),data);
        $("#calendar").html(str);


        $("tr td.onSign").each(function(i){
          if($("tr td.onSign").eq(i).text()== nowTime.getDate()){
            $(".btn_span").css({"background":"#ccc","cursor":"default"}).attr("isExist","true");
          }
        });
      },
      error:function(data){
      }
    });
  }
  foton.mcSignIn = mcSignIn;
})();
