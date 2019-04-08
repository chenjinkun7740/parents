

window.springstage=null; //插件命名空间所有应用的插件都归属到这个命名空间下

/********************************时间组件 S***************************/

/**
 * 设置moment插件的语言环境
 */
/*if(moment && moment.length>0){
    moment.locale("zh-cn");
}*/

/**
 * 设置全局日历选择控件
 */
/*jQuery.extend(jQuery.fn.datetimepicker.defaults,{
    showTodayButton: true,
    showClear:true,
    showClose:true,
    tooltips: {
        today: '今天',
        clear: '清除所选',
        close: '关闭',
        selectMonth: '选择月份',
        prevMonth: '上月',
        nextMonth: '下月',
        selectYear: '选择年',
        prevYear: '去年',
        nextYear: '明年',
        selectDecade: '选择10年',
        prevDecade: '前10年',
        nextDecade: '后10年',
        prevCentury: '上世纪',
        nextCentury: '下世纪'
    }
});*/

// 日期选择控件 http://eonasdan.github.io/bootstrap-datetimepicker/
jQuery(document).on('focus', '.input-date',function(e){
    jQuery(this).datetimepicker({
        viewMode:'days',
        format:'L'
    });
});

// 时间选择控件
jQuery(document).on('focus', '.input-datetime', function(e){
    jQuery(this).datetimepicker({
        sideBySide:true,
        format: 'YYYY-MM-DD HH:mm',
        showClose:true
    });
});

/********************************时间组件 E***************************/


/******************************** 自定义组件 S ***************************/
/**
 * 通用数据验证
 */

//正则表达式全集
var regStr = {
    //合法标识符, 只能"字母 数字 下划线"组合, 而首字符不能是数字
    biaoShiFu : /^[A-Za-z_]+[A-Za-z0-9_]*$/,

    //验证电话号码, 010-1234567或0372-12345678, 注意使用英文中划线
    phone : /^(\d{3,4}-)\d{7,8}$/,

    //验证手机号码
    mobile : /^((13\d)|(15[0-3,5-9])|(17[0-9])|(18[0,1,2,3,5-9]))[0-9]{8}$/,

    //验证是否是邮箱
    email : /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,

    //验证是否为合法的邮政编码, 目前只能验证中国范围内
    postCode : /^[1-9]\d{5}(?!\d)$/,

    //验证是否是QQ号
    qq : /^[1-9](\d){4,9}$/,

    //验证飞信号
    fetion : /^[1-9]{1}\d{3,10}$/,

    //验证码
    valiCode : /^[A-Za-z0-9]*$/,

    //验证是否为汉字
    chineseChar : /^[\u4e00-\u9fa5]+$/,

    //验证图片后缀是否合法, 只限jpg bmp gif png, 不区别大小写
    imgPostfix : /^.*?\.([j,J][p,P][g,G]|[j,J][p,P][e,E][g,G]|[b,B][m,M][p,P]|[g,G][i,I][f,F]|[p,P][n,N][g,G])$/,

    //验证日期格式是否合法, 数据格式为yyyy-MM-dd
    dateFormat : /^((((19|20)(([02468][048])|([13579][26]))-02-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))$/,

    //验证日期格式是否合法, 数据格式为yyyy-MM-dd hh:mm:ss
    datetimeFormat : /^(((((19|20)(([02468][048])|([13579][26]))-02-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30))))) [0-9]{2}:[0-9]{2}:[0-9]{2})$/,

    //验证只能实数, 负数 0 正数
    shiShu : /^[+-]?\d+(.\d+)?$/,

    //验证0和正整数
    feiFuInt : /^\d{1,}$/,

    //验证正整数
    zhengZhengInt : /^[+]?(([1-9]+\d*)|([0]+[1-9]+\d*))$/,

    //验证整数, 负整数 0 正整数
    zhengInt : /^[+-]?\d*$/,

    //验证小数, 负小数 正小数
    xiaoShu : /^[+-]?\d+[.]{1}\d+$/,

    //验证正实数
    daYu0Number : /^(0|[1-9]\d*)(\.\d*)?$/,

    //验证非负数
    feiFuNumber : /^[+]?((\d*)|(\d*[.]{1}\d+))$/,

    //只能含有数字 中英文逗号 空格
    regx1 : /^[0-9，, ]*$/

};


