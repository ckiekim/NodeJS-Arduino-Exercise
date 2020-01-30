module.exports.actuator = function(navBar) {
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
                    <a class="nav-link" href="/">센서</a>
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
                        <a class="dropdown-item" href="#">수정(U)</a>
                        <a class="dropdown-item" href="#">삭제(D)</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>액츄에이터</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <div class="progress" style="height: 30px;">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="255 aria-valuemin="0" aria-valuemax="255">Red: 255</div>
                    </div><br>
                    <div class="progress" style="height: 30px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="64" aria-valuemin="0" aria-valuemax="255">Green: 64</div>
                    </div><br>
                    <div class="progress" style="height: 30px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="128" aria-valuemin="0" aria-valuemax="255">Blue: 128</div>
                    </div><br>
                    <br><br>
                    <form>
                        <div class="form-group">
                            <label for="formControlRange">Red</label>
                            <input type="range" class="form-control-range" id="formControlRange">
                        </div>
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