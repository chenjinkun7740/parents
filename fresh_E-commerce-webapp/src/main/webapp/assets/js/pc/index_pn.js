
$(function(){
    //flash N图自动切换展示
    $("#myCarousel").carousel({interval: 3000});

    //加载商品分类菜单
    /*$.ajax({
        type:"POST",
        url:"/pc/categorys/all",
        cache : false,
        async : false,
        success:function(html){
            $(".header .cate-data").html(html);
        }
    });*/

    //点击窗口, 关闭菜单
	/*
    $(document).click(function(e){
        console.log($(e.target));
        var obj = $(e.target);
        if(obj.parents("a.menu").length>0){
        }else{
            $("#mc_content").hide();
        }

        /*if($(e.target).parents(".cate-btn")){
        }else{
            $("#mc_content").hide();
        }* /
    });
	*/

});