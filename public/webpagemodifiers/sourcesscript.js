// All DOM-dependent behavior is wrapped so we can safely query elements anywhere in the
// document and support buttons added after the script tag. This also prevents the file from
// throwing when pages do not include every element (e.g. login/register have no sidebar).

(() => {
  // --- sidebar toggling (if present) --------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function openSidebar() {
    if (sidebar) sidebar.style.left = '0';
    if (overlay) overlay.style.display = 'block';
  }

  function closeSidebar() {
    if (sidebar) sidebar.style.left = '-250px';
    if (overlay) overlay.style.display = 'none';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (sidebar && sidebar.style.left === '0px') {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('click', (e) => {
    if (
      sidebar && hamburger &&
      !sidebar.contains(e.target) && !hamburger.contains(e.target)
    ) {
      closeSidebar();
    }
  });
})();

document.addEventListener("DOMContentLoaded", function() {
    const loggedIn = localStorage.getItem("loggedIn");
    const userData = JSON.parse(localStorage.getItem("poparchivesUser"));
    
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
    const profileCircle = document.getElementById("profile-circle");

    if (loggedIn === "true" && userData) {
        // 1. Hide Login and Register
        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";

        // 2. Show and Update Profile Circle
        if (profileCircle) {
            profileCircle.style.display = "block";
            profileCircle.style.cursor = "pointer";
            
            // If user has uploaded an image, show it
            if (userData.profilePic) {
                profileCircle.style.backgroundImage = `url(${userData.profilePic})`;
                profileCircle.style.backgroundSize = "cover";
                profileCircle.style.backgroundPosition = "center";
            }

            // 3. Click image to go to profile
            profileCircle.addEventListener("click", function() {
                // Adjust path based on where the file is located
                window.location.href = "profile.html"; 
            });
        }
    } 
});