<template>
  <div class="test-container" v-if="currentAssessment && currentSession">
    <!-- Header with Timer and Progress -->
    <div class="test-header">
      <div class="container">
        <div class="header-content">
          <div class="test-info">
            <h1 class="test-title">{{ currentAssessment.title }}</h1>
            <div class="question-progress">
              Questão {{ currentSession.currentQuestionIndex + 1 }} de {{ currentAssessment.questions.length }}
            </div>
          </div>

          <div class="timer-section" :class="{ 'timer-warning': timeWarning }">
            <div class="timer-display">
              <svg class="timer-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ formatTime }}
            </div>
            <div class="timer-label">Tempo restante</div>
          </div>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Question Content -->
    <div class="question-container" v-if="currentQuestion">
      <div class="container">
        <div class="question-card card">
          <div class="question-header">
            <span class="question-number">Questão {{ currentQuestion.id }}</span>
          </div>

          <h2 class="question-text">{{ currentQuestion.question }}</h2>

          <div class="options-list">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="option-item"
              :class="{
                'option-selected': selectedOption === getOptionLetter(index),
                'option-correct': showFeedback && getOptionLetter(index) === currentQuestion.correctAnswer,
                'option-incorrect': showFeedback && selectedOption === getOptionLetter(index) && selectedOption !== currentQuestion.correctAnswer
              }"
              @click="selectOption(getOptionLetter(index))"
            >
              <div class="option-letter">{{ getOptionLetter(index) }}</div>
              <div class="option-content">{{ option }}</div>
              <div class="option-indicator" v-if="showFeedback && getOptionLetter(index) === currentQuestion.correctAnswer">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="option-indicator incorrect" v-else-if="showFeedback && selectedOption === getOptionLetter(index) && selectedOption !== currentQuestion.correctAnswer">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div class="feedback-section" v-if="showFeedback">
            <div class="feedback-message" :class="{ 'feedback-success': isCorrect, 'feedback-error': !isCorrect }">
              <div class="feedback-icon">
                <svg v-if="isCorrect" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <strong>{{ isCorrect ? 'Correto!' : 'Incorreto!' }}</strong>
                <span v-if="!isCorrect"> A resposta correta é {{ currentQuestion.correctAnswer }}.</span>
              </div>
            </div>
          </div>

          <div class="question-actions">
            <button
              v-if="!showFeedback"
              class="btn btn-primary"
              :disabled="!selectedOption"
              @click="submitAnswer"
            >
              Confirmar Resposta
            </button>
            <button
              v-else-if="isCorrect"
              class="btn btn-success"
              @click="nextQuestion"
            >
              {{ isLastQuestion ? 'Finalizar Teste' : 'Próxima Questão' }}
              <svg class="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              v-else
              class="btn btn-secondary"
              @click="tryAgain"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Up Modal -->
    <div class="modal-overlay" v-if="showTimeUpModal" @click="finishTest">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Tempo Esgotado!</h3>
        </div>
        <div class="modal-body">
          <p>O tempo de 25 minutos foi completado. Seu teste será finalizado automaticamente.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="finishTest">
            Ver Resultado
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="container text-center">
      <div class="loading-spinner"></div>
      <h2>Carregando teste...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const selectedOption = ref<string | null>(null)
const showFeedback = ref(false)
const isCorrect = ref(false)
const showTimeUpModal = ref(false)
let timerInterval: NodeJS.Timeout | null = null

const currentAssessment = computed(() => assessmentStore.currentAssessment)
const currentSession = computed(() => assessmentStore.currentSession)
const currentQuestion = computed(() => assessmentStore.currentQuestion)
const progress = computed(() => assessmentStore.progress)
const formatTime = computed(() => assessmentStore.formatTime)

const timeWarning = computed(() => {
  return currentSession.value && currentSession.value.timeRemaining <= 300 // 5 minutes warning
})

const isLastQuestion = computed(() => {
  if (!currentAssessment.value || !currentSession.value) return false
  return currentSession.value.currentQuestionIndex === currentAssessment.value.questions.length - 1
})

function getOptionLetter(index: number): string {
  return String.fromCharCode(65 + index) // A, B, C, D
}

