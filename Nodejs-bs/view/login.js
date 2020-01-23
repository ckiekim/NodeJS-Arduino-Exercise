module.exports.login = function() {
	return `
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- ==================================================================== -->
	<title>강남 스마트팜</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<div class="jumbotron">
					<a href="/"><img src="logo.png"></a>
					<p><h2>로그인</h2></p>
					<p><h5>강남 스마트팜 시스템을 이용하려면 로그인을 해주세요.</h5></p>
				</div><br><br>
				<form action="/user/login" class="form-horizontal" method="POST">
					<div class="form-group row">
						<div class="col-3"></div>
						<label for="uid" class="col-2 col-form-label">아이디</label>
						<div class="col-3">
							<input type="text" class="form-control" id="uid" name="uid">
						</div>
						<div class="col-4"></div>
					</div>
					<div class="form-group row">
						<div class="col-3"></div>
						<label for="password" class="col-2 col-form-label">패스워드</label>
						<div class="col-3">
							<input type="password" class="form-control" id="password" name="password">
						</div>
						<div class="col-4"></div>
					</div>
					<br>
					<div class="form-group row">
						<div class="col-4"></div>
						<div class="col-8">
							<input class="btn btn-primary" type="submit" value="로그인">&nbsp;&nbsp;&nbsp;
							<button class="btn btn-secondary" type="reset" type="button">취소</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-1"></div>
		</div>
	</div>

    <!-- === From w3school.com (https://www.w3schools.com/bootstrap4/bootstrap_get_started.asp) === -->
    <script src="/fontawesome/all.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>
</html>
	`;
}