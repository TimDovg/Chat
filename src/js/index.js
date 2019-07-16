// вывод времени и подсчет вермени в онлайне
let min = -1;
window.onload = function(){
    (function(){
        let date = new Date();
        let time = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
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
displayUsers();
setTimeout(displayUsers, 10000);



//вывод сообщений   userNow - это вошедший пользователь
let messages = []; // массив сообщений

var request = new XMLHttpRequest();
request.open('GET', 'https://studentschat.herokuapp.com/messages', false);

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



// count messages
let messagesQuantity = 0;

for (let i = 0; i < messages.length; i++) {
    if (messages.user_id != userNowId) messagesQuantity++;
}
document.getElementById('all-messages').innerHTML = messagesQuantity;



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



// отправка сообщений   userNow - это вошедший пользователь
function sendMessage() {
    if (document.getElementById('text').value.length >= 500) return alert('Максимальная длина сообщения 500 символов!');
    if (document.getElementById('text').value.length == 0) return alert('Введите сообщение!');

    console.log(messages);
}

function exit() {
    window.location.reload();
}

// вывод пользователей при поиске
// let usernames = []; // only names
function search() {
    let friendsSer = document.getElementsByClassName('friend-searched'); // очистка предыдущего поиска
    while (friendsSer.length) {
        friendsSer[0].parentNode.removeChild(friendsSer[0]);
    }

    let str = document.getElementById('search').value;

    let strConstr = new RegExp (str, 'gi');
    if (str) {
        let friends = document.getElementsByClassName('friend');
        for (let i = 0; i < friends.length; i++) {
            friends[i].style.display = "none";
        }

        let namesSerched = [];
        for (let i = 0; i < usernames.length; i++) {
            if (strConstr.test(usernames[i])) namesSerched.push(usernames[i]);
        }

        let status = '';
        let img = "img/noname.jpg";

        for (let i = 0; i < namesSerched.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].username == namesSerched[i]) {
                    if (users[j].status === "active") status = "img/online.svg";
                    if (users[j].status === "leave") status = "img/leave.svg";
                    if (users[j].status === "inactive") status = "img/offline.svg";

                    document.getElementById('friends').innerHTML += '<div class="friend-searched">\n' +
                        '            <img src='+img+' alt='+img+'>\n' + users[j].username +
                        '             <img src='+status+' data-img="status">\n' +
                        '        </div>';
                }
            }
        }

        document.getElementById('search').value = str;
        document.getElementById('search').focus();
    }
    else {
        let friends = document.getElementsByClassName('friend');
        for (let i = 0; i < friends.length; i++) {
            friends[i].style.display = "flex";
        }

        let friendsSer = document.getElementsByClassName('friend-searched');
        while (friendsSer.length) {
            friendsSer[0].parentNode.removeChild(friendsSer[0]);
        }

    }
}


// если нажал крестик на input search
function onSearch(input) {
    if(input.value == "") {
        let friends = document.getElementsByClassName('friend');
        for (let i = 0; i < friends.length; i++) {
            friends[i].style.display = "flex";
        }

        let friendsSer = document.getElementsByClassName('friend-searched');
        while (friendsSer.length) {
            friendsSer[0].parentNode.removeChild(friendsSer[0]);
        }
    }
}



// users = [{} {} {}]  прям все, что на бэкэ
function displayUsers() {
    let status = '';
    let img = "img/noname.jpg";

    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "active") status = "img/online.svg";
        if (users[i].status === "leave") status = "img/leave.svg";
        if (users[i].status === "inactive") status = "img/offline.svg";

        document.getElementById('friends').innerHTML += '<div class="friend">\n' +
            '            <img src=' + img + ' alt=' + img + '>\n' + users[i].username +
            '             <img src=' + status + ' data-img="status">\n' +
            '        </div>';
    }
}