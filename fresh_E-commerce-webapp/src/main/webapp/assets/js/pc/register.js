
$(function() {
    $(document).on("blur", "#username", function(){
        vlAccount();
    });

    $(document).on("blur", "#password", function(){
        vlPwd();
    });

    $(document).on("blur", "#rqpwd", function(){
        vlSurePwd();
    });

    $(document).on("blur", "#dxyzm", function(){
        vlCode();
    });


    //获取短信验证码==================================================================
    var local_code = getCookieValue("ck_code");
    if(local_code>0){
        var expire = local_code;
        //倒计时读秒
        var cur = $(".btnSendMessage");
        var timer = setInterval(function () {
            expire = expire - 1;
            if (expire == 0) {
                cur.text("获取验证码");
                cur.data("disabled", "0");
                clearInterval(timer);
                return false;
            }else{
                cur.text("(" + expire + "s)后重新获取");
                cur.data("disabled", "1");
            }
            cur.text("(" + expire + "s)后重新获取");
            editCookie("ck_code",expire,expire);
            console.log(expire + "->" + getCookieValue("ck_code"));
        }, 1000);
    }else{

        $(document).on("click", ".btnSendMessage", function () {
            var cur = $(this);
            var tip = $(".errorTip");

            if(!vlAccount()){
                return false;
            }

            var disabled = cur.data("disabled");
            if (disabled != "0") {
                return false;
            }
            cur.data("disabled", "1");

            $.ajax({
                url: "/members/sendCode",
                type: "GET",
                data: {phone: $.trim($("#username").val())},
                success: function (data) {
                    if (!data.suc) {
                        tip.text(data.msg);
                        return false;
                    }else{
                        tip.text("");
                        alert("短信验证码发送成功");
                    }
                    var expire = 20;
                    //倒计时读秒
                    addCookie("ck_code",120,expire);
                    var timer = setInterval(function () {
                        expire = expire - 1;
                        if (expire == 0) {
                            cur.text("获取验证码");
                            cur.data("disabled", "0");
                            clearInterval(timer);
                            return false;
                        }
                        cur.text("(" + expire + "s)后重新获取");
                        editCookie("ck_code",expire,expire);
                        console.log(expire + "->" + getCookieValue("ck_code"));
                    }, 1000);
                },
                error: function (err) {
                }
            });
        });
    }


    //提交注册信息====================================================================
    $(document).on("click", ".registerBtn", function(){
        var cur = $(this);
        var tip = $(".errorTip");

        if(vlAccount() && vlPwd() && vlSurePwd() && vlCode() && vlAgree()){
            if(cur.attr("disabled")==true){
                alert("数据提交中请稍后...");
                return false;
            }else{
                cur.attr("disabled", true);
            }


            $.ajax({
                url:"/members/register",
                type:"POST",
                sync:false,
                data:{
                    username:$.trim($("#username").val()),
                    password:$.trim($("#password").val()),
                    rqpwd:$.trim($("#rqpwd").val()),
                    dxyzm:$.trim($("#dxyzm").val())
                }
            }).done(function(data){
                if(data.code==0){
                    tip.text("");
                    window.location.href="/";
                }else{
                    tip.text("注册失败，请重试");
                }
            });
        }

        return false;
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
            rv = true;
            tip.text("");
        }else{
            tip.text("手机号已被注册，请更换");
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


//确认密码===================================================================
function vlSurePwd(){
    var rv = false;
    var obj = $("#password");
    var obj2 = $("#rqpwd");
    var tip = $(".errorTip");

    if(obj2.val()==""){
        tip.text("请输入6~20位确认密码");
    }else{
        if(obj.val()==obj2.val()){
            rv = true;
            tip.text("");
        }else{
            tip.text("两次输入密码不一致");
        }
    }
    return rv;
}


//验证手机短信验证码===========================================================
function vlCode(){
    var rv = false;
    var obj = $("#dxyzm");
    var tip = $(".errorTip");

    if($.trim(obj.val())!="" && $.trim(obj.val()).length==6){
        var username = $("#username");
        var json = common.ajax(
            false,
            "GET",
            "/members/vlCode",
            {
                mobile:$.trim(username.val()),
                code:$.trim(obj.val())
            }
        );

        if(json.suc){
            rv = true;
            tip.text("");
        }else{
            tip.text("验证码填写错误");
        }
    }else{
        tip.text("请输入收到的短信验证码");
    }
    return rv;
}


//注册协议===================================================================
function vlAgree(){
    var rv = false;
    var tip = $(".errorTip");

    if($("#ctchk").is(":checked")){
        rv = true;
        tip.text("");
    }else{
        tip.text("请您认真阅读并同意会员协议条款");
    }
    return rv;
}


//发送验证码时添加cookie
function addCookie(name,value,expiresSeconds){
    var cookieString=name+"="+escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresSeconds>0){
        var date=new Date();
        //date.setTime(date.getTime()+expiresHours*1000);
        date.setSeconds(date.getSeconds() + expiresSeconds);
        cookieString=cookieString+";expires=" + date.toUTCString();
    }
    document.cookie=cookieString;
}

//修改cookie的值
function editCookie(name,value,expiresSeconds){
    var cookieString=name+"="+escape(value);
    if(expiresSeconds>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresSeconds*1000); //单位是毫秒
        cookieString=cookieString+";expires=" + date.toGMTString();
    }
    document.cookie=cookieString;
}

//根据名字获取cookie的值
function getCookieValue(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name){
            return unescape(arr[1]);
            break;
        }else{
            return "";
            break;
        }
    }

}





