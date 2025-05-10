export const BASE_URL = 'http://localhost:3001';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password, userName) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": userName
    })
  })
    .then(checkResponse)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res))
      return res;
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        return res;
      }
    })
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
}; 