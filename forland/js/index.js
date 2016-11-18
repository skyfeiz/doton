this.foton = this.foton || {};
(function(){
    var Main = function()
    {
        this.init();
    };
    var p = Main.prototype;
    p.init = function()
    {
        new foton.Banner();
        this.news();
        this.carshow();
    };
//  新闻切换
    p.news = function(){
    	var cur = this;
		$("a.new_theone").mouseenter(function(){
			var aindex = $(this).index();
			$("div.newest").eq(aindex).fadeIn().siblings().hide();
			$(this).stop(true,false).animate({"z-index":"2"},0,function(){
				$(this).animate({"width":"404px","height":"288px"},500);
			});
			$(this).children("div.newyy").stop(true,false).animate({"opacity":"0","filter":"alpha(opacity=0)"},500);
			$(this).siblings("a").stop(true,false).animate({"z-index":"1"},0,function(){
				$(this).animate({"width":"330px","height":"230px"},500);
			});
    		$(this).siblings("a").children("div.newyy").stop(true,false).animate({"opacity":"0.6","filter":"alpha(opacity=60)"},500);
		});
    }
//  车型展示
	p.carshow = function(){
		var cur = this;
		//菜单切换
		$("li.subNav").click(function(){
			$(this).addClass("subNav_click").siblings("li.subNav").removeClass("subNav_click");
			 var tarX = $(this).position().left;
			 $("div.barBg").css({"left":(tarX+10)});
		});
		
		//车型切换
		$("li.chosecar").data("click",true).click(function(){
			var li_index = $("li.chosecar").index(this);
			$("img.carshow").eq(li_index).fadeIn().siblings("img").hide();
			$(this).data("click",false).addClass("pitchcar").siblings("li").data("click",true).removeClass("pitchcar");
			$(this).data("click",false).children("img").stop(true,true).animate({"width":"110px","height":"70px","top":"0px"},300);
			$(this).data("click",false).siblings("li").data("click",true).children("img").attr("src","images/index/rw_sam.png").stop(true,true).animate({"width":"80px","height":"50px","top":"20px"},300);
		});
		$("li.chosecar").mouseenter(function(){
			if($(this).data("click")){
				$(this).children("img").attr("src","images/index/rw_big.png").stop(true,true).animate({"opacity":"0.5","filter":"alpha(opacity=50)"},0,function(){
					$(this).animate({"opacity":"1","filter":"alpha(opacity=100)"},500);
				});
			}
		});
		$("li.chosecar").mouseleave(function(){
			if($(this).data("click")){
				$(this).children("img").attr("src","images/index/rw_sam.png").stop(true,true).animate({"opacity":"0.5","filter":"alpha(opacity=50)"},0,function(){
					$(this).animate({"opacity":"1","filter":"alpha(opacity=100)"},500);
				});
			}
		});
		$("li.chosecar").eq(0).trigger("click");
		
	};
        foton.Main = Main;
})();
	
/*---------------------------------------------------banner---------------------------------------------------*/
(function(){
    var Banner = function()
    {
        this.init();
    };
    var p = Banner.prototype;
    p.init = function()
    {
        this.initDom();
        this.initBtn();
        this.scrollId =0;
        this.scrollFun(this.scrollId);
    };

    p.initDom = function()
    {
        this.$imageScrollPanel = $(".banner .imageScrollPanel");
        this.$txtScrollPanel = $(".banner .txtScrollPanel");
        this.$imagePanel = $(".banner .imagePanel");
        this.$imagePanelImg = $(".banner .imagePanel img");
        this.$btn = $(".banner .btn");
        this.itemNum = this.$imagePanel.length;
    };

    p.initBtn = function()
    {
        var cur = this;
		for( var i=1; i<cur.$imagePanelImg.length; i++ ){
			var btn = cur.$btn.clone();
			btn.find(".title").text(i+1);
			$("div.btnPanel").append( btn );
		}
		
		$("div.btnPanel").css({ marginLeft : -(Math.floor( cur.$imagePanelImg.length/2 ) + cur.$imagePanelImg.length%2)*50 });
		this.$btn = $(".banner .btn");
		
        this.$btn.click(function(){
            var id = cur.$btn.index(this);
            cur.scrollId = id;
            cur.scrollFun(id);
        });
        this.resetTimer();
    };

    p.scrollFun = function(id)
    {
        var cur = this;
        var targetX = -id*100 + "%";
        //this.$imagePanelImg.removeClass("img_end img_trans").addClass("img_start");
        this.$imageScrollPanel.stop(true,true).animate({"left":targetX},800,function(){
            cur.$imagePanelImg.eq(id).removeClass("img_start").addClass("img_end img_trans");
            cur.$imagePanelImg.not(cur.$imagePanelImg.eq(id)).removeClass("img_end img_trans").addClass("img_start");
        });
        this.$txtScrollPanel.stop(true,true).animate({"left":targetX},1000);
        //
        this.$btn.eq(id).children(".bg").removeClass("bg_out").addClass("bg_click");
        this.$btn.not(this.$btn.eq(id)).children(".bg").removeClass("bg_click").addClass("bg_out");
        //
        this.resetTimer();
    };
    p.startTimer = function()
    {
        var cur=this;
        this.timer=setTimeout(function(){
            if(cur.scrollId < cur.itemNum-1)
            {
                cur.scrollId++;
            }
            else
            {
                cur.scrollId = 0;
            }
            cur.scrollFun(cur.scrollId);
        },10000);
    };
    p.stopTimer = function()
    {
        if(this.timer) clearTimeout(this.timer);
    };
    p.resetTimer = function()
    {
        this.stopTimer();
        this.startTimer();
    };
    foton.Banner = Banner;
})();


	

