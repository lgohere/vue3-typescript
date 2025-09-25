<template>
  <div class="results-container" v-if="currentSession">
    <div class="container">
      <!-- Score Header -->
      <div class="score-section text-center">
        <div class="score-circle" :class="getScoreClass()">
          <div class="score-percentage">{{ currentSession.score }}%</div>
          <div class="score-label">Pontuação Final</div>
        </div>

        <h1 class="results-title">
          {{ getScoreMessage() }}
        </h1>

        <div class="test-info">
          <span class="test-name">{{ currentAssessment?.title }}</span>
          <span class="test-duration">Concluído em {{ formatDuration() }}</span>
        </div>
      </div>

      <!-- Statistics -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon correct">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-value">{{ correctAnswers }}</div>
            <div class="stat-label">Respostas Corretas</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon incorrect">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-value">{{ incorrectAnswers }}</div>
            <div class="stat-label">Respostas Incorretas</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon total">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-value">{{ totalQuestions }}</div>
            <div class="stat-label">Total de Questões</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon attempts">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-value">{{ totalAttempts }}</div>
            <div class="stat-label">Total de Tentativas</div>
          </div>
        </div>
      </div>

      <!-- Performance Analysis -->
      <div class="analysis-section card">
        <h2>Análise de Performance</h2>

        <div class="performance-bar">
          <div class="performance-fill" :style="{ width: currentSession.score + '%' }"></div>
        </div>

        <div class="performance-feedback">
          <h3>{{ getPerformanceTitle() }}</h3>
          <p>{{ getPerformanceFeedback() }}</p>
        </div>

        <div class="recommendations">
          <h4>Recomendações para Melhorar:</h4>
          <ul>
            <li v-for="recommendation in getRecommendations()" :key="recommendation">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Detailed Results -->
      <div class="details-section card" v-if="showDetails">
        <h2>Resultados Detalhados</h2>
        <div class="details-list">
          <div
            v-for="answer in currentSession.answers"
            :key="answer.questionId"
            class="detail-item"
            :class="{ 'detail-correct': answer.isCorrect, 'detail-incorrect': !answer.isCorrect }"
          >
            <div class="detail-header">
              <span class="detail-number">Questão {{ answer.questionId }}</span>
              <div class="detail-status">
                <svg v-if="answer.isCorrect" fill="currentColor" viewBox="0 0 20 20" class="status-icon correct">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else fill="currentColor" viewBox="0 0 20 20" class="status-icon incorrect">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="detail-content">
              <div>
                <strong>Sua resposta:</strong> {{ answer.selectedOption }}
                <span v-if="!answer.isCorrect"> (Incorreta)</span>
              </div>
              <div v-if="!answer.isCorrect">
                <strong>Resposta correta:</strong> {{ getCorrectAnswer(answer.questionId) }}
              </div>
              <div class="detail-attempts">
                Tentativas: {{ answer.attempts }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-section text-center">
        <button
          class="btn btn-secondary action-btn"
          @click="showDetails = !showDetails"
        >
          {{ showDetails ? 'Ocultar' : 'Ver' }} Detalhes
        </button>

        <button
          class="btn btn-primary action-btn"
          @click="tryAnotherRound"
        >
          Tentar Outro Round
        </button>

        <button
          class="btn btn-success action-btn"
          @click="retryCurrentRound"
        >
          Repetir Este Round
        </button>
      </div>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="container text-center">
      <div class="loading-spinner"></div>
      <h2>Carregando resultados...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const showDetails = ref(false)

const { currentAssessment, currentSession } = assessmentStore

const correctAnswers = computed(() => {
  return currentSession?.answers.filter(answer => answer.isCorrect).length || 0
})

const incorrectAnswers = computed(() => {
  return currentSession?.answers.filter(answer => !answer.isCorrect).length || 0
})

const totalQuestions = computed(() => {
  return currentAssessment?.questions.length || 0
})

const totalAttempts = computed(() => {
  return currentSession?.answers.reduce((total, answer) => total + answer.attempts, 0) || 0
})

function formatDuration(): string {
  if (!currentSession?.startTime || !currentSession?.endTime) return ''

  const duration = currentSession.endTime.getTime() - currentSession.startTime.getTime()
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.floor((duration % 60000) / 1000)

  return `${minutes}m ${seconds}s`
}

function getScoreClass(): string {
  const score = currentSession?.score || 0
  if (score >= 80) return 'score-excellent'
  if (score >= 60) return 'score-good'
  if (score >= 40) return 'score-average'
  return 'score-poor'
}

function getScoreMessage(): string {
  const score = currentSession?.score || 0
  if (score >= 90) return 'Excelente! Você está muito bem preparado!'
  if (score >= 80) return 'Muito Bom! Continue assim!'
  if (score >= 70) return 'Bom trabalho! Quase lá!'
  if (score >= 60) return 'Razoável. Precisa de mais estudo.'
  if (score >= 40) return 'Precisa melhorar bastante.'
  return 'Recomendamos mais estudo antes da entrevista.'
}

function getPerformanceTitle(): string {
  const score = currentSession?.score || 0
  if (score >= 80) return 'Excelente Performance!'
  if (score >= 60) return 'Boa Performance!'
  if (score >= 40) return 'Performance Regular'
  return 'Performance Precisa Melhorar'
}

function getPerformanceFeedback(): string {
  const score = currentSession?.score || 0
  if (score >= 90) return 'Você demonstra domínio excelente dos conceitos de Vue 3 e TypeScript. Está pronto para uma entrevista Senior!'
  if (score >= 80) return 'Você tem uma base sólida em Vue 3 e TypeScript. Com um pouco mais de prática, estará pronto!'
  if (score >= 70) return 'Você conhece os fundamentos, mas precisa aprofundar alguns conceitos avançados.'
  if (score >= 60) return 'Você tem conhecimento básico, mas precisa estudar mais os conceitos intermediários e avançados.'
  if (score >= 40) return 'Você precisa revisar os fundamentos e praticar mais antes da entrevista.'
  return 'Recomendamos estudar os conceitos básicos antes de tentar os testes avançados.'
}

function getRecommendations(): string[] {
  const score = currentSession?.score || 0
  const recommendations: string[] = []

  if (score < 60) {
    recommendations.push('Revisar documentação oficial do Vue 3')
    recommendations.push('Estudar os fundamentos da Composition API')
    recommendations.push('Praticar TypeScript com Vue 3')
  }

  if (score < 80) {
    recommendations.push('Aprofundar conhecimento em Reactivity System')
    recommendations.push('Estudar patterns avançados de composables')
    recommendations.push('Praticar gerenciamento de estado com Pinia')
  }

  if (score < 90) {
    recommendations.push('Estudar performance optimization')
    recommendations.push('Aprofundar TypeScript avançado com Vue')
    recommendations.push('Praticar arquiteturas complexas')
  }

  if (recommendations.length === 0) {
    recommendations.push('Continuar praticando para manter o conhecimento atualizado')
    recommendations.push('Explorar as novidades do Vue 3')
  }

  return recommendations
}

function getCorrectAnswer(questionId: number): string {
  const question = currentAssessment?.questions.find(q => q.id === questionId)
  return question?.correctAnswer || ''
}

function tryAnotherRound() {
  assessmentStore.resetSession()
  router.push('/')
}

function retryCurrentRound() {
  if (currentAssessment) {
    assessmentStore.startTest(currentAssessment.id)
    router.push('/test')
  }
}
</script>

<style scoped>
.results-container {
  min-height: 100vh;
  width: 100%;
  padding: 40px 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.score-section {
  margin-bottom: 60px;
}

.score-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  position: relative;
}

.score-circle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  padding: 8px;
  background: linear-gradient(135deg, currentColor, transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.score-excellent {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  color: var(--success-color);
}

.score-good {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  color: var(--primary-color);
}

.score-average {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  color: var(--warning-color);
}

.score-poor {
  background: linear-gradient(135deg, #fef2f2, #fecaca);
  color: var(--error-color);
}

.score-percentage {
  font-size: 2.5rem;
  font-weight: 800;
}

.score-label {
  font-size: 0.875rem;
  font-weight: 600;
  opacity: 0.8;
}

.results-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 16px;
}

.test-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--gray-600);
}

