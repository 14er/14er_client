document.addEventListener("DOMContentLoaded", function(event) {
  const userID = localStorage.account_id;
  const USER_PEAK = BASE_URL + `/api/v1/users/${userID}/new-peak`;
  const RANGE_URL = BASE_URL + `/api/v1/ranges`
  const PEAK_URL = BASE_URL + `/api/v1/peaks`
  console.log(USER_PEAK);
  console.log(RANGE_URL);
  console.log(PEAK_URL);
});
