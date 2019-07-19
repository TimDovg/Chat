document.getElementById('wrap').style.display = "none";

let usernames = []; // only names
let userNow = ''; // пользователь, который вошел
let userNowId = ''; // его Id
let users = []; // объект с пользователями (users = [{} {} {}]  прям все, что на бэкэ)
let active = 0;
let isAllSpaces = false;
let messages = [];
let chatRoomNow = 'MAIN';
let words = 0; // для отправки сообщения

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
            if (users[i].username == user) {
                userNowId = users[i].user_id;
                break;
            }
        }
        userNow = user;
        document.getElementById('userNow').innerHTML = 'Привет, ' + userNow + '!';
        document.getElementById('registr').parentNode.removeChild(document.getElementById('registr'));
        document.getElementById('wrap').style.display = "block";

        //вывод сообщений   userNow - это вошедший пользователь
        displayMessages();
        setInterval(displayMessages, 2000);
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


// count messages
countMessages();
setInterval(countMessages, 1000);


function countMessages() {
    if (document.getElementById('all-messages').textContent == messages.length) return;

    document.getElementById('all-messages').innerHTML = messages.length;
}


// подсчет введенных символов
function count() {
    if (event.keyCode == 8) words -= 1;
    if (event.keyCode == 13) {
        document.getElementById('text').value = document.getElementById('text').value.slice(0, -1);
        sendMessage();
    }
    else words++;

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

                    document.getElementById('friends').innerHTML += '<div onclick="newTab()" class="friend-searched">\n' +
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
    let tabs = document.getElementsByClassName('tab');;
    let tabsNames = [];

    for (let i = 0; i < tabs.length; i++) {
        tabsNames.push(tabs[i].textContent.trim());
    }

    document.getElementById('tabs').childNodes;

    if (event.target.textContent.trim() == '') return; //баг с пустой строкой, что-то с загрузкой данных
    if (document.getElementById('tabs').childElementCount >= 7) return alert('Слишком много чатрумов!');

    for (let i = 0; i < tabsNames.length; i++) {
       if (tabsNames[i] == event.target.textContent.trim()) return alert('Этот чат уже открыт!');
    }

    document.getElementById('tabs').innerHTML += '<div class="tab" onclick="selectTab()">' + event.target.textContent.trim() + ' <img src="img/cancel.svg" onclick="cancelTab()" ' +
        'onmouseout="cancelOut()" onmouseover="cancelOver()"></div>';
}


document.getElementsByClassName('tab')[0].style.background = '#B5B9E1';
function selectTab() {
    let allTabs = [];
    allTabs = document.getElementsByClassName('tab');

    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].style.background = '#D9DDFF';
    }       // #D9DDFF
    event.target.style.background = '#B5B9E1';
    chatRoomNow = event.target.textContent.trim();
}

function cancelTab() {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    setTimeout(cancelEnd, 10);
}

// БАГ НЕ МОЙ
function cancelEnd() {
    let allTabs = document.getElementsByClassName('tab');
    allTabs[allTabs.length - 1].style.background = '#B5B9E1';
    chatRoomNow = allTabs[allTabs.length - 1].textContent.trim();
}

//для textarea
function bold() {

    document.getElementById('text').value += '<b></b>';
    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    words -= 1;
    count();
}

function italic() {
    document.getElementById('text').value += '<i></i>';
    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    words -= 1;
    count();
}

function underline() {
    document.getElementById('text').value += '<u></u>';
    document.getElementById('text').focus();
    document.getElementById('text').setSelectionRange(document.getElementById('text').value.length - 4,
        document.getElementById('text').value.length - 4);
    words -= 1;
    count();
}

function lineBreak() {
    document.getElementById('text').value += '<br>';
    document.getElementById('text').focus();
    words -= 1;
    count();
}

function emoji() {
    let emoji = event.target.getAttribute('src').slice(10, -4);
    document.getElementById('text').value += '<' + emoji + '>';
    document.getElementById('text').focus();
    count();
}



