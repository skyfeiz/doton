this.foton = this.foton || {};
(function(){
    var Aichebaodian = function(){
        this.init();
    }
    var p = Aichebaodian.prototype;
    p.init = function(e){
        this.initDom();
        this.initEvent();
        //this.huanz();
    }
    p.initEvent = function(){
        var cur = this;
        cur.changez(0);
        $(".ulz li").bind("click",function(e){
            console.log($(this).attr("data"));
            $("#iframe").attr("src","");
            var index = $(this).index();
            $("#iframe").attr("src",$(this).attr("data"));
            cur.changez(index);
        })
    }
    p.initDom = function(){
        this.path1 = $("#imgz0")[0].src;
        this.path2 = $("#imgz1")[0].src;
        this.path3 = $("#imgz2")[0].src;
        this.path4 = $("#imgz3")[0].src;
        this.path5 = $("#imgz4")[0].src;
        this.a = $(".bd");
    }
    p.changez = function(e){
        var cur  = this;
        $(".ulz li").removeClass("navz");
        cur.huanz();
        if (e == 0) {
            //var path = "../../static/mStatic/images/support/zhcx_2.png";
            var path = "images/support/zhcx_2.png";
            $("#imgz0").attr('src', path);

            $(".nav_0").addClass("navz");
        } else if (e == 1) {
            var path = "images/support/zhcx_4.png";
            $("#imgz1").attr('src', path);
            $(".nav_1").addClass("navz");
        } else if (e == 2) {
            var path = "images/support/zhcx_6.png";
            $("#imgz2").attr('src', path);
            $(".nav_2").addClass("navz");
        } else if (e == 3) {
            var path = "images/support/zhcx_8.png";
            $("#imgz3").attr('src', path);
            $(".nav_3").addClass("navz");
        } else if (e == 4) {
            var path = "images/support/zhcx_10.png";
            $("#imgz4").attr('src', path);
            $(".nav_4").addClass("navz");
        } else {}
    }
    p.huanz = function(){
        $("#imgz0").attr('src', this.path1);
        $("#imgz1").attr('src', this.path2);
        $("#imgz2").attr('src', this.path3);
        $("#imgz3").attr('src', this.path4);
        $("#imgz4").attr('src', this.path5);
    }
    foton.Aichebaodian = Aichebaodian;
})();
