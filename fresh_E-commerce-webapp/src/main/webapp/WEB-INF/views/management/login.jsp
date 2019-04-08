<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page pageEncoding="utf-8" isELIgnored="false" contentType="text/html;charset=utf-8" %>
<c:if test="${not empty sessionScope.SYSTEMACCOUNT}">
    <jsp:forward page="/management/user/goHome"/>
</c:if>
<c:if test="${empty sessionScope.SYSTEMACCOUNT}">
<!DOCTYPE html>

<html lang="en">
	<head>
		<base href="${BASEPATH}/">
		<meta charset="utf-8" />
		<title>品农商城管理平台-登录</title>
        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>

        <link rel="stylesheet" href="assets/lib/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/lib/css/font-awesome.min.css" />
        <link rel="stylesheet" href="assets/app/css/management/signin.min.css"/>

        <script src="assets/lib/js/jquery.js"></script>
        <%--需要定义$.ctx决定验证码的位置--%>
        <script type="text/javascript">
            jQuery.ctx = "management";
        </script>
        <script src="assets/app/js/management/signin.js"></script>

	</head>

	<body class="login-layout">

    <div id="main_container">
        <div class="topCon">
            <div class="lc">
                <span class="ico-to-right" style="position:relative; top:2px; margin-right:10px; "></span>欢迎登录品农商城管理平台
            </div>
            <div class="rc"></div>
        </div>
        <div class="logoCon"></div>

        <div class="loginFormCon">

            <form id="loginForm" name="myform" action="management/user/login.action" method="post" class="form" onSubmit="return formSubmit();">

                <div class="input-group form-group col-xs-10">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" name="account" value="" class="form-control" placeholder="请输入登录账号" required="required">

                </div>
                <div class="input-group form-group col-xs-10">
                    <span class="input-group-addon"><i class="fa fa-key"></i></span>
                    <input type="password" name="password" value="" class="form-control" placeholder="请输入登录密码" required="required">
                </div>

                <div class="input-group form-group col-xs-10">
                    <span class="input-group-addon"><i id="validate-status" class="fa fa-hand-o-right"></i></span>
                    <input type="text" id="jcaptchaCode" name="jcaptchaCode" maxlength="10" onblur="vlCode()"
                           class="form-control" style="width:85px" placeholder="验证码">
                    <img class="jcaptcha-btn jcaptcha-img" style="margin-left: 15px;height:34px" src="management/googlecode" title="点击更换验证码">
                    <a class="jcaptcha-btn btn btn-link">换一张</a>

                </div>

                <button type="submit" class=" btn btn-primary block col-xs-9">登录</button>
                <div id="error-info" class="alert alert-danger alert-dismissable text-center col-xs-8" style="padding: 8px;display: none"></div>
            </form>
        </div>
        <div class="bottomCon">
            品农商城管理平台版权所有&nbsp;&nbsp;2016&nbsp;&nbsp;
        </div>
    </div>
    <c:if test="${not empty requestScope.MESSAGE}">
        <script>
            $("#validate-status").attr("class", "fa fa-times-circle").parent().addClass("text-danger");
            $("#error-info").text("${requestScope.MESSAGE}");
            $("#error-info").show();
        </script>
    </c:if>
</body>
</html>
</c:if>
