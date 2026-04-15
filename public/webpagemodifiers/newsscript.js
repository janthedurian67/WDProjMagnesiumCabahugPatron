(() => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  console.log('newsscript.js loaded, hamburger:', hamburger, 'sidebar:', sidebar, 'overlay:', overlay);

  // Open the sidebar
  function openSidebar() {
    console.log('openSidebar called');
    if (sidebar) sidebar.style.left = '0'; // Move sidebar into view
    if (overlay) overlay.style.display = 'block'; // Show overlay
  }

  // Close the sidebar
  function closeSidebar() {
    console.log('closeSidebar called');
    if (sidebar) sidebar.style.left = '-250px'; // Move sidebar out of view
    if (overlay) overlay.style.display = 'none'; // Hide overlay
  }

  // Toggle sidebar when hamburger is clicked
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      console.log('hamburger clicked');
      if (sidebar && sidebar.style.left === '0px') {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Close sidebar when overlay is clicked
  if (overlay) {
    overlay.addEventListener('click', () => {
      console.log('overlay clicked');
      closeSidebar();
    });
  }

  // Optional: Close sidebar when clicking outside of it
  document.addEventListener('click', (e) => {
    if (sidebar && hamburger && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      console.log('clicked outside');
      closeSidebar();
    }
  });
})();