<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<header>
    <ul class="pull-left" id="left-nav">
        <li >
            <div class="logo-mob clearfix">
                <h2>
                    <div class="fs1" aria-hidden="true" data-icon="&#xe0db;"></div>
                    <span>新鲜e客</span>
                </h2>
            </div>
        </li>
    </ul>
    <div class="pull-right">
        <ul id="mini-nav" class="clearfix">
            <li class="list-box hidden-xs dropdown">
                <a href="#" role="button" class="dropdown-toggle current-user" data-toggle="dropdown">
                    ${sessionScope.SYSTEMACCOUNT.account}[${sessionScope.SYSTEMACCOUNT.realName}] <b class="caret"></b>
                </a>
                <ul class="dropdown-menu sm fadeInUp animated">
                    <script>
                        function logout(){
                            if(confirm("是否确定退出本系统?")){
                                location.href="${pageContext.request.contextPath}/management/signout";
                            }
                        }
                    </script>
                    <li class="dropdown-content">
                        <a href="management/admin/home" data-original-title="" title=""><i class="fa fa-user"></i> 个人资料</a>
                        <a href="management/admin/modifypwd" data-original-title="" title=""><i class="fa fa-envelope-o"></i> 修改密码</a>
                        <a href="javascript:logout()" data-original-title="" title=""><i class="fa fa-power-off"></i> 退出登录</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</header>