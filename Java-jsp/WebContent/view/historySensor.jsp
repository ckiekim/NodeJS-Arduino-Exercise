<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="sensor.*" %>
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
				<button class="btn btn-primary active" type="button">Sensor 조회 이력</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button class="btn btn-primary" onclick="location.href='historyActuator.jsp'" type="button">LED 변경 이력</button>
			</p>
			<%
			DeviceDAO dao = new DeviceDAO();
			ArrayList<DeviceDTO> list = dao.deviceGetValueList();
			%>
			<table class="table table-striped table-condensed">
				<thead>
					<tr><th rowspan="2" class="col-md-1">id</th>
						<th rowspan="2" class="col-md-3">Timestamp</th>
						<th class="col-md-2">Temperature</th>
						<th class="col-md-2">Humidity</th>
						<th class="col-md-2">Photocell(CDS)</th>
						<th class="col-md-2">Distance</th> </tr>
					<tr> <th>(18.0 ~ 19.0 ℃)</th> <th>(23.0 ~ 25.0 ％)</th> <th>(250 ~ 280 Ω)</th> <th>(350 ~ 400 ㎜)</th> </tr>
				</thead>
				<tbody>
				<%
				for(DeviceDTO dto : list) {
				%>
					<tr> 
						<td><%=dto.getId()%></td> <td><%=dto.getTimestamp()%></td>
						<td><%=dto.getTemperature()%></td> <td><%=dto.getHumidity()%></td>
						<td><%=dto.getPhotocell()%></td> <td><%=dto.getDistance()%></td>
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