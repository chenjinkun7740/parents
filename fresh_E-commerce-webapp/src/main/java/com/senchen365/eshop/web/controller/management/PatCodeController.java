package com.senchen365.eshop.web.controller.management;

import com.google.code.kaptcha.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

/**
 * 类名：PatCodeController <br>
 * 功能：验证码的验证<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/26 0026 下午 10:45 <br>
 * 版本：v1.0.0.0 <br>
 */
@Controller
public class PatCodeController {

    private static final Logger LOG= LoggerFactory.getLogger(SystemAccountController.class);






    @RequestMapping(method = RequestMethod.GET,value = "management/jcaptcha-validate")
    @ResponseBody
    public HashMap identifyingCode(HttpServletRequest request,@RequestParam String myCode){
        //得到谷歌验证码
        String code=(String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
        HashMap<String,Object> map=new HashMap<String,Object>();
        LOG.debug("................KaptchController....validate的验证码:.你的"+myCode+"\t别人的:"+code);
        if (code!=null && code.equalsIgnoreCase(myCode)){
            map.put("success",true);
            map.put("message","验证码正确");
        }else {
            map.put("success",false);
            map.put("message","验证码错误");
        }
        return map;
    }
}
