<template>
  <button
    class="theme-toggle"
    @click="themeStore.toggleTheme()"
    :aria-label="themeStore.currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <div class="toggle-container">
      <!-- Sun Icon -->
      <svg
        v-if="themeStore.currentTheme === 'light'"
        class="theme-icon sun-icon"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Moon Icon -->
      <svg
        v-else
        class="theme-icon moon-icon"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>

      <span class="toggle-text">
        {{ themeStore.currentTheme === 'light' ? 'Dark' : 'Light' }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
  color: var(--text-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--shadow-light);
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme-icon {
  width: 18px;
  height: 18px;
  transition: all 0.3s ease;
}

.sun-icon {
  color: #f59e0b;
}

.moon-icon {
  color: #6366f1;
}

.toggle-text {
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .toggle-text {
    display: none;
  }

  .theme-toggle {
    padding: 8px;
  }

  .theme-icon {
    width: 20px;
    height: 20px;
  }
}
</style>