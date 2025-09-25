import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Assessment, TestSession, UserAnswer } from '@/types/assessment'
import { MarkdownParser } from '@/utils/markdownParser'

export const useAssessmentStore = defineStore('assessment', () => {
  const assessments = ref<Assessment[]>([])
  const currentSession = ref<TestSession | null>(null)
  const isLoading = ref(false)

  const currentAssessment = computed(() => {
    if (!currentSession.value) return null
    return assessments.value.find(a => a.id === currentSession.value!.assessmentId) || null
  })

  const currentQuestion = computed(() => {
    if (!currentAssessment.value || !currentSession.value) return null
    return currentAssessment.value.questions[currentSession.value.currentQuestionIndex] || null
  })

  const progress = computed(() => {
    if (!currentSession.value || !currentAssessment.value) return 0
    return Math.round((currentSession.value.currentQuestionIndex / currentAssessment.value.questions.length) * 100)
  })

  const formatTime = computed(() => {
    if (!currentSession.value) return '00:00'
    const minutes = Math.floor(currentSession.value.timeRemaining / 60)
    const seconds = currentSession.value.timeRemaining % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  async function loadAssessment(roundNumber: number) {
    isLoading.value = true
    try {
      const assessment = await MarkdownParser.loadAssessment(roundNumber)
      const existingIndex = assessments.value.findIndex(a => a.id === roundNumber)

      if (existingIndex >= 0) {
        assessments.value[existingIndex] = assessment
      } else {
        assessments.value.push(assessment)
      }
    } catch (error) {
      console.error('Error loading assessment:', error)
    } finally {
      isLoading.value = false
    }
  }

  function startTest(assessmentId: number) {
    const assessment = assessments.value.find(a => a.id === assessmentId)
    if (!assessment) return

    currentSession.value = {
      assessmentId,
      startTime: new Date(),
      answers: [],
      currentQuestionIndex: 0,
      timeRemaining: assessment.timeLimit * 60, // Convert to seconds
      isCompleted: false,
      score: 0
    }
  }

  function answerQuestion(selectedOption: string): boolean {
    if (!currentSession.value || !currentQuestion.value) return false

    const isCorrect = selectedOption === currentQuestion.value.correctAnswer

    // Find existing answer or create new one
    const existingAnswerIndex = currentSession.value.answers.findIndex(
      a => a.questionId === currentQuestion.value!.id
    )

    if (existingAnswerIndex >= 0) {
      currentSession.value.answers[existingAnswerIndex] = {
        ...currentSession.value.answers[existingAnswerIndex],
        selectedOption,
        isCorrect,
        attempts: currentSession.value.answers[existingAnswerIndex].attempts + 1
      }
    } else {
      currentSession.value.answers.push({
        questionId: currentQuestion.value.id,
        selectedOption,
        isCorrect,
        attempts: 1
      })
    }

    return isCorrect
  }

  function nextQuestion() {
    if (!currentSession.value || !currentAssessment.value) return

    console.log('Store nextQuestion - current index:', currentSession.value.currentQuestionIndex)
    console.log('Store nextQuestion - total questions:', currentAssessment.value.questions.length)

    if (currentSession.value.currentQuestionIndex < currentAssessment.value.questions.length - 1) {
      currentSession.value.currentQuestionIndex++
      console.log('Store nextQuestion - moved to index:', currentSession.value.currentQuestionIndex)
    } else {
      console.log('Store nextQuestion - completing test')
      completeTest()
    }
  }

  function completeTest() {
    if (!currentSession.value) return

    currentSession.value.endTime = new Date()
    currentSession.value.isCompleted = true

    // Calculate final score
    const correctAnswers = currentSession.value.answers.filter(a => a.isCorrect).length
    const totalQuestions = currentAssessment.value?.questions.length || 0
    currentSession.value.score = Math.round((correctAnswers / totalQuestions) * 100)
  }

  function getCurrentAnswer(): string | null {
    if (!currentSession.value || !currentQuestion.value) return null

    const answer = currentSession.value.answers.find(a => a.questionId === currentQuestion.value!.id)
    return answer?.selectedOption || null
  }

  function resetSession() {
    currentSession.value = null
  }

  return {
    assessments,
    currentSession,
    currentAssessment,
    currentQuestion,
    isLoading,
    progress,
    formatTime,
    loadAssessment,
    startTest,
    answerQuestion,
    nextQuestion,
    completeTest,
    getCurrentAnswer,
    resetSession
  }
})