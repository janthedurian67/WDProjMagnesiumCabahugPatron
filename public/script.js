const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.style.left = '0';
  overlay.style.display = 'block';
}

function closeSidebar() {
  sidebar.style.left = '-250px';
  overlay.style.display = 'none';
}

hamburger.addEventListener('click', () => {
  if (sidebar.style.left === '0px') {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    closeSidebar();
  }
});

function navigate(section) {
  alert(`Navigate to ${section} section (to be implemented)`);
}