function sendMessage() {
    if (document.getElementById('text').value.length > 500) return alert('Максимальная длина сообщения 500 символов!');
    if (document.getElementById('text').value.length == 0 || words <= 0 || isAllSpaces
        || document.getElementById('text').value == 0) return alert('Введите сообщение!');

    let message = document.getElementById('text').value;
    let messageDate = new Date();
    messageDate = ('0' + messageDate.getHours()).slice(-2) + ':' + ('0' + messageDate.getMinutes()).slice(-2);

    message = message.replace(/<happy>/g, '<img src="img/emoji/happy.svg" data-img="emoji">');
    message = message.replace(/<happy-1>/g, '<img src="img/emoji/happy-1.svg" data-img="emoji">');
    message = message.replace(/<happy-2>/g, '<img src="img/emoji/happy-2.svg" data-img="emoji">');
    message = message.replace(/<happy-3>/g, '<img src="img/emoji/happy-3.svg" data-img="emoji">');
    message = message.replace(/<in-love>/g, '<img src="img/emoji/in-love.svg" data-img="emoji">');
    message = message.replace(/<mad>/g, '<img src="img/emoji/mad.svg" data-img="emoji">');
    message = message.replace(/<nerd>/g, '<img src="img/emoji/nerd.svg" data-img="emoji">');
    message = message.replace(/<quiet>/g, '<img src="img/emoji/quiet.svg" data-img="emoji">');
    message = message.replace(/<sad>/g, '<img src="img/emoji/sad.svg" data-img="emoji">');
    message = message.replace(/<secret>/g, '<img src="img/emoji/secret.svg" data-img="emoji">');
    message = message.replace(/<smart>/g, '<img src="img/emoji/smart.svg" data-img="emoji">');
    message = message.replace(/<smiling>/g, '<img src="img/emoji/smiling.svg" data-img="emoji">');
    message = message.replace(/<surprised>/g, '<img src="img/emoji/surprised.svg" data-img="emoji">');
    message = message.replace(/<suspicious>/g, '<img src="img/emoji/suspicious.svg" data-img="emoji">');
    message = message.replace(/<tongue-out-1>/g, '<img src="img/emoji/tongue-out-1.svg" data-img="emoji">');
    message = message.replace(/<unhappy>/g, '<img src="img/emoji/unhappy.svg" data-img="emoji">');
    message = message.replace(/<unhappy>/g, '<img src="img/emoji/unhappy.svg" data-img="emoji">');

    document.getElementById('messages-container').innerHTML += '<div class="message right">' + message +
        '<br><span class="date">' + messageDate + '</span></div>';
    words = 0;
    document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;

    let date = new Date().toISOString();
    messages.push({"user_id":userNowId,"message":document.getElementById('text').value,"chatroom_id":chatRoomNow,"datetime":date});

    //отправка на сервер
    var request1 = new XMLHttpRequest();
    request1.open('POST', 'https://studentschat.herokuapp.com/messages', false);

    request1.onload = function() {
        // Обработчик ответа в случае удачного соеденения
    };

    request1.onerror = function() {
        alert('error')// Обработчик ответа в случае неудачного соеденения
    };
    request1.setRequestHeader('Content-Type', 'application/json');

    request1.send(JSON.stringify({
        datetime: date,
        message: document.getElementById('text').value,
        user_id: userNowId
    }));

    document.getElementById('text').value = '';
    document.getElementById('space').innerHTML = 0;
    document.getElementById('allChars').innerHTML = 0;
    document.getElementById('stopChars').innerHTML = 0;
    document.getElementById('letters').innerHTML = 0;
}