function selectOption(option: string) {
  if (!showFeedback.value) {
    selectedOption.value = option
  }
}

function submitAnswer() {
  if (!selectedOption.value) return

  isCorrect.value = assessmentStore.answerQuestion(selectedOption.value)
  showFeedback.value = true
}

function tryAgain() {
  showFeedback.value = false
  selectedOption.value = null
}

function nextQuestion() {
  console.log('nextQuestion called')
  assessmentStore.nextQuestion()

  console.log('after nextQuestion, isCompleted:', currentSession.value?.isCompleted)
  console.log('currentQuestionIndex:', currentSession.value?.currentQuestionIndex)

  if (currentSession.value?.isCompleted) {
    router.push('/results')
  } else {
    resetQuestion()
  }
}

function resetQuestion() {
  selectedOption.value = assessmentStore.getCurrentAnswer()
  showFeedback.value = false
  isCorrect.value = false
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!currentSession.value) return

    currentSession.value.timeRemaining--

    if (currentSession.value.timeRemaining <= 0) {
      showTimeUpModal.value = true
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, 1000)
}

function finishTest() {
  assessmentStore.completeTest()
  router.push('/results')
}

onMounted(() => {
  if (!currentSession.value || !currentAssessment.value) {
    router.push('/')
    return
  }

  resetQuestion()
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary);
}

.test-header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  padding: 24px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.test-info h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 4px;
}

.question-progress {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.timer-section {
  text-align: center;
}

.timer-display {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.timer-warning .timer-display {
  color: var(--error-color);
}

.timer-icon {
  width: 24px;
  height: 24px;
}

.timer-label {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 4px;
}

.progress-bar {
  height: 4px;
  background-color: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.question-container {
  padding: 40px 0;
  width: 100%;
}

.question-card {
  max-width: none;
}

.question-header {
  margin-bottom: 20px;
}

.question-number {
  background-color: var(--primary-color);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 32px;
  line-height: 1.6;
}

.options-list {
  margin-bottom: 32px;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
}

.option-item:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-tertiary);
}

.option-selected {
  border-color: var(--primary-color);
  background-color: rgba(99, 102, 241, 0.1);
}

.option-correct {
  border-color: var(--success-color);
  background-color: rgba(16, 185, 129, 0.1);
}

.option-incorrect {
  border-color: var(--error-color);
  background-color: rgba(239, 68, 68, 0.1);
}

.option-letter {
  width: 32px;
  height: 32px;
  background-color: var(--gray-200);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--gray-700);
  margin-right: 16px;
  flex-shrink: 0;
}

.option-selected .option-letter {
  background-color: var(--primary-color);
  color: white;
}

.option-correct .option-letter {
  background-color: var(--success-color);
  color: white;
}

.option-incorrect .option-letter {
  background-color: var(--error-color);
  color: white;
}

.option-content {
  flex: 1;
  font-size: 1rem;
  color: var(--gray-900);
}

.option-indicator {
  width: 24px;
  height: 24px;
  color: var(--success-color);
}

.option-indicator.incorrect {
  color: var(--error-color);
}

.feedback-section {
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
}

.feedback-message {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feedback-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.feedback-error {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.feedback-icon {
  width: 24px;
  height: 24px;
}

.question-actions {
  display: flex;
  justify-content: center;
}

.question-actions .btn {
  min-width: 200px;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  border: 1px solid var(--border-primary);
}

.modal-header h3 {
  color: var(--error-color);
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.modal-body p {
  color: var(--text-secondary);
  margin-bottom: 24px;
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
  .test-header {
    padding: 32px 0;
  }

  .header-content {
    align-items: center;
  }

  .test-info h1 {
    font-size: 1.75rem;
  }

  .question-text {
    font-size: 1.375rem;
    margin-bottom: 40px;
  }

  .option-item {
    padding: 20px;
    margin-bottom: 16px;
  }

  .option-content {
    font-size: 1.125rem;
  }

  .question-actions .btn {
    min-width: 250px;
    padding: 16px 32px;
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .test-info {
    text-align: center;
  }
}
</style>