package com.senchen365.eshop.util;
import org.apache.commons.codec.digest.DigestUtils;
/**
 * 类名：MD5 <br>
 * 功能：md5加密的工具<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/27 0027 下午 6:38 <br>
 * 版本：v1.0.0.0 <br>
 */
public class MD5Util {
    public static String meMd5(String ma){
       return DigestUtils.md5Hex(ma);
    }
}
