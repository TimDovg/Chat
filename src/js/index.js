// вывод времени и подсчет вермени в онлайне
let min = -1;
window.onload = function(){
    (function(){
        let date = new Date();
        let time = date.getHours() + ':' + date.getMinutes() + ':' + ('0' + date.getSeconds()).slice(-2);
        document.getElementById('time-now').innerHTML = time;
        window.setTimeout(arguments.callee, 1000);
    })();

    (function(){
        min++;
        let timeInOnline = min + ' мин)';
        document.getElementById('time-in-online').innerHTML = timeInOnline;
        window.setTimeout(arguments.callee, 60000);
    })();
};

// подсчет активных пользователей
setTimeout(countActive, 100);
    function countActive() {
        let active = 0;

        for (let i = 0; i < users.length; i++) {
            if (users[i].status === "active") active++;
        }

        document.getElementById('active-users').innerHTML = active;
    }

// вывод пользователей
setTimeout(displayUsers, 100);
function displayUsers() {
    let status = '';
    let img = "img/noname.jpg";
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "active") status = "img/online.svg";
        if (users[i].status === "leave") status = "img/leave.svg";
        if (users[i].status === "offline") status = "img/offline.svg";

        document.getElementById('friends').innerHTML += '<div class="friend">\n' +
            '            <img src='+img+' alt='+img+'>\n' + users[i].username +
            '             <img src='+status+' data-img="status">\n' +
            '        </div>';
    }
}


function sendMessage() {
    // получение массива сообщений
    let messages = [];

    var request = new XMLHttpRequest();
    request.open('GET', 'https://studentschat.herokuapp.com/messages', true);

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
                messages.push({});
                for (key in usersGet[i]) {
                    messages[i][key] = usersGet[i][key];
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

    console.log(messages);
    alert(messages[0]);
}