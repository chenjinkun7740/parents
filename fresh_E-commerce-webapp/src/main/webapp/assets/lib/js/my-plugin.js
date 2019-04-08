/**
 * 自定义插件JS
 */
/**
 * 数字输入插件
 * 使用方法:
 * 1. 如果只允许输入整数，对应的HTML代码为：
 *    <input type="text" class="input-integer" />
 * 2. 如果允许输入小数,对应的HTML代码为,默认2位小数
 *    <input type="text" class="input-numberic" />
 * 如果需要指定小数位,对应的HTML代码为：
 *    <input type="text" class="input-numberic" data-decimals="4" />
 */
jQuery.fn.numberic=function(defaults){
    defaults=jQuery.extend({numberic:false,decimals:2},defaults); //默认只能输入整数，如果是小数，默认为2位小数
    jQuery(this).css({"ime-mode": "disabled",
    "-webkit-ime-mode":"disabled",
        "-moz-ime-mode":"disabled",
        "-o-ime-mode":"disabled",
        "-ms-ime-mode":"disabled"});
    jQuery(this).on("keydown",function(e){

        //判断是否被鼠标选中
        if(this.selectionStart==0 && this.selectionEnd==this.value.length){
            this.value="";
        }

        var validateNumberic=function(value){ //验证小数点,当输入的是 . 字符的时候进行验证
            if(value=="" || value.indexOf(".")!=-1){//小数点不能开头,小数点已经存在不能通过
                return false;
            }
            return true
        };

        var value=jQuery(this).val();

        var keycode = e.keyCode;// 48-57 96-105  8，46 删除         9 tab   37 39   . 190 110
        if(e.ctrlKey || e.shiftKey){
            return false;
        }
        if(keycode==8 || keycode==46){ //如果是删除键，直接返回 [backspace-8, delete-46]
            return true;
        }
        if(keycode==189 || keycode==109){ //负号必须是第一个字符
            if(value=="" || value.charAt(0)!="-"){
                return true;
            }
        }
        var otherCharacter=[8,9,46,37,39];

        if(defaults.numberic){
            otherCharacter.push(190); //小数点
            otherCharacter.push(110);
        }
        if(jQuery.inArray(keycode,[8,9,46,37,39])!=-1){
            return true;
        }
        if((keycode>=48 && keycode<=57) || (keycode>=96 && keycode<=105) || jQuery.inArray(keycode,otherCharacter)!=-1){
            if((keycode==190 || keycode==110) && !validateNumberic(value)){//如果输入的是小数点
                return false;
            }
            if(value.indexOf(".")!=-1 && value.substr(value.indexOf(".")).length>=(defaults.decimals+1)){ //小数不能超过2位
                if(this.selectionStart>=value.indexOf(".")+1){
                    return false;
                }
            }
            if(value=='0' && jQuery.inArray(keycode,otherCharacter)==-1){ //如果是0开头
                return false;
            }

            return true;
        }
        if(!/^\d*$/.test(value)){
            return true;
        }

        return false;
    });
    jQuery(this).on("focus",function(){
        //$(this).select();
    });
}
jQuery(document).on("focus",".input-integer",function(e){
    jQuery(this).numberic();
}).on("keydown", ".input-integer", function(e){
    var keycode = e.keyCode;// 48-57 96-105  8，46 删除         9 tab   37 39   . 190 110
    if(keycode==190 || keycode==110){
        console.log("########");
        return false;
    }
    console.log(">>>>>>>>>>>>");
});
jQuery(document).on("focus",'.input-numberic',function(e){

    if(jQuery(this).data("decimals")){
        try{
            jQuery(this).numberic({numberic:true,decimals:parseInt(jQuery(this).data("decimals"))});
            return;
        }catch(e){

        }
    }
    jQuery(this).numberic({numberic:true});
});





