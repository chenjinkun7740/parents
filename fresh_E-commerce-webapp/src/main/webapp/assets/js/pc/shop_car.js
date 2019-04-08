
$(function(){
    var ckShopP = $("input.ckShopP");     //店checkbox
    var ckChild = $("input.ckChild");       //商品checkbox
    var ckParent = $("input.ckParent");     //全选checkbox


    //移除购物车某商品
    $("a.removeGood").click(function(){
        if(!confirm("确认删除商品?")){
            return false;
        }

        var cur = $(this);
        var paDiv = cur.parents("div.order-content");
        var ind = paDiv.data("ind");
        var buyCount = paDiv.find("input.buyCount");

        $.ajax({
            type:"GET",
            url:"cartDelete",
            cache : false,
            async : false,
            data:{
                id:ind
            },
            success:function(data){
            	data = JSON.parse(data)
                if(data.suc=="true"){
                    //某店小计
                    /*var shopInd = paDiv.data("shop-ind");
                    var shopTotMon = $(".shopTotMon[data-shop-ind="+shopInd+"]");
                    shopTotalMoney(shopTotMon, (price*changeCount));*/

                    alert("删除成功");
                    window.location.reload();
                }
            }
        });
    });


    //直接输入商品数量
    var oldCount = 0;
    $("input.buyCount").focus(function(){
        var cur = $(this);
        oldCount = cur.val();
    }).blur(function(){
        var cur = $(this);
        var curVal = cur.val();

        if((!/^\d{1,}$/) || curVal<1){
            cur.val(1);
            return false;
        }
        var paDiv = cur.parents("div.order-content");
        updateShop(paDiv, (curVal-oldCount));
    });

    //购买量输入框
    $(document).on("keydown", "body", function(e){
        var onKeyCode = document.getElementById("buyCountNum");
        onKeyCode.onkeyup=function(){
            this.value=this.value.replace(/\D+/g,"")
        }
    });


    //按【-】减少数量
    $(".minusCount").click(function(){
        var cur = $(this);
        var paDiv = cur.parents("div.order-content");
        var buyCount = paDiv.find("input.buyCount");

        var count = parseFloat(buyCount.val())
        if(count<=1){
            alert("商品至少购买1个");
            return false;
        }
        count = count-1;
        buyCount.val(count);

        updateShop(paDiv, -1);
    });

    //按【+】增加数量
    $(".plusCount").click(function(){
        var cur = $(this);
        var paDiv = cur.parents("div.order-content");
        var buyCount = paDiv.find("input.buyCount");
        var count = parseFloat(buyCount.val())+1;
        buyCount.val(count);
        updateShop(paDiv, 1);
    });


    //选中单个商品
    if(ckChild.length>0){
        ckChild.click(function(){
            var cur = $(this);
            var shopId = cur.data("shop-id");


            //级连门店
            var pa = cur.parents("div.cart-order");
            var shopCk = pa.find("input.ckShopP");
            var shopGoodCk = pa.find("input.ckShopC");
            var flag2 = true;
            for(var i=0;i<shopGoodCk.length;i++){
                if(!shopGoodCk.eq(i).is(":checked")){
                    flag2 = false;
                    break;
                }
            }
            if(flag2==true){
                shopCk.prop("checked", true);
            }else{
                shopCk.prop("checked", false);
            }


            //级连全选
            var flag = true;
            for(var i=0;i<ckChild.length;i++){
                if(!ckChild.eq(i).is(":checked")){
                    flag = false;
                    break;
                }
            }
            if(flag==true){
                ckParent.prop("checked", true);
            }else{
                ckParent.prop("checked", false);
            }

            totalPay();
        });
    }


    //选中和取消某店商品
    if(ckShopP.length>0){
        ckShopP.click(function(){

            var cur = $(this);
            var shopId = cur.data("shop-id");
            if(cur.is(":checked")){
                $("input.ckShopC[data-shop-id="+shopId+"]").prop("checked", true);

                //级连全选
                var flag = true;
                var allChild = $("div.cart-table input[type='checkbox']");
                for(var i=0;i<allChild.length;i++){
                    if(!allChild.eq(i).is(":checked")){
                        flag = false;
                        break;
                    }
                }
                if(flag==true){
                    ckParent.prop("checked", true);
                }else{
                    ckParent.prop("checked", false);
                }

            }else{
                ckParent.prop("checked", false);
                $("input.ckShopC[data-shop-id="+shopId+"]").prop("checked", false);
            }

            totalPay();
        });
    }



    //全选
    if(ckParent.length>0){
        ckParent.click(function(){
            var cur = $(this);
            if(cur.is(":checked")){
                $("div.cart-table input[type='checkbox']").prop("checked", true);
            }else{
                $("div.cart-table input[type='checkbox']").prop("checked", false);
            }

            totalPay();
        });
    }

    //订单结算
    $(".orderAccount").click(function(){
        var cur = $(this);
        var totalMoney = parseFloat($(".totalMoney").text());

        if(totalMoney>0){
            if(ckChild.length>0){
                var str = "";
                for(var i=0;i<ckChild.length;i++){
                    var temp = ckChild.eq(i).parents("div.order-content");
                    if(ckChild.eq(i).is(":checked")){
                        str += temp.data("shop-car-id")+",";
                    }
                }
                $("#shopCarId").val(str);
                
                
                $("#form1").submit();
            }
        }else{
            alert("请选择您要结算的商品");
            return false;
        }
    });

    //批量删除
    $(".btnRemoveGoods").click(function(){
        if(ckChild.length>0) {
            var proIds = new Array();
            var temp = 0;
            for (var i = 0; i < ckChild.length; i++) {
                if (ckChild.eq(i).is(":checked")) {
                    temp = ckChild.eq(i).parents(".order-content").data("pro-id");
                    proIds.push(temp);
                }
            }

            if (proIds != null && proIds.length > 0) {
                $.ajax({
                    type:"GET",
                    url:"/shopCars/delete",
                    cache : false,
                    async : false,
                    data:{
                        proIds:proIds.toString()
                    },
                    success:function(data){
                        if(data.suc==true){
                            for(var i=0;i<proIds.length;i++){
                                $(".order-content[data-pro-id="+proIds[i]+"]").remove();
                            }
                            ckChild = $("input.ckChild");
                            if(ckChild.length==0){
                                //购物车已无商品
                                $(".order-con").remove();
                                $(".cart-order").html("<div class='no-data'>暂无数据</div>");
                            }
                        }else{
                            alert(data.message);
                        }
                    }
                });
            }else{
                alert("请选择商品");
            }
        }
    });

});


