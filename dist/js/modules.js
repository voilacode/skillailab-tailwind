/**
 * Safely injects HTML content into a specified element, preserving SVGs and special characters
 * @param {string} filePath - Path to the HTML file to inject
 * @param {HTMLElement} targetElem - The target HTML element for content injection
 */
async function injectHTML(filePath, targetElem) {
  try {
    // Fetch the HTML file
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${filePath} (Status: ${response.status})`
      );
    }

    // Get the HTML content
    const htmlContent = await response.text();

    // Create a new DOMParser instance
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Clear existing content
    while (targetElem.firstChild) {
      targetElem.removeChild(targetElem.firstChild);
    }

    // Clone and inject each node from the parsed document's body
    Array.from(doc.body.children).forEach((child) => {
      const clone = document.importNode(child, true);
      targetElem.appendChild(clone);
    });

    // Handle scripts after DOM insertion
    await handleScripts(targetElem);
  } catch (error) {
    console.error(`Error injecting HTML from ${filePath}:`, error);
    targetElem.innerHTML = `<div class="error">Failed to load content from ${filePath}</div>`;
  }
}

/**
 * Handles script execution for both inline and external scripts
 * @param {HTMLElement} container - The element containing scripts to process
 */
async function handleScripts(container) {
  const scripts = container.getElementsByTagName('script');

  for (let i = 0; i < scripts.length; i++) {
    const oldScript = scripts[i];
    const newScript = document.createElement('script');

    // Copy script attributes
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });

    // Handle external scripts
    if (oldScript.src) {
      try {
        await loadExternalScript(newScript);
      } catch (error) {
        console.error('Error loading external script:', error);
      }
    } else {
      // Handle inline scripts
      newScript.textContent = oldScript.textContent;
    }

    // Replace the old script with the new one
    oldScript.parentNode.replaceChild(newScript, oldScript);
  }
}

/**
 * Loads an external script and returns a promise that resolves when the script is loaded
 * @param {HTMLScriptElement} scriptElement - The script element to load
 * @returns {Promise} - Resolves when the script is loaded
 */
function loadExternalScript(scriptElement) {
  return new Promise((resolve, reject) => {
    scriptElement.onload = resolve;
    scriptElement.onerror = reject;
  });
}

/**
 * Processes all elements with an "include" attribute
 * @param {string} selector - CSS selector for elements to process (default: 'div[include]')
 */
function injectAll(selector = 'div[include]') {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    const filePath = elem.getAttribute('include');
    if (filePath) {
      injectHTML(filePath, elem).catch((error) => {
        console.error('Failed to inject HTML:', error);
        elem.innerHTML = `<div class="error">Failed to load content</div>`;
      });
    } else {
      console.warn('Missing "include" attribute in element:', elem);
    }
  });
}

// Initialize the injection process when DOM is ready
document.addEventListener('DOMContentLoaded', () => injectAll());
