import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import ResultsView from '../views/ResultsView.vue'
import { useAssessmentStore } from '@/stores/assessment'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
      beforeEnter: (_, __, next) => {
        const assessmentStore = useAssessmentStore()
        if (assessmentStore.currentSession && !assessmentStore.currentSession.isCompleted) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      beforeEnter: (_, __, next) => {
        const assessmentStore = useAssessmentStore()
        if (assessmentStore.currentSession && assessmentStore.currentSession.isCompleted) {
          next()
        } else {
          next('/')
        }
      }
    },
  ],
})

export default router
