import { useAuthStore } from '@/stores/useAuthStore'
import { hashPassword } from './cryptoUtils'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

interface IUser {
  userName: string
  email: string
  password: string
}

export const findUserByEmailAndPassword = (users: IUser[], email: string, password: string) => {
  const hashedPassword = hashPassword(password)
  return users.find((user) => user.email === email && user.password === hashedPassword) || null
}

export const findUserByEmail = (users: IUser[], email: string) => {
  return users.some((user) => user.email === email)
}

export const findUserByUserName = (users: IUser[], userName: string) => {
  return users.some((user) => user.userName === userName)
}
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}
