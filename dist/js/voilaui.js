// typewriter
const sentence = 'Building Your \n Future?';
let currentLetterIndex = 0;
const textElement = document.getElementById('text');
let isTypewriting = true;

function showNextLetter() {
  if (isTypewriting && currentLetterIndex < sentence.length) {
    const letter = sentence[currentLetterIndex];

    if (letter === '?') {
      textElement.innerHTML += `<span class="color-change">${letter}</span>`;
    } else if (currentLetterIndex > sentence.indexOf('?')) {
      textElement.innerHTML += `<span class="color-change">${letter}</span>`;
    } else {
      textElement.innerHTML += `<span>${letter}</span>`;
    }
    currentLetterIndex++;
  } else {
    isTypewriting = false;
    clearInterval(typewriterInterval); // Stop the interval once typing is done
  }
  // Update the cursor position
  updateCursor();
}

function updateCursor() {
  // Remove existing cursor
  document.querySelectorAll('.cursor').forEach((cursor) => cursor.remove());

  // Add the cursor at the end
  if (
    isTypewriting ||
    (!isTypewriting && currentLetterIndex === sentence.length)
  ) {
    textElement.innerHTML += `<span class="cursor text-gray-500">|</span>`;
  }
}

const typewriterInterval = setInterval(() => {
  showNextLetter();
}, 150);

const style = document.createElement('style');
style.innerHTML = `
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    .cursor {
        animation: blink 1s step-end infinite;
    }
`;
document.head.appendChild(style);

// loading fade effect
function fadeInAll() {
  const sections = document.querySelectorAll('.fade-section');
  sections.forEach((section) => {
    section.classList.add('fade-in');
  });
}

function fadeOutAll() {
  const sections = document.querySelectorAll('.fade-section');
  sections.forEach((section) => {
    section.classList.remove('fade-in');
  });
}
function fadeInOnScroll() {
  const sections = document.querySelectorAll('.fade-section');

  // Options for the observer
  const options = {
    threshold: 0.2, // Trigger when 20% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Stop observing once faded in
      }
    });
  }, options);

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Initialize the observer function
fadeInOnScroll();

// college scroll
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.transition-opacity');
  section.classList.remove('opacity-0');
});

const scrollContainer = document.getElementById('scrollContainer');
const imageContainer = document.getElementById('imageContainer');

// Duplicate the images to create an infinite scrolling effect
const clone = imageContainer.cloneNode(true);
imageContainer.appendChild(clone);

let scrollSpeed = 1; // Change this value to adjust the speed of the scroll
let scrollPosition = 0;

setInterval(() => {
  scrollPosition += scrollSpeed;
  if (scrollPosition >= imageContainer.scrollWidth / 2) {
    scrollPosition = 0;
  }
  scrollContainer.scrollLeft = scrollPosition;
}, 10);

/**
 * Accordion script to handle multiple accordions
 * that have class name accordion
 */
let acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;

    // Close all other panels
    let allPanels = document.getElementsByClassName('panel');
    for (let j = 0; j < allPanels.length; j++) {
      if (allPanels[j] !== panel) {
        allPanels[j].style.display = 'none';
        // Remove "active" class from other buttons
        acc[j].classList.remove('active');
        // Reset the icon for other buttons
        resetIcon(acc[j]);
      }
    }

    if (panel.style.display === 'block') {
      panel.style.display = 'none';
      resetIcon(this);
    } else {
      panel.style.display = 'block';
      toggleIcon(this);
    }
  });
}

function resetIcon(element) {
  let icon = element.querySelector('.icon');
  if (icon) {
    icon.innerHTML = '+';
  }
}

function toggleIcon(element) {
  let icon = element.querySelector('.icon');
  if (icon) {
    icon.innerHTML = '-';
  }
}

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

const targetStudents = 1059820;
const targetColleges = 568;
const targetCompanies = 102;
const targetCand = 10000;

// Total duration for each counter (in milliseconds)
const duration = 5000;

// Function to animate a counter from 0 to target
function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);
  let startCount = 0;
  const increment = target / (duration / 10);

  function updateCounter() {
    startCount += increment;
    if (startCount < target) {
      element.textContent = Math.floor(startCount);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Initialize counters
animateCounter('counterStudents', targetStudents);
animateCounter('counterCollege', targetColleges);
animateCounter('counterCompanies', targetCompanies);
animateCounter('counterCand', targetCand);

// videos
const videos = document.querySelectorAll('.custom-video');

videos.forEach((video) => {
  video.addEventListener('play', () => {
    videos.forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

const videoContainers = document.querySelectorAll('.review');

videoContainers.forEach((container) => {
  const video = container.querySelector('video');
  const playPauseBtn = container.querySelector('.playPauseBtn');
  const playIcon = container.querySelector('.playIcon');
  const pauseIcon = container.querySelector('.pauseIcon');

  playPauseBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
      video.play();
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    } else {
      video.pause();
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    }
  });
});
