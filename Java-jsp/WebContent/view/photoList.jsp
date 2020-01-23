<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="photo.*" %>
<%@ page import="java.util.ArrayList" %>
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
			<form action="/photo/proc.do" class="form-inline" method="POST">
				<div class="form-group">
 					<label class="control-label">건물</label>
					<select id="building" name="building" class="form-control">
						<option value="A" selected="selected">A동</option>
						<option value="B">B동</option>
					  	<option value="C">C동</option>
					</select>
				</div> &nbsp;&nbsp;&nbsp;&nbsp;
				<div class="form-group">
 					<label class="control-label">층</label>
					<select id="story" name="story" class="form-control">
						<option value="1" selected="selected">1층</option>
						<option value="2">2층</option>
					  	<option value="3">3층</option>
					</select>
				</div> &nbsp;&nbsp;&nbsp;&nbsp;
				<div class="form-group">
 					<label class="control-label">베드</label>
					<select id="bedNo" name="bedNo" class="form-control">
						<option value="11" selected="selected">11</option>
						<option value="21">21</option>
					  	<option value="31">31</option>
					</select>
				</div> &nbsp;&nbsp;&nbsp;&nbsp;
				<input class="btn btn-primary" type="submit" value="현재 사진 찍기">
			</form>
			<br>
			<%
			PictureDAO dao = new PictureDAO();
			ArrayList<PictureDTO> list = dao.pictureGetValueList();
			String picturePre = "img/pictures/p";
			String thumbPre = "img/thumbs/t";
			String fileExt = ".jpg";
			%>
			<div class="row">
				<%
				for(PictureDTO dto : list) {
				%>
				<div class="col-xs-3 col-sm-2">
					<div class="thumbnail">
						<a href="../view/photoView.jsp?id=<%=dto.getId()%>">
						    <img src="../common/ThumbImageServlet?file=<%=dto.getName()%>" title="<%=dto.getDescription()%>" style="width:96px;height:54px;"></a>
						<div class="caption"><%=dto.getDescription()%></div>
					</div>
				</div>
				<%
				}
				%>
			</div>
      	</div>
	<%@ include file="../common/_bottom.jspf" %>
</body>
</html>