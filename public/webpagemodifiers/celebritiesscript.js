// sidebar behavior is handled globally; only drop‑down logic remains below

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
