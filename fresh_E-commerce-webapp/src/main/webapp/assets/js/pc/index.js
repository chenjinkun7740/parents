
$(function(){
    //flash N图自动切换展示
    /*$("#kinMaxShow").kinMaxShow({
        height:500,
        imageAlign:"center center",
        button:{
            switchEvent:'click',
            showIndex:false,
            normal:{
                width:'30px',height:'10px',lineHeight:'14px',right:'44%',bottom:'20px',fontSize:'10px',
                background:"#666666",border:"0px solid #dddddd",color:"#666",textAlign:'center',fontFamily:"Verdana"},
            focus:{background:"#CCCCCC",border:"0px solid #FF3300",color:"#000000"}
        }
    });*/
    /*$('.carousel').carousel();*/
    //图片轮播
   /* $(".carousel-indicators").append("<li data-target='#myCarousel' data-slide-to='" + index + "' class='active'></li>");
    $("#myCarouselDiv").append("<div class='item active' style='background:url(/assets/"+ve.phUrl+") center no-repeat; width:100%; height:520px; cursor: pointer'></div>");*/
    $("#myCarousel").carousel({interval: 3000});

    /*$.ajax({
        url:"/exhibition/mp",
        type:"get",
        success:function(data){
            $.each(data,function (index,ve){
                if(index==0) {
                    $(".carousel-indicators").append("<li data-target='#myCarousel' data-slide-to='" + index + "' class='active'></li>");
                    $("#myCarouselDiv").append("<div class='item active' style='background:url(/static"+ve.phUrl+") center no-repeat; width:100%; height:520px; cursor: pointer'></div>");
                }else{
                    $(".carousel-indicators").append("<li data-target='#myCarousel' data-slide-to='"+index+"'></li>");
                    $("#myCarouselDiv").append("<div class='item' style='background:url(/static"+ve.phUrl+") center no-repeat; width:100%; height:520px; cursor: pointer'></div>");
                }
            });
            $("#myCarousel").carousel({interval: 5000});
        }
    });*/




    //加载商品分类菜单
    /*$.ajax({
        type:"POST",
        url:"/pc/categorys/all",
        cache : false,
        async : false,
        success:function(html){
            //console.log(html);
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