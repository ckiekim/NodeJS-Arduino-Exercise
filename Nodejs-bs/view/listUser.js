module.exports.listUser = function(navBar, rows) {
    let users = '';
    for (row of rows) {
        users += `
            <tr>
                <td>${row.uid}</td><td>${row.name}</td><td>${row.deptName}</td><td>${row.tel}</td><td>${row.ts}</td>
                <td><a href="/user/update/uid/${row.uid}"><i class="far fa-edit"></i></a>&nbsp;&nbsp;&nbsp;
                    <a href="/user/delete/uid/${row.uid}"><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>`;
    }
    
    return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- ==================================================================== -->
    <title>강남 스마트팜</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script>
        function del() {

        }
    </script>
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
                        <a class="dropdown-item" href="/user/register">등록(C)</a>
                        <a class="dropdown-item" href="#">조회(R)</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
                </li>
            </ul>
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>사용자 조회</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <table class="table table-condensed table-hover table-row">
                        <thead class="thead-light">
                            <tr class="active">
                                <th>아이디</th><th>이름</th>
                                <th>부서</th><th>전화번호</th>
                                <th>등록일자</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users}
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div>
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
//<a href="/user/password/uid/${row.uid}"><i class="fas fa-key"></i></a>&nbsp;&nbsp;&nbsp;