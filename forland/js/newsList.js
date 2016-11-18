this.foton = this.foton || {};
(function(){
    var NewsList = function()
    {
        this.init();
    };
    var p = NewsList.prototype;

    p.init = function()
    {
        this.initDom();
        this.initScroll();
        this.newsItemAppear();
		this.newsHover();
    };
    p.initDom = function()
    {
        this.$newsList = $(".newsList");
        this.$newsListLi = $(".newsList li");
        this.$newsItem = $(".newsList .newsItem");
    };
    p.initScroll = function()
    {
        var cur = this;
        $(window).bind("scroll",function(){
            var tp = $(document).scrollTop();
        });
    };

    p.newsItemAppear = function()
    {
        this.$newsListLi.each(function(i,dom){
            $(dom).stop(true,true).delay(200+i*100).css("visibility","visible").animate({"top":0,"opacity":1},500);
        });
    };
	
	p.newsHover = function(){
		var cur = this;
		this.$newsItem.mouseenter(function(){
			cur.$newsItem.removeClass("newsHover");
			$(this).addClass("newsHover");
		}).mouseleave(function(){
			$(this).removeClass("newsHover");
		});
	};
	
    foton.NewsList = NewsList;
})();

