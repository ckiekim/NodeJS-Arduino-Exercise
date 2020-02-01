const TEMP_LOW = 18.0;
const TEMP_HIGH = 22.0;
const HUMID_LOW = 20.0;
const HUMID_HIGH = 30.0;
const CDS_LOW = 40.0;
const CDS_HIGH = 80.0;
const DIST_LOW = 10.0;
const DIST_HIGH = 30.0

module.exports.sensor = function(navBar, temp, humid, cds, dist) {
    let up = `<i class="fas fa-arrow-up"></i>`;
    let down = `<i class="fas fa-arrow-down"></i>`;
    let ok = `<i class="far fa-thumbs-up"></i>`;
    let tempSign, humidSign, cdsSign, distSign;
    if (temp < TEMP_LOW) tempSign = down;
    else if (temp > TEMP_HIGH) tempSign = up;
    else tempSign = ok;
    if (humid < HUMID_LOW) humidSign = down;
    else if (humid > HUMID_HIGH) humidSign = up;
    else humidSign = ok;
    if (cds < CDS_LOW) cdsSign = down;
    else if (cds > CDS_HIGH) cdsSign = up;
    else cdsSign = ok;
    if (dist < DIST_LOW) distSign = down;
    else if (dist > DIST_HIGH) distSign = up;
    else distSign = ok;

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
                        <a class="dropdown-item" href="/user/register">등록(C)</a>
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
                                <th scope="col">현재값</th><th scope="col">단위</th>
                                <th scope="col"><a href="#"><i class="fas fa-arrow-alt-circle-down"></i></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i class="fas fa-thermometer-half"></i>&nbsp;&nbsp;온도</td>
                                <td>${TEMP_LOW} ~ ${TEMP_HIGH}</td>
                                <td>${temp}</td><td>℃</td><td>${tempSign}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td>
                                <td>${HUMID_LOW} ~ ${HUMID_HIGH}</td>
                                <td>${humid}</td><td>%</td><td>${humidSign}</td>
                            </tr>
                            <tr>
                                <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td>
                                <td>${CDS_LOW} ~ ${CDS_HIGH}</td>
                                <td>${cds}</td><td>lux</td><td>${cdsSign}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-ruler-vertical"></i>&nbsp;&nbsp;거리</td>
                                <td>${DIST_LOW} ~ ${DIST_HIGH}</td>
                                <td>${dist}</td><td>cm</td><td>${distSign}</td>
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