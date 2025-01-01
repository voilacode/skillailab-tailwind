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
