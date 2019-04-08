
$(function(){
    //flash N图自动切换展示
    $("#kinMaxShow").kinMaxShow({
        height:500,
        imageAlign:"center center",
        button:{
            switchEvent:'click',
            showIndex:false,
            normal:{width:'30px',height:'10px',lineHeight:'14px',right:'10px',bottom:'10px',fontSize:'10px',background:"#666",border:"0px solid #dddddd",color:"#666",textAlign:'center',fontFamily:"Verdana"},
            focus:{background:"#eee",border:"0px solid #FF3300",color:"#000000"}
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
        childCon.hide();
    });

    childCon.mouseover(function(){
        var chi = childCon.eq(preInd);
        chi.show();
    }).mouseout(function(){
        childCon.hide();
    });

});