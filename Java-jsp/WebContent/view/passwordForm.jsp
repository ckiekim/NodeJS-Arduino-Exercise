<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="user.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="../common/_header.jspf" %>
	<script type="text/javascript">		// Input 항목 유효성 검사
		function isValidPassword() {
			var uid = document.getElementById("uid");
			var oldPwd = document.getElementById("oldPassword");
			var pwd = document.getElementById("password");
			var pwd2 = document.getElementById("password2");
			var isFirst = false;
			var rgx_id = /^[a-z]+[a-z0-9_]{5,11}$/; 	// 아이디 정규 표현식
			var rgx_pwd = /^[a-zA-Z0-9!@#$%^*+=-_]{8,20}$/;	// 패스워드 정규 표현식
			//var rgx_pwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;	// 엄격한 패스워드 정규 표현식

 			if (rgx_id.test(uid.value) != true) {
				alert('[ID 입력 오류] 유효한 ID를 입력해 주십시요.');
				uid.focus();
				return false;
			}
			if (oldPwd.value == '') {
				isFirst = true;
			} else if (rgx_pwd.test(oldPwd.value) != true) {
				alert('[PWD 입력 오류] 유효한 패스워드를 입력해 주십시요.');
				oldPwd.focus();
				return false;				
			}
 			if (rgx_pwd.test(pwd.value) != true) {
				alert('[PWD 입력 오류] 유효한 패스워드를 입력해 주십시요.');
				pwd.focus();
				return false;
			}
			if (rgx_pwd.test(pwd2.value) != true) {
				alert('[PWD 입력 오류] 유효한 패스워드를 입력해 주십시요.');
				pwd2.focus();
				return false;
			}
			if (!isFirst && oldPwd.value == pwd.value) {
				alert('[PWD 입력 오류] 이전 패스워드와 다른 패스워드를 입력해 주십시요.');
				pwd.focus();
				return false;
			}
			if (pwd.value != pwd2.value) {
				alert('[PWD 입력 오류] 동일한 패스워드를 입력해 주십시요.');
				pwd2.focus();
				return false;
			}
			if (isFirst) {
				oldPwd.value = ' ';
			}
			return true;
		}
	</script>
</head>
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
		      		<p><h2>패스워드 변경</h2></p>
		      		<p><h5>패스워드는 영문자, 숫자, 특수문자를 포함하여 8자 이상으로 구성해주세요.</h5></p>
		      	</div><br><br>
	      		<form action="../user/password.do" class="form-horizontal" method="POST" onSubmit="return isValidPassword();">
	      			<div class="form-group">
						<label class="col-sm-3 control-label">아이디</label>
						<div class="col-sm-3">
	   						<input type="text" class="form-control" name="uid" id="uid">
	 					</div>
					</div>
	      			<div class="form-group">
						<label class="col-sm-3 control-label">기존 패스워드</label>
						<div class="col-sm-3">
	   						<input type="password" class="form-control" name="oldPassword" id="oldPassword">
	 					</div>
	 					<div style="margin-top:8px">최초 패스워드 입력시 아무 문자도 입력하지 마십시요.</div>
					</div>
	      			<div class="form-group">
						<label class="col-sm-3 control-label">변경할 패스워드</label>
						<div class="col-sm-3">
	   						<input type="password" class="form-control" name="password" id="password">
	 					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">변경할 패스워드 재입력</label>
						<div class="col-sm-3">
							<input type="password" class="form-control" name="password2" id="password2">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-3 col-sm-3">
		      				<input class="btn btn-primary" type="submit" value="패스워드 변경">
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