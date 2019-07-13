// аутентификация
let usernames = []; // only names

  var request = new XMLHttpRequest();
  request.open('GET', 'https://studentschat.herokuapp.com/users', false);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Обработчик успещного ответа
      var response = request.responseText;
      userList = Response;

      let users = JSON.parse(response).map(
          function (obj) {
            return obj.username;
          }
      )

      for (let i = 0; i < users.length; i++) {
        usernames.push(users[i]);
      }

    } else {
      // Обработчик ответа в случае ошибки
    }
  };
  request.onerror = function() {
    // Обработчик ответа в случае неудачного соеденения
  };
  request.send();


function checkUser() {
  var user = document.getElementsByTagName("input")[0];
  user = user.value;

  let allow = false;
  usernames.forEach(
      function (usr) {
        if (usr == user) allow = true;
      }
  );

  if (allow) {
    alert('Привет, ' + user + '!');
    window.location.replace("https://timdovg.github.io/Chat/src/index.html");
  }
  else {
    alert('Пользователь не найден! \n' +
      'Пожалуйста, зарегистрируйтесь!');
    window.location.replace("https://timdovg.github.io/Chat/src/registration.html");
  }

}


function registerUser() {
  var user = document.getElementsByTagName("input")[0];
  user = user.value;

  let allow = true;
  usernames.forEach(
      function (usr) {
        if (usr == user) allow = false;
      }
  );

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
}