/**
 * Utility function for conditionally joining classNames together
 * Similar to the popular 'clsx' library
 * 
 * @param {...(string|Object|Array)} classes - Class names or objects/arrays of class names
 * @returns {string} Combined class names
 * 
 * @example
 * cn('base-class', isActive && 'active', { 'disabled': isDisabled })
 * // Returns: 'base-class active' (if isActive is true and isDisabled is false)
 */
export function cn(...classes) {
  return classes
    .flat()
    .filter((x) => {
      if (typeof x === 'string') return x.trim().length > 0;
      if (typeof x === 'object' && x !== null) {
        return Object.entries(x).some(([, value]) => Boolean(value));
      }
      return false;
    })
    .map((x) => {
      if (typeof x === 'string') return x.trim();
      if (typeof x === 'object' && x !== null) {
        return Object.entries(x)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
