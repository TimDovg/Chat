/*
import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

const getHeader = () => {
  const helloWebpack = _.join(['Hello', 'webpack!'], ' ');
  console.log(helloWebpack);
  const element = document.createElement('h1');

  element.innerHTML = helloWebpack;

  return element;
};

document.body.appendChild(getHeader());

const o = {
  foo: {
    bar: null
  }
};

console.log(o?.foo?.bar?.baz ?? 'default');
*/


/*
const API_URL = 'https://studentschat.herokuapp.com/';

async function startApp() {
  try {
    const endpoint = 'users';
    const users = await callApi(endpoint, 'GET');
    return getUsersNames(users);
  } catch (error) {
    console.warn(error);
  } finally {

  }
}

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
      .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load')))
      .then(file => JSON.parse(atob(file.content)))
      .catch(error => { throw error });
}

function getUsersNames(users) {
  const names = users.map(it => it.username).join('\n');
  return names;
}
startApp();*/


  let usernames = [];

  var request = new XMLHttpRequest();
  request.open('GET', 'https://studentschat.herokuapp.com/users', true);

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