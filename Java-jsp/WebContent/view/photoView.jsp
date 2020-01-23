<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="photo.*" %>
<%@ page import="common.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="../common/_header.jspf" %>
</head>

<body>
	<%@ include file="../common/_top.jspf" %>
      	<div class="col-md-10">
	      	<ul class="nav nav-tabs">
				<li><a href="../view/mainView.jsp">Devices</a></li>
				<li class="active"><a href="#">사진</a></li>
				<li><a href="../view/historySensor.jsp">이력</a></li>
				<li><a href="#">모니터링</a></li>
			</ul>
			<br>
			<%
			int id = Integer.parseInt(request.getParameter("id"));
			PictureDAO dao = new PictureDAO();
			PictureDTO dto = dao.pictureGetValue(id);
			String picturePre = "img/pictures/p";
			String thumbPre = "img/thumbs/t";
			String fileExt = ".jpg";
			String name = dto.getName();
			%>
			<img src="../common/FileImageServlet?file=<%=name%>" style="width:640px;height:360px;">
			<br><br>
			<p>촬영 일시 : <%=Utilities.makeDate(name)%></p>
			<p>상세 설명 : <%=dto.getDescription()%></p>
			<p class="text-center">
				<button class="btn" type="button" onclick="location.href='photoList.jsp'"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;뒤로&nbsp;</button>
			</p>
      	</div>
	<%@ include file="../common/_bottom.jspf" %>
</body>
</html>