
$(function(){

    //修改密码
    $(document).on("click", ".btnChangePwd", function(){
        var oldPwd = $("#oldPwd").val();
        var newPwd = $("#newPwd").val();
        var sureNewPwd = $("#sureNewPwd").val();

        if(oldPwd==""){
            alert("请输入原始密码");
            return false;
        }
        if(newPwd==""){
            alert("请输入新密码");
            return false;
        }
        if(sureNewPwd!=newPwd){
            alert("两次输入新密码不一致");
            return false;
        }


        $.ajax({
            type:"POST",
            url:"members/changePwd",
            cache : false,
            async : false,
            data:{
                oldPwd:oldPwd,
                newPwd:newPwd
            },
            success:function(data){
                if(data.suc==true){
                    $("#oldPwd").val("");
                    $("#newPwd").val("");
                    $("#sureNewPwd").val("");
                    alert("密码修改成功");
                }else{
                    alert("原始密码错误，请重试");
                }
            }
        });

    });

});