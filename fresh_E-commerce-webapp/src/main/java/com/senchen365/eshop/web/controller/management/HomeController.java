package com.senchen365.eshop.web.controller.management;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * 类名：HomeController <br>
 * 功能：TODO 一句话概括功能<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/26 0026 下午 9:44 <br>
 * 版本：v1.0.0.0 <br>
 */
@Controller
@Scope("request")
public class HomeController {
    //logback+slf4j日志

    private static final Logger LOG= LoggerFactory.getLogger(SystemAccountController.class);



    @RequestMapping(method = RequestMethod.GET, value = "/")
    public String goHome(HttpServletRequest request) {

        //设置base路径
        if (request.getServletContext().getAttribute("BASEPATH") == null) {
            String path = request.getScheme() + "://" + request.getServerName() +
                    ":" + request.getServerPort() + request.getContextPath()+"/";
            request.getServletContext().setAttribute("BASEPATH", path);
            LOG.debug("................HomeController中的goHome方法的日志，查看当前的base路径:"+path);
        }
        return "management/login";
    }
}
