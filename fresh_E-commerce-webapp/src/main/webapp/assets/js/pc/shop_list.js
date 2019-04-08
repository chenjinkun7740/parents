
$(function(){
    var depOpA = $(".depOp a");
    var areaOpA = $(".areaOp a");
    var depId = $("#depId");
    var areaId = $("#areaId");
    var url = "shops/zgList";

    //选择部门
    if(depOpA.length>0){
        depOpA.click(function(){
            var di = $(this).data("dep-id");
            var newUrl = url + "?r=372713&areaId=" + areaId.val();
            if(di){
                newUrl+= "&depId=" + di;
            }
            window.location.href = newUrl;
        });
    }


    //选择区域
    if(areaOpA.length>0){
        areaOpA.click(function(){
            var ai = $(this).data("area-id");
            var newUrl = url + "?r=372713&depId=" + depId.val();
            if(ai){
                newUrl+= "&areaId=" + ai;
            }
            window.location.href = newUrl;
        });
    }


});
