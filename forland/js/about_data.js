this.foton = this.foton || {};
(function(){
	var DownloadCenter = function(){
		new foton.DownloadCenter_videos();
		new foton.DownloadCenter_pic();
	};
	
	foton.DownloadCenter = DownloadCenter;
})();

(function(){
	var DownloadCenter_videos = function(){
		this.init();
	};
	
	var p = DownloadCenter_videos.prototype;
	
	p.init = function(){
		this.initDom();
		this.initArrange();
		this.initControllShift();
		this.initArrow();
	};
	
	p.initDom = function(){
		this.$controllBtns = $("div.video li");
		this.$former = $("div.video div.leftbth");
		this.$next = $("div.video div.rightbth");
		this.$mainShiftBar = $("div.videoShiftBox");
		this.$shiftBarsBox = $("div.videoShiftBar").data("index",0);
		// this.$bthbg = $("div.bthbg");
		
		this.mainWidth = this.$mainShiftBar.parent().width();
		this.top = 240;
		this.left = 407;
		this.row = 2;
		this.col = 3;
	};
	
	p.initArrange = function(){
		var cur = this;
		this.$shiftBarsBox.each(function(i){
			$(this).children().each(function(j){
				if(Math.floor(j/cur.col)<cur.row){
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: Math.floor(j/cur.col)*cur.top,
						zIndex: 100
					})
				}
				else{
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: (Math.floor(j/cur.col)%2+1)*cur.top,
						zIndex: 0,
						opacity: 0
					})
				}
			})
		})
	};
	
	p.initControllShift = function(){
		var cur = this;
		this.$controllBtns.click(function(){
			var i = cur.$controllBtns.index(this);
			var $this = $(this);
			
			var i = cur.$controllBtns.index(this);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
			
			if(!index){
				cur.$former.addClass('leftDisabled');
			}
			else{
				cur.$former.removeClass('leftDisabled');
			}
			if(index==limit){
				cur.$next.addClass('rightDisabled');
			}
			else{
				cur.$next.removeClass('rightDisabled');
			}
			
			cur.$mainShiftBar.animate({
				left: -i*cur.mainWidth
			},300,function(){
				$this.addClass("pitchon").siblings().removeClass("pitchon");
			})
			/* cur.$bthbg.animate({
				left: 145*i
			},300) */
		})
	};
	
	p.initArrow = function(){
		var cur = this;
		this.$former.click(function(){
			var i = cur.$controllBtns.index($("div.video li.pitchon")[0]);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			if(index){
				cur.$next.removeClass('rightDisabled');				
				cur.shifting(-1);
			}
		})
		this.$next.click(function(){
			var i = cur.$controllBtns.index($("div.video li.pitchon")[0]);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
			if(index<limit){
				cur.$former.removeClass('leftDisabled');				
				cur.shifting(1);
			}
		})
	};
	
	p.shifting = function(x){
		var cur = this;
		var i = cur.$controllBtns.index($("div.video li.pitchon")[0]);
		var index = cur.$shiftBarsBox.eq(i).data("index");
		var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
		
		if(!(index+x)){
			cur.$former.addClass('leftDisabled');
		}
		if((index+x)==limit){
			cur.$next.addClass('rightDisabled');
		}
		
		cur.$shiftBarsBox.eq(i).children().each(function(j){
			var delay_index = j%(cur.col*cur.row);
			if(Math.floor(j/cur.col/cur.row) == index){
				$(this).delay(delay_index*100).animate({
					top: (Math.floor(j/cur.col)%2-1)*cur.top,
					opacity: 0,
					zIndex: 0
				},600)
			}
			if(Math.floor(j/cur.col/cur.row) == index+x){
				$(this).css({
					top: (Math.floor(j/cur.col)%2+1)*cur.top,
					opacity: 0,
					zIndex: 0
				}).delay(delay_index*100+80).animate({
					top: (Math.floor(j/cur.col)%2)*cur.top,
					opacity: 1,
					zIndex: 100
				},600,function(){
					cur.$shiftBarsBox.eq(i).data("index",index+x);
				})
			}
		})
	};
	
	foton.DownloadCenter_videos = DownloadCenter_videos;
})();

