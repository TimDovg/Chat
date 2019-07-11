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