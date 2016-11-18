this.foton = this.foton||{};
(function(){
	var detailNav = function(){
		this.init();
	};
	
	var p = detailNav.prototype;
	p.init = function(){
		this.getUrlArgs();
	};
	
	p.getUrlArgs = function(){
		var search = window.location.search.replace('?', '');
		if(search){
			var args = {};
			$.each(search.split('&'),function(i,val){
				var name = val.split('=')[0];
				var value = val.split('=')[1];
				args[name] = value;
			});
			if(!isNaN(args.navNum)){
				$('div.navPanel a').eq(args.navNum).addClass('present');
			}
		}
	};
	
	foton.detailNav = detailNav;
})();