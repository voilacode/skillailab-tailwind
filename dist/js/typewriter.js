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
