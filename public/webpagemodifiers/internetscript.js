// global script now handles the sidebar. page-specific behavior follows

document.addEventListener('DOMContentLoaded', function() {
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const dropdown = this.closest('.celeb-dropdown');
            dropdown.classList.toggle('active');
            const content = this.nextElementSibling;
            if (dropdown.classList.contains('active')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
}); //for dropdown

// Set login and register links with correct paths
const loginLink = document.querySelector('.login-link');
if (loginLink) loginLink.href = pathPrefix + 'login.html';

const registerLink = document.querySelector('.register-link');
if (registerLink) registerLink.href = pathPrefix + 'register.html';

// Profile circle click handler
const profileCircle = document.getElementById('profile-circle');
if (profileCircle) {
  profileCircle.addEventListener('click', () => {
    if (isSearchMember()) {
      window.location.href = pathPrefix + 'profile.html';
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.top-bar .search-bar') || document.getElementById('site-search');
  const topBar = document.querySelector('.top-bar');
  const overlay = document.getElementById('overlay');
  const sidebar = document.getElementById('sidebar');

  if (!searchInput || !topBar) return;

  let autocomplete = document.getElementById('search-autocomplete');
  if (!autocomplete) {
    autocomplete = document.createElement('div');
    autocomplete.id = 'search-autocomplete';
    autocomplete.className = 'search-autocomplete';
    if (searchInput.parentNode && searchInput.parentNode.classList.contains('search-input-wrapper')) {
      searchInput.parentNode.appendChild(autocomplete);
    } else {
      topBar.appendChild(autocomplete);
    }
  }

  const pagesPathMatch = location.href.match(/\/webpages\/(.+)$/);
  const pathAfterWebpages = pagesPathMatch ? pagesPathMatch[1] : '';
  const currentDepth = pathAfterWebpages ? pathAfterWebpages.split('/').length - 1 : 0;
  const pathPrefix = '../'.repeat(currentDepth);

  const searchPages = [
    { title: 'Home', subtitle: 'Main page', url: '../../index.html', image: '../../assets/museumlogo.jpg' },
    { title: 'News', subtitle: 'Latest headlines', url: 'news.html', image: '../../assets/museumlogo.jpg' },
    { title: 'Icons & Celebrities', subtitle: 'Celebrity stories', url: 'celebrities.html', image: '../../assets/museumlogo.jpg' },
    { title: 'Memes & Trends', subtitle: 'Viral culture', url: 'memes.html', image: '../../assets/museumlogo.jpg' },
    { title: 'Donatella VERSACE 💜', subtitle: 'Featured meme', url: 'memes/donatellaversacepurpleheart.html', image: '../../assets/donatella.jpg' },
    { title: 'Rise of the Internet', subtitle: 'Internet history', url: 'internet.html', image: '../../assets/museumlogo.jpg' },
    { title: 'About Us', subtitle: 'Project details', url: 'aboutus.html', image: '../../assets/museumlogo.jpg' },
    { title: 'Sources', subtitle: 'Citation list', url: 'sources.html', image: '../../assets/museumlogo.jpg' }
  ];

  function resolvePath(path) {
    return pathPrefix + path;
  }

  let activeIndex = -1;
  let currentItems = [];

  function setOverlayVisible(visible) {
    if (!overlay) return;
    if (visible) {
      overlay.style.display = 'block';
    } else if (!sidebar || sidebar.style.left !== '0px') {
      overlay.style.display = 'none';
    }
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = escapeRegExp(query);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  function setActiveItem(index) {
    const items = Array.from(autocomplete.querySelectorAll('.search-autocomplete-item'));
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === index);
    });
    activeIndex = index;
  }

  function hideDropdown() {
    autocomplete.classList.remove('active');
    autocomplete.style.display = 'none';
    setOverlayVisible(false);
  }

  function showDropdown() {
    autocomplete.classList.add('active');
    autocomplete.style.display = 'block';
    setOverlayVisible(true);
  }

  function renderDropdown(query) {
    const searchTerm = query.trim().toLowerCase();
    const buildItem = (page) => {
      const title = searchTerm ? highlightMatch(page.title, searchTerm) : page.title;
      const subtitle = searchTerm ? highlightMatch(page.subtitle, searchTerm) : page.subtitle;
      const imageUrl = resolvePath(page.image);
      return `
        <div class="search-autocomplete-item" data-url="${resolvePath(page.url)}">
          <div class="search-thumb"><img src="${imageUrl}" alt="${page.title}"></div>
          <div class="search-autocomplete-text">
            <span class="search-autocomplete-title">${title}</span>
            <span class="search-autocomplete-subtitle">${subtitle}</span>
          </div>
        </div>
      `;
    };

    activeIndex = -1;
    if (!searchTerm) {
      const items = searchPages.slice(0, 5).map(buildItem).join('');
      autocomplete.innerHTML = items;
      currentItems = Array.from(autocomplete.querySelectorAll('.search-autocomplete-item'));
      showDropdown();
      return;
    }

    const matchedPages = searchPages.filter(page => page.title.toLowerCase().includes(searchTerm));
    if (matchedPages.length > 0) {
      const items = matchedPages.slice(0, 5).map(buildItem).join('');
      autocomplete.innerHTML = items;
    } else {
      const memberText = isSearchMember() ? '<div class="search-autocomplete-note">Would you like to create a page for this?</div>' : '';
      autocomplete.innerHTML = `
        <div class="search-autocomplete-note">No matching pages yet for "${query}".</div>
        ${memberText}
      `;
    }

    currentItems = Array.from(autocomplete.querySelectorAll('.search-autocomplete-item'));
    setActiveItem(-1);
    showDropdown();
  }

  searchInput.addEventListener('focus', function() {
    renderDropdown(this.value);
  });

  searchInput.addEventListener('click', function() {
    renderDropdown(this.value);
  });

  searchInput.addEventListener('input', function() {
    renderDropdown(this.value);
  });

  if (overlay) {
    overlay.addEventListener('click', function() {
      hideDropdown();
    });
  }

  document.addEventListener('click', function(event) {
    if (!autocomplete.contains(event.target) && event.target !== searchInput) {
      hideDropdown();
    }
  });

  searchInput.addEventListener('keydown', function(event) {
    const items = Array.from(autocomplete.querySelectorAll('.search-autocomplete-item'));
    if (items.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      setActiveItem(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      setActiveItem(prevIndex);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      const url = items[activeIndex].dataset.url;
      if (url) window.location.href = url;
    } else if (event.key === 'Escape') {
      hideDropdown();
    }
  });

  autocomplete.addEventListener('click', function(event) {
    const item = event.target.closest('.search-autocomplete-item');
    if (!item) return;
    const url = item.dataset.url;
    if (url) {
      window.location.href = url;
    }
  });
});

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