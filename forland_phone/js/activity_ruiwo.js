this.foton = this.foton || {};
(function(){
	var activity = function(){
		this.change();
	};
	var p = activity.prototype;
	p.change = function(){
		var cur = this;
		$("div.hdbox").eq(0).show();
		$("ul.optionbox li").click(function(){
			var index = $(this).index();
			$(this).addClass("pitchBG").siblings().removeClass("pitchBG");
			$("div.hdbox").eq(index).fadeIn().siblings("div.hdbox").hide();
		});
	};
	
	
	foton.activity = activity;
})();
