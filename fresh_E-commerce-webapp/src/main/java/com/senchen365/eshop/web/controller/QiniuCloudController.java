package com.senchen365.eshop.web.controller;

import com.senchen365.eshop.po.ResultInfo;
import com.senchen365.eshop.util.QiniuCloudUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.UUID;

/**
 * 类名：QiniuCloudController <br>
 * 功能：TODO 一句话概括功能<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/28 0028 上午 11:22 <br>
 * 版本：v1.0.0.0 <br>
 */
@Controller
public class QiniuCloudController {
    @ResponseBody
    @RequestMapping(value="/qiniu/uploadImg", method= RequestMethod.POST)
    public ResultInfo uploadImg(@RequestParam MultipartFile image, HttpServletRequest Qrequest) {
        ResultInfo re = new ResultInfo();
        if (image.isEmpty()) {
            re.setCode(400);
            re.setMsg("文件为空，请重新上传");
            return re;
        }

        try {
            byte[] bytes = image.getBytes();
            String imageName = UUID.randomUUID().toString();
            QiniuCloudUtil qiniuUtil = new QiniuCloudUtil();
            try {
                //使用base64方式上传到七牛云
                String url = qiniuUtil.put64image(bytes, imageName);
                re.setCode(200);
                re.setMsg("文件上传成功");
                re.setInfo(url);
            } catch (Exception e) {
                e.printStackTrace();
            }
            System.out.println(re.toString());
            return re;
        } catch (IOException e) {
            re.setCode(500);
            re.setMsg("文件上传发生异常！");
            return re;
        }
    }
}
