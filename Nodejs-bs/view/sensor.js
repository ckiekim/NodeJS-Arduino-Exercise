module.exports.sensor = function(navBar, temp, humid, cds) {
    let up = `<i class="fas fa-arrow-up"></i>`;
    let down = `<i class="fas fa-arrow-down"></i>`;
    let ok = `<i class="far fa-thumbs-up"></i>`;
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
                    <a class="nav-link active" href="#">센서</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/actuator">액츄에이터</a>
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
                <div class="col-12"><h3>센서</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                            <tr class="active">
                                <th scope="col">항목</th><th scope="col">기준</th>
                                <th scope="col">값</th><th scope="col">단위</th>
                                <th scope="col"><a href="#"><i class="fas fa-arrow-alt-circle-down"></i></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i class="fas fa-thermometer-half"></i>&nbsp;&nbsp;온도</td><td>18.0 ~ 19.0</td>
                                <td>${temp}</td><td>℃</td><td>${up}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td><td>23.0 ~ 25.0</td>
                                <td>${humid}</td><td>%</td><td>${down}</td>
                            </tr>
                            <tr>
                                <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td><td>60.0 ~ 80.0</td>
                                <td>${cds}</td><td>lux</td><td>${ok}</td>
                            </tr>
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