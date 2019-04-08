<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="menu">
    <ul>
        <c:if test="${not empty sessionScope.ROOT}">
            <c:forEach items="${sessionScope.ROOT}" var="big">
                <c:set var="ymy" value="${big.oneName ne '个人中心'}"/>
                <li class="${ymy?'has-sub':''}">
                    <%--大类别--%>
                    <a href="#">
                        <div class="fs1 ${big.digist}" aria-hidden="true"></div>
                        <span>${big.oneName}</span>
                    </a>
                     <ul>
                    <c:if test="${not empty big.twoList and big.oneName ne '个人中心'}">
                        <c:forEach items="${big.twoList}" var="small">
                        <%--小类别--%>
                                <li>
                                    <a href="${pageContext.request.contextPath}${small.actionUrl}">
                                        <span>${small.name}</span>
                                    </a>
                                </li>

                        </c:forEach>
                    </c:if>
                     </ul>
                </li>
            </c:forEach>
        </c:if>
    </ul>
</div>