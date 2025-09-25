import type { Question, Assessment } from '@/types/assessment'

export class MarkdownParser {
  static parseAssessment(content: string, assessmentId: number): Assessment {
    const lines = content.split('\n').map(line => line.trim())

    // Extract title
    const titleMatch = lines.find(line => line.startsWith('# '))
    const title = titleMatch ? titleMatch.replace('# ', '').replace(/\*/g, '') : `Round ${assessmentId}`

    // Extract time limit
    const timeLimitMatch = lines.find(line => line.includes('Minutes'))
    const timeLimit = timeLimitMatch ? parseInt(timeLimitMatch.match(/(\d+)\s*Minutes/)?.[1] || '25') : 25

    const questions: Question[] = []
    let currentQuestion: Partial<Question> = {}
    let answerKey: Record<number, string> = {}
    let isInAnswerKey = false
    let questionCounter = 0

    // First pass: extract answer key
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('Answer Key') || line.includes('## **Answer Key**')) {
        isInAnswerKey = true
        continue
      }

      if (isInAnswerKey && line.match(/^\d+\.\s*\*\*[A-D]\*\*/)) {
        const match = line.match(/^(\d+)\.\s*\*\*([A-D])\*\*/)
        if (match) {
          const questionNum = parseInt(match[1])
          const answer = match[2]
          answerKey[questionNum] = answer
        }
      }
    }

    // Second pass: extract questions
    isInAnswerKey = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('Answer Key')) {
        break
      }

      // Question start
      const questionMatch = line.match(/^\*\*Question (\d+)\*\*\s*(.+)/)
      if (questionMatch) {
        // Save previous question if exists
        if (currentQuestion.question && currentQuestion.options) {
          questions.push(currentQuestion as Question)
        }

        questionCounter = parseInt(questionMatch[1])
        currentQuestion = {
          id: questionCounter,
          question: questionMatch[2],
          options: [],
          correctAnswer: answerKey[questionCounter] || 'A'
        }
        continue
      }

      // Options
      const optionMatch = line.match(/^([A-D])\)\s*(.+)/)
      if (optionMatch && currentQuestion.question) {
        if (!currentQuestion.options) {
          currentQuestion.options = []
        }
        currentQuestion.options.push(optionMatch[2])
      }
    }

    // Add last question
    if (currentQuestion.question && currentQuestion.options) {
      questions.push(currentQuestion as Question)
    }

    return {
      id: assessmentId,
      title,
      timeLimit,
      questions
    }
  }

  static async loadAssessment(roundNumber: number): Promise<Assessment> {
    try {
      let filename = ''
      switch (roundNumber) {
        case 1:
          filename = 'ROUND 1 - Vue 3 + TypeScript Assessment.md'
          break
        case 2:
          filename = 'ROUND 2 Vue 3 + TypeScript Advanced Assessment.md'
          break
        case 3:
          filename = 'ROUND 3 Vue 3 + TypeScript Expert Assessment.md'
          break
        case 4:
          filename = 'ROUND 4 - Vue 3 + TypeScript LETHAL ASSESSMENT.md'
          break
        default:
          throw new Error(`Round ${roundNumber} not found`)
      }

      const response = await fetch(`/assessments/${filename}`)

      if (!response.ok) {
        throw new Error(`Failed to load assessment: ${response.statusText}`)
      }

      const content = await response.text()
      return this.parseAssessment(content, roundNumber)
    } catch (error) {
      console.error('Error loading assessment:', error)
      throw error
    }
  }
}