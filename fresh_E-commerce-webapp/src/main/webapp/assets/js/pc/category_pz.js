$(function(){

	$("#menuCategory").hoverIntent({
		over: function() {},
		timeout: 150,
		out: function() {
			$(this).find(".sub_content").hide();
			$(this).find("#mc_content li").removeClass("selector");
			$("#sub_Category").attr("nov",false);
		}
	});
	$("#mc_content li").hoverIntent({
		interval: 40,
		over : function(){
			var $this = $(this);
			$("#sub_Category").find("div.sub_content").hide();
			$this.addClass("selector").siblings().removeClass("selector");
			var index = $this.index();
			var sub_con = $("#sub_Category").children().eq(index);
			sub_con.show().siblings().hide();
			
			var mc = $("#mc_content").offset().top+15;
			
			var targetTop = $this.offset().top;
			var curWindow = $(window).height() + $(window).scrollTop();
			var distanceBottom = curWindow - targetTop;
			
			targetTop = targetTop - mc;
			if(distanceBottom - sub_con.height() < 50){
				targetTop = curWindow - sub_con.height() - 50 - mc;
			}
			if($("#sub_Category").attr("nov") == "false" || $("#sub_Category").attr("nov") == undefined){
				$("#sub_Category").attr("nov", true);
				$("#sub_Category").css({top : targetTop, left:-100, opacity:0});
				$("#sub_Category").animate({left:9 ,opacity:1});
			}else{
				$("#sub_Category").animate({top: targetTop});
			}
		},
		out:function(){},
		timeout:0
	});


	//调出二级大菜单项
	$(document).on("mouseover", "#parentMenu, #menuCategory #mc_content, #menuCategory #sub_Category", function(){
		$("#mc_content").show();
	});
	$(document).on("mouseout", "#parentMenu, #menuCategory #mc_content", function(){
		$("#mc_content").hide();
	});


	//显示购物车飘窗
	var show_car = function(event){
		//必须登录
		var shopCar = $(".my_shop_see");
		var isLogin = shopCar.find(".isLogin");

		if(isLogin.val()=="0"){
			return false;
		}

		//阻止事件传递
		event.preventDefault();
		event.stopPropagation();


		//购物车定位显示
		var curBtn = $(".btn-shop-car");
		var left = curBtn.offset().left-shopCar.outerWidth()+curBtn.innerWidth();
		var top = curBtn.offset().top + curBtn.height();




		//调取当前购物车信息
		if(shopCar.data("isshow")=="0"){
			$.get("/shopCars/seeMyCar", function(data){
				if(data && data.data){
					shopCar.css({"left":left, "top":top}).show();
					var json = data.data;

					var toMyShopCar = $(".toMyShopCar");
					var en = null;
					var temp = null;
					if(json.length>0){
						for(var i=0;i<json.length;i++){
							en = json[i];
							temp = shopCar.find("div.tempCon").clone();
							temp.find(".goImg img").attr("src", ("/file/"+en.imgSrc));
							temp.find(".goName").text(en.goodName);
							temp.find(".goPrice").text("¥" + en.price + "*" + en.count);
							temp.removeClass("hide tempCon").addClass("sc_list");
							temp.insertBefore(toMyShopCar);
						}
						shopCar.data("isshow", "1");
					}else{
						shopCar.find(".no-data").removeClass("hide");
					}
				}
			});
		}

	};

	//显示购物车
	$(document).on("mouseover", ".btn-shop-car, .my_shop_see", show_car);


	$(document).on("mouseover", "body", function(){
		$(".my_shop_see").hide();
	});

});
