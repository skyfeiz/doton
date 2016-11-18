this.foton = this.foton || {};
(function(){
	var activity = function(){
		this.init();
		new foton.shiftPlugin();
	};
	
	var p = activity.prototype;
	
	p.init = function(){
		var cur = this;
	};
	
	foton.activity = activity;
	
})();

(function(){
	var shiftPlugin = function(){
		this.init();
	};
	
	var p = shiftPlugin.prototype;
	
	p.init = function(){
		this.initDom();
		this.initArrange();
		this.initControllShift();
		this.initArrow();
	};
	
	p.initDom = function(){
		this.$controllBtns = $("div.refitnav li.bthcon");
		this.$former = $("div.refit div.leftbth");
		this.$next = $("div.refit div.rightbth");
		this.$mainShiftBar = $("div.bigbox");
		this.$shiftBarsBox = $("div.services").data("index",0);
		this.$bthbg = $("div.refitnav div.bthbg");
		
		this.mainWidth = this.$mainShiftBar.parent().width();
		this.top = 315;
		this.left = 408;
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
			var $this = $(this);
			var i = cur.$controllBtns.index(this);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			var limit = Math.floor((cur.$shiftBarsBox.eq(i).children().length-1)/(cur.col*cur.row));
			var btnLeft = $this.offset().left - $('div.refit').offset().left;
			
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
			},300)
			cur.$bthbg.animate({
				left: btnLeft
			},300,function(){
				$this.addClass("bth").siblings().removeClass("bth");
			})
		});
		
		cur.$bthbg.css({ left: $("div.refit li.bth").offset().left - $('div.refit').offset().left });
		
		var url = window.location.href;
		/*
		 split 截取字符串数组，【1】代表找到数组index 为1的 字符串
		 
		 */
		var num = url.split('=')[1];
		this.$controllBtns.eq(num).trigger('click');
	};
	
	p.initArrow = function(){
		var cur = this;
		this.$former.click(function(){
			var i = cur.$controllBtns.index($("div.refit li.bth")[0]);
			var index = cur.$shiftBarsBox.eq(i).data("index");
			if(index){
				cur.$next.removeClass('rightDisabled');
				cur.shifting(-1);
			}
		})
		this.$next.click(function(){
			var i = cur.$controllBtns.index($("div.refit li.bth")[0]);
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
		var i = cur.$controllBtns.index($("div.refit li.bth")[0]);
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
	
	foton.shiftPlugin = shiftPlugin;
})();