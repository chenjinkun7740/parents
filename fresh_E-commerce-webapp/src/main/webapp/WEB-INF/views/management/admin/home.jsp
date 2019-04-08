<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta charset="utf-8" />
    <title>品农商城-用户中心</title>
    <link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>
    <meta name="keywords" content="通州酒水,通州生鲜,通州水果,通州蔬菜,通州肉,通州蛋,通州促销活动,通州促销产品,北京通糖烟酒糖业有限公司,北京通州区超市"/>
    <meta http-equiv="description" content="北京通州酒水,北京通州生鲜,北京通州促销产品等,北京通州区超市连锁,北京通州区免费送货,北京通州区正品低价、品质保障、配送及时、轻松购物,北京通州品农,北京通州品质"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <base href="${BASEPATH}">
    <link rel="stylesheet" href="assets/lib/css/bootstrap.min.css" media="screen"/>
    <link rel="stylesheet" href="assets/lib/css/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/lib/css/metrize.css" />
    <link rel="stylesheet" href="assets/lib/css/animate.css" />
    <link rel="stylesheet" href="assets/lib/css/toastr.min.css" />
    <link rel="stylesheet" href="assets/lib/css/bootstrap-datetimepicker.min.css" />
    <link rel="stylesheet" href="assets/lib/css/chosen.min.css" />
    <link rel="stylesheet" href="assets/lib/css/main.css" />
    <link rel="stylesheet" href="assets/lib/css/slidebars.css" />
    <link rel="stylesheet" href="assets/app/css/management/application.css" />
    <!-- HTML5 shiv and Respond.js IE8 support of HTML5 elements and media \ -->
    <!--[if lt IE 9]>
    <script src="assets/lib/js/html5shiv.min.js"></script>
    <script src="assets/lib/js/respond.min.js"></script>
    <![endif]-->


</head>
<body>
<!-- Left sidebar start -->
<aside id="sidebar">
    <!-- Logo starts -->
    <a href="#" class="logo">
        <img alt="" src="assets/app/images/management/admin_logo.png" style="margin-bottom: 10px;"/>
        <p class="label">新鲜e客管理平台</p>
    </a>
    <!-- Logo ends -->
    <!-- Menu start -->
    <%--嵌入左侧动态生成的树形菜单页面--%>
    <jsp:include page="admin_left.jsp"/>
    <!-- Menu End -->
</aside>
<!-- Left sidebar end -->
<!-- Dashboard Wrapper Start -->
<div class="dashboard-wrapper">
    <!-- Header start -->
    <%@ include file="admin_top.jsp"%>
    <!-- Header ends -->
    <!-- Right sidebar start -->
    <!-- Right sidebar end -->
    <!-- Main Container Start -->
    <div class="main-container">
        <!-- Top Bar Starts -->
        <div class="top-bar clearfix">

            <div class="page-title">
                <h4>
                    <div class="fs1" aria-hidden="true" data-icon="&#xe0ac;"></div>
                    首页 <a href="management/admin/home" class="samll">用户中心</a></h4>
            </div>

        </div>
        <!-- Top Bar Ends -->
        <!-- Container fluid Starts -->
        <div class="container-fluid">
            <!-- Spacer starts -->
            <div class="spacer-xs">

                <div class="row no-gutter" id="user-profile">
                    <div class="col-md-4">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>${sessionScope.SYSTEMACCOUNT.realName}</h4>
                            </div>
                            <div class="panel-body">
                                <img id="avatar"
                                     class="profile-img img-responsive center-block"
                                     alt="${sessionScope.SYSTEMACCOUNT.realName}" src="${sessionScope.SYSTEMACCOUNT.headPic}"/>
                                <div class="profile-label">
                                    <span class="label label-danger">${sessionScope.SYSTEMACCOUNT.realName}</span>
                                </div>
                                <div class="profile-since">
                                    <a  class="btn btn-link"> <i
                                            class="glyphicon glyphicon-time green"></i> 上次登录时间:
                                        <fmt:formatDate value="${sessionScope.SYSTEMACCOUNT.lastLoginAt}" pattern="yyyy年MM月dd日 hh:mm"/>
                                    </a>
                                </div>
                                <hr />
                                <div class="profile-message-btn center-block text-center">
                                    <a href="management/admin/modifyhead" class="btn btn-success">
                                        <i class="glyphicon glyphicon-edit"></i>
                                        修改头像
                                    </a>
                                    <a href="management/admin/modifypwd" class="btn btn-info">
                                        <i class="fa fa-unlock-alt"></i>
                                        修改密码
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>角色信息</h4>
                            </div>
                            <div class="panel-body">
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td><h5>账号: <small>${sessionScope.SYSTEMACCOUNT.account}</small></h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>姓名: <small>${sessionScope.SYSTEMACCOUNT.realName}</small></h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>状态: <small>${sessionScope.SYSTEMACCOUNT.locked?"已锁定":"正常"}</small></h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>注册时间: <small>
                                            <fmt:formatDate value="${sessionScope.SYSTEMACCOUNT.createAt}" pattern="yyyy年MM月dd日 hh:mm"/>
                                        </small></h5></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Spacer ends -->
        </div>
        <!-- Container fluid ends -->
    </div>
    <!-- Main Container Start -->
    <!-- Footer Start -->
    <footer>
        Copyright <strong><span>2016-2020</span></strong> . All Rights Reserved.
    </footer>

    <!-- Footer end -->
</div>
<!-- Dashboard Wrapper End -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="assets/lib/js/jquery.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="assets/lib/js/bootstrap.min.js"></script>
<!-- Animated Right Sidebar -->
<script src="assets/lib/js/slidebars.js"></script>
<script src="assets/lib/js/toastr.min.js"></script>
<!-- Date time select -->
<script src="assets/lib/js/moment.min.js"></script>
<script src="assets/lib/js/moment.zh-cn.js"></script>
<script src="assets/lib/js/bootstrap-datetimepicker.min.js"></script>
<script src="assets/lib/js/chosen.jquery.min.js"></script>
<!-- Custom JS -->
<script src="assets/lib/js/custom.js"></script>

<script type="text/javascript" src="assets/app/js/management/application.js"></script>


<div id="modal-ajax" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content"></div>
    </div>
</div>
</body>
</html>
