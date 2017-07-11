document.addEventListener("DOMContentLoaded", function(event) {
  const userID = localStorage.account_id;
  const PEAK_URL = BASE_URL + `/api/v1/peaks`
  const NEW_GOAL_URL = BASE_URL + `/api/v1/users/${userID}/new-goal`;

  function displayAllPeaks() {
    const selectPeaks = document.getElementById('select-peak-name');
    const request = getRequest(PEAK_URL);
    const getPeaks = fetchRequest(request, appendPeakTitles);
    selectPeaks.addEventListener("click", getPeaks);
    selectPeaks.removeEventListener("click", getPeaks);
    selectPeaks.addEventListener("change", event => {
      const selected = document.getElementById('select-peak-name').value
      console.log(selected);
    });
  }

  function appendPeakTitles(response) {
    let peakOption;
    const getSelect = document.querySelector('#select-peak-name');
    response.forEach(peak => {
      peakOption = document.createElement('option');
      peakOption.setAttribute('data-peak_id', peak.peak_id);
      peakOption.innerHTML = peak.peak_name;
      getSelect.appendChild(peakOption);
    });
  }

  displayAllPeaks();

  function newGoalData() {
    return {
      account_rating: 0,
      account_image_url: "",
      account_notes: "",
      is_complete: false,
      date_complete: new Date(),
      account_id: parseInt(userID),
      peak_id: selectValue.getAttribute('peak_id')
    }
  }

  // let selectValue = document.querySelector('select');
  // const data = newGoalData()
  // console.log(data);

  function addNewUserGoal() {

  }
});
