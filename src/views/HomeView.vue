<template>
  <div class="home-container">
    <div class="container">
      <div class="hero-section text-center">
        <h1 class="hero-title">Vue 3 + TypeScript Assessment</h1>
        <p class="hero-subtitle">
          Prepare-se para sua entrevista com estes testes práticos
        </p>
      </div>

      <div class="rounds-grid">
        <div
          v-for="round in rounds"
          :key="round.id"
          class="round-card"
          @click="startAssessment(round.id)"
        >
          <div class="round-header">
            <div class="round-badge" :class="round.difficulty">
              Round {{ round.id }}
            </div>
            <div class="round-time">
              <svg class="clock-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ round.timeLimit }} min
            </div>
          </div>

          <h3 class="round-title">{{ round.title }}</h3>
          <p class="round-description">{{ round.description }}</p>

          <div class="round-stats">
            <span class="stat">
              <strong>{{ round.questionCount }}</strong> questões
            </span>
            <span class="stat difficulty-label" :class="round.difficulty">
              {{ round.difficultyLabel }}
            </span>
          </div>

          <button class="btn btn-primary round-btn">
            Iniciar Teste
            <svg class="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="info-section card">
        <h2>Como Funciona</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">⏱️</div>
            <h4>Timer de 25 minutos</h4>
            <p>Cada round tem 25 minutos para ser completado</p>
          </div>
          <div class="feature">
            <div class="feature-icon">✅</div>
            <h4>Feedback Instantâneo</h4>
            <p>Receba feedback imediato para cada resposta</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔄</div>
            <h4>Múltiplas Tentativas</h4>
            <p>Você pode tentar novamente até acertar</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📊</div>
            <h4>Pontuação Final</h4>
            <p>Veja sua performance ao final de cada teste</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const rounds = ref([
  {
    id: 1,
    title: 'Vue 3 + TypeScript Assessment',
    description: 'Fundamentos do Vue 3 e TypeScript',
    difficulty: 'beginner',
    difficultyLabel: 'Iniciante',
    questionCount: 30,
    timeLimit: 25
  },
  {
    id: 2,
    title: 'Vue 3 + TypeScript Advanced Assessment',
    description: 'Conceitos avançados e patterns',
    difficulty: 'intermediate',
    difficultyLabel: 'Intermediário',
    questionCount: 30,
    timeLimit: 25
  },
  {
    id: 3,
    title: 'Vue 3 + TypeScript Expert Assessment',
    description: 'Expertise e arquiteturas complexas',
    difficulty: 'advanced',
    difficultyLabel: 'Avançado',
    questionCount: 30,
    timeLimit: 25
  },
  {
    id: 4,
    title: 'Vue 3 + TypeScript LETHAL Assessment',
    description: 'O desafio supremo para experts',
    difficulty: 'expert',
    difficultyLabel: 'Expert',
    questionCount: 30,
    timeLimit: 25
  }
])

async function startAssessment(roundId: number) {
  try {
    await assessmentStore.loadAssessment(roundId)
    assessmentStore.startTest(roundId)
    router.push('/test')
  } catch (error) {
    console.error('Error starting assessment:', error)
    alert('Erro ao carregar o assessment. Verifique se os arquivos estão disponíveis.')
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  width: 100%;
  padding: 40px 0;
}

.hero-section {
  margin-bottom: 60px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.rounds-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 60px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.round-card {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px var(--shadow-light);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid var(--border-primary);
  position: relative;
  overflow: hidden;
}

.round-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px var(--shadow-medium);
  border-color: var(--primary-color);
}

.round-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--success-color));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.round-card:hover::before {
  opacity: 1;
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.round-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.round-badge.beginner {
  background-color: var(--success-color);
}

.round-badge.intermediate {
  background-color: var(--warning-color);
}

.round-badge.advanced {
  background-color: var(--primary-color);
}

.round-badge.expert {
  background-color: var(--error-color);
}

.round-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.clock-icon {
  width: 16px;
  height: 16px;
}

.round-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 8px;
}

.round-description {
  color: var(--gray-600);
  margin-bottom: 16px;
}

.round-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--gray-200);
}

.stat {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.difficulty-label.beginner {
  color: var(--success-color);
}

.difficulty-label.intermediate {
  color: var(--warning-color);
}

.difficulty-label.advanced {
  color: var(--primary-color);
}

.difficulty-label.expert {
  color: var(--error-color);
}

.round-btn {
  width: 100%;
  justify-content: center;
  font-weight: 600;
  letter-spacing: 0.025em;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
}

.round-btn:hover {
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
  transform: translateY(-2px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.info-section {
  margin-top: 60px;
}

.info-section h2 {
  text-align: center;
  margin-bottom: 32px;
  color: var(--gray-900);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature {
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.feature h4 {
  color: var(--gray-900);
  margin-bottom: 8px;
}

.feature p {
  color: var(--gray-600);
  font-size: 0.875rem;
}

/* Tablet */
@media (min-width: 768px) {
  .rounds-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    max-width: 100%;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.375rem;
  }

  .round-card {
    padding: 32px;
  }

  .features-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .hero-title {
    font-size: 2rem;
  }

  .rounds-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .container {
    padding: 0 16px;
  }
}
</style>
