package com.senchen365.eshop.po;

import java.util.List;

/**
 * 类名：OneAndTwoByRoot <br>
 * 功能：一级权限以及二级权限的实体<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/31 0031 下午 10:48 <br>
 * 版本：v1.0.0.0 <br>
 */
public class OneAndTwoByRoot {
    private String digist;
    private String oneName;
    private List<SystemPermission> twoList;

    public String getDigist() {
        return digist;
    }

    public void setDigist(String digist) {
        this.digist = digist;
    }

    public String getOneName() {
        return oneName;
    }

    public void setOneName(String oneName) {
        this.oneName = oneName;
    }

    public List<SystemPermission> getTwoList() {
        return twoList;
    }

    public void setTwoList(List<SystemPermission> twoList) {
        this.twoList = twoList;
    }
}
