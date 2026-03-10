// All DOM-dependent behavior is wrapped so we can safely query elements anywhere in the
// document and support buttons added after the script tag. This also prevents the file from
// throwing when pages do not include every element (e.g. login/register have no sidebar).

document.addEventListener('DOMContentLoaded', () => {
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
});