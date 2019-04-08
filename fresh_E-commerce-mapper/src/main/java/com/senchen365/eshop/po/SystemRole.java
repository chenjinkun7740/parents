package com.senchen365.eshop.po;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 类名:SystemRole<br>
 * 功能:用户角色<br>
 * 作者:陈金坤<br>
 * 日期:2019/3/29<br>
 * 版本:1.0.0<br>
 */
public class SystemRole implements Serializable{
    private Integer id;
    private String name;
    private Date createAt;//创建时间
    private Date updateAt;//更新时间
    private Boolean isDeleted;//是否删除
    private Boolean deleteAble;//能否被删除
    private String code;//排序的依据
    private Integer status;//状态
    private String description;//描述

    //一个角色对应多个权限
    private List<SystemPermission> permissionList;//权限集合







    public List<SystemPermission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<SystemPermission> permissionList) {
        this.permissionList = permissionList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Boolean getDeleteAble() {
        return deleteAble;
    }

    public void setDeleteAble(Boolean deleteAble) {
        this.deleteAble = deleteAble;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
