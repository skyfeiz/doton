this.foton = this.foton||{};
(function(){
	var dropItem = function(){
		this.init();
	};
	
	var p = dropItem.prototype;
	
	p.init = function(){
		this.initDom();
		this.initEvent();
	};
	
	p.initDom = function(){
		this.$box = $("div.dropItem");
	};
	
	p.initEvent = function(){
		var cur = this;
		this.$box.each(function(){
			var $dropDefault = $(this).find("p.dropDefault");
			var $dropOptions = $(this).find("div.dropOptions");
			var $options = $(this).find("div.dropOptions p");
			$dropDefault.click(function(e){
				e.stopPropagation();
				cur.dropAuto();
				if( $dropOptions.css( "display" ) == "none" ){
					$(this).find("button").addClass("click_color");
					$dropOptions.slideDown( 300 );
				}
				else{
					$(this).find("button").removeClass("click_color");
					$dropOptions.slideUp( 300 );
				}
			});
			
			$(document).on("click","div.dropOptions p",function(e){
				var value = $(this).text();
				var id = $(this).data("id");
				e.stopPropagation();
				cur.dropAuto();
				$(this).parents("div.dropItem").find("span").text( value );
				$(this).parent().next().val(id);
				/* 点击回调函数 */
				if($(this).data("callback")){
					$(this).trigger("callback");
				}
			});
		});
		
		$(document).click(function(e){
			$("div.dropItem").each(function(){
				var dropItem = this;
				if($.inArray( dropItem, $(e.target).parents() ) == -1){
					cur.dropAuto();
				};
			})
		});
	};
	
	p.dropAuto = function(){
		$("div.dropOptions").slideUp( 300 );
		$("p.dropDefault button").removeClass("click_color");
	};
	
	foton.dropItem = dropItem;
	
})();