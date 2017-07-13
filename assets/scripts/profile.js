document.addEventListener("DOMContentLoaded", function(event) {

  const profileRequest = getRequest(PROFILE_URL);

  fetchRequest(profileRequest, showProfile);

  function showProfile(response) {
    showUser(response)
    showCompletePeaks(response)
    showPendingPeaks(response)
  }

  function showUser(profile) {
    const source = document.querySelector('#profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile[0]);
    const getProfile = document.querySelector('.profile');
    const userDiv = document.createElement('div');
    userDiv.innerHTML = html;
    getProfile.appendChild(userDiv);
    profileClickHandlers()
  }

  function showCompletePeaks(profile) {
    const source = document.querySelector('#completed-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile[0]);
    const getCompletePeaks = document.querySelector('.completed');
    const peaksDiv = document.createElement('div');
    peaksDiv.innerHTML = html;
    getCompletePeaks.appendChild(peaksDiv);
  }

  function showPendingPeaks(profile) {
    console.log(profile);
    const source = document.querySelector('#goals-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile[0]);
    const getPendingPeaks = document.querySelector('.goals');
    const goalsDiv = document.createElement('div');
    goalsDiv.innerHTML = html;
    getPendingPeaks.appendChild(goalsDiv);
    addClickHandlersToGoal();
  }

  function profileClickHandlers() {
    const editProfile = document.querySelector('#edit-profile-btn');
    editProfile.addEventListener("click", event => {
      event.preventDefault();
      $('#edit-profile').modal();
    });
    const saveChanges = document.querySelector('#save-profile');
    saveChanges.addEventListener("click", event => {
      updateUserProfile();
    });
    const deleteProfile = document.querySelector('#delete-profile');
    deleteProfile.addEventListener("click", event => {
      deleteUserProfile();
    });
  }

  function updateUserProfile() {
    const updatedProfile = getUpdatedProfileData();
    const request = putRequest(PROFILE_URL, updatedProfile, "omit");
    fetchRequest(request, profileRedirect)
  }

  function deleteUserProfile() {
    const deleteProfileById = {
      id: userID
    }
    const request = deleteRequest(PROFILE_URL, deleteProfileById);
    fetchRequest(request, logout);
  }

  function getUpdatedProfileData() {
    return {
      id: userID,
      first_name: document.getElementById('update-first-name').value,
      last_name: document.getElementById('update-last-name').value,
      password: document.getElementById('update-password').value,
      image: document.getElementById('update-image').value,
      facebook_url: document.getElementById('update-facebook').value,
      instagram_url: document.getElementById('update-instagram').value,
      twitter_url: document.getElementById('update-twitter').value,
    }
  }


  let goalIDsForUpdate = [];
  function addClickHandlersToGoal() {
    const editGoal = document.querySelectorAll('.edit-goal-btn');
    [].forEach.call(editGoal, function(goal) {
      goal.addEventListener("click", function(e) {
        e.preventDefault();
        goalIDsForUpdate = []
        const accountPeakId = this.getAttribute('data-id');
        const peakId = this.getAttribute('data-peak_id');
        goalIDsForUpdate.push(accountPeakId,peakId)
        $('#edit-goal').modal();
      });
    });
    const completeGoal = document.getElementsByClassName('complete-goal-btn');
    [].forEach.call(completeGoal, function(complete) {
      complete.addEventListener("click", e => {
        e.preventDefault();
        const goalBody = getGoalFormData(goalIDsForUpdate);
        if (goalUpdateIsValid(goalBody)) {
          updateGoal(goalBody)
        } else {
          alert("Please fill out the form")
        }
      });
    });
    const deleteGoal = document.getElementsByClassName('delete-goal');
    [].forEach.call(deleteGoal, function(deleted) {
      deleted.addEventListener("click", e => {
        e.preventDefault();
        // console.log('Clicked Delete');
        deleteUserGoal(goalIDsForUpdate);
      })
    })
  }

  function goalUpdateIsValid(update) {
    const hasRating = (!isNaN(update.account_rating))
    const hasDate = typeof update.date_complete == "string" && update.date_complete.trim() != '';
    const hasNotes = typeof update.account_notes == "string" && update.account_notes.trim() != '';
    return hasRating && hasDate && hasNotes;
  }

  function updateGoal(goalBody) {
    const updateGoalBody = goalBody
    const request = putRequest(USER_PEAK_URL, updateGoalBody, "omit");
    // console.log(updateGoalBody);
    fetchRequest(request, profileRedirect)
  }

  function deleteUserGoal(id_array) {
    const deleteGoal = {
      id: id_array[0]
    }
    const request = deleteRequest(USER_PEAK_URL, deleteGoal);
    // console.log(deleteGoal);
    fetchRequest(request, profileRedirect);
  }

  function getGoalFormData(id_array) {
    return {
      id: id_array[0],
      account_rating: document.getElementsByName('update-rating')[0].value,
      account_image_url: document.getElementsByName('update-peak-image')[0].value,
      account_notes: document.getElementsByName('update-notes')[0].value,
      is_complete: true,
      date_complete: document.getElementsByName('update-date')[0].value,
      account_id: userID,
      peak_id: id_array[1]
    }
  }
});