(function(){
	var DownloadCenter_pic = function(){
		this.init();
	};
	
	var p = DownloadCenter_pic.prototype;
	
	p.init = function(){
		this.initDom();
		this.initArrange();
		this.initControllShift();
		this.initArrow();
	};
	
	p.initDom = function(){
		this.$controllBtns = $("div.pic li");
		this.$former = $("div.pic div.leftbth");
		this.$next = $("div.pic div.rightbth");
		this.$mainShiftBar = $("div.picShift");
		this.$shiftBarsBox = $("div.picshiftBar").data("index",0);
		// this.$bthbg = $("div.bthbg");
		
		this.mainWidth = this.$mainShiftBar.parent().width();
		this.top = 200;
		this.left = 300;
		this.row = 2;
		this.col = 4;
	};
	
	p.initArrange = function(){
		var cur = this;
		this.$shiftBarsBox.each(function(i){
			$(this).children().each(function(j){
				if(Math.floor(j/cur.col)<cur.row){
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: Math.floor(j/cur.col)*cur.top,
						zIndex: 100
					})
				}
				else{
					$(this).css({
						left: (j%cur.col)*cur.left,
						top: (Math.floor(j/cur.col)%2+1)*cur.top,
						zIndex: 0,
						opacity: 0
					})
				}
			})
		})
	};
	
	p.initControllShift = function(){
		var cur = this;
		this.$controllBtns.click(function(){
			var i = cur.$controllBtns.index(this);
			var $this = $(this);
			var i = cur.$controllBtns.index(this);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
			
			if(!index){
				cur.$former.addClass('leftDisabled');
			}
			else{
				cur.$former.removeClass('leftDisabled');
			}
			if(index==limit){
				cur.$next.addClass('rightDisabled');
			}
			else{
				cur.$next.removeClass('rightDisabled');
			}
			
			cur.$mainShiftBar.animate({
				left: -i*cur.mainWidth
			},300,function(){
				$this.addClass("pitchon").siblings().removeClass("pitchon");
			})
			/* cur.$bthbg.animate({
				left: 145*i
			},300) */
		})
	};
	
	p.initArrow = function(){
		var cur = this;
		this.$former.click(function(){
			var i = cur.$controllBtns.index($("div.pic li.pitchon")[0]);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			if(index){
				cur.$next.removeClass('rightDisabled');				
				cur.shifting(-1);
			}
		})
		this.$next.click(function(){
			var i = cur.$controllBtns.index($("div.pic li.pitchon")[0]);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
			if(index<limit){
				cur.$former.removeClass('leftDisabled');				
				cur.shifting(1);
			}
		})
	};
	
	p.shifting = function(x){
		var cur = this;
		var i = cur.$controllBtns.index($("div.pic li.pitchon")[0]);
		var index = cur.$shiftBarsBox.eq(i).data("index");
		var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
		
		if(!(index+x)){
			cur.$former.addClass('leftDisabled');
		}
		if((index+x)==limit){
			cur.$next.addClass('rightDisabled');
		}
		
		cur.$shiftBarsBox.eq(i).children().each(function(j){
			var delay_index = j%(cur.col*cur.row);
			if(Math.floor(j/cur.col/cur.row) == index){
				$(this).delay(delay_index*100).animate({
					top: (Math.floor(j/cur.col)%2-1)*cur.top,
					opacity: 0,
					zIndex: 0
				},600)
			}
			if(Math.floor(j/cur.col/cur.row) == index+x){
				$(this).css({
					top: (Math.floor(j/cur.col)%2+1)*cur.top,
					opacity: 0,
					zIndex: 0
				}).delay(delay_index*100+80).animate({
					top: (Math.floor(j/cur.col)%2)*cur.top,
					opacity: 1,
					zIndex: 100
				},600,function(){
					cur.$shiftBarsBox.eq(i).data("index",index+x);
				})
			}
		})
	};
	
	foton.DownloadCenter_pic = DownloadCenter_pic;
})();