module.exports.register = function() {
	return `
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- ==================================================================== -->
	<title>강남 스마트팜</title>
	<link href="/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<div class="jumbotron">
                    <a href="/"><img src="logo.png"></a>
					<p><h2>회원 가입</h2></p>
					<p><h5>강남 스마트팜 시스템을 이용하려면 회원 가입을 해주세요.</h5></p>
				</div><br>
                <form action="/user/register" class="form-horizontal" method="POST">
                    <table class="table">
                    <tr>
                        <td style="text-align: center;">아이디</td>
                        <td><div class="col-md-7">
                            <input type="text" class="form-control" name="uid" id="uid">
                        </div></td>
                    </tr>
					<tr>
						<td style="text-align: center;">패스워드</td>
						<td><div class="col-md-7">
							<input type="password" class="form-control" name="password" id="password">
						</div></td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">패스워드 확인</td>
						<td><div class="col-md-7">
							<input type="password" class="form-control" name="password2" id="password2">
						</div></td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">이름</td>
						<td><div class="col-md-7">
							<input type="text" class="form-control" name="name" id="name">
						</div></td>
                    </tr>
                    <tr>
						<td style="text-align: center;">전화번호</td>
						<td><div class="col-md-7">
							<input type="text" class="form-control" name="tel" id="tel">
						</div></td>
					</tr>
					<tr>
                        <td colspan="2" style="text-align: center;"><div class="col-md-10">
                            <input class="btn btn-primary" type="submit" value="회원가입">&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-secondary" type="reset" type="button">취소</button>
                        </div></td>
                    </tr>
                    </table>
                </form>
                <div class="col-md-10" style="text-align: center;">
					<button class="btn btn-primary" type="button" onclick="location.href='/user/login'">로그인</button>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</div>
                    
<!-- ==================================================================== -->
<script src="/jquery/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
</body>
</html>
    `;
}