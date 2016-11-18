this.foton = this.foton || {};
(function(){
	var honor = function(){
		this.change();
	};
	var p = honor.prototype;
	p.change = function(){
		var cur = this;
		$("div.honor_box").each(function(i){
			if(!((i+1)%2)){
				$(this).addClass("float_r");
			}
		})
		
		
	};
	
	
	foton.honor = honor;
})();
