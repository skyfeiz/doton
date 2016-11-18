this.foton = this.foton || {};
(function(){
	var CarDecoration = function(){
		this.init();
	}
	var p = CarDecoration.prototype;
	p.init = function(){
		this.num;
        this.initBg();
        this.slideBg();
	}
    p.initBg = function(){
        var cur = this;
		this.initClickModel(0);
        $("li.subNav").click(function(){
            var num = $(this).index();
			cur.initClickModel(num);
            $("li.subNav").removeClass("subNav_click");
            $(this).addClass("subNav_click");
            $(".deco_car .barBg").stop().animate({"left":num*100},50);
        });
    }
	p.initClickModel = function(num){
		var cur = this;
		$(".deco_car .model").eq(num).find("span").click(function(){
			var index = $(this).index();
			var details = $("div.servicesBox").find(".service").eq(num);
			var clickNum;
			var spans = $(".deco_car .model").eq(num).find("span");
			spans.each(function(i,val){
				if(spans.eq(i).hasClass("fontcolor")){
					clickNum = i;
				}
			});
			cur.imgSwitch(details,clickNum,index);
			spans.removeClass("fontcolor");
			$(this).addClass("fontcolor");
		});
	}
    p.slideBg = function(){
    	var cur = this,
    		serWidth = $(".servicesBox").width();
    	$(".deco_car li.subNav").click(function(){
    		var num  = $(this).index();
    		if(num=="0" && parseInt($(".newsNavContainer .barBg").css("left"))!="0"){
    			$(".bigbox").stop().animate({"left":0})
    		}
    		if(num=="1" && parseInt($(".newsNavContainer .barBg").css("left"))=="0"){
				$(".bigbox").stop().animate({"left":-serWidth*num-30})
    		}
    	})
    }
	p.imgSwitch = function(details,clickNum,index){
		if(clickNum == index){
			return false;
		}
			var shouIndex = 0;
			if(clickNum=="0"){
				details.children().eq(clickNum).children().each(function(i,val){
					var $cur = $(this);
					$cur.delay(shouIndex).animate({
						"top": -500,
						"opacity": 0
					},700,function(){
						$cur.css({"top":500});
					});
					shouIndex += 80;
				});
			}else{
				details.children().eq(clickNum).children().each(function(i,val){
					var $cur = $(this);
					$cur.delay(shouIndex).animate({
						"top": -1000,
						"opacity": 0
					},700,function(){
						$cur.css({"top":0});
					});
					shouIndex += 80;
				});
			}
			if(index=="0"){
				details.children().eq(index).children().each(function(i,val){
					var $cur = $(this);
					$cur.delay(shouIndex).animate({
						"top": 0,
						"opacity": 1
					},700,function(){
						//$cur.css({"top":-top});
					});
					shouIndex += 80;
				});
			}else{
				details.children().eq(index).children().each(function(i,val){
				var $cur = $(this);
				$cur.delay(shouIndex).animate({
					"top": -500,
					"opacity": 1
				},700,function(){
					//$cur.css({"top":-top});
				});
				shouIndex += 80;
			});
			}

		//var clickStatus =
	}
	foton.CarDecoration = CarDecoration;
})();