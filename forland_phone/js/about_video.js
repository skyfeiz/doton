this.foton = this.foton || {};
(function(){
	var video = function(){
		this.change();
	};
	var p = video.prototype;
	p.change = function(){
		var cur = this;
		$(".video_box").each(function(){
			cur.player = polyvObject($(this)).videoPlayer({
			 'width':'100%',
			 'height':'100%',
			 'vid' : $(this).attr("data"),
			'session_id' :'TEST_POLYV'
			});
		});
		
		$("div.hdbox").eq(0).show();
		$("ul.optionbox li").click(function(){
			var index = $(this).index();
			$(this).addClass("pitchBG").siblings().removeClass("pitchBG");
			$("div.hdbox").eq(index).fadeIn().siblings("div.hdbox").hide();
		});
	};
	
	
	foton.video = video;
})();
