
$(function(){
    //加载商品分类菜单
    $.ajax({
        type:"POST",
        url:"/pc/categorys/all",
        cache : false,
        async : false,
        success:function(html){
            //console.log(html);
            $(".header .cate-data").html(html);
        }
    });


    /*鼠标悬停显示二级菜单*/
    var childCon = $(".childCon");
    var preInd = 0;
    $("ul.parentUl li[data-ind]").mouseover(function(){
        var cur = $(this);
        var ind = cur.data("ind");
        if(ind==0){
            childCon.hide();
            return false;
        }
        if(ind!=preInd){
            childCon.hide();
        }
        if(childCon.eq(ind)){
            var chi = childCon.eq(ind);
            var left = cur.offset().left-15;
            var top = cur.offset().top+50;
            chi.show().css({"left":left,"top":top});
        }
        preInd = ind;

    }).mouseout(function(){
        //childCon.hide();
    });

    childCon.mouseover(function(){
        var chi = childCon.eq(preInd);
        chi.show();
    }).mouseout(function(){
        childCon.hide();
    });


    //点击网页隐藏弹出菜单
    $(document).on("click", "body", function(e){
        //console.log(e);
        //console.log(e.toElement.nodeName);
        /*var tag_str = e.toElement.nodeName;
        //console.log("tag_str = " + tag_str);
        if(tag_str=="DIV" || tag_str=="div"){
            $("#menuCategory").hide();
        }else{
            $("#menuCategory").show();
        }*/

        var obj = $(".cate-data");
        console.log(obj.is("hide"));

    });

});