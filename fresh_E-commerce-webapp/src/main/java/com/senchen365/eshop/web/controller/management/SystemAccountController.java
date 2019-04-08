package com.senchen365.eshop.web.controller.management;

import com.senchen365.eshop.po.OneAndTwoByRoot;
import com.senchen365.eshop.po.SystemAccounts;
import com.senchen365.eshop.po.SystemPermission;
import com.senchen365.eshop.po.SystemRole;
import com.senchen365.eshop.service.SystemAccountService;
import com.senchen365.eshop.util.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 类名：SystemAccountController <br>
 * 功能：TODO 一句话概括功能<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/27 0027 下午 7:56 <br>
 * 版本：v1.0.0.0 <br>
 */
@Controller
@RequestMapping("/management/user")
public class SystemAccountController {

    private static final Logger LOG= LoggerFactory.getLogger(SystemAccountController.class);



    @Autowired
    private SystemAccountService accountService;


    @RequestMapping(method = RequestMethod.POST, value = "/login.action")
    public String doLogin(HttpServletRequest request, String account, String password) {

        //插一步:判断用户是否被锁定
        boolean falg = accountService.checkLocked(account);
        if (falg) {
            request.setAttribute("MESSAGE", "您的账户已经被锁定了!");
            return "management/login";
        }
        //1.根据名字得到盐值,若果为null表示无此用户
        String salt = accountService.querySaltByAccount(account);
        if (salt == null) {
            //查不到颜值，表示用户的名字输入错误了，随便继续登录，提示信息
            request.setAttribute("MESSAGE", "用户名或者密码输入错误!");
            return "management/login";
        }
        //2.账号正确，得到用户的密码+盐值进行加密，进行搜索
        String pwd = MD5Util.meMd5(password + salt);
        SystemAccounts systemAccounts = accountService.queryMsgByPwdAndAccount(account, pwd);
        //3.根据账户和已经加密过的密码进行比对
        if (systemAccounts == null) {
            //登录失败,得到用户的登录次数
            request.setAttribute("MESSAGE", "登录失败!");
            Integer count = (Integer) request.getSession().getAttribute("COUNTS");

            //记录次数
            if (count != null) {
                count++;
                LOG.debug("-------用户第" + count + "次输入错误--------");
                if (count == 3) {
                    int r = accountService.setLocked(account);
                }
                if (count > 3) {
                    //超过三次，进行锁定

                    request.setAttribute("MESSAGE", "账户被锁定!");
                }
                request.getSession().setAttribute("COUNTS", count);
            } else {
                request.getSession().setAttribute("COUNTS", 1);
                LOG.debug("-------用户第1次输入错误--------");
            }
            return "management/login";
        } else {
            //登录成功
            //定义个hashSet集合筛选重复的数据
            HashSet<SystemPermission> permissions = new HashSet<SystemPermission>();
            /*------------------角色*/
            for (SystemRole s : systemAccounts.getSystemRole()) {
                   /*------------------权限*/
                for (SystemPermission a : s.getPermissionList()) {
                    permissions.add(a);
                }
            }

            //重复的数据已经过滤掉了，把set集合里面的东西复制到list数组进行排序
            ArrayList<SystemPermission> arrayList = new ArrayList<SystemPermission>();
            for (SystemPermission s : permissions) {
                arrayList.add(s);
            }
            //把复制后的数组根据id排序，一二级菜单混合着呢
            Collections.sort(arrayList, new Comparator<SystemPermission>() {
                @Override
                public int compare(SystemPermission o1, SystemPermission o2) {
                    return o1.getId().compareTo(o2.getId());
                }
            });

            // 分一级权限与二级权限
            List<OneAndTwoByRoot> oneAndTwoByRoots = new ArrayList<OneAndTwoByRoot>();


            //先生成二级菜单，在考虑二级菜单
            for (SystemPermission permission : arrayList) {
                //存储二级权限的集合
                List<SystemPermission> list = new ArrayList<SystemPermission>();
                for (SystemPermission permission2 : arrayList) {
                    if (permission2.getParentId() == permission.getId()) {
                        list.add(permission2);
                    }
                }
                //一级权限链接二级权限
                if (list != null && list.size() > 0) {
                    //对二级菜单的内容进行排序
                    Collections.sort(list, new Comparator<SystemPermission>() {
                        @Override
                        public int compare(SystemPermission o1, SystemPermission o2) {
                            return o1.getCode().compareTo(o2.getCode());
                        }
                    });
                    //权限的实体
                    OneAndTwoByRoot root = new OneAndTwoByRoot();
                    root.setOneName(permission.getName());
                    root.setDigist(permission.getDigist());
                    root.setTwoList(list);
                    //将实体塞进集合
                    oneAndTwoByRoots.add(root);
                }
            }
            LOG.error("权限展示：");
            for (OneAndTwoByRoot oneAndTwoByRoot : oneAndTwoByRoots) {
                LOG.error(oneAndTwoByRoot.getOneName());
                for (SystemPermission permission : oneAndTwoByRoot.getTwoList()) {
                    LOG.error("--------" + permission.getName());
                }
            }
            request.getSession().setAttribute("ROOT", oneAndTwoByRoots);
            request.getSession().setAttribute("SYSTEMACCOUNT", systemAccounts);
            request.getSession().setAttribute("ARRAYLIST", arrayList);
            return "management/admin/home";

        }
    }
    @RequestMapping(method = RequestMethod.GET, value = "/goHome")
    public String goHome() {
        return "management/admin/home";
    }
}
