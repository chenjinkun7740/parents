package com.senchen365.eshop.po;

import java.io.Serializable;
import java.util.Date;

/**
 * 类名:SystemPermission<br>
 * 功能:角色对应的权限<br>
 * 作者:陈金坤<br>
 * 日期:2019/3/29<br>
 * 版本:1.0.0<br>
 */
public class SystemPermission implements Serializable{
    private Integer id;
    private Integer parentId;//父id
    private String name;
    private Date createAt;//创建时间
    private Boolean isDeleted;//是否被删除
    private String digist;//左侧图标
    private Integer status;//状态信息
    private Date updateAt;//修改时间
    private String actionMethod;//提交方式
    private String actionUrl;//请求的地址
    private String code;//排序的依据
    private Boolean deleteAble;//能否被删除


    @Override
    public boolean equals(Object obj) {
        if(obj instanceof SystemPermission){
            SystemPermission permission=(SystemPermission)obj;
            return permission.id.equals(this.id);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.id.hashCode()*31+this.name.hashCode()*13;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getDigist() {
        return digist;
    }

    public void setDigist(String digist) {
        this.digist = digist;
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

    public String getActionMethod() {
        return actionMethod;
    }

    public void setActionMethod(String actionMethod) {
        this.actionMethod = actionMethod;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getDeleteAble() {
        return deleteAble;
    }

    public void setDeleteAble(Boolean deleteAble) {
        this.deleteAble = deleteAble;
    }
}
