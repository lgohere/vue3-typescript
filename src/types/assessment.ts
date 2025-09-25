export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

export interface Assessment {
  id: number
  title: string
  timeLimit: number // em minutos
  questions: Question[]
}

export interface UserAnswer {
  questionId: number
  selectedOption: string
  isCorrect: boolean
  attempts: number
}

export interface TestSession {
  assessmentId: number
  startTime: Date
  endTime?: Date
  answers: UserAnswer[]
  currentQuestionIndex: number
  timeRemaining: number
  isCompleted: boolean
  score: number
}