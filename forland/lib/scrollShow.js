this.foton = this.foton || {};
(function(){
	var scrollShow = function($dom, W_H){
		this.$container = $dom ? $dom : $("body");
		if( this.$container.find(".scrollShow").length ){
			this.scale = W_H ? W_H : 8/9;
			this.$scrollShow = this.$container.find(".scrollShow");
			this.init();
		}
	};
	
	var p = scrollShow.prototype;
	
	p.init = function(){
		this.initHidden();
		this.initScroll();
		
		$(window).trigger("scroll");
	};
	
	p.initHidden = function(){
		var cur = this;
		this.$scrollShow.each(function(){
			if($(this).attr("src")){
				var img = new Image();
				img.onload = function(){
					$(this).data("imgHeight",img.height/2);
				};
				img.src = $(this).attr("src");
			}
			
			$(this).parent().css("overflow","hidden");
			$(this).data("show",false).css("opacity",0);
			if($(this).css("position")==="static"){
				$(this).css("position","relative");
			}
			var t = $(this).css("top")=="auto" ? 0 : parseInt( $(this).css("top") );
			var top = $(this).height() >200 ? $(this).height()/2 : 200;
			$(this).data({"top":t, "height": top}).css({"top": t+top});
		});
	};
	
	p.initScroll = function(){
		var cur = this;
		$(window).scroll(function(){
			var shouIndex = 0;
			var scrollTopMax = $(this).scrollTop() + $(this).innerHeight()*cur.scale;
			var scrollTopMmin = $(this).scrollTop() - $(this).innerHeight()/2;
			cur.$scrollShow.each(function(){
				var halfHeight = $(this).data("imgHeight") ? $(this).data("imgHeight") : $(this).data("height");
				var top = $(this).offset().top - halfHeight;
				if( top <= scrollTopMax && top >= scrollTopMmin && !$(this).data("show")){
					var $cur = $(this);
					$cur.data("show",true);
					$cur.delay(shouIndex).animate({
						"top": $cur.data("top"),
						"opacity": 1
					},700);
					shouIndex += 80;
				}
			})
		})
	};
	
	foton.scrollShow = scrollShow;
	
})();