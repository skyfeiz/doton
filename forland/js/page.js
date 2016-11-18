//<!--通过模板将当前页数 和总页数传入  -->
		//<script>
		$(document).ready(
			function(){
			//<!--当前页数  -->
			var curNum=$("#currentNum")[0].value;
			//<!--总页数  -->
			var totleNum=$("#pagesTotal")[0].value;
			//<!--跳转链接  -->
			var hre=$("#pageurl").attr("value");
			var hre1 = hre.split("=")[0];
			if(parseInt(curNum)>parseInt(totleNum)){
			return ;
			}
			//<!--当前页数小于5 显示当前页数   -->
			if(curNum<=5){
					switch(totleNum){
					case "1":
						$("#page1").html(1);
						$("#page1").attr("href",hre+"1");
						$("#page1").addClass("present"); // 追加样式
						$("#page2"). hide() ;
						$("#page3"). hide() ;
						$("#page4"). hide() ;
						$("#page5"). hide() ;
						break;
					case "2":
						$("#page1").html(1);
						$("#page1").attr("href",hre+"1");
						$("#page2").html(2);
						$("#page2").attr("href",hre+"2");
						$("#page3"). hide() ;
						$("#page4"). hide() ;
						$("#page5"). hide() ;
						switch(curNum){
						case "1":
							$("#page1").addClass("present"); // 追加样式
							break;
						case "2":
							$("#page2").addClass("present"); // 追加样式
							break;
						}
						break;
					case "3":
						$("#page1").html(1);
						$("#page1").attr("href",hre+"1");
						if(parseInt(curNum)==1){
							$("#page1").addClass("present"); // 追加样式
						}else if(parseInt(curNum)==2){
							$("#page2").addClass("present"); // 追加样式
						}else{
							$("#page3").addClass("present"); // 追加样式
						}
						$("#page2").html(2);
						$("#page2").attr("href",hre+"2");
						$("#page3").html(3);
						$("#page3").attr("href",hre+"3");
						$("#page4"). hide() ;
						$("#page5"). hide() ;
						break ;
					case "4":
						$("#page1").html(1);
						$("#page1").attr("href",hre+"1");
						$("#page2").html(2);
						$("#page2").attr("href",hre+"2");
						$("#page3").html(3);
						$("#page3").attr("href",hre+"3");
						$("#page4").html(4);
						$("#page4").attr("href",hre+"4");
						$("#page5"). hide() ;
						switch(curNum){
						case "1":
							$("#page1").addClass("present"); // 追加样式
							break;
						case "2":
							$("#page2").addClass("present"); // 追加样式
							break;
						case "3":
							$("#page3").addClass("present"); // 追加样式
							break;
						case "4":
							$("#page4").addClass("present"); // 追加样式
							break;
						}
						break ;
					default:
						$("#page1").html(1);
						$("#page1").attr("href",hre+"1");
						$("#page2").html(2);
						$("#page2").attr("href",hre+"2");
						$("#page3").html(3);
						$("#page3").attr("href",hre+"3");
						$("#page4").html(4);
						$("#page4").attr("href",hre+"4");
						$("#page5").html(5);
						$("#page5").attr("href",hre+"5");
						switch(curNum){
						case "1":
							$("#page1").addClass("present"); // 追加样式
							break;
						case "2":
							$("#page2").addClass("present"); // 追加样式
							break;
						case "3":
							$("#page3").addClass("present"); // 追加样式
							break;
						case "4":
							$("#page4").addClass("present"); // 追加样式
							break;
						case "5":
							$("#page5").addClass("present"); // 追加样式
							break;
						}
						break ;
					}
				} 
			else{
				if(curNum==totleNum){
						$("#page1").html(curNum-4);
						$("#page1").attr("href",hre1+"="+(curNum-4).toString());
						$("#page2").html(curNum-3);
						$("#page2").attr("href",hre1+"="+(curNum-3).toString());
						$("#page3").html(curNum-2);
						$("#page3").attr("href",hre1+"="+(curNum-2).toString());
						$("#page4").html(curNum-1);
						$("#page4").attr("href",hre1+"="+(curNum-1).toString());
						$("#page5").html(curNum);
						$("#page5").attr("href",hre1+"="+(curNum).toString());
						$("#page5").addClass("present"); // 追加样式
				}else if((parseInt(curNum)+2) >totleNum ){
						$("#page1").html(curNum-3);
						$("#page1").attr("href",hre1+"="+(curNum-3).toString());
						$("#page2").html(curNum-2);
						$("#page2").attr("href",hre1+"="+(curNum-2).toString());
						$("#page3").html(curNum-1);
						$("#page3").attr("href",hre1+"="+(curNum-1).toString());
						$("#page4").html(curNum);
						$("#page4").attr("href",hre1+"="+(curNum).toString());
						$("#page4").addClass("present"); // 追加样式
						$("#page5").html(parseInt(curNum)+1);
						$("#page5").attr("href",hre1+"="+(parseInt(curNum)+1).toString());
				}/*else if((parseInt(curNum)-2) <=0 ){
						$("#page1").html(curNum-1);
						$("#page2").html(curNum);
						$("#page2").addClass("present"); // 追加样式
						$("#page3").html(parseInt(curNum)+1);
						$("#page4").html(parseInt(curNum)+2);
						$("#page5").html(parseInt(curNum)+3);
				}*/else{
						$("#page1").html(curNum-2);
						$("#page2").html(curNum-1);
						$("#page3").html(curNum);
						$("#page3").addClass("present"); // 追加样式
						$("#page4").html(parseInt(curNum)+1);
						$("#page5").html(parseInt(curNum)+2);
				}
			}
		});