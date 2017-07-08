document.addEventListener("DOMContentLoaded", function(event) {
  redirectIfLoggedIn();
  const SIGNUP_URL = BASE_URL + `/auth/signup`;

  function getUserSignupInfo() {
    return {
      first_name:document.getElementById('signup-first-name').value,
      last_name: document.getElementById('signup-last-name').value,
      email: document.getElementById('signup-email').value.toLowerCase(),
      password: document.getElementById('signup-password').value,
      image: document.getElementById('signup-image').value,
      facebook_url: document.getElementById('signup-facebook').value,
      instagram_url: document.getElementById('signup-instagram').value,
      twitter_url: document.getElementById('signup-twitter').value
    }
  }

  function submitSignupForm() {
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', event => {
      event.preventDefault();
      const signupInfo = getUserSignupInfo();
      if (validPassword(signupInfo.password) === true && validEmailAddress(signupInfo.email) === true) {
        const request = postRequest(SIGNUP_URL, signupInfo, "omit");
        fetchSignup(request)
      } else {
        alert("Invalid Email and/or Password")
      }
    });
  }

  function fetchSignup(request) {
    return fetch(request)
      .then(signUpCheckStatus)
      .then(parseJSON)
      .then(setJWTSignup)
      .catch(throwError)
  }

  function setJWTSignup(response) {
    localStorage.token = response.token;
    localStorage.account_id = response.id;
    if (response.message == "Email is already in use") {
      alert("Email is already in use")
    } else {
      setIdRedirect(response);
    }
  }

  function signUpCheckStatus(response) {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    } else {
      return response
    }
  }

  submitSignupForm();

});
