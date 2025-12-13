const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');
const sidebarLinks = document.querySelectorAll('#sidebar a');

function toggleSidebar(){
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}
hamburger.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
sidebarLinks.forEach(link=>{
  link.addEventListener('click', ()=>{
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
});