var regValid = {
    //判断某个对象是否是数组
    isArray : function(va) {
        return (va instanceof Array) ? true : false;
    },

    //判断某个对象是否是null
    isNull : function(va) {
        return (va==null) ? true : false;
    },

    //判断某个对象是否是undefined, 定义变量却没有初始化就会默认为undefined
    isUndefined : function(va) {
        return (va==undefined) ? true : false;
    },

    //判断某个值是不是空字符串
    isEmptyString : function(va){
        return (va=="") ? true : false;
    },

    //合法标识符, 只能是字母 数字 下划线组合, 而首字符不能是数字
    isBiaoShiFu  : function(va){
        return (regStr.biaoShiFu.test(va)) ? true : false;
    },

    //验证电话号码
    isPhone : function(va){
        return (regStr.phone.test(va)) ? true : false;
    },

    //验证手机号码
    isMobile : function(va){
        return (regStr.mobile.test(va)) ? true : false;
    },

    //验证是否是邮箱
    isEmail : function(va){
        return (regStr.email.test(va)) ? true : false;
    },

    //验证是否为合法的邮政编码, 目前只能验证中国范围内
    isPostCode : function(va){
        return (regStr.postCode.test(va)) ? true : false;
    },

    //验证是否是QQ号
    isQq : function(va){
        return (regStr.qq.test(va)) ? true : false;
    },

    //验证飞信号
    isFetion : function (va){
        return (regStr.fetion.test(va)) ? true : false;
    },

    //验证码, 需要传递被验证的数据固定长度多少
    isValiCode : function(va, fixLength){
        return ((regStr.valiCode.test(va)) && (va.length==fixLength)) ? true : false;
    },

    //验证是否为汉字, 包括简体中文和繁体中文
    isChineseChar : function(va){
        return (regStr.chineseChar.test(va)) ? true : false;
    },

    //验证图片后缀是否合法, 只限jpg bmp gif png, 不区别大小写
    isImgPostfix : function(va){
        return (regStr.imgPostfix.test(va)) ? true : false;
    },

    //验证字符串长度是否合法, 需要提供最小长度和最大长度限制
    isRightLength : function(va, minLength, maxLength){
        return ((va.length>=minLength) && (va.length<=maxLength)) ? true : false;
    },

    //验证日期格式是否合法, 数据格式为yyyy-MM-dd
    isDateFormat : function(va){
        return regStr.dateFormat.test(va)? true : false;
    },

    //验证日期格式是否合法, 数据格式为yyyy-MM-dd hh:mm:ss
    isDatetimeFormat : function(va){
        return regStr.datetimeFormat.test(va)? true : false;
    },

    //验证实数, 负数 0 正数
    isShiShu : function(va){
        return regStr.shiShu.test(va)? true : false;
    },

    //验证0和正整数
    isFeiFuInt : function(va){
        return regStr.feiFuInt.test(va)? true : false;
    },

    //验证正整数
    isZhengZhengInt : function(va){
        return regStr.zhengZhengInt.test(va)? true : false;
    },

    //验证整数, 负整数 0 正整数
    isZhengInt : function(va){
        return regStr.zhengInt.test(va)? true : false;
    },

    //验证小数, 负小数 正小数
    isXiaoShu : function(va){
        return regStr.xiaoShu.test(va)? true : false;
    },

    //验证正数, 正整数 正小数
    isDaYu0Number : function(va){
        return regStr.daYu0Number.test(va)? true : false;
    },

    //验证非负数
    isFeiFuNumber : function(va){
        return regStr.feiFuNumber.test(va)? true : false;
    },

    //只能含有数字 中英文逗号 空格
    isRegx1 : function(va){
        return regStr.regx1.test(va)? true : false;
    }
};

/******************************** 自定义组件 E ***************************/


/*====================== AJAX组件封装 S =====================================*/
var common = {
    //JQuery Ajax数据访问
    //1. 不用担心自己的URL中的指定的目标是否需要"?"还是"&"
    //2. 如遇到需要传递参数时(不用担心中英文传参转码问题), 例如: var jsonParam = {account:"mfy张三", pwd:"123456"};
    //3. async表示是否异步, false同步加载, true异步加载
    ajax : function(async, method, url, param){
        $.ajaxSetup({async:false});
        var rv = null;
        if(url!=null && url!="" && param!=null && param!=""){
            if(url.indexOf("?")!=-1){
                url += "&";
            }else{
                url += "?";
            }
            url += "randomNoUse=" + Math.random();

            $.ajax({
                async:async,
                type: method,
                url: url,
                data: param,
                complete:function(data, textStatus){
                    if(data.responseText){
                        rv = eval("(" + data.responseText + ")");
                    }
                }
            });
        }
        return rv;
    },


    /**
     * AJAX 2.0
     * @param async
     * @param method
     * @param url
     * @param param
     * @returns {*}
     */
    ajax2 : function(async, method, url, param){
        $.ajaxSetup({async:false});
        var rv = null;
        if(url!=null && url!="" && param!=null && param!=""){
            if(url.indexOf("?")!=-1){
                url += "&";
            }else{
                url += "?";
            }
            url += "randomNoUse=" + Math.random();

            $.ajax({
                async:async,
                type: method,
                url: url,
                data: param,
                complete:function(data, textStatus){
                    if(data.responseText){
                        rv = eval("(" + data.responseText + ")");
                    }
                }
            });
        }
        return rv;
    }
};




/*====================== AJAX组件封装 E =====================================*/

