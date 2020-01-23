<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="actuator.*" %>
<%@ page import="sensor.*" %>
<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="../common/_header.jspf" %>
	<script type="text/javascript">		// Input 항목 유효성 검사
		function isValidLEDValue() {
			var red = document.getElementById("redColor");
			var green = document.getElementById("greenColor");
			var blue = document.getElementById("blueColor");
			var redVal = parseInt(red.value);
			var greenVal = parseInt(green.value);
			var blueVal = parseInt(blue.value);
 			var rgx_val = /^0$|^[1-9]+[0-9]{0,2}$/;
 			
			if (rgx_val.test(red.value) != true || redVal > 255) {
				alert('[정수값 입력 오류] 유효한 정수값(0~255)을 입력해 주십시요.');
				red.focus();
				return false;
			}
			if (rgx_val.test(green.value) != true || greenVal > 255) {
				alert('[정수값 입력 오류] 유효한 정수값(0~255)을 입력해 주십시요.');
				green.focus();
				return false;
			}
			if (rgx_val.test(blue.value) != true || blueVal > 255) {
				alert('[정수값 입력 오류] 유효한 정수값(0~255)을 입력해 주십시요.');
				blue.focus();
				return false;
			} 
			return true;
		}
	</script>
</head>

<body>
	<%@ include file="../common/_top.jspf" %>
     	<div class="col-md-10">
	      	<ul class="nav nav-tabs">
				<li class="active"><a href="#">Devices</a></li>
				<li><a href="../view/photoList.jsp">사진</a></li>
				<li><a href="../view/historySensor.jsp">이력</a></li>
				<li><a href="#">모니터링</a></li>
			</ul>
			<br>
			<%
			DeviceDAO ddao = new DeviceDAO();
			DeviceDTO ddto = ddao.deviceGetValue();
			float temp = ddto.getTemperature();
			float humid = ddto.getHumidity();
			int photo = ddto.getPhotocell();
			int dist = ddto.getDistance();
			%>
			<p class="text-right">Last update : <%=ddto.getTimestamp()%></p>
			<table class="table table-striped">
				<thead>
					<tr><th class="col-md-1">#</th> 
						<th class="col-md-3">항&nbsp;&nbsp;&nbsp;목</th> 
						<th class="col-md-3">기&nbsp;&nbsp;&nbsp;준</th> 
						<th class="col-md-2">값</th> 
						<th class="col-md-1">단위</th> 
						<th class="col-md-2"><a class="btn btn-small btn-primary" href="sensorProc.jsp">Refresh</a></th> </tr>
				</thead>
				<tbody>
					<tr> <td>1</td> <td>Temperature</td> <td>18.0 ~ 19.0</td> <td><%=temp%></td> <td>℃</td> 
						 <% if (temp < (float)18.0) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a></td> </tr>
						 <% } else if (temp > (float)19.0) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-up"></i></a></td> </tr>
						 <% } else { %>
							 <td><a class="btn disabled" href="#"><i class="glyphicon glyphicon-ok"></i></a></td> </tr>
						 <% } %>
					<tr> <td>2</td> <td>Humidity</td> <td>23.0 ~ 25.0</td> <td><%=humid%></td> <td>％</td> 
						 <% if (humid < (float)23.0) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a></td> </tr>
						 <% } else if (humid > (float)25.0) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-up"></i></a></td> </tr>
						 <% } else { %>
							 <td><a class="btn disabled" href="#"><i class="glyphicon glyphicon-ok"></i></a></td> </tr>
						 <% } %>
					<tr> <td>3</td> <td>Photocell(CDS)</td> <td>250 ~ 280</td> <td><%=photo%></td> <td>Ω</td> 
						 <% if (photo < 250) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a></td> </tr>
						 <% } else if (photo > 280) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-up"></i></a></td> </tr>
						 <% } else { %>
							 <td><a class="btn disabled" href="#"><i class="glyphicon glyphicon-ok"></i></a></td> </tr>
						 <% } %>
					<tr> <td>4</td> <td>Distance</td> <td>350 ~ 400</td> <td><%=dist%></td> <td>㎜</td>
						 <% if (dist < 350) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a></td> </tr>
						 <% } else if (dist > 400) { %>
							 <td><a class="btn btn-warning disabled" href="#"><i class="glyphicon glyphicon-arrow-up"></i></a></td> </tr>
						 <% } else { %>
							 <td><a class="btn disabled" href="#"><i class="glyphicon glyphicon-ok"></i></a></td> </tr>
						 <% } %> 
				</tbody>
			</table>
			
			<%
			LedDAO ldao = new LedDAO();
			LedDTO ldto = ldao.ledGetValue();
			int redRate = (int) ldto.getRed()*100/255;
			int greenRate = (int) ldto.getGreen()*100/255;
			int blueRate = (int) ldto.getBlue()*100/255;
			String red = Integer.toString(ldto.getRed());
			String green = Integer.toString(ldto.getGreen());
			String blue = Integer.toString(ldto.getBlue());
			%>
			<p class="text-right">Last operation : <%=ldto.getWrite_date()%></p>			
			<form action="../actuator/led.do" class="form-horizontal" method="POST" onSubmit="return isValidLEDValue();">
				<div class="row">
					<div class="col-md-2 col-xs-4">
						<div class="form-group">
							<label class="control-label">Red</label>
							<input type="number" class="form-control" name="redColor" id="redColor" placeholder="0~255">
						</div>
					</div>
					<div class="col-md-2 col-xs-4">
						<div class="form-group">
							<label class="control-label">Green</label>
							<input type="number" class="form-control" name="greenColor" id="greenColor" placeholder="0~255">
						</div>
					</div>
					<div class="col-md-2 col-xs-4">
						<div class="form-group">
							<label class="control-label">Blue</label>
							<input type="number" class="form-control" name="blueColor" id="blueColor" placeholder="0~255">
						</div>
					</div>
					<div class="col-md-4 col-xs-8">
						<div class="form-group">
							<label class="control-label">Remark</label>
							<input type="text" class="form-control" name="remark">
						</div>
					</div>
					<div class="col-md-2 col-xs-4"> &nbsp;
						<div class="form-control-static"> &nbsp;&nbsp;
							<input class="btn btn-primary" type="submit" value="LED Color">
						</div>
					</div>
				</div>				
			</form>
			<br>
			<div class="progress">
				<div class="progress-bar progress-bar-danger" style="width: <%=redRate%>%">
					<code>&lt;<%=red%>&gt;</code>
				</div>
			</div>
			<div class="progress">
				<div class="progress-bar progress-bar-success" style="width: <%=greenRate%>%">
					<code>&lt;<%=green%>&gt;</code>
				</div>
			</div>
			<div class="progress">
				<div class="progress-bar progress-bar-info" style="width: <%=blueRate%>%">
					<code>&lt;<%=blue%>&gt;</code>
				</div>
			</div>			
      	</div>
	<%@ include file="../common/_bottom.jspf" %>

</body>
</html>