/**
 * Accessibility utility functions for MindSpace design system
 */

/**
 * Generate a unique ID for form elements
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get ARIA attributes for form validation states
 * @param {Object} options - Validation options
 * @param {string} options.id - Element ID
 * @param {string} options.error - Error message
 * @param {string} options.helperText - Helper text
 * @returns {Object} ARIA attributes
 */
export function getValidationAriaAttributes({ id, error, helperText }) {
  const attrs = {};
  
  if (error) {
    attrs['aria-invalid'] = 'true';
    attrs['aria-describedby'] = `${id}-error`;
  } else if (helperText) {
    attrs['aria-describedby'] = `${id}-helper`;
  }
  
  return attrs;
}

/**
 * Create visually hidden text for screen readers
 * @param {string} text - Text to hide visually
 * @returns {Object} Style object for visually hidden text
 */
export function visuallyHidden() {
  return {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  };
}

/**
 * Trap focus within a container (useful for modals)
 * @param {HTMLElement} container - Container element
 * @returns {Function} Cleanup function
 */
export function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  function handleTabKey(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
  
  container.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
