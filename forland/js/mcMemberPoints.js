this.foton = this.foton || {};
(function(){
  var memberPoints = function(){
    this.init();
  }
  var p = memberPoints.prototype;
  p.init = function(){
    this.initEvent();
  }
  p.initEvent = function(){

    var cur = this;
    $.ajax({
      url:$mcBaseUrl + "MemberCenter/getUserInfo",
      type:"get",
      success:function(data){
        var json = data.data;
        if(data.status == 0){
          console.log(json);
          $(".member_grade .fill_part").text(json.TIER);
          $(".member_score .fill_part").text(json.POINTVALUE);
        }
      }
    });

    $.ajax({
      type:"get",
      url:$mcBaseUrl + "MemberCenter/integraInfo",
      dataType:"json",
      data:"",
      success:function(data){
        if(data.status ==0){
          //$(".member_grade span").text(data.name);
          //$(".member_scorej span").text(data.name);
          cur.initBuild(data.data);
        }
      }
    })
  }
  p.initBuild = function(data){
    var cur = this;
    var keyArr = [{"key":"order","value":"序号"},
    {"key":"transdate","value":"时间"},
    {"key":"transtype","value":"交易类型"},
    {"key":"acttype","value":"行为方式"},
    {"key":"transsource","value":"来源系统"},
    {"key":"change","value":"积分变动"},
    {"key":"status","value":"交易状态"}]
    var $tr = $("<tr class='table_t'></tr>");
    $.each(keyArr,function(i,val){
      $tr.append("<th class="+ val.key +">"+ val.value +"</th>")
    });
    $(".table").append($tr);
    $.each(data,function(i,val){
      var index = i +1;
      $(".table").append(cur.initBuildBody(index,val,keyArr));
    });

    $.each($(".list td"),function(i,val){
      if($(".list td").eq(i).text()==""){
        $(".list td").eq(i).text("--");
      }
    });

      //分页处理-获取所有的tr.list长度
      var len = $("tr.list").length;
      var pageSize = 10;
      laypage({
        cont: $('.page'), //容器。值支持id名、原生dom对象，jquery对象,
        pages: Math.ceil(len/pageSize), //总页数
        skip: false, //是否开启跳页
        skin: 'molv',
        groups: 2, //连续显示分页数
        hash: true, //开启hash
        jump: function(obj){ //触发分页后的回调
          var startPos = obj.curr*pageSize -pageSize;
          var endPos =  obj.curr*pageSize -1;
          $.each($("tr.list"),function(i,val){
            $("tr.list").eq(i).hide();
            if(i>=startPos && i <=endPos){
              $("tr.list").eq(i).show();
            }
          })
          ////每页暂时显示一条
          //var currentPage = obj.curr;
          //$("tr.list").each(function(i,val){
          //  $("tr.list").show();
          //  //currentPage*pageSize +
          //})
         // $("div.page").data("jump",true);
          // $('.view').html('目前正在第'+ obj.curr +'页，一共有：'+ obj.pages +'页');
        }
      });
    }
    p.initBuildBody = function(index,val,keyArr){
      var cur = this;
      var $tr = $("<tr class='list'></tr>");
      $.each(keyArr,function(j,valArr){
        switch(valArr.key){
          case  "order":
          $tr.append("<td class="+valArr.key+">"+ index +"</td>")
          break;
          case "transdate":
        //var date = new Date(val.time);
        //var year = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        cur.transdateHandle($tr,val.transdate);
        //$tr.append("<td class="+valArr.key+">"+ val.transdate +"</td>");
        break;
        case  "acttype":
        $tr.append("<td class="+valArr.key+">"+ val.acttype +"</td>")
        
        break;
        case  "transtype":
        $tr.append("<td class="+valArr.key+">"+ val.transtype +"</td>")
        break;
        case  "transsource":
        $tr.append("<td class="+valArr.key+">"+ val.transsource +"</td>")
        break;
       /* case  "points":
        $tr.append("<td class="+valArr.key+">"+ val.points +"</td>")
        break;*/
        case  "change":
        $tr.append("<td class="+valArr.key+">"+ val.points +"</td>")
        break;/*
        case  "points":
        $tr.append("<td class="+valArr.key+">"+ val.add +"</td>")
        break;*/
        case  "status":
        $tr.append("<td class="+valArr.key+">"+ val.status +"</td>")
        break;
        default:
        $tr.append("<td class=''>--</td>");
        break;
      }
    });
      return $tr;
    }

    p.transdateHandle =function($tr,time){
      var timeAndOhter = time.split(" ");
      var timePart = timeAndOhter[0].split("/");
      var needTime = timePart[2] +"-" + timePart[0] + "-" + timePart[1]+"   " + timeAndOhter[1];
      $tr.append("<td class='transdate'>"+needTime +"</td>");
    }
    foton.memberPoints = memberPoints;
  })();