function displayMessages() {
    let continueDo = true;
    let daysAgo = 0;

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

            if (usersGet.length == messages.length) return continueDo = false;

            messages = [];
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

    if (continueDo == false) return;
    document.getElementById('messages-container').innerHTML = "";
    for (let i = 0; i < messages.length; i++) {
        let date = Date.parse(messages[i].datetime);
        date = new Date(date);
        date = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        let message = messages[i].message;
        message = message.replace(/<happy>/g, '<img src="img/emoji/happy.svg" data-img="emoji">');
        message = message.replace(/<happy-1>/g, '<img src="img/emoji/happy-1.svg" data-img="emoji">');
        message = message.replace(/<happy-2>/g, '<img src="img/emoji/happy-2.svg" data-img="emoji">');
        message = message.replace(/<happy-3>/g, '<img src="img/emoji/happy-3.svg" data-img="emoji">');
        message = message.replace(/<in-love>/g, '<img src="img/emoji/in-love.svg" data-img="emoji">');
        message = message.replace(/<mad>/g, '<img src="img/emoji/mad.svg" data-img="emoji">');
        message = message.replace(/<nerd>/g, '<img src="img/emoji/nerd.svg" data-img="emoji">');
        message = message.replace(/<quiet>/g, '<img src="img/emoji/quiet.svg" data-img="emoji">');
        message = message.replace(/<sad>/g, '<img src="img/emoji/sad.svg" data-img="emoji">');
        message = message.replace(/<secret>/g, '<img src="img/emoji/secret.svg" data-img="emoji">');
        message = message.replace(/<smart>/g, '<img src="img/emoji/smart.svg" data-img="emoji">');
        message = message.replace(/<smiling>/g, '<img src="img/emoji/smiling.svg" data-img="emoji">');
        message = message.replace(/<surprised>/g, '<img src="img/emoji/surprised.svg" data-img="emoji">');
        message = message.replace(/<suspicious>/g, '<img src="img/emoji/suspicious.svg" data-img="emoji">');
        message = message.replace(/<tongue-out-1>/g, '<img src="img/emoji/tongue-out-1.svg" data-img="emoji">');
        message = message.replace(/<unhappy>/g, '<img src="img/emoji/unhappy.svg" data-img="emoji">');
        message = message.replace(/<unhappy>/g, '<img src="img/emoji/unhappy.svg" data-img="emoji">');

        daysAgo = (Date.now() - Date.parse(messages[i].datetime)) / 8.64e7 ^ 0;
        if (daysAgo == 0) daysAgo = 'Сегодня';
        else if (daysAgo == 1) daysAgo = 'Вчера';
        else daysAgo = daysAgo + ' дней назад';

        // если дата повторяется
        let dateLast = [];
        if (document.getElementsByClassName('days-ago').length != 0) dateLast = document.getElementsByClassName('days-ago')[document.getElementsByClassName('days-ago').length - 1].textContent.trim();
        if (dateLast == daysAgo) {
            // если сообщение от userNow
            if (messages[i].user_id == userNowId) {
                document.getElementById('messages-container').innerHTML +='</div>' +
                    '<div class="message right">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }
            // если сообщение от того же юзера
            else if (i != 0 && messages[i].user_id == messages[i - 1].user_id) {
                document.getElementById('messages-container').innerHTML +='</div>' +
                    '<div class="message left">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }

            else {
                document.getElementById('messages-container').innerHTML +='</div>' +
                    '<div class="name">' + getName(messages[i].user_id) + '</div>' + '<div class="message left">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }
        }
        else {
            // дата не повторяется
            // если сообщение от userNow
            if (messages[i].user_id == userNowId) {
                document.getElementById('messages-container').innerHTML += '<div class="days-ago"><hr>' + daysAgo + '</div>' +
                    '<div class="message right">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }
            // если сообщение от того же юзера
            else if (i != 0 && messages[i].user_id == messages[i - 1].user_id) {
                document.getElementById('messages-container').innerHTML += '<div class="days-ago"><hr>' + daysAgo + '</div>' +
                    '<div class="message left">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }

            else {
                document.getElementById('messages-container').innerHTML += '<div class="days-ago"><hr>' + daysAgo + '</div>' +
                    '<div class="name">' + getName(messages[i].user_id) + '</div>' + '<div class="message left">' + message +
                    '<br><span class="date">' + date + '</span></div>';
            }
        }
    }
    setTimeout(scrollBottom, 10); // БАГ НЕ МОЙ
}

function scrollBottom() {
    document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
}

function getName(userId) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id == userId) return users[i].username;
    }
}

function downArrowOver() {
    document.getElementById('down-arrow').src = 'img/down-arrow-over.svg';
}

function downArrowOut() {
    document.getElementById('down-arrow').src = 'img/down-arrow.svg';
}