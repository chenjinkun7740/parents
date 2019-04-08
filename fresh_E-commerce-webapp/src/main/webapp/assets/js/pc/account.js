
$(function(){

    //修改密码
    $(document).on("click", ".btnSaveChange", function(){
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var phone = $("#phone").val();
        var birthday = $("#birthday").val();
        var cardId = $("#cardId").val();
        var zipCode = $("#zipCode").val();
        var email = $("#email").val();
        var sex = $("input[name='sex']:checked").val();

        $.ajax({
            type:"POST",
            url:"members/saveInfo",
            cache : false,
            async : false,
            data:{
                name:name,
                email:email,
                cardId:cardId,
                phone:phone,
                sex:sex,
                zipCode:zipCode
            },
            success:function(data){
                if(data.suc==true){
                    alert("个人资料修改改成功");
                }else{
                    alert("个人资料修改失败，请重试");
                }
            }
        });

    });

});