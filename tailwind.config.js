import { colors } from './src/design-system/tokens/colors.js';
import { spacing } from './src/design-system/tokens/spacing.js';
import { typography } from './src/design-system/tokens/typography.js';
import { shadows } from './src/design-system/tokens/shadows.js';
import { borderRadius } from './src/design-system/tokens/borders.js';
import { animations } from './src/design-system/tokens/animations.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        indigo: colors.indigo,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      spacing: spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      boxShadow: {
        ...shadows,
      },
      borderRadius: borderRadius,
      transitionDuration: animations.duration,
      transitionTimingFunction: animations.easing,
      keyframes: animations.keyframes,
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-in-up': 'fadeInUp 600ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'spin': 'spin 1s linear infinite',
        'gradient': 'gradient 15s ease infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
