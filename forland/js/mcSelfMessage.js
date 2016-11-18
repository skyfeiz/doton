this.foton = this.foton || {};
(function(){
  var selfMessage = function(){
    this.init();
  }
  var p = selfMessage.prototype;
  p.init = function(){
    this.initLoginStatus();
  }
  p.initLoginStatus = function(){
    var cur = this;
    $.ajax({
      url:$mcBaseUrl + "MemberCenter/getUserInfo",
      type:"get",
      success:function(data){
        if(data.status == 0){
        var data = data.data;
        $(".self_num span.needFill").text(data.MEMBERNUMBER);
        if(data.FTCELLPHONE && data.FTCELLPHONE !== undefined){
            var $hideFourPos = data.FTCELLPHONE.substring(0,3)+"****"+ data.FTCELLPHONE.substring(8);
            $(".self_phone span.needFill").text($hideFourPos);
          }
        $(".self_grade span.needFill").text(data.TIER);
        $(".self_score span.needFill").text(data.POINTVALUE);
        if(typeof data.CHILD_TABLE_LIST !=="string"){
          cur.initTable(data.CHILD_TABLE_LIST);
        }
        $(".item span.name").text(data.NAME);
        $(".item span.sex").text(data.MF);
        $(".item span.certificateType").text(data.FTIDTYPE);
        $(".item span.certificateType_num").text(data.IDNUM);
        $(".item span.place").text(data.FTSTATE + " "+data.FTCITY + " "+data.FTDISTRICT );
        $(".item span.address").text(data.FTSTREADDR);
        $(".item span.postcode").text(data.FTPOSTAL);
        $(".item span.nation").text(data.FTNATIONAL);
        $(".item span.birthday").text(data.BIRTHDATE);
        $(".item span.if_marriage").text(data.MARITALSTA);
        $(".item span.memorial_day").text(data.FTWEDATE);
        $(".item span.getMoney").text(data.FTINCOME);
        $(".item span.profession").text(data.FTINDUSTRY);
        $(".item span.hobby").text(data.HOBBY);
        $(".item span.mcEmail").text(data.EMAILADDRESS);
        }else{

        }
      }
    })
  }
  p.initTable = function(data){
    var cur = this;
    var keyArr = [{"key":"ta_content","value":"权益项目"},
    {"key":"ta_youhui","value":"优惠"},
    {"key":"ta_order","value":"剩余次数"},
    {"key":"ta_time","value":"到期时间"}];
    var $tr = $("<tr class='table_n'></tr>");
    $.each(keyArr,function(i,val){
      $tr.append("<th class="+ val.key +">"+ val.value +"</th>")
    });
    $(" .self_action table").append($tr);

    if(data.length ==undefined){
      $(".self_action table").append(cur.initBuildBody(data,keyArr))
    }else{
      $.each(data,function(i,val){
        $(".self_action table").append(cur.initBuildBody(val,keyArr));
      });
    }

    $.each($(".list td"),function(i,val){
      if($(".list td").eq(i).text()==""){
        $(".list td").eq(i).text("--");
      }
    });
    }
    p.initBuildBody = function(val,keyArr){
      var cur = this;
      var $tr = $("<tr class='list'></tr>");
      $.each(keyArr,function(j,valArr){
        switch(valArr.key){
        case  "ta_content":
        $tr.append("<td class="+valArr.key+">"+ val.PRODUCTNAME +"</td>")
        break;
        case  "ta_youhui":
            $tr.append("<td class="+valArr.key+">"+ val.YOUHUI +"</td>")
            break;
        case  "ta_order":
        $tr.append("<td class="+valArr.key+">"+ val.REMAINNUM +"</td>")
        break;
        case  "ta_time":
        $tr.append("<td class="+valArr.key+">"+ val.ENDDATE +"</td>")
        break;
      }
    });
      return $tr;
    }
  foton.selfMessage = selfMessage;
})();
