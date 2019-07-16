document.getElementById('wrap').style.display = "none";

let usernames = []; // only names
let userNow = ''; // пользователь, который вошел
let userNowId = ''; // его Id
let users = []; // объект с пользователями (users = [{} {} {}]  прям все, что на бэкэ)
let active = 0;
let isAllSpaces = false;
let messages = [];
let tabsOpened = [];

function checkUser() {
    var user = document.getElementsByTagName("input")[0];
    user = user.value.trim();

    let allow = false;
    usernames.forEach(
        function (usr) {
            if (usr == user) allow = true;
        }
    );

    if (allow) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == userNow) {
                userNowId = users[i].user_id;
                break;
            }
        }
        userNow = user;
        document.getElementById('userNow').innerHTML = 'Привет, ' + userNow + '!';
        document.getElementById('registr').style.display = "none";
        document.getElementById('wrap').style.display = "block";
    }
    else {
        alert('Пользователь не найден! \n' +
            'Пожалуйста, зарегистрируйтесь!');
    }

}


function registerUser() {
    var user = document.getElementsByTagName("input")[0];
    user = user.value.trim();
    let allow = true;

    usernames.forEach(
        function (usr) {
            if (usr == user) allow = false;
        }
    );

    if (user == '') return alert('Введена пустая строка!');
    if (!allow) return alert('Пользователь с таким именем уже сущуствует!');

    var request1 = new XMLHttpRequest();
    request1.open('POST', 'https://studentschat.herokuapp.com/users/register', false);

    request1.onload = function() {
        // Обработчик ответа в случае удачного соеденения
    };

    request1.onerror = function() {
        alert('error')// Обработчик ответа в случае неудачного соеденения
    };
    request1.setRequestHeader('Content-Type', 'application/json');

    request1.send(JSON.stringify({username: user}));

    alert('Вы успешно зарегистрированы!');
    window.location.reload();
}



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



// вывод пользователей
displayUsers();
setInterval(displayUsers, 10000);



//вывод сообщений   userNow - это вошедший пользователь
displayMessages();
setInterval(displayMessages, 1000);



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

    if (allChars == space) isAllSpaces = true;
    else isAllSpaces = false;
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

        let namesSearched = [];
        for (let i = 0; i < usernames.length; i++) {
            if (strConstr.test(usernames[i])) {             // БАГ С ПРОВЕРКОЙ - РАБОТАЕТ ЧЕРЕЗ РАЗ
                namesSearched.push(usernames[i]);
                continue;
            }
            if (strConstr.test(usernames[i])) {
                namesSearched.push(usernames[i]);
                continue;
            }
        }

        let status = '';
        let img = "img/noname.jpg";

        for (let i = 0; i < namesSearched.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].username == namesSearched[i]) {
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



function displayUsers() {
    let continueDo = true;

    if (document.getElementById('search').value != '') return;

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

            if (usersGet[usersGet.length - 1].username == usernames[usernames.length - 1]) continueDo = false;

            users = [];
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

    if (!continueDo) return;
    // вспомогательный массив
    usernames = [];
    for (let i = 0; i < users.length; i++) {
        usernames.push(users[i].username);
    }

    // подсчет активных пользователей
    active = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "active") active++;
    }

    document.getElementById('active-users').innerHTML = active;


    // стираем
    let friends = document.getElementsByClassName('friend');
    while (friends.length) {
        friends[0].parentNode.removeChild(friends[0]);
    }


    let status = '';
    let img = "img/noname.jpg";

    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "active") status = "img/online.svg";
        if (users[i].status === "leave") status = "img/leave.svg";
        if (users[i].status === "inactive") status = "img/offline.svg";

        document.getElementById('friends').innerHTML += '<div class="friend" onclick="newTab()">\n' +
            '            <img src=' + img + ' alt=' + img + '>\n' + users[i].username +
            '             <img src=' + status + ' data-img="status">\n' +
            '        </div>';
    }
}

function cancelOver() {
    event.target.src = "img/cancel-over.svg";
}

function cancelOut() {
    event.target.src = "img/cancel.svg";
}

function newTab() {
    if (event.target.textContent.trim() == '') return; //баг с пустой строкой, что-то с загрузкой данных
    if (document.getElementById('tabs').childElementCount >= 8) return alert('Слишком много чатрумов!');

    for (let i = 0; i < tabsOpened.length; i++) {
       if (tabsOpened[i] == event.target.textContent.trim()) return alert('Этот чат уже открыт!');
    }

    tabsOpened.push(event.target.textContent.trim());

    document.getElementById('tabs').innerHTML += '<div>' + event.target.textContent.trim() + ' <img src="img/cancel.svg" onclick="cancelTab()" ' +
        'onmouseout="cancelOut()" onmouseover="cancelOver()"></div>';
}

function cancelTab() {
    for (let i = 0; i < tabsOpened.length; i++) {
        if (event.target.parentNode.textContent.trim() == tabsOpened[i]) tabsOpened.splice(i, 1);
    }
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
}

//для textarea
function bold() {

    document.getElementById('text').value += '<b></b>';

    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    count();
}

function italic() {
    document.getElementById('text').value += '<i></i>';
    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    count();
}

function underline() {
    document.getElementById('text').value += '<u></u>';
    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    count();
}

function emoji() {
    let emoji = event.target.getAttribute('src').slice(10, -4);
    document.getElementById('text').value += '<' + emoji + '>';
    document.getElementById('text').focus();
    count();
}


function displayMessages() {
    messages = []; // массив сообщений

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
}



function sendMessage() {
    if (document.getElementById('text').value.length >= 500) return alert('Максимальная длина сообщения 500 символов!');
    if (document.getElementById('text').value.length == 0) return alert('Введите сообщение!');
    if (isAllSpaces || document.getElementById('text').value == 0) return alert('Введена пустота!\nХоть смайлик отошли :)');

    console.log(messages);
}