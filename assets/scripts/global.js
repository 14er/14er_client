let BASE_URL;

(function getBaseURL() {
  if (window.location.hostname == "localhost") {
    BASE_URL = `http://localhost:3000`
  } else {
    BASE_URL;
  }
})();

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

function getRequest(url) {
  const request = new Request(url, {
    method: "GET",
    mode: "cors"
  });
  return request;
}

function postRequest(url, body) {
  const request = new Request(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
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
function setIdRedirect(result) {
  localStorage.user_id = result.id;
  // window.location = `/account/user.html?id=${result.id}`
}


function redirectIfLoggedIn() {
  if (localStorage.user_id) {
    // window.location = `/account/user.html?id=${localStorage.user_id}`
  }
}

function logout() {
  localStorage.clear()
  window.location = '/index.html'
}
