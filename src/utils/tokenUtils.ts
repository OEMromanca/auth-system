import { useAuthStore } from '@/stores/useAuthStore'
import { removeItem } from '@/api/api'

export const startTokenExpirationTimer = (email: string, time: number) => {
  setTimeout(() => {
    removeItem(`authToken_${email}`)

    const authStore = useAuthStore()
    authStore.isAuthenticated = false
    authStore.currentUser = null
  }, time)
}

export const getTokenKey = () => {
  return Object.keys(localStorage).find((key) => key.startsWith('authToken_')) || null
}
