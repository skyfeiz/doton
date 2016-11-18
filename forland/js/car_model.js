/**
 * Created by user on 2016/10/11.
 */
this.foton = this.foton || {};
(function(){
    var CarModel = function(){
        this.init();
    }
    var p = CarModel.prototype;
    p.init = function(){
        this.slideHl();
        this.initVideo();
    }
    p.slideHl = function(){
        var num = 0,
            allNum = Math.ceil($(".car_highlights div.imagePanel").length/3),
            aNum = $(".car_highlights div.imagePanel").length,
            oneWidth = $(".car_highlights div.imagePanel").eq(0).width(),
            hlWidth = $(".highlight_mask").width(),
            hlAWdith = $(".car_highlights div.imagePanel").eq(0).width();
        $(".highlight_group").css({"width":hlAWdith*aNum+aNum*30+100})
        if(num==0){
            $(".btn_part .prevBtn").addClass("prevAuto");
        }
        if(allNum==1){
            $(".btn_part .nextBtn").addClass("nextAuto");
        }
        $(".nextBtn").click(function(){
            if($(".btn_part .nextBtn").hasClass("nextAuto")){
                return false;
            }
            num++;
            if(num<aNum){
                $(".highlight_group").stop().animate({"left":-oneWidth*num - num*30});
                $(".btn_part .prevBtn").removeClass("prevAuto");
                $(".btn_part .nextBtn").removeClass("nextAuto");
            }
            if((parseInt(aNum)-parseInt(num))==3){
                $(".btn_part .nextBtn").addClass("nextAuto");
            }
        });
        $(".prevBtn").click(function(){
            if($(".btn_part .prevBtn").hasClass("prevAuto")){
                return false;
            }
            if(num>0){
                num--;
                $(".highlight_group").stop().animate({"left":-oneWidth*num - num*30});
                $(".btn_part .prevBtn").removeClass("prevAuto");
                $(".btn_part .nextBtn").removeClass("nextAuto");
            }
            if(parseInt(num)==0){
                $(".btn_part .prevBtn").addClass("prevAuto");
            }
        });
    }

    p.initVideo = function(){
        var num = 0,
            allNum = Math.ceil($("ul.video_group li").length/6),
            aNum = $("ul.video_group li").length,
            oneHeight = $("ul.video_group li").eq(0).height();
        if(num==0){
            $(".car_video .prevBtn").addClass("prevAuto");
        }
        if(allNum==1){
            $(".car_video .nextBtn").addClass("nextAuto");
            return;
        }

        $(".car_video .nextBtn").click(function(){
            $("ul.video_group li").removeClass("scrollShow").css({"top":0,"opacity":1});
            var value = parseInt(aNum)-6-num*3;
            if($(".car_video .nextBtn").hasClass("nextAuto")){
                return false;
            }
            if(value<=3){
                $(".car_video .nextBtn").addClass("nextAuto");
            }
            num++;
                $("ul.video_group").stop().animate({"top":-oneHeight*num});
                $(".car_video  .prevBtn").removeClass("prevAuto");
                //$(".car_video  .nextBtn").removeClass("nextAuto");
            if(parseInt(aNum)%6>4){

            }

        });

        $(".car_video .prevBtn").click(function(){
            if($(".car_video .prevBtn").hasClass("prevAuto")){
                return false;
            }
            if(num>0){
                num--;
                $("ul.video_group").stop().animate({"top":-oneHeight*num});
                $(".car_video .prevBtn").removeClass("prevAuto");
                $(".car_video .nextBtn").removeClass("nextAuto");
            }
            if(parseInt(num)==0){
                $(".car_video .prevBtn").addClass("prevAuto");
            }
        });
    }
    foton.CarModel = CarModel;
})();