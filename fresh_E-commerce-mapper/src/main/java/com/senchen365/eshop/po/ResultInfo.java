package com.senchen365.eshop.po;

import java.io.Serializable;

/**
 * 类名：ResultInfo <br>
 * 功能：TODO 一句话概括功能<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/28 0028 上午 11:26 <br>
 * 版本：v1.0.0.0 <br>
 */
public class ResultInfo implements Serializable {
    private Integer code;
    private String msg;
    private String info;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "------状态（code）： -------------" + code + "\n ------上传状态： -------------" + msg + "\n ------服务器图片路径： -------------" + info;
    }
}
