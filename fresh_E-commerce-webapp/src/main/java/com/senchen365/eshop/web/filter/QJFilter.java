package com.senchen365.eshop.web.filter;

import com.senchen365.eshop.po.SystemPermission;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 类名：QJFilter <br>
 * 功能：全局过滤器<br>
 * 作者：陈金坤 <br>
 * 时间：2019/4/1 0001 下午 4:40 <br>
 * 版本：v1.0.0.0 <br>
 */

@WebFilter("/management/admin/*")    //过滤用户在地址栏的非法输入
public class QJFilter implements Filter {

    private static final Logger LOG= LoggerFactory.getLogger(QJFilter.class);


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //用户输入的带有？,则把？去掉
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String path = request.getRequestURI();
        String method = request.getMethod();
        if (path != null && path.indexOf("?") != -1) {
            path = path.substring(0, path.indexOf("?"));
        }
        //用户在地址栏输入地址,是get方法
        List<SystemPermission> permissions = (List<SystemPermission>) request.getSession().getAttribute("ARRAYLIST");
        boolean flag=false;
        if (permissions != null && permissions.size() > 0) {
            for (SystemPermission p : permissions) {
                if (path.equalsIgnoreCase(p.getActionUrl()) && method.equalsIgnoreCase(p.getActionMethod())){
                    LOG.debug(path+"----------------"+p.getActionUrl());
                    LOG.debug(method+"----------------"+p.getActionMethod());
                    flag=true;
                    break;
                }
            }
        }
        if(!flag){
            //没有权限了,跳转到主页面
            request.getRequestDispatcher("/WEB-INF/views/management/login.jsp").forward(request,response);
            return;
        }
        //放行
        filterChain.doFilter(request,response);
    }

    @Override
    public void destroy() {
    }

}
