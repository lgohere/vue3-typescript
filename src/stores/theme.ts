import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('light')

  // Initialize theme from localStorage or system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      currentTheme.value = savedTheme
    } else if (systemPrefersDark) {
      currentTheme.value = 'dark'
    }

    applyTheme(currentTheme.value)
  }

  // Apply theme to document
  function applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  // Toggle between light and dark
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  // Set specific theme
  function setTheme(theme: Theme) {
    currentTheme.value = theme
  }

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  })

  return {
    currentTheme,
    initializeTheme,
    toggleTheme,
    setTheme
  }
})