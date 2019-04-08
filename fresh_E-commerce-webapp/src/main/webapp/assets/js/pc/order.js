
$(function(){

    //立即付款
    $(document).on("click", ".payBtn", function(){
        console.log(">>>>>>>>>>>>>>");
        var cur = $(this);
        console.log(cur.data("href"));
        if(cur.data("disabled")!="0"){
            alert("订单初始化进行中，请稍等！");
            return false;
        }
        cur.data("disabled", "1");

        var json = common.ajax(
            false,
            "GET",
            cur.data("href")
        );

        console.log(json);
    });

});