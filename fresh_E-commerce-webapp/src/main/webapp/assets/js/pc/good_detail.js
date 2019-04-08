
$(function(){

    //当前主图
    var omainImg = $(".show-pic img");
    //图片轮播
    $(".show-list-con li a").click(function(){
        var cur = $(this);
        var img = cur.children("img");
        omainImg.prop("src", img.prop("src"));

        cur.parents("li").siblings().removeClass("active");
        cur.parent("li").addClass("active");
    });


    //按公司和区域加载分店
    $("#aearSel").change(function(){
        var cur = $(this);
        var shopSel = $("#shopSel");
        var str = "<option value='0'>==选择配送门店==</option>";
        if(cur.val()!='0'){
            $.ajax({
                type:"GET",
                url:"front/getOfflineShop",
                cache : false,
                async : false,
                data:{
                    areaId:cur.val(),
//                    depId:$("#depIdHide").val()
                },
                success:function(data){
                	data = JSON.parse(data);
                    if(data.data){
                        var json = data.data;
                        for(var i=0;i<json.length;i++){
                            str += "<option value='"+json[i].id+"'>"+json[i].dept_name+"</option>";
                        }
                        shopSel.html($(str));
                    }
                }
            });
        }else{
            shopSel.html($(str));
        }
    });

    //输入购买数量
    $(document).on("blur", "#buyCountNum", function(){
        var cur = $(this);
        if(!regValid.isZhengInt(cur.val())){
            alert("请填写购买数量，至少为1件");
            cur.val(1);
        }
    });

    //减少购买量
    $(document).on("click", ".minusCount", function(){
        var buyCount = $(".buyCount");
        var va = parseInt(buyCount.val());
        if(va && va>1){
            buyCount.val(va-1);
        }
    });

    //增加购买量
    $(document).on("click", ".plusCount", function(){
        var buyCount = $(".buyCount");
        var va = parseInt(buyCount.val());
        if(va && va>0){
            buyCount.val(va+1);
        }
    });


    //加入购物车
    $("a.addToShopCar").click(function(event){
        var aearSel = $("#aearSel");
        var shopSel = $("#shopSel");
        if(aearSel.val()=='0' || shopSel.val()=='0'){
            alert("请选择区域和供货门店");
            return false;
        }

        //加入购物车
        var proIdHide = $("#proIdHide");
        var scheduleIdHide = $("#scheduleIdHide")
        var buyCountNum = $("#buyCountNum");

        if(!regValid.isZhengInt(buyCountNum.val())){
            alert("请填写购买数量，至少为1件");
            return false;
        }

        //@Param("goodId") Long goodId, @Param("count") Integer count, @Param("shopId") Long shopId
        if(proIdHide.val()!="" && proIdHide.val()!="0"){
        	var addcar = $(this);
        	var offset = $("#end").offset();
        	
        	var img = $(".show-pic").find('img').attr('src');
        	
        	var flyer = $('<img class="u-flyer" src="'+img+'">');
        	
        	var sta = $(".show-pic img");
        	flyer.fly({
    			start: {
    				left: 519,
    				top: 135
    			},
    			end: {
    				left: offset.left+100,
    				top: offset.top+20,
    				width: 0,
    				height: 0
    			},
    			onEnd: function(){
    				
    				this.destory();
    			}
    		});
        	
            $.ajax({
                type:"GET",
                url:"front/cartAdd",
                cache : false,
                async : false,
                data:{
                    goodId:$("#proIdHide").val(),
                    shopId:shopSel.val(),
                    count:$.trim(buyCountNum.val())
                },
                success:function(data){
                	data = JSON.parse(data);
                    console.log(data);
                    if(data.suc=="true"){
                        if(data.data){
                            var seeShopCar = $(".seeShopCar");
                            var count = seeShopCar.data("count")+1;
                            seeShopCar.data("count", data.data).text("查看购物车 ("+data.data+")");
                        }


                        //alert("已成功加入购物车");
                    }
                }
            });
        }

    });

});