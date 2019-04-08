package com.senchen365.eshop.dao;

import com.senchen365.eshop.po.SystemAccounts;

import java.util.HashMap;

/**
 * 类名:SystemAccountDao<br>
 * 功能:对于后台系统用户的操作<br>
 * 作者:java战士<br>
 * 日期:2019/3/26<br>
 * 版本:1.0.0<br>
 */
public interface SystemAccountDao {
    /**
     * 判断用户是否锁定
     *
     * @param account
     * @return
     */
    Boolean checkLocked(String account);

    /**
     * 根据账户查询盐值
     *
     * @param account
     * @return
     */
    String querySaltByAccount(String account);

    /**
     * 根据账号和密码查询账户信息
     *
     * @param map
     * @return
     */
    SystemAccounts queryMsgByPwdAndAccount(HashMap<String, Object> map);

    /**
     * 设置锁定账户
     *
     * @param account
     * @return
     */
    int setLocked(String account);
}
