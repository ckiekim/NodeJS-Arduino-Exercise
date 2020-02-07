module.exports = {
    navBar: function(isHome, weather, userName) {
        let homeLink = isHome? `<a class="nav-link active" href="#">Home</a>`: `<a class="nav-link" href="/">Home</a>`;
        return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src="greenlogo.png" class="d-inline-block align-top" alt="">&nbsp;&nbsp;&nbsp;
                <ul class="nav nav-pills mr-auto">
                    <li class="nav-item">
                        ${homeLink}
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
    menuLink: function(isSensor, isActuator, isUser, isRegister, isList) {
        let sensorMenu = isSensor? `<a class="nav-link active" href="#">센서</a>`: `<a class="nav-link" href="/sensor">센서</a>`;
        let actuatorMenu = isActuator? `<a class="nav-link active" href="#">액츄에이터</a>`: `<a class="nav-link" href="/actuator">액츄에이터</a>`;
        let userMenu = isUser? `<a class="nav-link dropdown-toggle active" `: `<a class="nav-link dropdown-toggle" `;
        userMenu += `href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
        let registerMenu = isRegister? `<a class="dropdown-item active" href="#">등록(C)</a>`: `<a class="dropdown-item" href="/user/register">등록(C)</a>`;
        let listMenu = isList? `<a class="dropdown-item active" href="#">조회(R)</a>`: `<a class="dropdown-item" href="/user/list">조회(R)</a>`;
        return `
            <li class="nav-item">
                ${sensorMenu}
            </li>
            <li class="nav-item">
                ${actuatorMenu}
            </li>
            <li class="nav-item dropdown">
                ${userMenu}
                    사용자
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    ${registerMenu}
                    ${listMenu}
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
            </li>
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