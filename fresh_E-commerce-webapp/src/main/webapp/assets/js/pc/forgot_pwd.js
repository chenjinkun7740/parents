
$(function(){
    var timer;
    var count=300;

    /*====================================== step 1 S ================================*/
    //下一步
    $(document).on("click", ".fpStep1", function(){
        if(vlMobile() && vlCode()){
            $(".fg-step-1").addClass("hide");
            $(".fg-step-2").removeClass("hide");
            $("#onStep").removeClass().addClass("on on3");
        }
    });

    //获取手机验证码
    $(document).on("click", "#sendCode", function() {
        var cur = $(this);
        var tip = $(".fg-step-1 .errorTips");

        if(!vlMobile()){
            return false;
        }

        cur.attr("disabled", true);
        if (!timer) {
            timer = setInterval(function () {
                if (count > 1) {
                    count--;
                    cur.text(count + " 秒后重新获取");
                } else {
                    clearInterval(timer);
                    cur.removeAttr("disabled");
                    cur.text("获取验证码");
                }
            }, 1000);
        }

        //发送短信验证码
        var json = common.ajax(
            false,
            "GET",
            "/sms",
            {phone: $.trim($("#mobile").val())}
        );

        if(json.suc){
            alert("短信验证码已发送，请留意查收"+json.code);
        }
    });


    //手机号
    $(document).on("blur", "#mobile", function(){
        vlMobile();
    });

    //验证码
    $(document).on("blur", "#code", function(){
        vlCode();
    });
    /*====================================== step 1 E ================================*/


    /*====================================== step 2 S ================================*/
    //下一步
    $(document).on("click", ".fpStep2", function(){
        if(vlPwd() && vlSurePwd()){
            //重新设置密码
            var tip = $(".fg-step-1 .errorTips");
            var json = common.ajax(
                false,
                "GET",
                "/members/fogotAndResetPwd",
                {
                    code:$.trim($("#code").val()),
                    mobile: $.trim($("#mobile").val()),
                    newPwd: $("#pwd").val(),
                }
            );

            if(!json.suc){
                tip.text("设置新密码失败，请刷新重试");
                return false;
            }else{
                tip.text("");
            }


            $(".fg-step-2").addClass("hide");
            $(".fg-step-3").removeClass("hide");
            $("#onStep").removeClass().addClass("on on4");
        }
    });

    //密码
    $(document).on("blur", "#pwd", function(){
        vlPwd();
    });

    //确认密码
    $(document).on("blur", "#surePwd", function(){
        vlSurePwd();
    });
    /*====================================== step 2 E ================================*/

    //重新登录
    $(document).on("click", ".fpStep3", function(){
        window.location.href = "/members/login";
    });
});


//验证手机
function vlMobile(){
    var obj = $(".fg-step-1 #mobile");
    var tip = $(".fg-step-1 .errorTips");
    var rv = false;

    if(regValid.isMobile(obj.val())){
        var json = common.ajax(
            false,
            "GET",
            "/members/vlMobileRepeat",
            {
                mobile:$.trim(obj.val())
            }
        );

        console.log(json);
        if(json.suc==false){
            rv = true;
            tip.text("");
        }else{
            tip.text("账号不存在");
        }
    }else{
        tip.text("请输入正确手机号");
    }
    return rv;
}


//验证短信验证是否正确
function vlCode(){
    var obj = $(".fg-step-1 #code");
    var tip = $(".fg-step-1 .errorTips");
    var rv = false;

    if($.trim(obj.val())!="" && $.trim(obj.val()).length==6){
        //验证码验证码输入是否正确
        var json = common.ajax(
            false,
            "GET",
            "/members/vlCode",
            {
                mobile: $.trim($("#mobile").val()),
                code: $.trim($("#code").val()),
            }
        );

        if(json.suc){
            rv = true;
            tip.text("");
        }else{
            tip.text("验证码输入有误");
        }
    }else{
        tip.text("请输入手机短信验证码");
    }
    return rv;
}


//验证密码
function vlPwd(){
    var obj = $(".fg-step-2 #pwd").val();
    var tip = $(".fg-step-2 .errorTips");
    var rv = false;

    if(obj!="" && obj.length>=6 && obj.length<=20){
        rv = true;
        tip.text("");
    }else{
        tip.text("请输入6~20位密码");
    }
    return rv;
}


//验证确认密码
function vlSurePwd(){
    var obj = $(".fg-step-2 #pwd").val();
    var obj2 = $(".fg-step-2 #surePwd").val();
    var tip = $(".fg-step-2 .errorTips");
    var rv = false;


    if(obj2==""){
        tip.text("请输入确认密码");
    }else{
        if(obj==obj2){
            rv = true;
            tip.text("");
        }else{
            tip.text("两次输入密码不一致");
        }
    }
    return rv;
}


