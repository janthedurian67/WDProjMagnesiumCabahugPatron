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
//for sidebar

const btn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

function updateToggleText() {
  if (!btn) return;
  if (document.body.classList.contains("dark-theme")) {
    btn.textContent = "Light Mode";
  } else {
    btn.textContent = "Dark Mode";
  }
}

// apply stored preference
if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}
// reflect the correct button label (no-op if there is no button)
updateToggleText();

if (btn) {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    updateToggleText();
    
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });
}