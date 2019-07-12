let users = []; // объект с пользователями

var request = new XMLHttpRequest();
request.open('GET', 'https://studentschat.herokuapp.com/users', false);

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Обработчик успещного ответа
        var response = request.responseText;
        userList = Response;

        let usersGet = JSON.parse(response).map(
            function (obj) {
                return obj;
            }
        )

        for (let i = 0; i < usersGet.length; i++) {
            users.push({});
            for (key in usersGet[i]) {
                users[i][key] = usersGet[i][key];
            }
        }

    } else {
        // Обработчик ответа в случае ошибки
    }
};
request.onerror = function() {
    // Обработчик ответа в случае неудачного соеденения
};
request.send();