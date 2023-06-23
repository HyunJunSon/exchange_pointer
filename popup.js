document.addEventListener("DOMContentLoaded", function () {
    var optionsLink = document.getElementById("options-link");
  
    // Open the options page when the user clicks on "Options" link
    optionsLink.addEventListener("click", function () {
      chrome.runtime.openOptionsPage();
    });
  });