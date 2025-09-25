<template>
  <div id="app">
    <div class="theme-toggle-container">
      <ThemeToggle />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import ThemeToggle from '@/components/ThemeToggle.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initializeTheme()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  width: 100%;
}

/* Light Theme */
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;

  /* Light theme colors */
  --bg-primary: #f5f6fa;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f9fafb;
  --text-primary: #2c3e50;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --border-primary: #e5e7eb;
  --border-secondary: #d1d5db;
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.15);

  /* Legacy gray variables for compatibility */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}

/* Dark Theme */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-primary: #334155;
  --border-secondary: #475569;
  --shadow-light: rgba(0, 0, 0, 0.3);
  --shadow-medium: rgba(0, 0, 0, 0.4);

  /* Override gray variables for dark theme */
  --gray-50: #334155;
  --gray-100: #475569;
  --gray-200: #64748b;
  --gray-300: #94a3b8;
  --gray-400: #cbd5e1;
  --gray-500: #e2e8f0;
  --gray-600: #f1f5f9;
  --gray-700: #f8fafc;
  --gray-800: #ffffff;
  --gray-900: #ffffff;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background-color: var(--gray-400);
  cursor: not-allowed;
  transform: none;
}

.btn-success {
  background-color: var(--success-color);
  color: white;
}

.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px var(--shadow-light), 0 2px 4px -1px var(--shadow-light);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive container - Unificado */
@media (min-width: 768px) {
  .container {
    padding: 0 12%;
    max-width: none;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 0 16%;
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 0 20%;
  }
}

.text-center {
  text-align: center;
}

.theme-toggle-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
