package com.senchen365.eshop.po;

import java.io.Serializable;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * 类名：SystemAccounts <br>
 * 功能：管理员的实体<br>
 * 作者：陈金坤 <br>
 * 时间：2019/3/27 0027 下午 5:50 <br>
 * 版本：v1.0.0.0 <br>
 */
public class SystemAccounts implements Serializable {
    private Integer id;    //id
    private Date createAt;
    private Boolean isDeleted;      //账户是否被删除
    private String digest;
    private Integer status;
    //状态
    private Date updateAt;
    private String account;   //管理员账户
    private String headPic;      //账户的头像
    private Date lastLoginAt;      //最后一次登录时间
    private Boolean locked;        //是否已经被锁定
    private String passwordDigist;         //被加密的密码
    private String realName;
    private String salt;
    private List<SystemRole> systemRole;

    public List<SystemRole> getSystemRole() {
        return systemRole;
    }

    public void setSystemRole(List<SystemRole> systemRole) {
        this.systemRole = systemRole;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public String getDigest() {
        return digest;
    }

    public void setDigest(String digest) {
        this.digest = digest;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getHeadPic() {
        return headPic;
    }

    public void setHeadPic(String headPic) {
        this.headPic = headPic;
    }

    public Date getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(Date lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public String getPasswordDigist() {
        return passwordDigist;
    }

    public void setPasswordDigist(String passwordDigist) {
        this.passwordDigist = passwordDigist;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

}
