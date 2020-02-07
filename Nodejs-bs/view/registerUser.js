module.exports.registerUser = function(navBar, deptObj) {
    let options = '';
    for (dept of deptObj) {
        options += `<option value="${dept.did}">${dept.name}</option>`;
    }
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
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="/sensor">센서</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/actuator">액츄에이터</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        사용자
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item active" href="#">등록(C)</a>
                        <a class="dropdown-item" href="/user/list">조회(R)</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
                </li>
            </ul>
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>사용자 등록</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-6">
                <form action="/user/register" class="form-horizontal" method="POST">
                    <table class="table table-borderless">
                    <tr>
                        <td style="text-align: center;">아이디</td>
                        <td>
                            <input type="text" class="form-control" name="uid" id="uid">
                        </td>
                    </tr>
					<tr>
						<td style="text-align: center;">패스워드</td>
						<td>
							<input type="password" class="form-control" name="password" id="password">
						</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">패스워드 확인</td>
						<td>
							<input type="password" class="form-control" name="password2" id="password2">
						</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">이름</td>
						<td>
							<input type="text" class="form-control" name="name" id="name">
						</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">부서명</td>
                        <td>
                            <select class="form-control" id="deptId" name="deptId">
                                ${options}
                            </select>
                        </td>
                    </tr>
                    <tr>
						<td style="text-align: center;">전화번호</td>
						<td>
							<input type="text" class="form-control" name="tel" id="tel">
						</td>
					</tr>
					<tr>
                        <td colspan="2" style="text-align: center;">
                            <input class="btn btn-primary" type="submit" value="확인">&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-secondary" type="reset" type="button">취소</button>
                        </td>
                    </tr>
                    </table>
                </form>
                </div>
                <div class="col-6"></div>
            </div>
        </div>
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