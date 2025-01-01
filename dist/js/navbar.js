document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const menuLinks = document.getElementById('menuLinks');
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');
  let activeDropdown = null;

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
    menuLinks.classList.toggle('hidden');
  });

  // Handle dropdown toggles
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = button.nextElementSibling;
      const arrow = button.querySelector('svg');

      // If clicking the active dropdown, close it
      if (dropdown === activeDropdown) {
        closeDropdown(dropdown, arrow);
        activeDropdown = null;
        return;
      }

      // Close any open dropdown
      if (activeDropdown) {
        const activeArrow =
          activeDropdown.previousElementSibling.querySelector('svg');
        closeDropdown(activeDropdown, activeArrow);
      }

      // Open the clicked dropdown
      openDropdown(dropdown, arrow);
      activeDropdown = dropdown;
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.parentElement.contains(e.target)) {
      const arrow = activeDropdown.previousElementSibling.querySelector('svg');
      closeDropdown(activeDropdown, arrow);
      activeDropdown = null;
    }
  });

  // Helper functions
  function openDropdown(dropdown, arrow) {
    dropdown.classList.add('active');
    arrow.style.transform = 'rotate(180deg)';
  }

  function closeDropdown(dropdown, arrow) {
    dropdown.classList.remove('active');
    arrow.style.transform = 'rotate(0deg)';
  }

  // Handle resize events
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      menuLinks.classList.remove('hidden');
    } else {
      menuLinks.classList.add('hidden');
    }
  });
});
