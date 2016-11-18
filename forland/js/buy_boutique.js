this.foton = this.foton || {};
(function(){
	var boutique = function(){
		new foton.Mountings();
	};
	
	var p = boutique.prototype;
	
	foton.boutique = boutique;
	
})();

(function(){
	var Mountings = function(){
		this.init();
	};
	
	var p = Mountings.prototype;
	p.init = function(){
		this.index = 0;
		this.initDom();
		this.initchange();
		this.initdistribution();
		this.initclick();
	};
	
	p.initDom = function()
	{
		this.$bthcon = $(".navigation .bthcon");
		this.$particulars = $(".content .particulars");
		this.$bthbg = $(".navigation .bthbg");
		this.$bthconCar = $(".refitnav .bthcon")
		this.$Carbthbg = $(".refitnav .bthbg")
		this.$services = $(".refit .services")
		this.$bigbox = $(".refit .bigbox")
		this.$programa = $(".services .programa")
		this.$programaa = $(".servicesa .programaa")
		this.$programab = $(".servicesb .programab")
		this.$programac = $(".servicesc .programac")
		
	};
/*--------------------------精品配饰----------------------------------*/
	p.initchange = function()
	{
		var cur = this;
		this.$bthcon.click(function(){
			
			$(this).addClass("bth").siblings().removeClass("bth");
			var targetX = $(this).position().left;
			cur.$bthbg.css({"left":targetX});
		})
	};
	
	p.initdistribution = function()
	{
		var cur = this;
		cur.$particulars.children().each(function(i){
			if(i){
				$(this).hide();
			}
			$(this).children().each(function(j){
				$(this).css({
					top: 0,
					left: j%4*305
				});
			});
		});
	}
	
	p.initclick = function()
	{
		var cur = this;
		cur.i = 0;
		this.$bthcon.click(function(){
			var _index = cur.$bthcon.index(this);
				if(_index == cur.i) return false;
				cur.$particulars.children().eq(_index).css({ 'display': 'block',zIndex: 100 }).children().each(function(i){
					$(this).css({
						top: 200,
						opacity: 0
					}).delay(60+i*100).animate({
						top: 0,
						opacity: 1
					})
				});
				cur.$particulars.children().eq(cur.i).children().each(function(j){
					var length = cur.$particulars.children().eq(cur.i).children().length-1;
					$(this).delay(j*100).animate({
						top: -200,
						opacity: 0
					},function(){
						if(j==length){
							cur.$particulars.children().eq(cur.i).css({
								'display': 'none',zIndex: 0
							})
							cur.i = _index;
						}
					})
				});
		})
	}
	
	foton.Mountings = Mountings;
})();