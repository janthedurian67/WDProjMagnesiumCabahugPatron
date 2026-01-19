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

// ===== COMMENT SECTION FUNCTIONALITY =====

const commentForm = document.getElementById('commentForm');
const commentName = document.getElementById('commentName');
const commentEmail = document.getElementById('commentEmail');
const commentText = document.getElementById('commentText');
const commentsContainer = document.getElementById('commentsContainer');
const commentCount = document.getElementById('commentCount');

// Storage key based on page name
const pageKey = '50cent_comments';

// Load comments on page load
function loadComments() {
  const comments = JSON.parse(localStorage.getItem(pageKey)) || [];
  displayComments(comments);
}

// Display comments
function displayComments(comments) {
  if (comments.length === 0) {
    commentsContainer.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    commentCount.textContent = '0';
    return;
  }

  commentsContainer.innerHTML = '';
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    
    const formattedDate = new Date(comment.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    commentElement.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${escapeHtml(comment.name)}</span>
        <span class="comment-date">${formattedDate}</span>
      </div>
      <p class="comment-text">${escapeHtml(comment.text)}</p>
    `;
    
    commentsContainer.appendChild(commentElement);
  });

  commentCount.textContent = comments.length;
}

// Handle form submission
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newComment = {
    name: commentName.value,
    email: commentEmail.value,
    text: commentText.value,
    date: new Date().toISOString()
  };

  // Get existing comments
  const comments = JSON.parse(localStorage.getItem(pageKey)) || [];

  // Add new comment
  comments.push(newComment);

  // Save to localStorage
  localStorage.setItem(pageKey, JSON.stringify(comments));

  // Clear form
  commentForm.reset();

  // Reload comments display
  displayComments(comments);

  // Show success message
  showSuccessMessage();
});

// Show temporary success message
function showSuccessMessage() {
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  successMsg.textContent = 'Comment posted successfully!';
  document.body.appendChild(successMsg);

  setTimeout(() => {
    successMsg.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => successMsg.remove(), 300);
  }, 3000);
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Load comments when page loads
loadComments();