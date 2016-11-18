this.foton = this.foton || {};
(function(){
	var brand = function(){
		this.initDom();
		this.honor();
		new foton.history();
	};
	
	var p = brand.prototype;
	
	p.initDom = function(){
		
	};
	
	p.honor = function(){
		var cur = this;
		var ry_length = $("div.ry_tione").length;
		cur.showindex = 0;
		var lasttime = new Date();
		$("div.ry_picgather").eq(0).addClass("num1_block");
		$("div.ry_tione").eq(0).addClass("ry_tioneclick");
		//荣誉下一项
		$("div.ry_next").click(function(){
			if( new Date() - lasttime >= 800){
				lasttime = new Date();
				cur.showindex ++;
				if(cur.showindex < ry_length){
					$("div.ry_prev").removeClass("ry_prevdisabled");
					$("div.ry_picgather").stop(false,false).fadeOut();
					$("div.ry_tione").removeClass("ry_tioneclick");
					$("div.ry_longbox").stop(true,true).animate({"left":-(cur.showindex*285)+"px"},800,function(){
						$("div.ry_tione").eq(cur.showindex).addClass("ry_tioneclick");
						$("div.ry_picgather").eq(cur.showindex).fadeIn(500);
					});
				}else{
					cur.showindex = ry_length-1;
					$("div.ry_next").addClass("ry_nextdisabled");
				}
			}
		});
		//荣誉上一项
		$("div.ry_prev").click(function(){
			if( new Date() - lasttime >= 800 ){
				lasttime = new Date();
				if(cur.showindex > 0){
					cur.showindex --;
					$("div.ry_next").removeClass("ry_nextdisabled");
					$("div.ry_picgather").stop(false,false).fadeOut();
					$("div.ry_tione").removeClass("ry_tioneclick");
					$("div.ry_longbox").stop(true,true).animate({"left":-(cur.showindex*285)+"px"},800,function(){
						$("div.ry_tione").eq(cur.showindex).addClass("ry_tioneclick");
						$("div.ry_picgather").eq(cur.showindex).fadeIn(500);
					});
				}else{
					cur.showindex = 0;
					$("div.ry_prev").addClass("ry_prevdisabled");
				}
			}
		});
		
		$("div.ry_pic").bind("selectstart", function () { return false; });
	};
	
	foton.brand = brand;
	
})();

