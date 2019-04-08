
$(function(){

    //获取省份
    getProvinces();

    //获取当前省份下属所有市
    $(document).on("change", "#province", function(){
        var cur = $(this);
        if(cur.val()!=null){
            $.ajax({
                type:"GET",
                url:"districts/citys",
                cache : false,
                async : false,
                data:{
                    pid:cur.find("option:selected").data("id")
                },
                success:function(data){
                    if(data){
                        var city = $("#city");
                        var str = "";
                        for(var i=0;i<data.length;i++){
                            str += "<option data-id='"+data[i].id+"' value='"+data[i].name+"'>"+data[i].name+"</option>";
                        }
                        city.append(str)
                    }
                }
            });
        }
    });

    //获取市下所有区县/乡镇
    /*$(document).on("change","#city",function(){
        var cur = $(this);
        if(cur.val()!=null){
            $.ajax({
                type:"GET",
                url:"districts/areas",
                cache : false,
                async : false,
                data:{
                    cid:cur.find("option:selected").data("id")
                },
                success:function(data){
                    if(data){
                        var area = $("#area");
                        var str = "";
                        for(var i=0;i<data.length;i++){
                            str += "<option data-id='"+data[i].id+"' value='"+data[i].name+"'>"+data[i].name+"</option>";
                        }
                        area.append(str)
                    }
                }
            })
        }
    })

*/
    //保存地址
    $(document).on("click", ".btnSaveChange", function(){
        var pkId = $("#pkId").val();

        if(!pkId || pkId==0){
            pkId = null;
        }

        var name = $("#name");
        var phone = $("#phone");
        var province = $("#province");
        var city = $("#city");
        var area = $("#area");
        var address = $("#address");
        var postCode = $("#postCode");

        if($.trim(name.val())==""){
            alert("请填写姓名");
            return false;
        }
        if($.trim(phone.val())==""){
            alert("请填写联系电话");
            return false;
        }
        if($.trim(province.val())=="0"){
            alert("请选择省或直辖市");
            return false;
        }
        if($.trim(city.val())=="0"){
            alert("请选择市");
            return false;
        }
        if($.trim(area.val())=="0"){
            alert("请选择区或乡镇");
            return false;
        }
        if($.trim(address.val())==""){
            alert("请填写详情地址(不用重复填写省市区)");
            return false;
        }
        /*if($.trim(postCode.val())==""){
            alert("请填写邮编");
            return false;
        }*/

       /* $.ajax({
            type: "POST",
            url: "acceptAddresses/save",
            cache: false,
            async: false,
            data: {
                id: pkId,
                name: name.val(),
                phone: phone.val(),
                address:address.val(),
                postCode: postCode.val(),
                province: province.val(),
                city: city.val(),
                area: area.val()
            },
            success:function(data){
                if(data.suc==true){
                    alert("保存成功");
                }else{
                    alert("保存失败，请重试");
                }
                window.location.reload();
            }
        })*/
    });

});
/*function getData(id){
    $.ajax({
        type:"GET",
        url:"acceptAddresses/detail",
        cache : false,
        async : false,
        data:{
            addressId:id
        },
            success:function(content){
            if(content.suc==true){
                var data = content.data;
                var en = data.address;
                var provinces = data.provinces;
                var citys = data.citys;
                var areas = data.areas;

                $("#pkId").val(en.id);
                $("#name").val(en.name);
                $("#phone").val(en.phone);
                $("#address").val(en.address);
                $("#postCode").val(en.postCode);

                var str = "";

                //省
                if(provinces && provinces.length>0){
                    str = "<option data-id='0' value='0'>=请选择省/直辖市=</option>";
                    for(var i=0;i<provinces.length;i++){
                        str += "<option data-id='"+provinces[i].id+"' value='"+provinces[i].name+"' ";
                        if(provinces[i].name==en.province){
                            str += "selected='selected' ";
                        }
                        str += ">"+provinces[i].name+"</option>";
                    }
                    $("#province").html($(str));
                }

                //市
                if(citys && citys.length>0){
                    str = "<option data-id='0' value='0'>=请选择市=</option>";
                    for(var i=0;i<citys.length;i++){
                        str += "<option data-id='"+citys[i].id+"' value='"+citys[i].name+"' ";
                        if(citys[i].name==en.city){
                            str += "selected='selected' ";
                        }
                        str += ">"+provinces[i].name+"</option>";
                    }
                    $("#city").html($(str));
                }

                //区
                if(areas && areas.length>0){
                    str = "<option data-id='0' value='0'>=请选择区/乡镇=</option>";
                    for(var i=0;i<areas.length;i++){
                        str += "<option data-id='"+areas[i].id+"' value='"+areas[i].name+"' ";
                        if(areas[i].name==en.area){
                            str += "selected='selected' ";
                        }
                        str += ">"+areas[i].name+"</option>";
                    }
                    $("#area").html($(str));
                }

            }
            var data = content.data;
        }
    });

}

//获取省份
function getProvinces(){
    $.ajax({
        type:"GET",
        url:"districts/provinces",
        cache : false,
        async : false,
        data:{
        },
        success:function(data){
            if(data){
                var province = $("#province");
                var str = "";
                for(var i=0;i<data.length;i++){
                    str += "<option data-id='"+data[i].id+"' value='"+data[i].name+"'>"+data[i].name+"</option>";
                }
                province.append(str)
            }
        }
    });

}
*/