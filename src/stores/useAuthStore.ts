import { defineStore } from 'pinia'
import { generateToken, hashPassword } from '../utils/cryptoUtils'
import { getTokenKey, startTokenExpirationTimer } from '@/utils/tokenUtils'
import { findUserByEmail, findUserByEmailAndPassword, findUserByUserName } from '@/utils/authUtils'
import { getItem, removeItem, setItem } from '@/api/api'

interface IUser {
  userName: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as IUser[],
    currentUser: null as IUser | null,
    isAuthenticated: false
  }),

  actions: {
    getExistingUsers() {
      const users = getItem<IUser[]>('users')
      this.users = users ? users : []
    },

    loginUser(email: string, password: string): string | null {
      this.getExistingUsers()

      const user = findUserByEmailAndPassword(this.users, email, password)

      if (user) {
        const token = generateToken()
        setItem<string>(`authToken_${user.email}`, token)
        startTokenExpirationTimer(user.email, 30000) // token expiration
        this.currentUser = user
        this.isAuthenticated = true
        return null
      } else {
        const userExists = findUserByEmail(this.users, email)
        if (userExists) {
          return 'Incorrect password'
        } else {
          return 'User does not exist. Please register.'
        }
      }
    },

    getUserFromToken() {
      this.getExistingUsers()
      const tokenKey = getTokenKey()

      if (tokenKey) {
        const userEmail = tokenKey.replace('authToken_', '')
        const user = this.users.find((user: IUser) => user.email === userEmail) || null
        if (user) {
          this.isAuthenticated = true
        }
        return user
      }
      this.isAuthenticated = false
      return null
    },

    logout() {
      const tokenKey = getTokenKey()

      if (tokenKey) {
        removeItem(tokenKey)
      }
      this.currentUser = null
      this.isAuthenticated = false
    },

    registerUser(
      userName: string,
      email: string,
      password: string
    ): { emailError?: string; userNameError?: string } | null {
      const emailExists = findUserByEmail(this.users, email)
      const userNameExists = findUserByUserName(this.users, userName)

      const errors: { emailError?: string; userNameError?: string } = {}

      if (emailExists) {
        errors.emailError = 'Email is already taken'
      }
      if (userNameExists) {
        errors.userNameError = 'Username is already taken'
      }

      if (Object.keys(errors).length > 0) {
        return errors
      }

      const newUser: IUser = {
        userName,
        email,
        password: hashPassword(password)
      }

      this.users.push(newUser)
      setItem<IUser[]>('users', this.users)
      return null
    }
  }
})
