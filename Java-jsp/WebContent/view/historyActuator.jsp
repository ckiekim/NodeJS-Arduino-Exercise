<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="actuator.*" %>
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
				<li><a href="../view/photoList.jsp">사진</a></li>
				<li class="active"><a href="#">이력</a></li>
				<li><a href="#">모니터링</a></li>
			</ul>
			<br>
			<p class="text-center">
				<button class="btn btn-primary" onclick="location.href='historySensor.jsp'" type="button">Sensor 조회 이력</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button class="btn btn-primary active" type="button">LED 변경 이력</button>
			</p>
			<%
			LedDAO dao = new LedDAO();
			ArrayList<LedDTO> list = dao.ledGetValueList();
			%>
			<table class="table table-striped table-condensed">
				<thead>
					<tr><th class="col-md-1">id</th>
						<th class="col-md-3">Timestamp</th>
						<th class="col-md-1">Red</th>
						<th class="col-md-1">Green</th>
						<th class="col-md-1">Blue</th>
						<th class="col-md-5">Remark</th> </tr>
				</thead>
				<tbody>
				<%
				for(LedDTO dto : list) {
				%>
					<tr> 
						<td><%=dto.getId()%></td> <td><%=dto.getWrite_date()%></td>
						<td><%=dto.getRed()%></td> <td><%=dto.getGreen()%></td>
						<td><%=dto.getBlue()%></td> <td><%=dto.getRemark()%></td>
					</tr>
				<%
				}
				%>
				</tbody>
			</table>

			<div class="row">
				<ul class="pager">
					<li><a href="#">&larr; 이전</a></li>
					<li><a href="#">다음 &rarr;</a></li>
				</ul>
			</div>
		</div>
	<%@ include file="../common/_bottom.jspf" %>
</body>
</html>