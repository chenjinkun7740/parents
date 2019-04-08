
$(function(){

    $(document).on("blur", "#username", function(){
        vlAccount();
    });


    $(document).on("blur", "#password", function(){
        vlPwd();
    });


    //login
    $(document).on("click", ".loginBtn", function(){
        var cur = $(this);
        var tip = $(".errorTip");

        if(vlAccount() && vlPwd()){
            if(cur.attr("disabled")==true){
                //alert("数据提交中请稍后...");
                return false;
            }else{
                cur.attr("disabled", true).text("登录中...");
            }


            $.ajax({
                url:"/members/login",
                type:"POST",
                data:{
                    username:$.trim($("#username").val()),
                    password:$.trim($("#password").val())
                }
            }).done(function(data){
                if(data.code==0) {
                    tip.text("");

                    var flag = $(".loginToPage").val();

                    if(!flag || flag==-2){
                        window.location.href="/";
                        return false;
                    }

                    if(flag==-1){
                        window.location.href="/members/info";
                        return false;
                    }

                    if (flag == 0) {
                        window.location.href = "/shopCars/see";
                        return false;
                    }

                    if (flag > 0) {
                        window.location.href = "/goods/detail?goodId=" + flag;
                        return false;
                    }

                }else{
                    tip.text("登录密码有误，请重新输入");
                    cur.removeAttr("disabled").text("立即登录");
                }
            });
            return false;
        }
    });

});


//验证账号=================================================================
function vlAccount(){
    var rv = false;
    var obj = $("#username");
    var tip = $(".errorTip");

    if(regValid.isMobile(obj.val())){
        var json = common.ajax(
            false,
            "GET",
            "/members/vlMobileRepeat",
            {
                mobile:$.trim(obj.val())
            }
        );

        if(json.suc){
            tip.text("本手机号还未注册会员，现在注册可享受更多优惠");
        }else{
            rv = true;
        }
    }else{
        tip.text("请输入正确手机号");
    }
    return rv;
}


//验证密码===================================================================
function vlPwd(){
    var rv = false;
    var obj = $("#password");
    var tip = $(".errorTip");

    if(obj.val()!="" && obj.val().length>=6 && obj.length<=20){
        rv = true;
        tip.text("");
    }else{
        tip.text("请输入6~20位密码");
    }
    return rv;
}





