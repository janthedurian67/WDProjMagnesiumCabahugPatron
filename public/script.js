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

  // Find the elements
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const profileCircle = document.getElementById("profile-circle");

  if (loggedIn === "true" && userData) {
    // --- USER IS LOGGED IN ---
    
    // 1. Remove/Hide Login and Register
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";

    // 2. Show and Setup Profile Circle
    if (profileCircle) {
      profileCircle.style.display = "flex"; // Show it
      profileCircle.style.cursor = "pointer";

      if (userData.profilePic) {
        // Show uploaded image
        profileCircle.style.backgroundImage = `url(${userData.profilePic})`;
        profileCircle.style.backgroundSize = "cover";
        profileCircle.style.backgroundPosition = "center";
        profileCircle.textContent = ""; 
      } else {
        // Fallback: Initial letter
        profileCircle.textContent = userData.username.charAt(0).toUpperCase();
        profileCircle.style.backgroundColor = "#333";
        profileCircle.style.color = "white";
        profileCircle.style.justifyContent = "center";
        profileCircle.style.alignItems = "center";
      }

      // 3. Navigation to Profile
      profileCircle.onclick = function() {
        window.location.href = "/public/webpages/profile.html";
      };
    }
  } else {
    // --- USER IS NOT LOGGED IN ---
    
    // 1. Show Login and Register
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";

    // 2. Hide Profile Circle
    if (profileCircle) profileCircle.style.display = "none";
  }
});