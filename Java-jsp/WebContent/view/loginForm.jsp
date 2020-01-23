<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="../common/_header.jspf" %>
	<script type="text/javascript">		// Input 항목 유효성 검사
		function isValidLogin() {
			var uid = document.getElementById("uid");
			var pwd = document.getElementById("password");
			var rgx_id = /^[a-z]+[a-z0-9_]{5,11}$/; 	// 아이디 정규 표현식
			var rgx_pwd = /^[a-zA-Z0-9!@#$%^*+=-_]{8,20}$/;	// 패스워드 정규 표현식
			//var rgx_pwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;	// 엄격한 패스워드 정규 표현식

 			if (rgx_id.test(uid.value) != true) {
				alert('[ID 입력 오류] 유효한 ID를 입력해 주십시요.');
				uid.focus();
				return false;
			}
			if (rgx_pwd.test(pwd.value) != true) {
				alert('[PWD 입력 오류] 유효한 패스워드를 입력해 주십시요.');
				pwd.focus();
				return false;
			}
			return true;
		}
	</script>
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="row">
				<div class="col-md-9">
					<p class="navbar-brand"><h1>Smart Farm Execution System</h1></p>
				</div>
				<div class="col-md-3">
					<br><p class="text-right">&nbsp;</p>
					<p class="text-right">&nbsp;</p>
				</div>
			</div>
		</div>
	</nav>
	<div class="container">
		<div class="row" style="margin-top:90px">
			<div class="col-md-2"></div>
			<div class="col-md-10">
				<div class="jumbotron">
		      		<p><h2>로그인</h2></p>
		      		<p><h5>스마트팜을 이용하려면  로그인을 해주세요.</h5></p>
		      	</div><br><br><br><br>
	      		<form action="../user/login.do" class="form-horizontal" method="POST" onSubmit="return isValidLogin();">
	      			<div class="form-group">
						<label class="col-sm-2 control-label">아이디</label>
						<div class="col-sm-3">
	   						<input type="text" class="form-control" name="uid" id="uid">
	 					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">패스워드</label>
						<div class="col-sm-3">
							<input type="password" class="form-control" name="password" id="password">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-6">
		      				<input class="btn btn-primary" type="submit" value="로그인">
		      				<button class="btn btn-primary" onclick="location.href='passwordForm.jsp'" type="button">패스워드 변경</button>
		      			</div>
	      			</div>
				</form>	
			</div>
	    </div>
	</div>
	<script src="//code.jquery.com/jquery.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js"></script>
</body>
</html>