(function(){
	var history = function(){
		this.init();
	};
	
	var p = history.prototype;
	
	p.init = function(){
		this.half =  $("div.history").width()/2;
		this.leftLimit = 330 - this.half;
		this.rightLimit = 330 + this.half;
		this.x = 420;
		this.y = 171;
		this.PI = Math.PI;
		this.isMoving = false;
		this.movingTime = 0;
		this.$historyNode = $("#historyList").children();
		this.$button = $("div.history button");
		
		this.resize();
		this.arrangePointer();
		this.initClick();
		this.initHover();
		this.initScroll();
	};
	
	p.initScroll = function(){
		var cur = this;
		$(window).scroll(function(){
			var halfH = $(this).innerHeight()/2;
			if(($(this).scrollTop()+halfH)>=$("div.honor").offset().top && !$("div.honor").data("isShow")){
				$("div.honor").data("isShow",true);
				$("div.honorContainer button").eq(1).trigger("click");
			}
			if(($(this).scrollTop()+halfH)>=$("div.history").offset().top && !$("div.history").data("isShow")){
				$("div.history").data("isShow",true);
				cur.showTitle();
			}
		})
	};
	
	p.resize = function(){
		var cur = this;
		$(window).resize(function(){
			cur.half =  $("div.history").width()/2;
		})
	};
	
	p.arrangePointer = function(){
		var cur = this;
		this.$historyNode.each(function(){
			if($(this).attr("class")=="historyNode"){
				var i = $("div.historyNode").index(this);
				var x = i*cur.x-10;
				var y = -Math.cos(i*cur.PI)*cur.y;
				$(this).css({
					top: y,
					left: x
				}).data({"angle":i*cur.PI,"left":x});
			}
			else if($(this).attr("class")=="yearDepart"){
				var $prev = $(this).prev()[0];
				if($prev){
					var i = $("div.historyNode").index($prev)+1;
				}
				else{
					var i = 0;
				}
				var x = (i-1)*cur.x+183;
				var y = -Math.cos(i*cur.PI+cur.PI/2)*cur.y;
				$(this).css({
					top: y,
					left: x
				}).data({"angle":i*cur.PI+cur.PI/2,"left":x});
			}
		})
	};
	
	p.initClick = function(){
		var cur = this;
		this.$button.each(function(i){
			$(this).click(function(){
				if(!cur.isMoving){
					var s = Math.pow(-1,i+1);
					var isClick = false;
					cur.$historyNode.each(function(){
						if(s<0){
							if(parseInt($(this).css("left"))<=cur.leftLimit){
								$("button.historyNext").removeClass("honorBtn_4");
								isClick = true;
							}
						}
						else if(s>0){
							
							if(parseInt($(this).css("left"))>=cur.rightLimit){
								$("button.historyFormer").removeClass("honorBtn_3");
								isClick = true;
							}
						}
					})
					if(isClick){
						
						cur.isMoving = true;
						$("#historyList div.historyDotted").stop(true,false).css("height","0px");
						$("#historyList div.historyDotted p").stop(true,false).css("opacity",0);
						cur.moving(s);
					}
				}
			})
		})
	};
	
	p.initHover = function(){
		var cur = this;
		$("a.details img.historyHover").mouseover(function(){
			$(this).delay(40).animate({
				height: 40,
				width: 40,
				top: -10,
				left: -10,
				"opacity": 1
			},150);
			$(this).prev().animate({
				height: 10,
				width: 10,
				top: 5,
				left: 5,
				"opacity": 0
			},100)
//			var $parent = $(this).parent();
			var $parent = $(this).parents("a.details").parent();
			cur.showDetail($parent);
		}).mouseout(function(){
			$(this).stop(true,false).animate({
				height: 20,
				width: 20,
				top: 0,
				left: 0,
				"opacity": 0
			},150);
			$(this).prev().stop(true,false).delay(40).animate({
				height: 20,
				width: 20,
				top: 0,
				left: 0,
				"opacity": 1
			},100)
			
//			var $parent = $(this).parent();
			var $parent = $(this).parents("a.details").parent();
			cur.hideDetail($parent);
		})
	};
	
	p.showDetail = function($dom){
		var i = Math.round(parseInt($dom.css("left"))/420);
		switch(i){
			case 0:
				var left = 0;
				var top = -60;
				break;
			case 1:
				var left = 0;
				var top = -60;
				break;
			case 2:
				var left = -425;
				var top = 40;
				break;
		}
		$dom.find("div.hoverDetail").css({
			display: "block",
			left: left,
			top: top
		}).animate({
			left: "+=33px",
			opacity: 1
		},300)
	};
	
	p.hideDetail = function($dom){
		var i = Math.round(parseInt($dom.css("left"))/420);
		switch(i){
			case 0:
				var left = 0;
				var top = -60;
				break;
			case 1:
				var left = 0;
				var top = -60;
				break;
			case 2:
				var left = -425;
				var top = 40;
				break;
		}
		$dom.find("div.hoverDetail").stop(true,false).animate({
			left: left,
			opacity: 0
			
		},300,function(){
			
			$(this).css({
				display: "none"
			})
		})
	};
	
	p.moving = function(i){
		var cur = this;
		this.movingTime = 1;
		cur.ani = self.setInterval(function(){
			
			cur.$historyNode.each(function(j){
				var angle = $(this).data("angle");
				var left = $(this).data("left");
				if(cur.movingTime<=20){
					$(this).css({
						left: left-21*cur.movingTime*i,
						top: -Math.cos(cur.movingTime/20*cur.PI*i+angle)*cur.y
					})
					
				}
				else{
					cur.isMoving = false;
					$(this).data({"angle":angle+i*cur.PI,"left":left-i*420});
					if(j == cur.$historyNode.length-1){
						cur.showTitle();
						cur.ani = self.clearInterval(cur.ani);
					}
				}
			});
			cur.movingTime++;
		},30);
	};
	
	p.showTitle = function(){
		var cur = this;
		var i = 0;
		var noLeft = false;
		var noRight = false;
		this.$historyNode.each(function(){
			if(parseInt($(this).css("left"))>=cur.leftLimit && parseInt($(this).css("left"))<=cur.rightLimit){
				$(this).find("div.historyDotted").delay(i*200).animate({
					height: 81
				},300,function(){
					$(this).find("p").animate({
						"opacity": 1
					})
				})
				i++;
			}
			else{
				if(parseInt($(this).css("left"))<cur.leftLimit){
					noLeft = true;
				}
				if(parseInt($(this).css("left"))>cur.rightLimit){
					noRight = true;
				}
			}
		});
		
		if(!noLeft){
			$(".historyFormer").addClass("honorBtn_3");
		}
		if(!noRight){
			$(".historyNext").addClass("honorBtn_4");
		}
	};
	
	foton.history = history;
})();