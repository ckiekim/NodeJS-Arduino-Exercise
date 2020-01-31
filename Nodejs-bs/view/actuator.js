module.exports.actuator = function(navBar, curR, curG, curB, relay) {
    let radio = '';
    if (relay == 0) 
        radio = `<input type="radio" name="relay" value="0" checked>&nbsp;OFF&nbsp;&nbsp;&nbsp;&nbsp;
                 <input type="radio" name="relay" value="1">&nbsp;ON<br>`;
    else
        radio = `<input type="radio" name="relay" value="0">&nbsp;OFF&nbsp;&nbsp;&nbsp;&nbsp;
                 <input type="radio" name="relay" value="1" checked>&nbsp;ON<br>`;    
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
                    <a class="nav-link active" href="#">액츄에이터</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        사용자
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/user/register">생성(C)</a>
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
                <div class="col-12"><h3>액츄에이터</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <form action="/actuator" method="POST">
                    <table class="table">
                        <tr><td rowspan="2" style="text-align: center;">Red LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${curR/255*100}%" aria-valuenow="200" aria-valuemin="0" aria-valuemax="255">${curR}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="redRange" min="0" max="255" step="1" value="${curR}">
                            </td></tr>
                        <tr><td rowspan="2" style="text-align: center;">Green LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${curG/255*100}%" aria-valuenow="200" aria-valuemin="0" aria-valuemax="255">${curG}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="greenRange" min="0" max="255" step="1" value="${curG}">
                            </td></tr>
                        <tr><td rowspan="2" style="text-align: center;">Blue LED</td><td>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${curB/255*100}%" aria-valuenow="200" aria-valuemin="0" aria-valuemax="255">${curB}</div>
                            </div></td></tr>
                        <tr><td>
                            <input type="range" class="form-control-range" name="blueRange" min="0" max="255" step="1" value="${curB}">
                            </td></tr>
                        <tr><td style="text-align: center;">Relay</td>
                            <td style="text-align: center;">
                                <div class="form-check form-check-inline">${radio}</div>
                            </td></tr>
                        <tr><td style="text-align: center;">변경 사유</td>
                            <td style="text-align: center;">
                                <select class="form-control" name="reason">
                                    <option value="Periodical" selected>정기적</option>
                                    <option value="Temporary">임시적</option>
                                </select>
                            </td></tr>
                        <tr><td colspan="2" style="text-align: center;"><button type="submit" class="btn btn-primary">수정</button></td></tr>
                    </table>
                    </form>
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
/*

*/