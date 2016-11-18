/**
 * Created by user on 2016/10/7.
 */
this.foton  = this.foton || {};
(function(){
    var PurchaseAccessor = function(){
        this.init();
    }
    var p = PurchaseAccessor.prototype;
    p.init =function(){
        this.initDom();
        this.initEvent();
    }
    p.initDom = function(){
        this.$tabLi = $(".main_tab li");
        this.$tabPart = $(".main_part_detail");
        this.$width = $(".main_part_slider").width();
    }
    p.initEvent = function(){
        var cur = this;
        this.$tabPart.eq(0).siblings().css({"left":cur.$width})
        this.$tabLi.click(function(){
            var index = $(this).index();
            cur.initSlider(index);
           $(this).addClass("click_status").siblings().removeClass("click_status");
        });
    }
    p.initSlider = function(index){
        var $box = $(".main_part .main_part_detail").eq(index);
        $box.show().siblings().hide();
        //var targetSl = cur.$tabPart.eq(index);
        //targetSl.css({"position":"relative"}).animate({},)
    }
    foton.PurchaseAccessor = PurchaseAccessor;
})();