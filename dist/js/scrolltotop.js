// scroll to top
window.addEventListener('scroll', function () {
  var scrollToTopButton = document.getElementById('scrollToTop');
  if (window.scrollY > 200) {
    scrollToTopButton.classList.remove('opacity-0');
  } else {
    scrollToTopButton.classList.add('opacity-0');
  }
});

document.getElementById('scrollToTop').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Scroll to top button logic
window.addEventListener('scroll', function () {
  var scrollToTopButton = document.getElementById('scrollToTop');
  // Check if user has scrolled more than 200px
  if (window.scrollY > 200) {
    scrollToTopButton.classList.remove('opacity-0');
    scrollToTopButton.classList.add('visible'); // Add a class to make the button visible
    scrollToTopButton.classList.remove('hidden');
  } else {
    scrollToTopButton.classList.add('opacity-0');
    scrollToTopButton.classList.remove('visible'); // Hide the button
    scrollToTopButton.classList.add('hidden');
  }
});

document.getElementById('scrollToTop').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
