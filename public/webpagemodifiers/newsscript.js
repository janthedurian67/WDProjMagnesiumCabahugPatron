const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Open the sidebar
function openSidebar() {
  sidebar.style.left = '0'; // Move sidebar into view
  overlay.style.display = 'block'; // Show overlay
}

// Close the sidebar
function closeSidebar() {
  sidebar.style.left = '-250px'; // Move sidebar out of view
  overlay.style.display = 'none'; // Hide overlay
}

// Toggle sidebar when hamburger is clicked
hamburger.addEventListener('click', () => {
  if (sidebar.style.left === '0px') {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Close sidebar when overlay is clicked
overlay.addEventListener('click', closeSidebar);

// Optional: Close sidebar when clicking outside of it
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    closeSidebar();
  }
});