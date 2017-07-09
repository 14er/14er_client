document.addEventListener("DOMContentLoaded", function(event) {
  const hrefLocation = window.location.href;
  const userID = parseQueryString(hrefLocation);
  const PROFILE_URL = BASE_URL + `/api/v1/users/${userID}`;

  const profileRequest = getRequest(PROFILE_URL);

  fetchRequest(profileRequest, showProfile);

  function showProfile(profile) {
    console.log(profile);
    const source = document.querySelector('#profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile[0]);
    const getProfile = document.querySelector('.profile');
    const userDiv = document.createElement('div');
    userDiv.innerHTML = html;
    getProfile.appendChild(userDiv);
    editProfileClick()
  }

  function editProfileClick() {
    const editProfile = document.querySelector('#edit-profile-btn');
    editProfile.addEventListener("click", event => {
      event.preventDefault();
      $('#edit-profile').modal();
    });
  }

  function updateProfile() {
    
  }

});
