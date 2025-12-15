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
}); //for sidebar

document.addEventListener('DOMContentLoaded', function() {
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Find the parent dropdown element
            const dropdown = this.closest('.celeb-dropdown');
            
            // Toggle the 'active' class on the parent
            dropdown.classList.toggle('active');
            
            // Toggle the visibility of the content
            const content = this.nextElementSibling;
            if (dropdown.classList.contains('active')) {
                // Open: Set display to block (handled by CSS .active class)
                content.style.display = 'block';
            } else {
                // Close: Set display to none
                content.style.display = 'none';
            }
        });
    });
}); //for dropdown