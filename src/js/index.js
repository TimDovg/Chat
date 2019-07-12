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

        let active = 0;

        for (let i = 0; i < users.length; i++) {
            if (users[i].status === "active") active++;
        }

        document.getElementById('active-users').innerHTML = active;

// вывод пользователей
    let status = '';
    let img = "img/noname.jpg";
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "active") status = "img/online.svg";
        if (users[i].status === "leave") status = "img/leave.svg";
        if (users[i].status === "inactive") status = "img/offline.svg";

        document.getElementById('friends').innerHTML += '<div class="friend">\n' +
            '            <img src='+img+' alt='+img+'>\n' + users[i].username +
            '             <img src='+status+' data-img="status">\n' +
            '        </div>';
    }



    // подсчет введенных символов

function count() {
    let string = document.getElementById('text').value;
    let space = 0;
    let allChars = string.length;
    let stopChars = 0;
    let letters = 0;
    let compareLetters = /[A-Z]|[a-z]|[а-я]|[А-Я]/;

    for (let i = 0; i < string.length; i++){
        if (string[i] === ' ') space++;
        if (string[i] === '.' || string[i] === ',' || string[i] === '!' || string[i] === '?' || string[i] === ':' || string[i] === ';'
            || string[i] === '-') stopChars++;
        if (compareLetters.test(string[i])) letters++;
    }

    document.getElementById('space').innerHTML = space;
    document.getElementById('allChars').innerHTML = allChars;
    document.getElementById('stopChars').innerHTML = stopChars;
    document.getElementById('letters').innerHTML = letters;
}



// отправка сообщений
function sendMessage() {
    // получение массива сообщений
    let messages = [];

    if (document.getElementById('text').value.length >= 500) return alert('Максимальная длина сообщения 500 символов!');

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