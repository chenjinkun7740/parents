
$(function(){

    //立即付款
    $(".btnPayNow").click(function(){
        alert("付款成功");
        $(this).hide();
    });


    //微信支付
    $(document).on("click", ".wx_pay", function(){
        var cur = $(this);
        if(cur.data("href")){
            var dhref = cur.data("href");
            var dno = cur.data("no");
            var wx_2code_con = $(".wx_2code_con");

            cur.attr("disabled", "disabled");


            //微信支付初始化
            $.post(
                dhref,
                {
                    no: dno
                },
                function (data) {
                    //console.log(data);
                	 data = JSON.parse(data);
                    if (data.success == "true") {
                        //显示微信支付信息

                        wx_2code_con.removeClass("hide");

                        //生成二维码
                        var img ="<img width='256' height='256' src=\"data:image/png;base64," + data.content + "\"/>"
                        var qrcode_con = wx_2code_con.find(".qrcode");
                        qrcode_con.html(img);
                        useWxPay();
                    }else{
                        cur.removeAttr("disabled", "disabled").text("微信支付");
                        wx_2code_con.removeClass("hide");
                        var wx_pay_title = wx_2code_con.find(".wx_pay_title");
                        wx_pay_title.text(data.content + "，请再次发起支付，或者重新拍单");
                    }

                }
            );
        }

    });

});


//触发微信付款
function useWxPay(){
    var wx_pay = $(".wx_pay");
    if(wx_pay && wx_pay.data("no")){
        var str = wx_pay.data("no");
            if(str!=""){
                var wx_2code_con = $(".wx_2code_con");
                var wx_pay_title = wx_2code_con.find(".wx_pay_title");
                var qrcode = wx_2code_con.find(".qrcode");

                var si_time = window.setInterval(function(){
                    $.get(
                        "wxPayResult",
                        {
                            mno:str
                        },
                        function(data){
                            //console.log(data);
                        	data = JSON.parse(data);
                            if (data.suc == "true") {
                                window.clearInterval(si_time);
                                wx_pay_title.text("恭喜您微信付款成功");
                                qrcode.hide();
                            }
                        }
                    );
                },2000);
            }
    }
}


