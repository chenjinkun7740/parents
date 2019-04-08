package com.senchen365.eshop.service;

import com.senchen365.eshop.dao.SystemAccountDao;
import com.senchen365.eshop.po.SystemAccounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * 类名：SystemAccountService <br>
 * 功能：系统账户对应的服务类<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/27 0027 下午 7:50 <br>
 * 版本：v1.0.0.0 <br>
 */
@Service
@Scope("prototype")
public class SystemAccountService {
    @Autowired
    private SystemAccountDao systemAccountDao;

    /**
     * 判断用户是否锁定
     *
     * @param account
     * @return
     */
    public boolean checkLocked(String account) {
        Boolean flag = systemAccountDao.checkLocked(account);
        if (flag == null) {
            return false;
        }
        return flag;
    }

    /**
     * 根据账户查询盐值
     *
     * @param account
     * @return
     */
    public String querySaltByAccount(String account) {
        return systemAccountDao.querySaltByAccount(account);
    }

    /**
     * 根据账号和密码查询账户信息
     *
     * @param a,b
     * @return
     */
    public SystemAccounts queryMsgByPwdAndAccount(String a, String b) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("user", a);
        map.put("mypwd", b);
        return systemAccountDao.queryMsgByPwdAndAccount(map);
    }

    /**
     * 设置锁定账户
     *
     * @param account
     * @return
     */
    public int setLocked(String account) {
        return systemAccountDao.setLocked(account);
    }
}
