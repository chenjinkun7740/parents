
$(function(){

    //选择收货地址
    $(".addressCon label[data-id]").click(function(){
        var cur = $(this);
        cur.parents("li").siblings().removeClass("cur");
        cur.parent("li").addClass("cur");
    });

    //订单备注
    var orderRemarkDef = "备注信息";
    $(".orderRemark").focus(function(){
        var cur = $(this);
        if($.trim(cur.val())==orderRemarkDef){
            cur.val("");
        }
    }).blur(function(){
        var cur = $(this);
        if($.trim(cur.val())==""){
            cur.val(orderRemarkDef);
        }
    });


    //订单提交
    $(document).on("click", ".orderAccount", function(){
        var addressId = $("input[name='addressId']:checked");
        if(!addressId || addressId.length<1){
            alert("请先选择收货地址");
            return false;
        }
        var remark = $(".orderRemark");
        if($.trim(remark.val())==orderRemarkDef){
            remark.val("");
        }
    });

});
