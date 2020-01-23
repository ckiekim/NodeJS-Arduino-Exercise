module.exports.main = function() {
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
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <script src="/fontawesome/all.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img src="greenlogo.png" class="d-inline-block align-top" alt="">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user/login">로그인</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user/register">회원가입</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    </nav>
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            <nav class="nav flex-column">
                <a class="nav-link active" href="#">Sensor</a>
                <a class="nav-link" href="#">Actuator</a>
                <a class="nav-link" href="#">사용자</a>
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </nav>
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>스마트팜 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-10">
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
                                <td>17.5</td><td>℃</td><td>${up}</td>
                            </tr>
                            <tr>
                                <td><i class="fas fa-tint"></i>&nbsp;&nbsp;습도</td><td>23.0 ~ 25.0</td>
                                <td>25.5</td><td>%</td><td>${down}</td>
                            </tr>
                            <tr>
                                <td><i class="far fa-lightbulb"></i>&nbsp;&nbsp;조도</td><td>60.0 ~ 80.0</td>
                                <td>72.3</td><td>lux</td><td>${ok}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-2"></div>
            </div>
        </div>
      </div>

	<!-- ==================================================================== -->
	<script src="/jquery/jquery.min.js"></script>
	<script src="/js/bootstrap.min.js"></script>
</body>
</html>
    `;
/*
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/solid.js" integrity="sha384-+Ga2s7YBbhOD6nie0DzrZpJes+b2K1xkpKxTFFcx59QmVPaSA8c7pycsNaFwUK6l" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js" integrity="sha384-7ox8Q2yzO/uWircfojVuCQOZl+ZZBg2D2J5nkpLqzH1HY0C1dHlTKIbpRz/LG23c" crossorigin="anonymous"></script>
*/
}