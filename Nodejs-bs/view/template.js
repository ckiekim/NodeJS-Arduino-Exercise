module.exports = {
    navBar: function(weather, userName) {
        return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/"><img src="greenlogo.png" class="d-inline-block align-top" alt=""></a>&nbsp;&nbsp;&nbsp;
                <ul class="nav nav-pills mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/login">로그아웃</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"> </a>
                    </li>
                </ul>
                <div class="navbar-text">
                    <p>${weather}</p>
                    <p>${userName}님 환영합니다.</p>
                </div>
            </nav>
        `;
    },
    weather: function(temp, humid, ico) {
        return `
            <a href='/weather'><button type="button" class="btn btn-secondary btn-sm">날씨</button></a>&nbsp;
            <img src="${ico}" width="32" height="32">&nbsp;
            기온: ${temp}&#8451;, 습도: ${humid}% &nbsp;&nbsp;&nbsp;
        `;
    }
}