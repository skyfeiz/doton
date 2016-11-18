this.foton = this.foton || {};
(function(){
	var share = function(){
		this.init();
		
	};
	
	var p = share.prototype;
	
	p.init = function(){
		var cur = this;
		$(".sharePanel li").each(function(){
			$(this).click(function(){
				var type = $(this).attr("id");
				cur.Share(type);
			})
		})
	};
	
	p.HTMLEncode = function(html){
		var temp = document.createElement("div"); (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output
	};
	
	p.HTMLDecode = function(text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output
	};
	
	p.Share = function(type){
		var cur = this;
		var link = '';
		var pics = new Array();
		switch (type) {
			//新浪
		case 'sina':
			link = 'http://v.t.sina.com.cn/share/share.php?&url={url}&title={title}&content=gb2312';
			break;
			//qq微博
		case 'qqt':
			link = 'http://v.t.qq.com/share/share.php?title={title}&url={url}&pic={pic:|}';
			break;
			//qq好友
		case 'qqfd':
			link = 'http://connect.qq.com/widget/shareqq/index.html?url={url}&pic={pic:|}';
			break;	
			//人人网
		case 'renren':
			link = 'http://share.renren.com/share/buttonshare.do?link={url}&title={title}';
			break;	
			//qq空间
		case 'qzone':
			link = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}';
			break;
			//豆瓣
		case 'douban':
			link = "http://www.douban.com/recommend/?url={url}&title";
			break;
			//腾讯朋友
		case 'pengyou':
			link = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={url}&title={title}";
			break;
			//msn
		case 'msn':
			link = "http://profile.live.com/P.mvc#!/badge?url={url}&title={title}&pic={pic:|}";
			break;
			//猫扑
		case 'mop':
			link = "http://tt.mop.com/share/shareV.jsp?pageUrl={url}&title={title}";
			break;
		}
		
		$('img').each(function(i, n) {
			pics.push(n.src);
		});
		
		link = link.replace('{title}', encodeURIComponent(cur.HTMLDecode(document.getElementsByTagName('title')[0].innerHTML)));
		link = link.replace('{url}', encodeURIComponent(window.location.href));	
		link = link.replace('{pic:|}', pics.join('|'));
		window.open(link);
	};
	
	foton.share = share;
	
})();