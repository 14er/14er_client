const BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000` : `https://co14.herokuapp.com`;
const userID = localStorage.account_id;
const PROFILE_URL = `${BASE_URL}/api/v1/users/${userID}`;
const PEAK_URL = `${BASE_URL}/api/v1/peaks`
const USER_PEAK_URL = `${BASE_URL}/api/v1/users/${userID}/peaks`;
const PROFILE_PAGE = `/account/profile.html?id=${userID}`;


function parseQueryString(queryString) {
  queryString = queryString.split('=')
  return queryString[1];
}

function parseJSON(response) {
  return response.json();
}

function throwError(res) {
  return new Error("Error")
}

function fetchRequest(request, callback) {
  return fetch(request)
    .then(parseJSON)
    .then(json => {
      callback(json);
    })
    .catch(throwError)
}

function createHeaders() {
  const headers = new Headers({
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.token}`
  })
  return headers;
}

function getRequest(url) {
  const request = new Request(url, {
    method: "GET",
    mode: "cors",
    headers: createHeaders()
  });
  return request;
}

function postRequest(url, body, credentials) {
  const request = new Request(url, {
    method: "POST",
    mode: "cors",
    headers: createHeaders(),
    body: JSON.stringify(body),
    // valid values: omit, same-origin, include
    credentials: credentials,
  })
  return request;
}

function putRequest(url, body, credentials) {
  const request = new Request(url, {
    method: "PUT",
    mode: "cors",
    headers: createHeaders(),
    body: JSON.stringify(body),
    // valid values: omit, same-origin, include
    credentials: credentials,
  })
  return request;
}

function deleteRequest(url, body) {
  const request = new Request(url, {
    method: "DELETE",
    mode: "cors",
    headers: createHeaders(),
    body: JSON.stringify(body),
  })
  return request;
}

// Email Validation
function validEmailAddress(useremail) {
  const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (filter.test(useremail)) {
    return true;
  } else {
    return false;
  }
}

// Password Validation. Password must contain be 8-16 charachters, contain 1 upper and lower case, 1 numeric and a special character
function validPassword(userPassword) {
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
  if (userPassword.match(password)) {
    return true;
  } else {
    return false;
  }
}

// Redirects
function setIdRedirect(response) {
  localStorage.account_id = response.id;
  window.location = `/account/profile.html?id=${response.id}`
}


function redirectIfLoggedIn() {
  if (localStorage.account_id) {
    window.location = `/account/profile.html?id=${localStorage.account_id}`
  }
}

function logout() {
  localStorage.clear()
  window.location = '/index.html'
}

function profileRedirect() {
  return window.location = PROFILE_PAGE;
}
