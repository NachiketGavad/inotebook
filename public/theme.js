// theme.js
import { useDarkMode } from './DarkModeContext';

const updateTheme = () => {
  const { isDarkMode } = useDarkMode();
  document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
};

// Update the theme initially
updateTheme();

// Listen for changes in dark mode and update the theme accordingly
document.addEventListener('DOMContentLoaded', () => {
  updateTheme();
});
