/**
 * Created by user on 2016/10/2.
 */
this.foton = this.foton || {};
(function(){
    var newsXW = function(){
        this.change();
    };
    var p = newsXW.prototype;
    p.change = function(){
        var cur = this;
        $("div.hdbox").eq(0).show();
        $("ul.optionbox li").click(function(){
            var index = $(this).index();
            $(this).addClass("pitchBG").siblings().removeClass("pitchBG");
            $("div.hdbox").eq(index).fadeIn().siblings("div.hdbox").hide();
        });
    };


    foton.newsXW = newsXW;
})();
