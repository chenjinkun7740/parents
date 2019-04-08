
$(function(){

    /*鼠标悬停显示二级菜单*/
    var childCon = $(".childCon");
    var preInd = 0;
    $("ul.parentUl li[data-ind]").mouseover(function(){
        var cur = $(this);
        var ind = cur.data("ind");
        if(ind==0){
            childCon.addClass("hide");
            return false;
        }
        if(ind!=preInd){
            childCon.addClass("hide");
        }
        if(childCon.eq(ind)){
            var chi = childCon.eq(ind);
            var left = cur.offset().left-15;
            var top = cur.offset().top+50;
            chi.removeClass("hide").css({"left":left,"top":top});
        }
        preInd = ind;

    }).mouseout(function(){
        //childCon.hide();
    });

    childCon.mouseover(function(){
        var chi = childCon.eq(preInd);
        chi.removeClass("hide");
    }).mouseout(function(){
        childCon.addClass("hide");
    });

});