//更新列表数据
function updateShop(paDiv, changeCount){
    $.ajax({
        type:"GET",
        url:"cartUpdate",
        cache : false,
        async : false,
        data:{
            goodId:paDiv.data("pro-id"),
            count:changeCount,
            shopId:paDiv.data("shop-id"),//线下门店ID
        },
        success:function(data){
        	data = JSON.parse(data);
            if(data.suc=="true"){
                var price = parseFloat(paDiv.find(".th-price").text().replace("￥",""));
                var count = parseFloat(paDiv.find(".buyCount").val());
                paDiv.find(".th-sum").text(price * count);

                //某店小计
                var shopInd = paDiv.data("shop-ind");
                var shopTotMon = $(".shopTotMon[data-shop-ind="+shopInd+"]");
                shopTotalMoney(shopTotMon, (price*changeCount));

                //本次结算总金额
                totalPay();
            }
        }
    });
}


//门店小计
function shopTotalMoney(shopTotMon, changeMoney){
    if(shopTotMon && changeMoney!=0){
        var money = parseFloat(shopTotMon.text());
        shopTotMon.text(money+changeMoney);
    }
}


//应付总金额
function totalPay(){
    var singleTotal = $(".order-content .goodTotal");
    var totalCount = $(".totalCount");
    var totalMoney = $(".totalMoney");
    var ckChild = $("input.ckChild");

    if(singleTotal.length>0){
        var count = 0;
        var money = 0;
        for(var i=0;i<singleTotal.length;i++){
            if(ckChild.eq(i).is(":checked")){
                count++;
                money += parseFloat(singleTotal.eq(i).text());
            }
        }
        totalMoney.text(money);
    }
}
