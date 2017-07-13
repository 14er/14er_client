document.addEventListener("DOMContentLoaded", function(event) {

  function displayAllPeaks() {
    const selectPeaks = document.getElementById('select-peak-name');
    const request = getRequest(PEAK_URL);
    const getPeaks = fetchRequest(request, appendPeakTitlesToSelect);
  }

  displayAllPeaks();

  function appendPeakTitlesToSelect(response) {
    let peakOption;
    const getSelect = document.querySelector('#select-peak-name');
    response.forEach(peak => {
      peakOption = document.createElement('option');
      peakOption.innerHTML = peak.peak_name;
      peakOption.setAttribute('data-peak_id', peak.peak_id);
      getSelect.appendChild(peakOption);
    });
  }

  function get14erGoalData() {
    return {
      account_rating: 0,
      account_image_url: "",
      account_notes: "",
      is_complete: false,
      date_complete: (new Date()).toLocaleDateString(),
      account_id: parseInt(userID),
      peak_id: $('#select-peak-name option:selected').attr('data-peak_id')
    }
  }

  addNewGoalToProfile()

  function addNewGoalToProfile() {
    const addNew14 = document.querySelector('#add-new-14')
    addNew14.addEventListener("click", event => {
      event.preventDefault();
      const goalBody = get14erGoalData();
      const request = postRequest(USER_PEAK_URL, goalBody, "omit")
      fetchRequest(request, profileRedirect);
    });
  }

});