.test-name {
  font-weight: 600;
  font-size: 1.125rem;
}

.test-duration {
  font-size: 0.875rem;
}

.stats-section {
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.stat-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px -1px var(--shadow-light);
  border: 1px solid var(--border-primary);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.stat-icon.correct {
  background-color: #f0fdf4;
  color: var(--success-color);
}

.stat-icon.incorrect {
  background-color: #fef2f2;
  color: var(--error-color);
}

.stat-icon.total {
  background-color: #eff6ff;
  color: var(--primary-color);
}

.stat-icon.attempts {
  background-color: #fffbeb;
  color: var(--warning-color);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 4px;
}

.stat-label {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.analysis-section {
  margin-bottom: 40px;
}

.analysis-section h2 {
  margin-bottom: 24px;
  color: var(--gray-900);
}

.performance-bar {
  height: 8px;
  background-color: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
}

.performance-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--success-color), var(--primary-color));
  border-radius: 4px;
  transition: width 1s ease;
}

.performance-feedback h3 {
  color: var(--gray-900);
  margin-bottom: 12px;
}

.performance-feedback p {
  color: var(--gray-600);
  margin-bottom: 24px;
  line-height: 1.6;
}

.recommendations h4 {
  color: var(--gray-900);
  margin-bottom: 12px;
}

.recommendations ul {
  list-style: none;
  padding: 0;
}

.recommendations li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: var(--gray-600);
}

.recommendations li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.details-section {
  margin-bottom: 40px;
}

.details-section h2 {
  margin-bottom: 24px;
  color: var(--gray-900);
}

.details-list {
  space-y: 12px;
}

.detail-item {
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.detail-correct {
  border-color: var(--success-color);
  background-color: #f0fdf4;
}

.detail-incorrect {
  border-color: var(--error-color);
  background-color: #fef2f2;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.detail-number {
  font-weight: 600;
  color: var(--gray-900);
}

.status-icon {
  width: 20px;
  height: 20px;
}

.status-icon.correct {
  color: var(--success-color);
}

.status-icon.incorrect {
  color: var(--error-color);
}

.detail-content {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.detail-content > div {
  margin-bottom: 4px;
}

.detail-attempts {
  font-style: italic;
}

.actions-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.action-btn {
  min-width: 180px;
}

.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-200);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tablet e Desktop - Layout Consistente */
@media (min-width: 768px) {
  .results-title {
    font-size: 2.5rem;
  }

  .score-circle {
    width: 200px;
    height: 200px;
  }

  .score-percentage {
    font-size: 3rem;
  }

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .stat-card {
    padding: 32px;
  }

  .stat-icon {
    width: 64px;
    height: 64px;
  }

  .stat-icon svg {
    width: 32px;
    height: 32px;
  }

  .stat-value {
    font-size: 2.5rem;
  }

  .actions-section {
    gap: 24px;
  }

  .action-btn {
    min-width: 220px;
    padding: 16px 32px;
    font-size: 1.125rem;
  }
}


@media (max-width: 768px) {
  .actions-section {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .test-info {
    align-items: center;
  }
}
</style>