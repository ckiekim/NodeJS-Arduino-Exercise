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
    navMain: function(userName, weather) {
        if (userName !== undefined) {
            return `<a href="/create">글쓰기</a>&nbsp;&nbsp;
                    <a href="/user/logout">로그아웃</a>&nbsp;&nbsp;
                    ${userName} 님 환영합니다.&nbsp;&nbsp;&nbsp;${weather}`;
        } else {
            return `<a href="/">홈으로</a>&nbsp;&nbsp;
                    <a href='/user/login'>로그인</a>&nbsp;&nbsp;
                    <a href='/user/register'>사용자 등록</a>&nbsp;&nbsp;&nbsp;${weather}`;
        }
    },
    navList: function(userName, id, weather) {
        if (userName !== undefined) {
            return `<a href="/">홈으로</a>&nbsp;&nbsp;
                    <a href="/create">글쓰기</a>&nbsp;&nbsp;
                    <a href="/update/${id}">수정하기</a>&nbsp;&nbsp;
                    <a href="/delete/${id}">삭제하기</a>&nbsp;&nbsp;
                    <a href="/user/logout">로그아웃</a>&nbsp;&nbsp;
                    ${userName} 님 환영합니다.&nbsp;&nbsp;&nbsp;${weather}`;  
        } else {
            return `<a href="/">홈으로</a>&nbsp;&nbsp;
                    <a href='/user/login'>로그인</a>&nbsp;&nbsp;
                    <a href='/user/register'>사용자 등록</a>&nbsp;&nbsp;&nbsp;${weather}`;
        }
    },
    navOp: function(userName, weather) {
        if (userName!== undefined) {
            return `<a href="/">홈으로</a>&nbsp;&nbsp;
                    <a href="/user/logout">로그아웃</a>&nbsp;&nbsp;
                    ${userName} 님 환영합니다.&nbsp;&nbsp;&nbsp;${weather}`;  
        } else {
            return `<a href="/">홈으로</a>&nbsp;&nbsp;
                    <a href='/user/login'>로그인</a>&nbsp;&nbsp;
                    <a href='/user/register'>사용자 등록</a>&nbsp;&nbsp;&nbsp;${weather}`;
        }
    },
    tableItem: function(row) {
        let _content = row.content.replace(/\r\n/g, '<br>');
        return `
            <tr><td>ID</td><td>${row.id}</td></tr>
            <tr><td>제목</td><td>${row.title}</td></tr>
            <tr><td>글쓴이</td><td>${row.userId}</td></tr>
            <tr><td>최종수정시간</td><td>${row.ts}</td></tr>
            <tr><td>조회수</td><td>${row.hit}</td></tr>
            <tr><td>내용</td><td>${_content}</td></tr>`;
    }
}